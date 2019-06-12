import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Touchable from '../../../common/Touchable'
import css from '../../../../styles/css'
import ShuttleList from './ShuttleList'
import Card from '../../../common/Card'
import LastUpdated from '../../../common/LastUpdated'

const ShuttleCard = props => (
	<Card id="shuttle" title="Shuttle">
		<ShuttleList {...props} />
		<LastUpdated
			lastUpdated={props.arrivalsLastUpdated}
			error={props.requestError ? "We're having trouble updating right now." : null}
			warning={props.requestError ? "We're having trouble updating right now." : null}
			style={css.last_updated_card}
		/>
		<Touchable onPress={() => (props.navigation.navigate('ShuttleRoutesListView'))}>
			<View style={css.card_button_container}>
				<Text style={css.card_button_text}>Add Stop</Text>
			</View>
		</Touchable>
	</Card>
)

const mapStateToProps = state => ({
	arrivalsLastUpdated: state.shuttle.arrivalsLastUpdated,
})

export default connect(mapStateToProps)(withNavigation(ShuttleCard))
