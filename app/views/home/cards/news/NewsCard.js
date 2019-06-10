import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Card from '../../../common/Card'
import NewsList from './NewsList'
import LastUpdated from '../../../common/LastUpdated'
import Touchable from '../../../common/Touchable'
import css from '../../../../styles/css'

const NewsCard = props => (
	<Card id="news" title="News">
		<View>
			<NewsList type="card" />
			<LastUpdated
				lastUpdated={props.lastUpdated}
				error={props.requestError ? "We're having trouble updating right now." : null}
				warning={props.requestError ? "We're having trouble updating right now." : null}
				style={css.last_updated_card}
			/>
			<Touchable onPress={() => (props.navigation.navigate('NewsList'))}>
				<View style={css.card_button_container}>
					<Text style={css.card_button_text}>View All</Text>
				</View>
			</Touchable>
		</View>
	</Card>
)

const mapStateToProps = state => ({
	lastUpdated: state.news.lastUpdated
})

export default connect(mapStateToProps)(withNavigation(NewsCard))