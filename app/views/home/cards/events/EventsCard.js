import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Card from '../../../common/Card'
import EventsList from './EventsList'
import LastUpdated from '../../../common/LastUpdated'
import Touchable from '../../../common/Touchable'
import css from '../../../../styles/css'

const EventsCard = props => (
	<Card id="events" title="Events">
		<View>
			<EventsList type="card" />
			<LastUpdated
				lastUpdated={props.lastUpdated}
				error={props.requestError ? "We're having trouble updating right now." : null}
				warning={props.requestError ? "We're having trouble updating right now." : null}
			/>
			<Touchable onPress={() => (props.navigation.navigate('EventsList'))}>
				<View style={css.card_button_container}>
					<Text style={css.card_button_text}>View All</Text>
				</View>
			</Touchable>
		</View>
	</Card>
)

const mapStateToProps = state => ({
	lastUpdated: state.events.lastUpdated
})

export default connect(mapStateToProps)(withNavigation(EventsCard))
