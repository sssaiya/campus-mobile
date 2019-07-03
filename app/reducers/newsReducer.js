const initialState = {
	data: null,
	lastUpdated: null,
}

function news(state = initialState, action) {
	const newState = { ...state }
	newState.lastUpdated = new Date().getTime()

	switch (action.type) {
		case 'SET_NEWS':
			newState.data = action.newsData
			return newState
		default:
			return state
	}
}

module.exports = news
