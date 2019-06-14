import { call, put, select, takeLatest } from 'redux-saga/effects'
import EventsService from '../services/eventsService'

const eventsState = state => (state.cards.cards.events)

function* updateEvents() {
	console.log('updateEvents---------------------------------------------------------38')
	const { active } = yield select(eventsState)
	if (active) {
		const events = yield call(EventsService.FetchEvents)
		yield put({ type: 'SET_EVENTS', events })
	}
}

function* eventsSaga() {
	yield takeLatest('UPDATE_EVENTS', updateEvents)
}

export default eventsSaga