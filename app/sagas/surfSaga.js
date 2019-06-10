import { call, put, takeLatest } from 'redux-saga/effects'
import SurfService from '../services/surfService'

function* updateSurf() {
	console.log('updateSurf-----')
	const surf = yield call(SurfService.FetchSurf)
	yield put({ type: 'SET_SURF', surf })
}

function* surfSaga() {
	yield takeLatest('UPDATE_SURF', updateSurf)
}

export default surfSaga
