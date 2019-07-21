const initialState = {
	data: null,
	lastUpdated: new Date().getTime(),
	staredEventIds: [],
}

function events(state = initialState, action) {
	const newState = { ...state }

	switch (action.type) {
		case 'SET_EVENTS': {
			newState.data = action.events
			newState.lastUpdated = new Date().getTime()
			return newState
		}
		case 'STAR_EVENT': {
			const temp  = [...state.staredEventIds]
			temp.push(action.eventId)
			newState.staredEventIds = [...temp]
			return newState
		}
		case 'UNSTAR_EVENT': {
			let temp  = [...state.staredEventIds]
			temp = temp.filter(e => e !== action.eventId)
			newState.staredEventIds = [...temp]
			return newState
		}
		default:
			return state
	}
}

module.exports = events
