import React from 'react'
import {
	View,
	Text,
	ScrollView,
	Linking,
} from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import Icon from 'react-native-vector-icons/Ionicons'
import COLOR from '../../styles/ColorConstants'
import Touchable from '../common/Touchable'
import SafeImage from '../common/SafeImage'
import ShareContent from '../common/ShareContent'
import css from '../../styles/css'
import { openURL } from '../../util/general'

const EventDetailPage = ({ data, onStarPress }) => (
	<ScrollView style={css.scroll_default} contentContainerStyle={css.main_full}>
		{data.imagehq ? (
			<SafeImage
				source={{ uri: data.imagehq }}
				style={css.media_detail_image}
				resizeMode="contain"
			/>
		) : (null)}
		<View style={css.media_detail_container}>
			<View style={css.media_detail_titleRow}>
				<View style={css.media_detail_titleText}>
					<Text style={css.media_detail_title}>{data.title}</Text>
				</View>
				<Touchable
					onPress={() => onStarPress(data.id)}
					style={css.media_detail_touchableStar}
				>
					{data.stared ?  (<Icon name="ios-star" size={32} color={COLOR.YELLOW} />) : (<Icon name="ios-star-outline" size={32} color={COLOR.DGREY} />) }
				</Touchable>
			</View>
			<Text style={css.media_detail_locationText}>
				{data.location}
			</Text>
			<Text style={css.media_detail_dateText}>
				{data.formattedDate}
			</Text>
			<View style={css.media_detail_descContainer}>
				<Hyperlink
					onPress={(url, text) => openURL(url)}
					linkStyle={(css.hyperlink)}
				>
					<Text style={css.media_detail_descText}>
						{data.description}
					</Text>
				</Hyperlink>
			</View>
			{data.contact_info ? (
				<Touchable
					onPress={() => Linking.openURL('mailto:' + data.contact_info + '?')}
					style={css.button_primary}
				>
					<Text style={css.button_primary_text}>Contact Host</Text>
				</Touchable>
			) : null }
			<ShareContent
				title="Share Event"
				message={'Share event: ' + data.title + '\n' + data.url}
				url={data.url}
			/>
		</View>
	</ScrollView>
)

export default EventDetailPage
