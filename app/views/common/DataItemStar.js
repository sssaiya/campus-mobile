import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import COLOR from '../../styles/ColorConstants'
import Touchable from './Touchable'
import SafeImage from './SafeImage'
import css from '../../styles/css'

const DataItemStar = ({ data, card, onPress, isStared }) => (
	<View style={css.dataitem_row}>
		<View style={css.dataitem_titleRow}>
			<Touchable
				onPress={() => onPress(data)}
				style={css.dataitem_touchableTitle}
			>
				<Text style={css.dataitem_titleText}>{data.title}</Text>
			</Touchable>
			<View style={css.dataitem_touchableStar}>
				{isStared ?  (<Icon name="md-star" size={32} color={COLOR.GOLD} />) : (<Icon name="md-star-outline" size={32} color={COLOR.GOLD} />) }
			</View>
		</View>
		<Touchable
			onPress={() => onPress(data)}
		>
			<View style={css.dataitem_listInfoContainer}>
				<View style={css.dataitem_descContainer}>
					{data.description ? (
						<Text
							style={css.dataitem_descText}
							numberOfLines={2}
						>
							{data.description.trim()}
						</Text>
					) : null }
					<Text style={css.dataitem_dateText}>{data.subtext}</Text>
				</View>
				<SafeImage style={css.dataitem_image} source={{ uri: data.image }} />
			</View>
		</Touchable>
	</View>
)

export default DataItemStar
