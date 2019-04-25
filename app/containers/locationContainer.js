import React from 'react'
import RNLocation from 'react-native-location'
import { connect } from 'react-redux'

class LocationContainer extends React.Component {
	async componentDidMount() {
		const { updateLocationStatus, updateDiningSort } = this.props
		const settings = {
			distanceFilter: 100, // Meters
			desiredAccuracy: {
				ios: 'best',
				android: 'balancedPowerAccuracy'
			}
		}
		RNLocation.configure(settings)
		// Subscribe
		const unsubscribe = RNLocation.subscribeToLocationUpdates((locations) => {
			console.log(locations)
		})
	}

	componentWillUnmount() {
		this.onTokenRefreshListener()
		this.messageListener()
	}

	render() {
		return null
	}
}

function mapStateToProps(state, props) {
	return { user: state.user }
}

const mapDispatchToProps = (dispatch, ownProps) => (
	{
		updateLocationStatus: (enabled) => {
			dispatch({ type: 'UPDATE_LOCATION_STATUS', enabled })
			dispatch({ type: 'UPDATE_DINING' })
			dispatch({ type: 'REORDER_DINING' })
		},
		updateDiningSort: (sortBy) => {
			dispatch({ type: 'SET_DINING_SORT', sortBy })
			dispatch({ type: 'REORDER_DINING' })
		}
	}
)

module.exports = connect(mapStateToProps, mapDispatchToProps)(LocationContainer)
