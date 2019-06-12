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
		<ParkingList {...props} />
		<LastUpdated
			lastUpdated={props.lastUpdated}
			error={props.requestError ? "We're having trouble updating right now." : null}
			warning={props.requestError ? "We're having trouble updating right now." : null}
			style={css.last_updated_card}
		/>
		<Touchable onPress={() => props.navigation.navigate('ManageParkingLots')}>
			<View style={css.card_button_container}>
				<Text style={css.card_button_text}>Manage Lots</Text>
			</View>
		</Touchable>
	</Card>
)

const mapStateToProps = state => ({
	lastUpdated: state.parking.lastUpdated,
})

export default connect(mapStateToProps)(withNavigation(ParkingCard))
