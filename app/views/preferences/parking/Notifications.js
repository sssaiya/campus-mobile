import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
	Text,
	View,
	SectionList,
	Switch,
	LayoutAnimation,
	TouchableWithoutFeedback
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import css from '../../../styles/css'
import SetDatesContainer from './SetDatesContainer'

const jsonData = require('./Notifications.json')
// this is just an example of dummy data

class Notifications extends Component {
	constructor(props) {
		super(props)
		this.props = props

		// these for loops take data from the provided json example and set the sate of each slider
		// based on the property called active

		// for (var index in jsonData) {
		// 	for (var i in jsonData[index].data) {
		// 		var active = jsonData[index].data[i].active
		// 		this.changeState(i, active)
		// 	}
		// }
	}

	componentWillUpdate() {
		// Linear with easing
		const CustomLayoutLinear = {
			duration: 200,
			create: {
				type: LayoutAnimation.Types.linear,
				property: LayoutAnimation.Properties.opacity,
			},
			update: { type: LayoutAnimation.Types.curveEaseInEaseOut }
		}
		// Execute by calling before a state change
		LayoutAnimation.configureNext(CustomLayoutLinear)
	}

	changeState(index, value) {
		const { isActive, updateSelectedNotifications } = this.props
		const newState = [...isActive]
		newState[index] = value
		updateSelectedNotifications(newState)
	}

	renderRow(item, index, section) {
		const text = item.name
		const { id }  = item
		return (
			<View style={css.notifications_row_view}>
				<Text style={css.notifications_row_text}>
					{text}
				</Text>
				<View style={css.us_switchContainer}>
					<Switch
						onValueChange={value => this.changeState(id, value)}
						value={this.props.isActive[id]}
						style={css.notifications_switch}
					/>
				</View>
			</View>
		)
	}


	renderParkingRow(item, index, section) {
		const { id } = item
		const { selectedParking } = this.props

		if (selectedParking === id) {
			return this.renderSlectedParkingRow(item, index, section)
		}
		return this.renderUnselectedParkingRow(item, index, section)
	}

	renderUnselectedParkingRow(item, index, section) {
		const text = item.name
		const { id } = item
		const { updateParkingNotifications } = this.props
		return (
			<TouchableWithoutFeedback
				style={css.notifications_row_view}
				onPress={() => {
					updateParkingNotifications(id)
				}}
			>
				<View style={css.notifications_row_view}>
					{renderArrowIcon(false)}
					<Text style={css.notifications_row_text}>
						{text}
					</Text>
					<View style={css.us_switchContainer}>
						<Switch
							onValueChange={value => this.changeState(id, value)}
							value={this.props.isActive[id]}
							style={css.notifications_switch}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		)
	}

	renderSlectedParkingRow(item, index, section) {
		const text = item.name
		const { id } = item
		const { updateParkingNotifications, parkingStartTimes, parkingStopTimes } = this.props
		console.log(parkingStopTimes[1])
		return (
			<View>
				<TouchableWithoutFeedback
					style={css.notifications_row_view}
					onPress={() => {
						updateParkingNotifications(id)
					}}
				>
					<View style={css.notifications_parking_row_view}>
						{renderArrowIcon(true)}
						<Text style={css.notifications_selected_row_text}>
							{text}
						</Text>
						<View style={css.us_switchContainer}>
							<Switch
								onValueChange={value => this.changeState(id, value)}
								value={this.props.isActive[id]}
								style={css.notifications_switch}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
				<View style={css.notifications_parking_selected_row_text_container}>
					<Text style={css.notifications_row_text}>
						Start Time
					</Text>
					<DatePicker
						style={{ width: 50 }}
						customStyles={{ dateInput: { borderWidth: 0 } }}
						mode="time"
						confirmBtnText="confirm"
						cancelBtnText="cancel"
						showIcon={false}
						date={parkingStartTimes[0]}
					/>
				</View>
				<View style={css.notifications_parking_selected_row_text_container}>
					<Text style={css.notifications_row_text}>
						Stop Time
					</Text>
					<DatePicker
						style={{ width: 50 }}
						customStyles={{ dateInput: { borderWidth: 0 } }}
						mode="time"
						confirmBtnText="confirm"
						cancelBtnText="cancel"
						showIcon={false}
						data={parkingStopTimes[0]}
					/>
				</View>
				<View style={css.notifications_parking_selected_row_text_container}>
					<Text style={css.notifications_row_text}>
						Set Days
					</Text>
					<SetDatesContainer />
				</View>
			</View>
		)
	}

	render() {
		return (
			<View
				style={css.notifications_full_container}
			>
				<SectionList
					style={css.notifications_section_list}
					renderItem={({ item, index, section }) => ((section.title === 'Parking') ? this.renderParkingRow(item, index, section, this.props) : this.renderRow(item, index, section))}
					renderSectionHeader={({ section: { title } }) =>
						renderSectionHeader(title)
					}
					sections={jsonData}
					keyExtractor={item => item.id}
					ItemSeparatorComponent={renderSeparator}
					ListFooterComponent={renderSeparator}
					ListHeaderComponent={renderSeparator}
				/>
			</View>
		)
	}
}

const renderArrowIcon = (selected) => {
	if (selected) {
		return (
			<Icon
				name="chevron-down"
				size={10}
				style={css.links_arrow_icon}
			/>
		)
	}
	return (
		<Icon
			name="chevron-right"
			size={10}
			style={css.links_arrow_icon}
		/>
	)
}

const renderSectionHeader = title => (
	<View style={css.notifications_section_list_header_container}>
		<Text style={css.notifications_section_list_header_text}>{title}</Text>
		{renderSeparator}
	</View>
)
const renderSeparator = () => (
	<View
		style={css.notifications_section_list_separator}
	/>
)

const mapStateToProps = state => ({
	isActive: state.notifications.isActive,
	selectedParking: state.notifications.selectedParking,
	parkingStartTimes: state.notifications.parkingStartTimes,
	parkingStopTimes: state.notifications.parkingStopTimes
})


const mapDispatchToProps = dispatch => (
	{
		updateSelectedNotifications: (isActive) => {
			dispatch({ type: 'SET_NOTIFICATION_STATE', isActive })
		},
		updateParkingNotifications: (selectedParking) => {
			// HAVE TO GO CREATE THIS IN THE NOTIFCIATIONS REDUCER
			dispatch({ type: 'SET_PARKING_NOTIFICATION_STATE', selectedParking })
		},
		updateParkingStartTime: (parkingStartTime) => {
			dispatch({ type: 'SET_PARKING_START_TIME', parkingStartTime })
		},
		updateParkingStopTime: (parkingStopTime) => {
			dispatch({ type: 'SET_PARKING_STOP_TIME', parkingStopTime })
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Notifications))
