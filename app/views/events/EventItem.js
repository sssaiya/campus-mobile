import React from 'react'
import { withNavigation } from 'react-navigation'

import DataItemStar from '../common/DataItemStar'

const EventItem = ({ navigation, data, card, onStarPress }) => (
	<DataItemStar
		data={data}
		card={card}
		onPress={() => { navigation.navigate('EventDetail', { data }) }}
		onStarPress={onStarPress}
	/>
)

export default withNavigation(EventItem)
