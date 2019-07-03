import React from 'react'
import { AppState } from 'react-native'
import { connect } from 'react-redux'

class AppStateContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			appState: AppState.currentState,
		}
	}

	componentDidMount() {
		AppState.addEventListener('change', this.handleAppStateChange)
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange)
	}

	handleAppStateChange = (nextAppState) => {
		console.log('\n## nextAppState: ' + nextAppState)
		// Executes when the app renders in the foreground
		if (this.state.appState === 'background' && nextAppState === 'active') {
			console.log('\n## App State Change - OPENED')
			this.updateProfile()
			this.watchLocation()
		}

		// Executes when the app is minimized or closed
		if (this.state.appState === 'active' && nextAppState === 'background') {
			console.log('\n## App State Change - CLOSED')
			// TODO: revisit
			this.updateProfile()
			this.unwatchLocation()
		}

		this.setState({ appState: nextAppState })
	}

	/*
	updateCards() {
		console.log('## AppStateContainer: updateCards')
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
		console.log('## AppStateContainer: updateMessages')
		this.props.updateMessages(new Date().getTime())
	}
	*/

	updateProfile() {
		console.log('## AppStateContainer: updateProfile')
		this.props.syncUserProfile()
	}

	watchLocation() {
		this.watchPositionId = navigator.geolocation.watchPosition(
			(position) => {
				console.log('\n## watchLocation: lat: ' + position.coords.latitude + ', lon:' + position.coords.longitude)
				if (position.coords.latitude && position.coords.longitude) {
					const newPosition = {
						coords: {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
						}
					}
					this.props.updatePosition(newPosition)
					this.props.updateShuttleClosestStop()
					this.props.updateDiningDistance()
				} else {
					const noPosition = {
						coords: {
							latitude: null,
							longitude: null
						}
					}
					this.props.updatePosition(noPosition)
				}
			},
			(error) => {
				console.log('\n\n## watchLocation: errorlat:')
				console.log(error)
				console.log('## setting coords.latitude and coords.longitude to null')
				const noPosition = {
					coords: {
						latitude: null,
						longitude: null
					}
				}
				this.props.updatePosition(noPosition)
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
				distanceFilter: 50
			},
		)

		console.log('## watchLocation id: ' + this.watchPositionId)
	}

	unwatchLocation() {
		navigator.geolocation.clearWatch(this.watchPositionId)
	}


	render() {
		return null
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	// Cards
	/*
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
	*/
	// Notifications
	// updateMessages: () => { dispatch({ type: 'UPDATE_MESSAGES' }) },
	// User Profile Sync
	syncUserProfile: () => { dispatch({ type: 'SYNC_USER_PROFILE' }) },
	// Location
	updatePosition: (position) => { dispatch({ type: 'SET_POSITION', position }) },
	updateShuttleClosestStop: () => { dispatch({ type: 'UPDATE_SHUTTLE_CLOSEST_STOP' }) },
	updateDiningDistance: () => { dispatch({ type: 'UPDATE_DINING_DISTANCE' }) },
})

export default connect(null, mapDispatchToProps)(AppStateContainer)
