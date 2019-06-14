import React from 'react'
import { FlatList, View, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import moment from 'moment'
import css from '../../../../styles/css'
import Touchable from '../../../common/Touchable'
import SafeImage from '../../../common/SafeImage'
import { CARD_DEFAULT_ROWS } from '../../../../AppSettings'

class NewsList extends React.Component {
	constructor(props) {
		super(props)
		this.state = { newsData: this.parseNewsData(props.newsData) }
	}

	parseNewsData = (newsData) => {
		if (Array.isArray(newsData)) {
			const parsedNewsData = newsData.slice()
			parsedNewsData.forEach((element, index) => {
				parsedNewsData[index] = {
					...element,
					subtext: moment(element.date).format('MMM Do, YYYY')
				}
			})
			return parsedNewsData
		}
	}

	NewsListItem = (data) => {
		const { navigation } = this.props

		return (
			<Touchable
				onPress={() => { navigation.navigate('NewsDetail', { data }) }}
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
		try {
			return (
				<FlatList
					style={css.scroll_default}
					data={this.props.type === 'card' ? this.state.newsData.slice(0, CARD_DEFAULT_ROWS) : this.state.newsData}
					scrollEnabled={!(this.props.type === 'card')}
					keyExtractor={(item, index) => (item.title + index)}
					renderItem={({ item: rowData }) => this.NewsListItem(rowData)}
					ItemSeparatorComponent={() => (<View style={css.fl_separator} />)}
				/>
			)
		} catch (err) {
			return (
				<ActivityIndicator size="large" style={css.activity_indicator} />
			)
		}
	}
}

const mapStateToProps = state => ({
	newsData: state.news.data
})

export default connect(mapStateToProps)(withNavigation(NewsList))
