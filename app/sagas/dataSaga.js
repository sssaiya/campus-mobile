
import { delay } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import { Image } from 'react-native'
import SpecialEventsService from '../services/specialEventsService'
import { fetchMasterStopsNoRoutes, fetchMasterRoutes } from '../services/shuttleService'

import {
	SPECIAL_EVENTS_TTL,
	DATA_SAGA_TTL,
	SHUTTLE_MASTER_TTL,
} from '../AppSettings'

const getSpecialEvents = state => (state.specialEvents)
const getCards = state => (state.cards)
const getShuttle = state => (state.shuttle)

function* watchData() {
	while (true) {
		try {
			yield call(updateSpecialEvents)
			yield call(updateShuttleMaster)
			yield put({ type: 'UPDATE_DINING' })
			yield put({ type: 'UPDATE_SCHEDULE' })
			yield put({ type: 'UPDATE_STUDENT_PROFILE' })
			yield put({ type: 'SYNC_USER_PROFILE' })
		} catch (err) {
			console.log(err)
		}
		yield delay(DATA_SAGA_TTL)
	}
}

function* updateShuttleMaster() {
	const { lastUpdated, routes, stops } = yield select(getShuttle)
	const nowTime = new Date().getTime()
	const timeDiff = nowTime - lastUpdated
	const shuttleTTL = SHUTTLE_MASTER_TTL

	if ((timeDiff < shuttleTTL) && (routes !== null) && (stops !== null)) {
		// Do nothing, don't need to update
	} else {
		// Fetch for new data
		const stopsData = yield call(fetchMasterStopsNoRoutes)
		const routesData = yield call(fetchMasterRoutes)

		// Set toggles
		const initialToggles = {}
		Object.keys(routesData).forEach((key, index) => {
			initialToggles[key] = false
		})

		yield put({
			type: 'SET_SHUTTLE_MASTER',
			stops: stopsData,
			routes: routesData,
			toggles: initialToggles,
			nowTime
		})
	}
}

function* updateSpecialEvents() {
	const { lastUpdated, saved } = yield select(getSpecialEvents)
	const { cards } = yield select(getCards)
	const nowTime = new Date().getTime()
	const timeDiff = nowTime - lastUpdated
	const ttl = SPECIAL_EVENTS_TTL

	if (timeDiff > ttl && Array.isArray(saved)) {
		const specialEvents = yield call(SpecialEventsService.FetchSpecialEvents)

		if (specialEvents &&
			specialEvents['start-time'] <= nowTime &&
			specialEvents['end-time'] >= nowTime) {
			// Inside active specialEvents window
			prefetchSpecialEventsImages(specialEvents)
			if (cards.specialEvents.autoActivated === false) {
				// Initialize SpecialEvents for first time use
				// wipe saved data
				yield put({ type: 'CHANGED_SPECIAL_EVENTS_SAVED', saved: [] })
				yield put({ type: 'CHANGED_SPECIAL_EVENTS_LABELS', labels: [] })
				yield put({ type: 'SET_SPECIAL_EVENTS', specialEvents })
				// set active and autoActivated to true
				yield put({ type: 'UPDATE_CARD_STATE', id: 'specialEvents', state: true })
				yield put({ type: 'UPDATE_AUTOACTIVATED_STATE', id: 'specialEvents', state: true })
				yield put({ type: 'SHOW_CARD', id: 'specialEvents' })
			} else if (cards.specialEvents.active) {
				// remove any saved items that no longer exist
				if (saved.length > 0) {
					const stillsExists = yield call(savedExists, specialEvents.uids, saved)
					yield put({ type: 'CHANGED_SPECIAL_EVENTS_SAVED', saved: stillsExists })
					yield put({ type: 'CHANGED_SPECIAL_EVENTS_LABELS', labels: [] })
				}
				yield put({ type: 'SET_SPECIAL_EVENTS', specialEvents })
			}
		} else {
			// Outside active specialEvents window
			// Set Special Events to null
			yield put({ type: 'SET_SPECIAL_EVENTS', specialEvents: null })

			// wipe saved data
			yield put({ type: 'CHANGED_SPECIAL_EVENTS_SAVED', saved: [] })
			yield put({ type: 'CHANGED_SPECIAL_EVENTS_LABELS', labels: [] })

			// set active and autoactivated to false
			yield put({ type: 'UPDATE_CARD_STATE', id: 'specialEvents', state: false })
			yield put({ type: 'UPDATE_AUTOACTIVATED_STATE', id: 'specialEvents', state: false })
			yield put({ type: 'HIDE_CARD', id: 'specialEvents' })
		}
	}
}

function savedExists(scheduleIds, savedArray) {
	const existsArray = []
	if (Array.isArray(savedArray)) {
		for (let i = 0; i < savedArray.length; ++i) {
			if (scheduleIds.includes(savedArray[i])) {
				existsArray.push(savedArray[i])
			}
		}
	}
	return existsArray
}

function prefetchSpecialEventsImages(specialEvents) {
	if (specialEvents.logo) {
		Image.prefetch(specialEvents.logo)
	}
	if (specialEvents['logo-sm']) {
		Image.prefetch(specialEvents['logo-sm'])
	}
	if (specialEvents.map) {
		Image.prefetch(specialEvents.map)
	}
	if (specialEvents['banner-image']) {
		Image.prefetch(specialEvents['banner-image'])
	}
}

function* dataSaga() {
	yield call(watchData)
}

export default dataSaga
