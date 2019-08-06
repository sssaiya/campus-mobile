import { put, takeLatest, select, call } from 'redux-saga/effects'
import moment from 'moment'

import EventService from '../services/eventService'
import { militaryToAMPM } from '../util/general'
import { EVENTS_API_TTL } from '../AppSettings'

const getEvents = state => (state.events)
const getUserData = state => (state.user)

// Pass in the event ID
function* toggleEvent(action) {
	yield put({ type: 'TOGGLE_STAR_ID', eventId: action.eventId })
	const { staredEventIds } = yield select(getEvents)
	const profileItems = { staredEventIds }
	yield put({ type: 'MODIFY_LOCAL_PROFILE', profileItems })
}

function* clearEvents() {
	yield put({ type: 'CLEAR_STARED_EVENTS' })
	updateEvents()
}

function* updateEvents() {
	const { lastUpdated, data, staredEventIds } = yield select(getEvents)
	let eventIds = staredEventIds
	let events = data
	const nowTime = new Date().getTime()
	const timeDiff = nowTime - lastUpdated
	const ttl = EVENTS_API_TTL

	if (timeDiff < ttl && data) {
		// Do nothing, no need to fetch new data

	} else {
		// Fetch for new data
		events = yield call(EventService.FetchEvents)

		// If user is logged in
		const { isLoggedIn, profile } = yield select(getUserData)
		if (isLoggedIn) {
			if (profile.selectedEvents) {
				eventIds = profile.selectedEvents
			}
		}
	}

	// Parse events
	const parsedEvents = parseEventData(events, eventIds)
	yield put({ type: 'SET_EVENTS', parsedEvents })
}

function parseEventData( eventsData, staredEventIds) {
	let parsedEventsData = eventsData.slice()
	const tempStarData = []
	const tempUnstaredData = []
	parsedEventsData.forEach((element) => {
		const item = {
			...element,
			formattedDate: moment(element.eventdate).format('MMM Do') + ', ' + militaryToAMPM(element.starttime) + ' - ' + militaryToAMPM(element.endtime),
			image: element.imagethumb,
			stared: staredEventIds.includes(element.id)
		}
		if (staredEventIds.includes(element.id)) {
			tempStarData.push(item)
		} else {
			tempUnstaredData.push(item)
		}
	})
	parsedEventsData = tempStarData.concat(tempUnstaredData)
	return parsedEventsData
}

function* eventSaga() {
	yield takeLatest('TOGGLE_EVENT', toggleEvent)
	yield takeLatest('CLEAR_EVENTS', clearEvents)
	yield takeLatest('UPDATE_EVENTS', updateEvents)
}

export default eventSaga
