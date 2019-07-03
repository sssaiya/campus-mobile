import React from 'react'
import { FlatList, View, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import DiningLocation from './DiningLocation'
import css from '../../../../styles/css'
import Touchable from '../../../common/Touchable'
import SafeImage from '../../../common/SafeImage'
import { CARD_DEFAULT_ROWS } from '../../../../AppSettings'

class DiningList extends React.Component {
	DiningListItem = (data) => {
		const { navigation } = this.props

		return (
			<Touchable
				onPress={() => { navigation.navigate('DiningDetail', { data }) }}
				style={css.dataitem_touchableRow}
			>
				<Text style={css.dataitem_titleText}>{data.title}</Text>
				<View style={css.dataitem_listInfoContainer}>
					<View style={css.dataitem_descContainer}>
						{data.description ? (
							<Text
								style={css.dataitem_descText}
								numberOfLines={2}
							>
								{data.description}
							</Text>
						) : null }
						<Text style={css.dataitem_dateText}>{data.subtext}</Text>
					</View>
					<SafeImage style={css.dataitem_image} source={{ uri: data.image }} />
				</View>
			</Touchable>
		)
	}

	render() {
		const { diningData, type,  } = this.props

		if (Array.isArray(diningData)) {
			return (
				<FlatList
					style={css.scroll_default}
					data={type === 'card' ? diningData.slice(0, CARD_DEFAULT_ROWS) : diningData}
					scrollEnabled={!(type === 'card')}
					keyExtractor={(item, index) => String(item.id + item.name)}
					renderItem={({ item: rowData }) => (<DiningLocation data={rowData} />)}
					ItemSeparatorComponent={() => (
						<View style={css.fl_separator} />
					)}
				/>
			)
		} else {
			return (
				<ActivityIndicator size="large" style={css.activity_indicator} />
			)
		}
	}
}

const mapStateToProps = state => ({
	diningData: state.dining.data
})

export default connect(mapStateToProps)(withNavigation(DiningList))
