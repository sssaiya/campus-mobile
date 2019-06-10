import React from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, Text } from 'react-native'
import ParkingList from './ParkingList'
import Touchable from '../../../common/Touchable'
import Card from '../../../common/Card'
import LastUpdated from '../../../common/LastUpdated'
import css from '../../../../styles/css'

const ParkingCard = props => (
	<Card id="parking" title="Parking">
		<View>
			<ParkingList {...props} />
			<LastUpdated
				lastUpdated={props.lastUpdated}
				error={props.requestError ? "We're having trouble updating right now." : null}
				warning={props.requestError ? "We're having trouble updating right now." : null}
				style={css.last_updated_card}
			/>
			<Touchable onPress={() => (props.navigation.navigate('ManageParkingLots'))}>
				<View style={css.card_button_container}>
					<Text style={css.card_button_text}>Manage Lots</Text>
				</View>
			</Touchable>
		</View>
	</Card>
)

/*
Move to common/PageIndicator

	{this.PageIndicator(selectedLots.length, this.state.dotIndex)}
	PageIndicator = ({ numDots, dotIndex }) => {
		console.log('PageIndicator')
		console.log('numDots: ' + numDots)
		console.log('dotIndex: ' + dotIndex)
		console.log('PageIndicator end')


		const dots = []
		for (let i = 0; i < numDots; ++i) {
			const dotName = (dotIndex === i) ? ('circle') : ('circle-thin')
			const dot = (
				<FAIcon
					style={css.scrollcard_dotStyle}
					name={dotName}
					size={10}
					key={'dot' + i}
				/>
			)
			dots.push(dot)
		}


		if (numDots > 0) {
			return (
				<View style={css.scrollcard_dotsContainer}>
					{dots}
				</View>
			)
		} else {
			return (
				<View style={css.scrollcard_dotsContainer}>
					<Text>No dots</Text>
				</View>
			)
		}
	}
*/

const mapStateToProps = state => ({
	parkingData: state.parking.parkingData,
	lastUpdated: state.parking.lastUpdated,
})

export default connect(mapStateToProps)(withNavigation(ParkingCard))
