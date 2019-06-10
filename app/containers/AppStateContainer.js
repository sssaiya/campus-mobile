import React from 'react'
import { AppState } from 'react-native'
import { connect } from 'react-redux'

class AppStateContainer extends React.Component {
	state = {
		appState: AppState.currentState
	}

	componentDidMount() {
		AppState.addEventListener('change', this.handleAppStateChange)
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange)
	}

	handleAppStateChange = (nextAppState) => {
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
			console.log('APP STATE CHANGE: current: ' + this.state.appState + ', next: ' + nextAppState)
			// Update Cards
			this.props.updateDining()
			this.props.updateEvents()
			this.props.updateLinks()
			this.props.updateNews()
			this.props.updateParking()
			this.props.updateWeather()
			// Update Notifications
			this.props.updateMessages(new Date().getTime())
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
	updateWeather: () => { dispatch({ type: 'UPDATE_WEATHER' }) },
	// Notifications
	updateMessages: () => { dispatch({ type: 'UPDATE_MESSAGES' }) },
})

module.exports = connect(null, mapDispatchToProps)(AppStateContainer)
