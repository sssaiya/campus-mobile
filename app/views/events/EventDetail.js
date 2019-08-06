import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventDetailPage from './EventDetailPage'

class EventDetail extends Component {
	_onStarPress = (eventId) => {
		const { toggleEventStar } = this.props
		toggleEventStar(eventId)
	}

	render() {
		const { id } = this.props.navigation.state.params.data
		const { eventsData } = this.props
		let data = { }
		const slicedEventsData = eventsData.slice()
		slicedEventsData.forEach((element) => {
			if (element.id === id) {
				data = element
			}
		})

		return (
			<EventDetailPage
				data={data}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
