import React, { Component } from 'react'
import { connect } from 'react-redux'
import DataListView from '../common/DataListView'

class EventDataListView extends Component {
	_onStarPress = (eventId) => {
		const { toggleEventStar } = this.props
		toggleEventStar(eventId)
	}

	render() {
		return (
			<DataListView
				data={this.props.eventsData}
				scrollEnabled={false}
				item="EventItem"
				card={false}
				onStarPress={this._onStarPress}
			/>
		)
	}
}

const mapStateToProps = state => ({
	eventsData: state.events.data
})

const mapDispatchToProps = dispatch => (
	{
		toggleEventStar: (eventId) => {
			dispatch({ type: 'TOGGLE_EVENT', eventId })
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(EventDataListView)