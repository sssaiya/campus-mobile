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
		for(let i = 0; i < 7; i++) {
			switch(i) {
				case 0:
					if(daysSelected[i]) tempArray[i] = true
					break
				case 1:
					if(daysSelected[i]) tempArray[i] = true
					break
				case 2:
					if(daysSelected[i]) tempArray[i] = true
					break
				case 3:
					if(daysSelected[i]) tempArray[i] = true
					break
				case 4:
					if(daysSelected[i]) tempArray[i] = true
					break
				case 5:
					if(daysSelected[i]) tempArray[i] = true
					break
				case 6:
					if(daysSelected[i]) tempArray[i] = true
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
				<View style={[styles.circle,{ justifyContent: 'center', alignItems: 'center', marginRight: 20, position: 'relative' }]}>
					<Text style={{ fontSize: 25, color: COLOR.WHITE }}>{i}</Text>
				</View>
			)
		}
		else {
			return(
				<View style={{ marginRight: 20 }}>
					<Text style={{ fontSize: 25, color: COLOR.DMGREY }}>{i}</Text>
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
				<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.PRIMARY, color: 'white', height: LAYOUT.WINDOW_WIDTH / 8, width: LAYOUT.WINDOW_WIDTH - 100 }}>
					<Text style={{ fontSize: 25, color: 'white' }}>Set Days</Text>
				</View>
				<View style={{ backgroundColor: 'white', width: LAYOUT.WINDOW_WIDTH - 100, height: LAYOUT.WINDOW_WIDTH / 2.5, justifyContent: 'center' }}>
					<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
						{daysSelected.slice(0,4).map((item, index) => (
							<TouchableWithoutFeedback onPress={() => {
								this.touchDay(index)
							}}
							>
								{this.renderDays(item,days[index])}
							</TouchableWithoutFeedback>))}
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
						{daysSelected.slice(4,7).map((item, index) => (
							<TouchableWithoutFeedback onPress={() => {
								this.touchDay(index+4)
							}}
							>
								{this.renderDays(item,days[index + 4])}
							</TouchableWithoutFeedback>))}
					</View>
					<View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 20, justifyContent: 'space-around'  }}>
						<TouchableWithoutFeedback onPress={this.props.onTouch}>
							<Text style={{ color: COLOR.PRIMARY, fontSize: 17 }}>CANCEL</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => {
							this.confirmDays()
							this.props.onTouch() }}
						>
							<Text style={{ color: COLOR.PRIMARY, fontSize: 17 }}>OK</Text>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</View>
		)
	}
}

const styles = {
	circle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: COLOR.PRIMARY
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
