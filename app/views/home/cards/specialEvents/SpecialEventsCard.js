import React from 'react'
import { View, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { openURL } from '../../../../util/general'
import Card from '../../../common/Card'
import SafeImage from '../../../common/SafeImage'
import Touchable from '../../../common/Touchable'
import css from '../../../../styles/css'

export const SpecialEventsCard = ({ navigation, specialEvents, saved, hideCard }) => (
	<View>
		<BannerCard
			showButton={!(specialEvents['event-type'] === 'Promo Banner')}
			title={(specialEvents.name) ? specialEvents.name : specialEvents.eventname}
			image={(specialEvents.logo) ? specialEvents.logo : specialEvents['banner-image']}
			onPress={() => {
				if (specialEvents['event-type'] === 'Promo Banner') {
					const array = specialEvents['banner-url'].split('://')
					if (array[0] === 'app') {
						navigation.navigate(array[1])
					} else {
						if ( specialEvents['banner-url'].length > 0 ) openURL(specialEvents['banner-url'])
					}
				} else {
					navigation.navigate('SpecialEventsView', { title: specialEvents.name, personal: false })
				}
			}}
			onClose={() => hideCard('specialEvents')}
		/>
	</View>
)

const BannerCard = ({ showButton, title, image, onPress, onClose }) => (
	<Card>
		<Touchable
			onPress={() => onClose()}
			style={css.bc_closeContainer}
		>
			<Text style={css.bc_closeText}>Close</Text>
			<Icon
				size={13}
				name="md-close-circle"
				style={css.bc_closeIcon}
			/>
		</Touchable>
		<Touchable
			onPress={() => onPress()}
		>
			{image ? (
				<SafeImage
					source={{ uri: image }}
					style={css.bc_image}
				/>
			) : (
				<Text style={css.bc_cardTitle}>{title}</Text>
			)}
			{showButton ? (
				<View style={css.bc_more}>
					<Text style={css.bc_more_label}>See Full Schedule</Text>
				</View>
			) : (
				<View />
			)}
		</Touchable>
	</Card>
)

export default withNavigation(SpecialEventsCard)
