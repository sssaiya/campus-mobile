import React from 'react'
import { FlatList, View, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import moment from 'moment'
import DiningItem from './DiningItem'
import css from '../../../../styles/css'
import Touchable from '../../../common/Touchable'
import SafeImage from '../../../common/SafeImage'
import { militaryToAMPM } from '../../../../util/general'

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
								{data.description.trim()}
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
		const { type, diningData } = this.props
		const MAX_ROWS = 3

		console.log('\n--DIningListRender: type: ' + type)
		console.log(diningData)
		console.log('--diningData end')

		if (Array.isArray(this.props.diningData)) {
			let diningDataArray = []

			if (type === 'card') {
				diningDataArray = this.props.diningData.slice(0, MAX_ROWS)
			} else {
				diningDataArray = this.props.diningData
			}

			console.log('diningDataArray:')
			console.log(diningDataArray)

			return (
				<FlatList
					style={css.scroll_default}
					data={diningDataArray}
					scrollEnabled={!(type === 'card')}
					keyExtractor={(item, index) => (item.id + item.name).trim()}
					renderItem={({ item: rowData }) => (<DiningItem data={rowData} />)}
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
