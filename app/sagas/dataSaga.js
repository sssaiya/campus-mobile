import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import {
	DATA_SAGA_TTL,
} from '../AppSettings'

function* watchData() {
	while (true) {
		try {
			console.log('watchData')
			// resides in scheduleSaga.js
			// called by: dataSaga.js, userSaga.js
			yield put({ type: 'UPDATE_SCHEDULE' })

			// resides in myStudentProfileSaga.js
			// called by: dataSaga.js, userSaga.js, StudentIDCardContainer.js
			yield put({ type: 'UPDATE_STUDENT_PROFILE' })

			// resides in userSaga.js
			// called by dataSaga.js
			yield put({ type: 'SYNC_USER_PROFILE' })
		} catch (err) {
			console.log(err)
		}
		yield delay(DATA_SAGA_TTL)
	}
}

function* dataSaga() {
	yield call(watchData)
}

export default dataSaga
