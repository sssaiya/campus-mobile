import React from 'react'
import SystemSetting from 'react-native-system-setting'
import { connect } from 'react-redux'

class LocationContainer extends React.Component {
	async componentDidMount() {
		const { updateLocationStatus, updateSortBy } = this.props
		SystemSetting.addLocationListener((enabled) => {
			updateLocationStatus(enabled)
			if (!enabled) {
				updateSortBy('A-Z')
			}
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
		},
		updateSortBy: (sortBy) => {
			dispatch({ type: 'SET_DINING_SORT', sortBy })
			dispatch({ type: 'REORDER_DINING' })
		}
	}
)

module.exports = connect(mapStateToProps, mapDispatchToProps)(LocationContainer)
