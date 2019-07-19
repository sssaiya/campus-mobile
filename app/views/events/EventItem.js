import React from 'react'
import { withNavigation } from 'react-navigation'

import DataItemStar from '../common/DataItemStar'

const EventItem = ({ navigation, data, card }) => (
	<DataItemStar
		data={data}
		card={card}
		onPress={() => { navigation.navigate('EventDetail', { data }) }}
		isStared={false}
	/>
)

export default withNavigation(EventItem)
