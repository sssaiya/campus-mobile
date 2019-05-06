import React from 'react'
import GPSState from 'react-native-gps-state'
import { connect } from 'react-redux'

const locationIsOff = 1
class LocationContainer extends React.Component {
	async componentDidMount() {
		const { updateLocationStatus } = this.props
		GPSState.addListener((status) => {
			switch (status) {
				case locationIsOff:
					updateLocationStatus(false)
					break
				case GPSState.NOT_DETERMINED:
					updateLocationStatus(false)
					break

				case GPSState.RESTRICTED:
					updateLocationStatus(false)
					GPSState.openLocationSettings()
					break

				case GPSState.DENIED:
					updateLocationStatus(false)
					break

				case GPSState.AUTHORIZED_ALWAYS:
					// this is for android
					updateLocationStatus(true)
					break

				case GPSState.AUTHORIZED_WHENINUSE:
					// this is for ios
					updateLocationStatus(true)
					break
			}
		})
	}

	componentWillUnmount() {
		GPSState.removeListener()
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
