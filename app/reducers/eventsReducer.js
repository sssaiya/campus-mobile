const initialState = {
	data: null,
	lastUpdated: null,
}

function events(state = initialState, action) {
	const newState = { ...state }
	newState.lastUpdated = new Date().getTime()

	switch (action.type) {
		case 'SET_EVENTS': {
			console.log('SET_EVENTS-----------------------')
			newState.data = action.eventsData
			return newState
		}
		default:
			return state
	}
}

module.exports = events
