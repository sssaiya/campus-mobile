import { Image } from 'react-native'
import { put, select, call, takeLatest } from 'redux-saga/effects'
import SpecialEventsService from '../services/specialEventsService'

const getSpecialEvents = state => (state.specialEvents)
const getCards = state => (state.cards)

function* updateSpecialEvents() {
	const { saved } = yield select(getSpecialEvents)
	const { cards } = yield select(getCards)
	const nowTime = new Date().getTime()

	if (Array.isArray(saved)) {
		const specialEvents = yield call(SpecialEventsService.FetchSpecialEvents)

		if (specialEvents && specialEvents['start-time'] <= nowTime && specialEvents['end-time'] >= nowTime) {
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


function* addSpecialEvents(action) {
	const specialEvents = yield select(getSpecialEvents)

	if (Array.isArray(specialEvents.saved)) {
		const saved = specialEvents.saved.slice()
		const { schedule } = specialEvents.data
		let contains = false
		let addIndex = 0
		// Make sure stop hasn't already been saved
		for (let i = 0;  i < saved.length; ++i) {
			if (saved[i] === action.id) {
				contains = true
				break
			}
			// figure out where to insert with respect to start time
			if (schedule[action.id]['start-time'] > schedule[saved[i]]['start-time']) {
				addIndex = i + 1
			}
		}
		if (!contains) {
			yield put({
				type: 'CHANGED_SPECIAL_EVENTS_SAVED',
				saved: [
					...saved.slice(0, addIndex),
					action.id,
					...saved.slice(addIndex)
				]
			})
		}
	}
}

function* removeSpecialEvents(action) {
	const specialEvents = yield select(getSpecialEvents)

	if (Array.isArray(specialEvents.saved)) {
		const saved = specialEvents.saved.slice()
		for (let i = 0; i < saved.length; ++i) {
			if (saved[i] === action.id) {
				saved.splice(i, 1)
				break
			}
		}
		yield put({ type: 'CHANGED_SPECIAL_EVENTS_SAVED', saved })
	}
}

function* updateLabels(action) {
	const { labels } = action
	yield put({ type: 'CHANGED_SPECIAL_EVENTS_LABELS', labels })
}

function* specialEventsSaga() {
	yield takeLatest('UPDATE_SPECIAL_EVENTS', updateSpecialEvents)
	yield takeLatest('UPDATE_SPECIAL_EVENTS_LABELS', updateLabels)
	yield takeLatest('ADD_SPECIAL_EVENTS', addSpecialEvents)
	yield takeLatest('REMOVE_SPECIAL_EVENTS', removeSpecialEvents)
}

export default specialEventsSaga
