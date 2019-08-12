import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

export default class react_native_geolocation_test extends React.Component {
	constructor() {
		super()
		Geolocation.getCurrentPosition(info => {
			this.setState({ location: info })
			console.log(info)
		})
	}
	render() {
		return (
			<View style={css.dependency_output}>
				<Text>
					{this.state && this.state.location ? 'latitude: ' + this.state.location.coords.latitude + '\n' : 'none'}
					{this.state && this.state.location ? 'longitude: ' + this.state.location.coords.longitude : 'none'}
				</Text>
			</View>
		)
	}
}

const css = StyleSheet.create({
	dependency_output: { borderWidth: 1, borderColor: '#d6d7da', borderRadius: 5, backgroundColor: '#FCFCFC', margin: 10 },
})
