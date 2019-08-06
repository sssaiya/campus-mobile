const initialState = {
	data: null,
	lastUpdated: new Date().getTime(),
	staredEventIds: [],
}

function events(state = initialState, action) {
	const newState = { ...state }

	switch (action.type) {
		case 'SET_EVENTS': {
			newState.data = action.parsedEvents
			newState.lastUpdated = new Date().getTime()
			return newState
		}
		case 'CLEAR_STARED_EVENTS': {
			newState.staredEventIds = []
			return newState
		}
		case 'TOGGLE_STAR_ID': {
			let temp = [...state.staredEventIds]
			let tempData = [...state.data]
			const tempStarData = []
			const tempUnstaredData = []
			tempData = tempData.slice()
			if (temp.includes(action.eventId)) {
				temp = temp.filter(e => e !== action.eventId)
			} else {
				temp.push(action.eventId)
			}
			tempData.forEach((element) => {
				if (temp.includes(element.id)) {
					tempStarData.push({
						...element,
						stared: temp.includes(element.id)
					})
				} else {
					tempUnstaredData.push({
						...element,
						stared: temp.includes(element.id)
					})
				}
			})
			tempData = tempStarData.concat(tempUnstaredData)
			newState.staredEventIds = [...temp]
			newState.data = [...tempData]
			return newState
		}
		default:
			return state
	}
}

module.exports = events
