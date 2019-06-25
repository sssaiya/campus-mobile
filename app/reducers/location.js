const initialState = {
	position: {
		coords: {
			latitude: 32.88,
			longitude: -117.234
		}
	},
	permission: 'undetermined',
	enabled: true
}

function location(state = initialState, action) {
	const newState = { ...state }

	switch (action.type) {
		case 'SET_POSITION':
			newState.position = Object.assign({}, action.position)
			return newState
		case 'UPDATE_LOCATION_STATUS':
			newState.enabled = action.enabled
			return newState

		case 'SET_PERMISSION':
			newState.permission = action.permission
			return newState
	}

	return state
}

module.exports = location
