const initialState = {
	selectedSpotIds: [0, 1, 2],
	parkingData: [],
	selectedLots: ['Osler'],
	showWarning: false,
	lastUpdated: null,
}

function parking(state = initialState, action) {
	const newState = { ...state }
	switch (action.type) {
		case 'REMOVE_PARKING_SPOT_TYPE': {
			let temp = [...state.selectedSpotIds]
			temp = temp.filter(e => e !== action.spotTypeId)
			newState.selectedSpotIds = [...temp]
			return newState
		}
		case 'ADD_PARKING_SPOT_TYPE': {
			const temp = [...state.selectedSpotIds]
			if (!temp.includes(action.spotTypeId)) temp.push(action.spotTypeId)
			newState.selectedSpotIds = [...temp]
			return newState
		}
		case 'SET_PARKING_DATA': {
			newState.parkingData = [...action.newParkingData]
			newState.lastUpdated = new Date().getTime()
			return newState
		}
		case 'SET_PARKING_SPOT_DATA': {
			newState.parkingSpotData = [...action.newParkingSpotData]
			newState.lastUpdated = new Date().getTime()
			return newState
		}
		case 'SET_WARNING_SIGN': {
			newState.showWarning = action.showWarning
			return newState
		}
		case 'SET_PARKING_LOT_SELECTION': {
			let temp = [...state.selectedLots]
			if (action.add) {
				temp.push(action.name)
			} else {
				temp = temp.filter(e => e !== action.name)
			}
			newState.selectedLots = [...temp]
			return newState
		}
		case 'SYNC_PARKING_LOTS_DATA': {
			newState.selectedLots = [...action.prevSelectedParkingLots]
			return newState
		}
		case 'SYNC_PARKING_SPOT_DATA': {
			newState.selectedSpotIds = [...action.prevSelectedPakingSpotIds]
			return newState
		}
		default:
			return state
	}
}

module.exports = parking
