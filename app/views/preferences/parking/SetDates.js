import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux'
import css from '../../../styles/css'

class SetDates extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<View>
				<View>
					<Text style={{ fontSize: 25, backgroundColor: 'white' }}>test</Text>
				</View>
			</View>
		)
	}
}

export default SetDates
