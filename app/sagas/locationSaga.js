
import { delay } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import Permissions from 'react-native-permissions'

import * as LocationService from '../services/locationService'
// import { getDistance } from '../util/map'
import AppSettings from '../AppSettings'

const getLocation = state => (state.location)
// const getShuttle = state => (state.shuttle)

function* watchLocation() {
	while (true) {
		try {
			console.log('\n\nlocationSaga: watchLocation')

			const location = yield select(getLocation)

			if (location.permission === 'authorized' && location.position && location.position.coords) {
				const position = yield call(LocationService.getPosition)

				console.log('SET_POSITION')
				yield put({ type: 'SET_POSITION', position })

				console.log('UPDATE_SHUTTLE_CLOSEST_STOP')
				yield put({ type: 'UPDATE_SHUTTLE_CLOSEST_STOP' })
				// yield put({ type: 'UPDATE_DINING_DISTANCE', position })
			} else {
				console.log('Location permission disabled.')
				const perm = yield call(getPermission, 'location')
				yield put({ type: 'SET_PERMISSION', permission: perm })
			}
		} catch (err) {
			console.log('Error: watchLocation: ' + err)
		}
		yield delay(AppSettings.LOCATION_TTL)
	}
}

function getPermission(type) {
	return Permissions.request(type)
}

function* locationSaga() {
	yield call(watchLocation)
}

export default locationSaga
