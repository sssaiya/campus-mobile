import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Card from '../../../common/Card'
import LinksList from './LinksList'
import LastUpdated from '../../../common/LastUpdated'
import Touchable from '../../../common/Touchable'
import css from '../../../../styles/css'

const LinksCard = props => (
	<Card id="links" title="Links">
		<View>
			<LinksList type="card" />
			<LastUpdated
				lastUpdated={props.lastUpdated}
				error={props.requestError ? "We're having trouble updating right now." : null}
				warning={props.requestError ? "We're having trouble updating right now." : null}
			/>
			<Touchable onPress={() => (props.navigation.navigate('LinksList'))}>
				<View style={css.card_button_container}>
					<Text style={css.card_button_text}>View All</Text>
				</View>
			</Touchable>
		</View>
	</Card>
)

const mapStateToProps = state => ({
	lastUpdated: state.links.lastUpdated
})

export default connect(mapStateToProps)(withNavigation(LinksCard))
