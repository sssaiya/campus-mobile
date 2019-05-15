/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import RadioCard from './RadioCard'

class RadioCardContainer extends Component {
	render() {
		return (
			<RadioCard />
		)
	}
}

export default withNavigation(RadioCardContainer)