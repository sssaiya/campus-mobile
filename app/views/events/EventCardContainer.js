import React, { Component } from 'react'
import { connect } from 'react-redux'
import DataListCard from '../common/DataListCard'

export class EventCardContainer extends Component {
	_onStarPress = (eventId) => {
		const { toggleEventStar } = this.props
		toggleEventStar(eventId)
	}

	render() {
		return (
			<DataListCard
				id="events"
				title="Events"
				data={this.props.eventsData}
				onStarPress={this._onStarPress}
				item="EventItem"
			/>
		)
	}
}

const mapStateToProps = state => ({
	eventsData: state.events.data,
})

const mapDispatchToProps = dispatch => (
	{
		toggleEventStar: (eventId) => {
			dispatch({ type: 'TOGGLE_STAR_ID', eventId })
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(EventCardContainer)
