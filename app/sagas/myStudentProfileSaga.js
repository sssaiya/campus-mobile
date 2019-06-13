import { all, call, put, select, takeLatest, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import logger from '../util/logger'
import { TIMEOUT_LONG } from '../AppSettings'
import StudentIDService from '../services/studentIDService'

const getUserData = state => (state.user)
const studentIdCardActive = state => (state.cards.cards.studentId.active)

function* updateStudentProfile() {
	const { isLoggedIn, profile } = yield select(getUserData)
	const studentIdCardActiveState = yield select(studentIdCardActive)

	if (isLoggedIn && profile.classifications.student && studentIdCardActiveState) {
		const fetchArray = [
			put({ type: 'GET_STUDENT_BARCODE_REQUEST' }),
			put({ type: 'GET_STUDENT_PROFILE_REQUEST' }),
			put({ type: 'GET_STUDENT_PHOTO_REQUEST' }),
			put({ type: 'GET_STUDENT_NAME_REQUEST' })
		]
		yield all(fetchArray)
	}
}

function* fetchStudentBarcode() {
	try {
		const { response, timeout } = yield race({
			response: call(StudentIDService.FetchStudentBarcode),
			timeout: call(delay, TIMEOUT_LONG)
		})

		if (timeout) {
			const e = new Error('Request timed out.')
			throw e
		} else if (JSON.parse(response)) {
			const studentBarcode = JSON.parse(response)
			yield put({ type: 'SET_STUDENT_BARCODE', barcode: studentBarcode })
			yield put({ type: 'GET_STUDENT_BARCODE_SUCCESS' })
		}
	} catch (error) {
		yield put({ type: 'GET_STUDENT_PHOTO_FAILURE', error })
		logger.trackException(error)
	}
}
function* fetchStudentPhoto() {
	try {
		const { response, timeout } = yield race({
			response: call(StudentIDService.FetchStudentPhoto),
			timeout: call(delay, TIMEOUT_LONG)
		})

		if (timeout) {
			const e = new Error('Request timed out.')
			throw e
		} else if (JSON.parse(response)) {
			const image = JSON.parse(response)
			yield put({ type: 'SET_STUDENT_PHOTO', image })
			yield put({ type: 'GET_STUDENT_PHOTO_SUCCESS' })
		}
	} catch (error) {
		yield put({ type: 'GET_STUDENT_PHOTO_FAILURE', error })
		logger.trackException(error)
	}
}
function* fetchStudentName() {
	try {
		const { response, timeout } = yield race({
			response: call(StudentIDService.FetchStudentName),
			timeout: call(delay, TIMEOUT_LONG)
		})

		if (timeout) {
			const e = new Error('Request timed out.')
			throw e
		} else if (JSON.parse(response)) {
			const name = JSON.parse(response)
			yield put({ type: 'SET_STUDENT_NAME', name })
			yield put({ type: 'GET_STUDENT_NAME_SUCCESS' })
		}
	} catch (error) {
		yield put({ type: 'GET_STUDENT_PHOTO_FAILURE', error })
		logger.trackException(error)
	}
}
function* fetchStudentProfile() {
	try {
		const { response, timeout } = yield race({
			response: call(StudentIDService.FetchStudentProfile),
			timeout: call(delay, TIMEOUT_LONG)
		})

		if (timeout) {
			const e = new Error('Request timed out.')
			throw e
		} else if (JSON.parse(response)) {
			const studentProfile = JSON.parse(response)
			yield put({ type: 'SET_STUDENT_PROFILE', profile: studentProfile })
			yield put({ type: 'GET_STUDENT_PROFILE_SUCCESS' })
		}
	} catch (error) {
		yield put({ type: 'GET_STUDENT_PROFILE_FAILURE', error })
		logger.trackException(error)
	}
}
function* myStudentProfileSaga() {
	yield takeLatest('UPDATE_STUDENT_PROFILE', updateStudentProfile)
	yield takeLatest('GET_STUDENT_PROFILE_REQUEST', fetchStudentProfile)
	yield takeLatest('GET_STUDENT_NAME_REQUEST', fetchStudentName)
	yield takeLatest('GET_STUDENT_BARCODE_REQUEST', fetchStudentBarcode)
	yield takeLatest('GET_STUDENT_PHOTO_REQUEST', fetchStudentPhoto)
}

export default myStudentProfileSaga

