import React from 'react'
import { AppState } from 'react-native'
import { connect } from 'react-redux'

class AppStateContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = { appState: AppState.currentState }
		this.updateCards()
		this.updateMessages()
	}

	componentDidMount() {
		AppState.addEventListener('change', this.handleAppStateChange)
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange)
	}

	updateCards() {
		console.log('AppStateContainer: updateCards: ---------------')
		this.props.updateDining()
		this.props.updateEvents()
		this.props.updateLinks()
		this.props.updateNews()
		this.props.updateParking()
		this.props.updateSchedule()
		this.props.updateShuttle()
		this.props.updateShuttleArrivals()
		this.props.updateSpecialEvents()
		this.props.updateStudentProfile()
		this.props.updateWeather()
	}

	updateMessages() {
		console.log('AppStateContainer: updateMessages: ---------------')
		this.props.updateMessages(new Date().getTime())
	}

	handleAppStateChange = (nextAppState) => {
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
			console.log('APP STATE CHANGE: current: ' + this.state.appState + ', next: ' + nextAppState)
			this.updateCards()
			this.updateMessages()
		}
		this.setState({ appState: nextAppState })
	}

	render() {
		return null
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	// Cards
	updateDining: () => { dispatch({ type: 'UPDATE_DINING' }) },
	updateEvents: () => { dispatch({ type: 'UPDATE_EVENTS' }) },
	updateLinks: () => { dispatch({ type: 'UPDATE_LINKS' }) },
	updateNews: () => { dispatch({ type: 'UPDATE_NEWS' }) },
	updateParking: () => { dispatch({ type: 'UPDATE_PARKING' }) },
	updateSchedule: () => { dispatch({ type: 'UPDATE_SCHEDULE' }) },
	updateShuttle: () => { dispatch({ type: 'UPDATE_SHUTTLE' }) },
	updateShuttleArrivals: () => { dispatch({ type: 'UPDATE_SHUTTLE_ARRIVALS' }) },
	updateSpecialEvents: () => { dispatch({ type: 'UPDATE_SPECIAL_EVENTS' }) },
	updateStudentProfile: () => { dispatch({ type: 'UPDATE_STUDENT_PROFILE' }) },
	updateWeather: () => { dispatch({ type: 'UPDATE_WEATHER' }) },
	// Notifications
	updateMessages: () => { dispatch({ type: 'UPDATE_MESSAGES' }) },
})

export default connect(null, mapDispatchToProps)(AppStateContainer)
