import React from 'react'
import { FlatList, View, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import moment from 'moment'
import css from '../../../../styles/css'
import Touchable from '../../../common/Touchable'
import SafeImage from '../../../common/SafeImage'
import { militaryToAMPM } from '../../../../util/general'

class EventsList extends React.Component {
	constructor(props) {
		super(props)
		this.state = { eventsData: this.parseEventData(props.eventsData) }
	}

	parseEventData = (eventsData) => {
		if (Array.isArray(eventsData)) {
			const parsedEventsData = eventsData.slice()
			parsedEventsData.forEach((element, index) => {
				parsedEventsData[index] = {
					...element,
					subtext: moment(element.eventdate).format('MMM Do') + ', ' + militaryToAMPM(element.starttime) + ' - ' + militaryToAMPM(element.endtime),
					image: element.imagethumb
				}
			})
			return parsedEventsData
		}
	}

	EventsListItem = (data) => {
		const { navigation } = this.props

		return (
			<Touchable
				onPress={() => { navigation.navigate('EventsDetail', { data }) }}
				style={css.dataitem_touchableRow}
			>
				<Text style={css.dataitem_titleText}>{data.title}</Text>
				<View style={css.dataitem_listInfoContainer}>
					<View style={css.dataitem_descContainer}>
						{data.description ? (
							<Text
								style={css.dataitem_descText}
								numberOfLines={2}
							>
								{data.description.trim()}
							</Text>
						) : null }
						<Text style={css.dataitem_dateText}>{data.subtext}</Text>
					</View>
					<SafeImage style={css.dataitem_image} source={{ uri: data.image }} />
				</View>
			</Touchable>
		)
	}

	render() {
		const { type } = this.props
		const MAX_ROWS = 3

		if (Array.isArray(this.state.eventsData)) {
			return (
				<FlatList
					style={css.scroll_default}
					data={type === 'card' ? this.state.eventsData.slice(0, MAX_ROWS) : this.state.eventsData}
					scrollEnabled={!(type === 'card')}
					keyExtractor={(item, index) => (item.id + index)}
					renderItem={({ item: rowData }) => this.EventsListItem(rowData)}
					ItemSeparatorComponent={() => (
						<View style={css.fl_separator} />
					)}
				/>
			)
		} else {
			return (
				<ActivityIndicator size="large" style={css.activity_indicator} />
			)
		}
	}
}

const mapStateToProps = state => ({
	eventsData: state.events.data
})

export default connect(mapStateToProps)(withNavigation(EventsList))
