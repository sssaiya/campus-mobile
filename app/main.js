import React from 'react'
import { View } from 'react-native'
import css from './styles/css'
import Router from './navigation/Router'

const Main = () => (
	<View style={css.main_container}>
		<Router />
	</View>
)

export default Main
