const initialState = { onboardingComplete: false }

function app(state = initialState, action) {
	const newState = { ...state }
	switch (action.type) {
		case 'SET_APP_ONBOARDING_COMPLETE': {
			newState.onboardingComplete = true
			return newState
		}
		default:
			return state
	}
}

module.exports = app