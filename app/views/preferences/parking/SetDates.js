import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import css from '../../../styles/css'
import COLOR from '../../../styles/ColorConstants'
import LAYOUT from '../../../styles/LayoutConstants'

class SetDates extends Component {
	constructor(props) {
		super(props)

		const { daysSelected } = this.props
		console.log(daysSelected)
		const tempArray  = [false, false, false, false, false, false, false]
		for (let i = 0; i < 7; i++) {
			switch (i) {
				case 0:
					if (daysSelected[i]) tempArray[i] = true
					break
				case 1:
					if (daysSelected[i]) tempArray[i] = true
					break
				case 2:
					if (daysSelected[i]) tempArray[i] = true
					break
				case 3:
					if (daysSelected[i]) tempArray[i] = true
					break
				case 4:
					if (daysSelected[i]) tempArray[i] = true
					break
				case 5:
					if (daysSelected[i]) tempArray[i] = true
					break
				case 6:
					if (daysSelected[i]) tempArray[i] = true
					break
			}
		}

		this.state = {
			daysSelected: tempArray
		}
	}

	confirmDays(confirmation) {
		const { daysSelected } = this.state
		const { updateDaysSelected } = this.props

		updateDaysSelected(daysSelected)
	}

	touchDay(i) {
		const { daysSelected } = this.state
		const tempArray = [...daysSelected]
		tempArray[i] = !tempArray[i]
		this.setState({
			daysSelected: tempArray
		})
	}

	renderDays(selected, i) {
		if (selected) {
			return(
				<View style={[css.notifications_set_date_selected_circle,css.notifications_set_date_each_day]}>
					<Text style={css.notifications_set_date_selected_textstyle}>{i}</Text>
				</View>
			)
		}
		else {
			return(
				<View style={[css.notifications_set_date_unselected_circle,css.notifications_set_date_each_day]}>
					<Text style={css.notifications_set_date_unselected_textstyle}>{i}</Text>
				</View>
			)
		}
	}

	/**
	There is a neater way to write this function, will be added after MVP is released
	*/
	render() {
		const { daysSelected } = this.state
		const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
		return (
			<View>
				<View style={css.notifications_set_date_blue_container}>
					<Text style={css.notifications_set_date_setdays_text}>Set Days</Text>
				</View>
				<View style={css.notifications_set_date_white_container}>
					<View style={css.notifications_set_date_days}>
						{daysSelected.slice(0,4).map((item, index) => (
							<TouchableWithoutFeedback onPress={() => {
								this.touchDay(index)
							}}
							>
								{this.renderDays(item,days[index])}
							</TouchableWithoutFeedback>))}
					</View>
					<View style={css.notifications_set_date_days}>
						{daysSelected.slice(4,7).map((item, index) => (
							<TouchableWithoutFeedback onPress={() => {
								this.touchDay(index+4)
							}}
							>
								{this.renderDays(item,days[index + 4])}
							</TouchableWithoutFeedback>))}
					</View>
					<View style={css.notifications_set_date_confirm_options}>
						<TouchableWithoutFeedback onPress={this.props.onTouch}>
							<Text style={css.notifications_set_date_cancel_text}>CANCEL</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => {
							this.confirmDays()
							this.props.onTouch() }}
						>
							<Text style={css.notifications_set_date_confirm_text}>OK</Text>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	daysSelected: state.notifications.daysSelected
})

const mapDispatchToProps = dispatch => ({
	updateDaysSelected: (daysSelected) => {
		dispatch({ type: 'SET_PARKING_DAYS', daysSelected })
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(SetDates)
