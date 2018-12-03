import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
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
				<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.PRIMARY, color: 'white', height: LAYOUT.WINDOW_WIDTH / 8, width: LAYOUT.WINDOW_WIDTH - 50 }}>
					<Text style={{ fontSize: 25, color: 'white' }}>Set Days</Text>
				</View>
				<View style={{ backgroundColor: 'white', width: LAYOUT.WINDOW_WIDTH - 50, height: LAYOUT.WINDOW_WIDTH / 2.5 }}>
					<TouchableOpacity>
						<View style={{ justifyContent: 'center' }}>
							<View style={{ flexDirection: 'row', alignSelf: 'center'  }}>
								<Text style={{ fontSize: 25, color: COLOR.DMGREY }}>S</Text>
								<Text style={{ fontSize: 25, color: COLOR.DMGREY }}>M</Text>
								<Text style={{ fontSize: 25, color: COLOR.DMGREY }}>T</Text>
								<Text style={{ fontSize: 25, color: COLOR.DMGREY }}>W</Text>
							</View>
							<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
								<Text style={{ fontSize: 25, color: COLOR.DMGREY }}>T</Text>
								<Text style={{ fontSize: 25, color: COLOR.DMGREY }}>F</Text>
								<Text style={{ fontSize: 25, color: COLOR.DMGREY }}>S</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default SetDates
