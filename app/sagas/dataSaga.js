
import { delay } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import { fetchMasterStopsNoRoutes, fetchMasterRoutes } from '../services/shuttleService'

import {
	DATA_SAGA_TTL,
	SHUTTLE_MASTER_TTL,
} from '../AppSettings'

const getShuttle = state => (state.shuttle)

function* watchData() {
	while (true) {
		try {
			yield call(updateShuttleMaster)
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

function* dataSaga() {
	yield call(watchData)
}

export default dataSaga
