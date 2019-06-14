import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { openURL } from '../../../../util/general'
import Card from '../../../common/Card'
import SafeImage from '../../../common/SafeImage'
import Touchable from '../../../common/Touchable'
import css from '../../../../styles/css'

const SpecialEventsCard = (props) => {
	if (props.specialEventsData) {
		return (
			<Card>
				<SpecialEventsClose {...props} />
				<SpecialEventsBanner {...props} />
			</Card>
		)
	} else {
		return null
	}
}

const SpecialEventsClose = props => (
	<Touchable
		onPress={() => props.hideCard('specialEvents')}
		style={css.bc_closeContainer}
	>
		<Text style={css.bc_closeText}>Close</Text>
		<Icon
			size={13}
			name="md-close-circle"
			style={css.bc_closeIcon}
		/>
	</Touchable>
)

const SpecialEventsBanner = props => (
	<Touchable
		onPress={() => {
			if (props.specialEventsData['event-type'] === 'Promo Banner') {
				const array = props.specialEventsData['banner-url'].split('://')
				if (array[0] === 'app') {
					props.navigation.navigate(array[1])
				} else {
					if (props.specialEventsData['banner-url'].length > 0) {
						openURL(props.specialEventsData['banner-url'])
					}
				}
			} else {
				props.navigation.navigate('SpecialEventsView', { title: props.specialEventsData.name, personal: false })
			}
		}}
	>
		{(props.specialEventsData.logo || props.specialEventsData['banner-image']) ? (
			<SafeImage
				source={{ uri: props.specialEventsData.logo ? props.specialEventsData.logo : props.specialEventsData['banner-image'] }}
				style={css.bc_image}
			/>
		) : (
			<Text style={css.bc_cardTitle}>
				{(props.specialEventsData.name) ? props.specialEventsData.name : props.specialEventsData.eventname}
			</Text>
		)}
		{!(props.specialEventsData['event-type'] === 'Promo Banner') ? (
			<View style={css.bc_more}>
				<Text style={css.bc_more_label}>See Full Schedule</Text>
			</View>
		) : (
			<View />
		)}
	</Touchable>
)


const mapStateToProps = state => ({
	specialEventsData: state.specialEvents.data,
	saved: state.specialEvents.saved
})

const mapDispatchToProps = dispatch => ({
	hideCard: (id) => { dispatch({ type: 'UPDATE_CARD_STATE', id, state: false }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SpecialEventsCard))
