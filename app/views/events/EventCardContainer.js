import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DataListCard from '../common/DataListCard'
import { militaryToAMPM } from '../../util/general'


export class EventCardContainer extends Component {
	componentWillMount() {
		const { eventsData } = this.props
		if (Array.isArray(eventsData)) {
			const parsedEventsData = eventsData.slice()
			parsedEventsData.forEach((element, index) => {
				parsedEventsData[index] = {
					...element,
					subtext: moment(element.eventdate).format('MMM Do') + ', ' + militaryToAMPM(element.starttime) + ' - ' + militaryToAMPM(element.endtime),
					image: element.imagethumb
				}
			})
			this.setState({ parsedEventsData })
		}
	}

	render() {
		return (
			<DataListCard
				id="events"
				title="Events"
				data={this.state.parsedEventsData}
				item="EventItem"
			/>
		)
	}
}

const mapStateToProps = state => (
	{ eventsData: state.events.data }
)

export default connect(mapStateToProps)(EventCardContainer)
