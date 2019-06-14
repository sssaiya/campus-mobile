import React from 'react'
import { View, Text, AppState } from 'react-native'
import { connect } from 'react-redux'
// import { getDistance } from '../util/map'

class AppStateContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			appState: AppState.currentState,
			/*
			latitude: null,
			longitude: null,
			error: null,
			updates: 0,
			distanceFromLastUpdate: 0,
			avgDistance: 0,
			totalDistance: 0,
			*/
		}
	}

	componentDidMount() {
		AppState.addEventListener('change', this.handleAppStateChange)
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange)
	}

	handleAppStateChange = (nextAppState) => {
		// Executes when the app renders in the foreground
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
			console.log('\n## handleAppStateChange - OPENED')
			this.updateCards()
			this.updateMessages()
			this.updateProfile()
			this.watchLocation()
		}

		// Executes when the app is minimized or closed
		if (this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
			console.log('\n## handleAppStateChange - CLOSED')
			this.updateProfile()
			this.unwatchLocation()
		}

		this.setState({ appState: nextAppState })
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
		this.props.updateMessages(new Date().getTime())
	}

	updateProfile() {
		this.props.syncUserProfile()
	}

	watchLocation() {
		this.watchPositionId = navigator.geolocation.watchPosition(
			(position) => {
				console.log('\n\n## watchLocation: lat: ' + position.coords.latitude + ', lon:' + position.coords.longitude)
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

					/*
					const distanceDelta = getDistance(
						position.coords.latitude,
						position.coords.longitude,
						this.state.latitude,
						this.state.longitude
					)

					const totalDist = this.state.totalDistance + distanceDelta

					this.setState({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						error: null,
						updates: this.state.updates + 1,
						distanceFromLastUpdate: distanceDelta,
						totalDistance: totalDist,
						avgDistance: parseInt((totalDist / (this.state.updates + 1))),
					})
					*/
				} else {
					console.log('LatLon ERR------------###########')
				}
			},
			(error) => {
				console.log('\n\n## watchLocation: errorlat:')
				console.log(error)
				console.log('## setting coords.latitude and coords.longitude to null')
				const newPosition = {
					coords: {
						latitude: null,
						longitude: null
					}
				}
				this.props.updatePosition(newPosition)
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
		/*
		return (
			<View style={{ position: 'absolute', backgroundColor: 'white', borderTopWidth: 1, borderRightWidth: 1, padding: 8, bottom: 0, left: 0, marginBottom: 70, width: 300 }}>
				<Text>Latitude: {this.state.latitude}</Text>
				<Text>Longitude: {this.state.longitude}</Text>
				<Text>Updates: {this.state.updates}</Text>
				<Text>Distance: {this.state.distanceFromLastUpdate}</Text>
				<Text>Avg Distance: {this.state.avgDistance}</Text>
				<Text>Total Distance: {this.state.totalDistance}</Text>
				{this.state.error ? <Text>Error: {this.state.error}</Text> : null}
			</View>
		)
		*/
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
	// User Profile Sync
	syncUserProfile: () => { dispatch({ type: 'SYNC_USER_PROFILE' }) },
	// Location
	updatePosition: (position) => { dispatch({ type: 'SET_POSITION', position }) },
	updateShuttleClosestStop: () => { dispatch({ type: 'UPDATE_SHUTTLE_CLOSEST_STOP' }) },
	updateDiningDistance: () => { dispatch({ type: 'UPDATE_DINING_DISTANCE' }) },
})

export default connect(null, mapDispatchToProps)(AppStateContainer)
