import React from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import Touchable from '../common/Touchable'
import css from '../../styles/css'

const campusLogo = require('../../assets/images/UCSanDiegoLogo-White.png')

const OnboardingIntro = props => (
	<View style={css.ob_container}>
		<Image style={css.ob_logo} source={campusLogo} />
		<Text style={[css.ob_introtext, css.ob_intro1]}>Hello.</Text>
		<Text style={[css.ob_introtext, css.ob_intro2]}>Enter your login for a personalized experience.</Text>
		<Touchable onPress={() => { props.navigation.navigate('OnboardingLogin') }}>
			<Text style={[css.ob_introtext, css.ob_continue]}>Let&#39;s do it.</Text>
		</Touchable>
		<Touchable onPress={() => props.appOnboardingComplete()}>
			<Text style={[css.ob_introtext, css.ob_skip]}>Skip for now.</Text>
		</Touchable>
	</View>
)

const mapDispatchToProps = (dispatch, ownProps) => ({
	appOnboardingComplete: () => { dispatch({ type: 'SET_APP_ONBOARDING_COMPLETE' }) }
})

export default connect(null, mapDispatchToProps)(OnboardingIntro)
