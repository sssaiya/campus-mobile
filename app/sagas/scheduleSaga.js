import { call, put, select, takeLatest } from 'redux-saga/effects'
import ScheduleService from '../services/scheduleService'
import schedule from '../util/schedule'
import logger from '../util/logger'

const getSchedule = state => (state.schedule)
const getUserData = state => (state.user)
const scheduleCardActive = state => (state.cards.cards.schedule.active)

// add updateFinals
function* updateSchedule() {
	
	console.log('updateSchedule-------------------')
	/*

	// const { currentTerm } = yield select(getSchedule)
	const { isLoggedIn, profile } = yield select(getUserData)
	const scheduleCardActiveState = yield select(scheduleCardActive)
	const currentTerm = yield call(ScheduleService.FetchTerm)

	console.log('currentTerm: ' + currentTerm)

	// To update schedule, the user must:
	// - be logged in
	// - be a currently enrolled student
	// - have the classes card set to `active` in card preferences
	if (isLoggedIn && profile.classifications.student && scheduleCardActiveState) {
		console.log('t1')
		try {
			yield put({ type: 'GET_SCHEDULE_REQUEST' })

			if (currentTerm && currentTerm.term_code !== 'inactive') {
				yield put({ type: 'SET_SCHEDULE_TERM', currentTerm })

				const scheduleData = yield call(ScheduleService.FetchSchedule, currentTerm.term_code)

				console.log(scheduleData)

				if (scheduleData) {
					yield put({ type: 'SET_SCHEDULE', schedule: scheduleData })
					yield put({ type: 'GET_SCHEDULE_SUCCESS' })
				}

				yield put({ type: 'UPDATE_SI_SESSIONS' })
				console.log('t3')
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

				console.log('t4')

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
			} else {
				console.log('Term inactive----------------')
				// There is no term
				const inactiveTerm = {
					term_name: 'No Term',
					term_code: 'inactive'
				}

				yield put({ type: 'SET_SCHEDULE_TERM', term: inactiveTerm })
				yield put({ type: 'SET_SCHEDULE', schedule: null })
				yield put({ type: 'HIDE_CARD', id: 'finals' })
				yield put({ type: 'GET_SCHEDULE_SUCCESS' })
			}
		} catch (error) {
			yield put({ type: 'GET_SCHEDULE_FAILURE', error })
			logger.trackException(error)
		}
	} else {
		console.log('\n\nupdateSchedule fail-------')
		console.log(isLoggedIn)
		console.log(profile.classifications.student)
		console.log(currentTerm)
		console.log(currentTerm.term_code)
		console.log(scheduleCardActiveState)
	}
	*/
}

function* scheduleSaga() {
	yield takeLatest('UPDATE_SCHEDULE', updateSchedule)
}

export default scheduleSaga
