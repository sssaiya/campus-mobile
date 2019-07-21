import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DataListCard from '../common/DataListCard'
import { militaryToAMPM } from '../../util/general'


export class EventCardContainer extends Component {
	componentWillMount() {
		const { eventsData, staredEventIds } = this.props
		if (Array.isArray(eventsData)) {
			const parsedEventsData = this.parseEventData(eventsData, staredEventIds)
			this.setState({ parsedEventsData })
		}
	}

	componentWillReceiveProps(nextProps) {
		const { eventsData, staredEventIds } = nextProps
		if (Array.isArray(eventsData)) {
			const parsedEventsData = this.parseEventData(eventsData, staredEventIds)
			this.setState({ parsedEventsData, staredEventIds })
		}
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.staredEventIds !== nextProps.staredEventIds) {
			return true
		} else {
			return false
		}
	}

	parseEventData = ( eventsData, staredEventIds) => {
		const parsedEventsData = eventsData.slice()
		parsedEventsData.forEach((element, index) => {
			parsedEventsData[index] = {
				...element,
				subtext: moment(element.eventdate).format('MMM Do') + ', ' + militaryToAMPM(element.starttime) + ' - ' + militaryToAMPM(element.endtime),
				image: element.imagethumb,
				stared: staredEventIds.includes(element.id)
			}
		})
		return parsedEventsData
	}

	_onStarPress = (eventId) => {
		const { staredEventIds, unStarEvent, starEvent } = this.props
		console.log('Beep')
		if (staredEventIds.includes(eventId)) {
			unStarEvent(eventId)
		} else {
			starEvent(eventId)
		}
	}

	render() {
		return (
			<DataListCard
				id="events"
				title="Events"
				data={this.state.parsedEventsData}
				onStarPress={this._onStarPress}
				item="EventItem"
			/>
		)
	}
}

const mapStateToProps = state => ({
	eventsData: state.events.data,
	staredEventIds: state.events.staredEventIds
})

const mapDispatchToProps = dispatch => (
	{
		starEvent: (eventId) => {
			dispatch({ type: 'STAR_EVENT', eventId })
		},
		unStarEvent: (eventId) => {
			dispatch({ type: 'UNSTAR_EVENT', eventId })
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(EventCardContainer)
