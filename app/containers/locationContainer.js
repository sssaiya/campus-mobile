import React from 'react'
import GPSState from 'react-native-gps-state'
import { connect } from 'react-redux'

class LocationContainer extends React.Component {
	async componentDidMount() {
		const { updateLocationStatus } = this.props
		// Get the current GPS state
		GPSState.getStatus().then((status) => {
			this.setLocationStatus(status, updateLocationStatus)
		})
		// Listen for changes to the GPS state
		GPSState.addListener((status) => {
			this.setLocationStatus(status, updateLocationStatus)
		})
	}

	componentWillUnmount() {
		GPSState.removeListener()
	}

	setLocationStatus = (status, updateLocationStatus) => {
		const locationIsOff = 1

		switch (status) {
			case locationIsOff:
				updateLocationStatus(false)
				break
			case GPSState.NOT_DETERMINED:
				break
			case GPSState.RESTRICTED:
				updateLocationStatus(false)
				break
			case GPSState.DENIED:
				updateLocationStatus(false)
				break
			case GPSState.AUTHORIZED_ALWAYS:
				updateLocationStatus(true)
				break
			case GPSState.AUTHORIZED_WHENINUSE:
				updateLocationStatus(true)
				break
		}
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
		}
	}
)

module.exports = connect(mapStateToProps, mapDispatchToProps)(LocationContainer)
