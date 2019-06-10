import { call, put, select, takeLatest } from 'redux-saga/effects'
import ParkingService from '../services/parkingService'

const parkingStateState = state => (state.cards.cards.parking)
const parkingDataState = state => (state.parking)
const userDataState = state => (state.user)

function* updateParking() {
	const { active } = yield select(parkingStateState)
	if (active) {
		const parkingData = yield select(parkingDataState)
		const newParkingData = yield call(ParkingService.FetchParking)
		newParkingData.sort(sortByOldParkingData(parkingData.parkingData))
		yield put({ type: 'SET_PARKING', parkingData: newParkingData })

		// get previously selected lots from synced user profile
		const userData = yield select(userDataState)
		const prevSelectedParkingLots = userData.profile.selectedLots
		if (prevSelectedParkingLots) {
			yield put({ type: 'SYNC_PARKING_LOTS_DATA', prevSelectedParkingLots })
		}
	}
}

// comparator function to sort all the parking lots in the same order as a parking data structure which is passed in
function sortByOldParkingData(parkingData) {
	return function (a, b) {
		return parkingData.findIndex(x => x.LocationName === a.LocationName) - parkingData.findIndex(x => x.LocationName === b.LocationName)
	}
}

function* updateParkingLotSelection(action) {
	yield* setLocalParkingLotSelections(action.name, action.add)
	yield* syncLocalLotsSelection()
}

// add is a boolean that determins if we are unselcting the parking lot or selecting it
function* setLocalParkingLotSelections(name, add) {
	yield put({ type: 'SET_PARKING_LOT_SELECTION', name, add })
}

function* syncLocalLotsSelection() {
	const { selectedLots } = yield select(parkingDataState)
	const profileItems = { selectedLots }
	yield put({ type: 'MODIFY_LOCAL_PROFILE', profileItems })
}

function* parkingSaga() {
	yield takeLatest('UPDATE_PARKING', updateParking)
	yield takeLatest('UPDATE_PARKING_LOT_SELECTIONS', updateParkingLotSelection)
}

export default parkingSaga
