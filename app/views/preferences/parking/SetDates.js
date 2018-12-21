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

	/**
	There is a neater way to write this function, will be added after MVP is released
	*/
	render() {
		return (
			<View>
				<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.PRIMARY, color: 'white', height: LAYOUT.WINDOW_WIDTH / 8, width: LAYOUT.WINDOW_WIDTH - 100 }}>
					<Text style={{ fontSize: 25, color: 'white' }}>Set Days</Text>
				</View>
				<View style={{ backgroundColor: 'white', width: LAYOUT.WINDOW_WIDTH - 100, height: LAYOUT.WINDOW_WIDTH / 3, justifyContent: 'center' }}>
					<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
						<TouchableWithoutFeedback onPress={() => this.props}>
							<Text style={{ fontSize: 25, color: COLOR.DMGREY, paddingRight: 20 }}>S</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => console.log("hi")}>
							<Text style={{ fontSize: 25, color: COLOR.DMGREY,paddingRight: 20 }}>M</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => console.log("hi")}>
							<Text style={{ fontSize: 25, color: COLOR.DMGREY,paddingRight: 20 }}>T</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => console.log("hi")}>
							<Text style={{ fontSize: 25, color: COLOR.DMGREY }}>W</Text>
						</TouchableWithoutFeedback>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 15 }}>
						<TouchableWithoutFeedback onPress={() => console.log("hi")}>
							<Text style={{ fontSize: 25, color: COLOR.DMGREY,paddingRight: 20 }}>T</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => console.log("hi")}>
							<Text style={{ fontSize: 25, color: COLOR.DMGREY,paddingRight: 20 }}>F</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => console.log("hi")}>
							<Text style={{ fontSize: 25, color: COLOR.DMGREY }}>S</Text>
						</TouchableWithoutFeedback>
					</View>
					<View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 20, justifyContent: 'space-around'  }}>
						<TouchableWithoutFeedback onPress={this.props.onTouch}>
							<Text style={{ color: COLOR.PRIMARY, fontSize: 17 }}>CANCEL</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={this.props.onTouch}>
							<Text style={{ color: COLOR.PRIMARY, fontSize: 17 }}>OK</Text>
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
