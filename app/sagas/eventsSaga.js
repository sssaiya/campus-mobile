import { call, put, select, takeLatest } from 'redux-saga/effects'
import EventsService from '../services/eventsService'

const eventsState = state => (state.cards.cards.events)

function* updateEvents() {
	const { active } = yield select(eventsState)
	if (active) {
		// Events card is active, fetch and update new events data
		const events = yield call(EventsService.FetchEvents)
		yield put({ type: 'SET_EVENTS', events })
	}
}

function* eventsSaga() {
	yield takeLatest('UPDATE_EVENTS', updateEvents)
}

export default eventsSaga