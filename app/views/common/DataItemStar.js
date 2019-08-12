import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import COLOR from '../../styles/ColorConstants'
import Touchable from './Touchable'
import SafeImage from './SafeImage'
import css from '../../styles/css'

const DataItemStar = ({ data, card, onPress, onStarPress }) => (
	<View style={css.dataitem_row}>
		<View style={css.dataitem_titleRow}>
			<Touchable
				onPress={() => onPress(data)}
				style={css.dataitem_touchableTitle}
			>
				<Text style={css.dataitem_titleText}>{data.title}</Text>
			</Touchable>
			<Touchable
				onPress={() => onStarPress(data.id)}
				style={css.dataitem_touchableStar}
			>
				{data.stared ?  (<Icon name="ios-star" size={32} color={COLOR.YELLOW} />) : (<Icon name="ios-star-outline" size={32} color={COLOR.DGREY} />) }
			</Touchable>
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
					<Text style={css.dataitem_dateText}>{data.formattedDate}</Text>
				</View>
				<SafeImage style={css.dataitem_image} source={{ uri: data.image }} />
			</View>
		</Touchable>
	</View>
)

export default DataItemStar
