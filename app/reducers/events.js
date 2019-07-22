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
		case 'TOGGLE_STAR_ID': {
			let temp = [...state.staredEventIds]
			let tempData = [...state.data]
			tempData = tempData.slice()
			if (temp.includes(action.eventId)) {
				temp = temp.filter(e => e !== action.eventId)
			} else {
				temp.push(action.eventId)
			}
			tempData.forEach((element, index) => {
				tempData[index] = {
					...element,
					stared: temp.includes(element.id)
				}
			})
			newState.staredEventIds = [...temp]
			newState.data = [...tempData]
			return newState
		}
		default:
			return state
	}
}

module.exports = events
