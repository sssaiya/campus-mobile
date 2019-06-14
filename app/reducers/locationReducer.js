const initialState = {
	position: {
		coords: {
			latitude: null,
			longitude: null
		}
	}
}

function location(state = initialState, action) {
	const newState = { ...state }
	switch (action.type) {
		case 'SET_POSITION':
			newState.position = Object.assign({}, action.position)
			return newState
		case 'SET_PERMISSION':
			newState.permission = action.permission
			return newState
		default:
			return state
	}
}

module.exports = location
