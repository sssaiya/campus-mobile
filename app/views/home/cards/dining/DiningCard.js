import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Card from '../../../common/Card'
import DiningList from './DiningList'
import LastUpdated from '../../../common/LastUpdated'
import Touchable from '../../../common/Touchable'
import css from '../../../../styles/css'

const DiningCard = props => (
	<Card id="dining" title="Dining">
		<View>
			<DiningList type="card" />
			<LastUpdated
				lastUpdated={props.lastUpdated}
				error={props.requestError ? "We're having trouble updating right now." : null}
				warning={props.requestError ? "We're having trouble updating right now." : null}
				style={css.last_updated_card}
			/>
			<Touchable onPress={() => (props.navigation.navigate('DiningList'))}>
				<View style={css.card_button_container}>
					<Text style={css.card_button_text}>View All</Text>
				</View>
			</Touchable>
		</View>
	</Card>
)

const mapStateToProps = state => ({
	lastUpdated: state.dining.lastUpdated
})

export default connect(mapStateToProps)(withNavigation(DiningCard))
