import { call, put, select, takeLatest } from 'redux-saga/effects'
import EventsService from '../services/eventsService'

const eventsState = state => (state.cards.cards.events)

const updateEvents = function* () {
	const { active } = yield select(eventsState)

	if (active) {
		// Events card is active, fetch and update new events data
		console.log('eventsSaga:updateEvents:active')
		const events = yield call(EventsService.FetchEvents)
		console.log('data:' + events)
		yield put({ type: 'SET_EVENTS', events })
	}
}

function* eventsSaga() {
	yield takeLatest('UPDATE_EVENTS', updateEvents)
}

export default eventsSaga