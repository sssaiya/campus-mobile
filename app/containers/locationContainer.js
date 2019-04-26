import React from 'react'
import SystemSetting from 'react-native-system-setting'
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
					console.log('Please, allow the location, for us to do amazing things for you!')
					break

				case GPSState.RESTRICTED:
					GPSState.openLocationSettings()
					break

				case GPSState.DENIED:
					console.log('It`s a shame that you do not allowed us to use location :(')
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
