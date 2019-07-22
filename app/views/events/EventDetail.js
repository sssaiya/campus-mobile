import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventDetailPage from './EventDetailPage'

class EventDetail extends Component {
	componentWillMount() {
		const { id } = this.props.navigation.state.params.data
		const { eventsData } = this.props
		this.findIndex(eventsData, id)
	}

	findIndex = (eventsData, eventId ) => {
		eventsData = eventsData.slice()
		eventsData.forEach((element, index) => {
			console.log(eventId)
			if (element.id === eventId) {
				this.setState({ index })
			}
		})
	}

	_onStarPress = (eventId) => {
		const { toggleEventStar } = this.props
		toggleEventStar(eventId)
	}

	render() {
		const { eventsData } = this.props
		const { index } = this.state
		return (
			<EventDetailPage
				data={eventsData[index]}
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
			dispatch({ type: 'TOGGLE_STAR_ID', eventId })
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
