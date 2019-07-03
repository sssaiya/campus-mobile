import { call, put, select, takeLatest } from 'redux-saga/effects'
import moment from 'moment'
import EventsService from '../services/eventsService'
import { militaryToAMPM } from '../util/general'

const eventsState = state => (state.cards.cards.events)

function* updateEvents() {
	const { active } = yield select(eventsState)
	if (active) {
		const eventsData = yield call(EventsService.FetchEvents)

		// TODO: move server side
		if (Array.isArray(eventsData)) {
			eventsData.forEach((element, index) => {
				eventsData[index] = {
					...element,
					subtext: moment(element.eventdate).format('MMM Do') + ', ' + militaryToAMPM(element.starttime) + ' - ' + militaryToAMPM(element.endtime),
					image: element.imagethumb
				}
			})
			yield put({ type: 'SET_EVENTS', eventsData })
		}
	}
}

function* eventsSaga() {
	yield takeLatest('UPDATE_EVENTS', updateEvents)
}

export default eventsSaga
