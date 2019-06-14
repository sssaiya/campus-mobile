import { put, takeLatest, call, select, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import moment from 'moment'
import logger from '../util/logger'
import DiningService from '../services/diningService'
import { TIMEOUT_DEFAULT } from '../AppSettings'
import { convertMetersToMiles, getDistanceMilesStr, dynamicSort, militaryToAMPM } from '../util/general'
import { getDistance } from '../util/map'

const getDining = state => (state.dining)
const diningState = state => (state.cards.cards.dining)
const getLocation = state => (state.location)

function* updateDining(action) {
	const { active } = yield select(diningState)
	if (active) {
		const diningData = yield call(DiningService.FetchDining)
		const diningDataParsed = yield call(parseDining, diningData)
		const diningDataSorted = yield call(sortDining, diningDataParsed)
		yield put({ type: 'SET_DINING', data: diningDataSorted })
	}
}

function* updateDiningDistance() {
	console.log('\n## updateDiningDistance -----------------------')

	console.log('updateDiningDistance, location:')
	const location = yield select(getLocation)
	console.log(location)
	console.log('##--------')


	// TODO: revisit
	if (location &&
		location.position &&
		location.position.coords &&
		location.position.coords.latitude &&
		location.position.coords.longitude) {
		console.log('has location--------------------')
		const { data } = yield select(getDining)

		console.log('dining data: ')
		console.log(data)

		const diningDataWithDistance = yield call(_setDiningDistance, location, data)
		console.log(diningDataWithDistance)
		yield put({ type: 'SET_DINING_DISTANCE', data: diningDataWithDistance })
	}
}

function parseDining(diningData) {
	const parsedDiningData = diningData.slice()
	parsedDiningData.forEach((element, index) => {
		parsedDiningData[index] = {
			...element,
			subtext: moment(element.eventdate).format('MMM Do') + ', ' + militaryToAMPM(element.starttime) + ' - ' + militaryToAMPM(element.endtime),
			image: element.imagethumb
		}
	})
	return parsedDiningData
}

function sortDining(diningData) {
	// Sort dining locations by name
	return new Promise((resolve, reject) => {
		if (Array.isArray(diningData)) {
			const sortedDiningData = diningData.slice()
			sortedDiningData.sort(dynamicSort('name'))
			resolve(sortedDiningData)
		} else {
			reject(new Error('sortDining: ' + diningData))
		}
	})
}

function* getDiningMenu(action) {
	const { lookup } = yield select(getDining)
	const { menuId } = action
	const menuArrayPosition = lookup[menuId]
	const diningMenu = yield call(fetchDiningMenu, menuId)
	yield put({ type: 'SET_DINING_MENU', data: diningMenu, id: menuArrayPosition })
}

function* fetchDiningMenu(id) {
	yield put({ type: 'GET_DINING_MENU_REQUEST' })

	try {
		const { response, timeout } = yield race({
			response: call(DiningService.FetchDiningMenu, id),
			timeout: call(delay, TIMEOUT_DEFAULT)
		})

		if (timeout) {
			const e = new Error('Request timed out.')
			throw e
		} else if (!response || !response.menuitems) {
			yield put({ type: 'GET_DINING_MENU_SUCCESS' })
			return null
		} else {
			yield put({ type: 'GET_DINING_MENU_SUCCESS' })
			return response
		}
	} catch (error) {
		logger.log(error)
		yield put({ type: 'GET_DINING_MENU_FAILURE', error })
	}
}

function _setDiningDistance(location, diningData) {
	// Calc distance from dining locations
	return new Promise((resolve, reject) => {
		if (Array.isArray(diningData)) {
			resolve(diningData.map((eatery) => {
				let distance
				if (eatery.coords) {
					distance = getDistance(location.position.coords.latitude, location.position.coords.longitude, eatery.coords.lat, eatery.coords.lon)
					if (distance) {
						eatery = {
							...eatery,
							distance
						}
					}
				} else {
					eatery = {
						...eatery,
						distance: 100000000
					}
				}

				const milesDistance = convertMetersToMiles(distance)
				eatery = {
					...eatery,
					distanceMiles: milesDistance,
					distanceMilesStr: getDistanceMilesStr(milesDistance)
				}

				return eatery
			}))
		} else {
			reject(new Error('Error _setDiningDistance'))
		}
	})
}

function* diningSaga() {
	yield takeLatest('UPDATE_DINING', updateDining)
	yield takeLatest('UPDATE_DINING_DISTANCE', updateDiningDistance)
	yield takeLatest('GET_DINING_MENU', getDiningMenu)
}

export default diningSaga
