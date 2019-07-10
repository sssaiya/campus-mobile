import { put, takeLatest, select } from 'redux-saga/effects'

const getParkingData = state => (state.parking)

function* updateParkingLotSelection(action) {
	yield* setLocalParkingLotSelections(action.lotID, action.add)
	yield* syncLocalLotsSelection()
}

// add is a boolean that determins if we are unselcting the parking lot or selecting it
function* setLocalParkingLotSelections(lotID, add) {
	yield put({ type: 'SET_PARKING_LOT_SELECTION', lotID, add })
}

function* syncLocalLotsSelection() {
	const { selectedLots } = yield select(getParkingData)
	const profileItems = { selectedLots }
	yield put({ type: 'MODIFY_LOCAL_PROFILE', profileItems })
}

function* parkingSaga() {
	yield takeLatest('UPDATE_PARKING_LOT_SELECTIONS', updateParkingLotSelection)
}

export default parkingSaga
