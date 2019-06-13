import { call, put, select, takeLatest } from 'redux-saga/effects'
import ScheduleService from '../services/scheduleService'
import schedule from '../util/schedule'

// const getSchedule = state => (state.schedule)
const getUserData = state => (state.user)
const scheduleCardActive = state => (state.cards.cards.schedule.active)

// add updateFinals
function* updateSchedule() {
	try {
		yield put({ type: 'GET_SCHEDULE_REQUEST' })
		const { isLoggedIn, profile } = yield select(getUserData)
		const scheduleCardActiveState = yield select(scheduleCardActive)

		// To update schedule, the user must:
		// - be logged in
		// - be a currently enrolled student
		// - have the classes card set to `active` in card preferences

		// TODO: separate classes and finals
		if (isLoggedIn && profile.classifications.student && scheduleCardActiveState) {
			const currentTerm = yield call(ScheduleService.FetchTerm)
			if (currentTerm && currentTerm.term_code !== 'inactive') {
				const scheduleData = yield call(ScheduleService.FetchSchedule, currentTerm.term_code)
				yield put({ type: 'SET_SCHEDULE', schedule: scheduleData })
				yield put({ type: 'SET_SCHEDULE_TERM', term: currentTerm })
				yield put({ type: 'UPDATE_SI_SESSIONS' })

				// TODO: Refactor finals logic - nothing should happen if finals are inactive
				// check for finals
				const parsedScheduleData = schedule.getData(scheduleData)
				const finalsData = schedule.getFinals(parsedScheduleData)
				const finalsArray = []
				Object.keys(finalsData).forEach((day) => {
					if (finalsData[day].length > 0) {
						finalsArray.push({
							day,
							data: finalsData[day]
						})
					}
				})

				if (finalsArray.length > 0) {
					// check if finals are active
					yield put({ type: 'GET_FINALS_REQUEST' })
					try {
						const finalsActive = yield call(ScheduleService.FetchFinals)
						if (finalsActive) {
							yield put({ type: 'SHOW_CARD', id: 'finals' })
						} else {
							yield put({ type: 'HIDE_CARD', id: 'finals' })
						}
						yield put({ type: 'GET_FINALS_SUCCESS' })
					} catch (error) {
						yield put({ type: 'GET_FINALS_FAILURE', error })
						throw error
					}
				}
				yield put({ type: 'GET_SCHEDULE_SUCCESS' })
			} else {
				// There is no term
				// TODO: is inactiveTerm needed?
				const inactiveTerm = {
					term_name: 'No Term',
					term_code: 'inactive'
				}
				yield put({ type: 'SET_SCHEDULE_TERM', term: inactiveTerm })

				// If a previous term has ended
				// - clear that term's schedule data
				// - hide the finals card
				yield put({ type: 'SET_SCHEDULE', schedule: null })
				yield put({ type: 'HIDE_CARD', id: 'finals' })

				yield put({ type: 'GET_SCHEDULE_SUCCESS' })
			}
		} else {
			// TODO: revisit isLoggedIn && profile.classifications.student check
			yield put({ type: 'GET_SCHEDULE_SUCCESS' })
		}
	} catch (error) {
		yield put({ type: 'GET_SCHEDULE_FAILURE', error })
	}
}

function* scheduleSaga() {
	yield takeLatest('UPDATE_SCHEDULE', updateSchedule)
}

export default scheduleSaga
