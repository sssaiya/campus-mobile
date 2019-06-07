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

			// Update Messages
			this.props.updateMessages(new Date().getTime())

			// Update Events
			this.props.updateEvents()
		}
		this.setState({ appState: nextAppState })
	}

	render() {
		return null
	}
}

const mapDispatchToProps = (dispatch, ownProps) => (
	{
		updateMessages: () => {
			dispatch({ type: 'UPDATE_MESSAGES' })
		},
		updateEvents: () => {
			dispatch({ type: 'UPDATE_EVENTS' })
		},
	}
)

module.exports = connect(null, mapDispatchToProps)(AppStateContainer)
