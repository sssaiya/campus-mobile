import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import css from '../../../styles/css'
import COLOR from '../../../styles/ColorConstants'
import LAYOUT from '../../../styles/LayoutConstants'

class SetDates extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<View>
				<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.PRIMARY, color: 'white', height: LAYOUT.WINDOW_WIDTH / 8, width: LAYOUT.WINDOW_WIDTH - 100 }}>
					<Text style={{ fontSize: 25, color: 'white' }}>Set Days</Text>
				</View>
				<View style={{ backgroundColor: 'white', width: LAYOUT.WINDOW_WIDTH - 100, height: LAYOUT.WINDOW_WIDTH / 3, justifyContent: 'center' }}>
					<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
						<TouchableWithoutFeedback onPress={() => console.log("hi")}>
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
						<TouchableWithoutFeedback onPress={() => console.log("hi")}>
							<Text style={{color: COLOR.PRIMARY, fontSize: 17}}>CANCEL</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => console.log("hi")}>
							<Text style={{color: COLOR.PRIMARY, fontSize: 17}}>OK</Text>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => {
	{

	}
}

export default connect(mapStateToProps)(SetDates)
