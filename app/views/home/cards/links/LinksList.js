import React from 'react'
import { FlatList, View, ActivityIndicator, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import css from '../../../../styles/css'
import Touchable from '../../../common/Touchable'
import { openURL } from '../../../../util/general'
import { CARD_LINKS_ROWS } from '../../../../AppSettings'

class LinksList extends React.Component {
	LinksListItem = (data) => {
		try {
			return (
				<Touchable onPress={() => openURL(data.url)}>
					<View style={css.links_row_container}>
						<View style={css.links_row}>
							{data.icon.indexOf('fontawesome:') === 0 ? (
								<FAIcon
									name={data.icon.replace('fontawesome:','')}
									size={21}
									style={css.links_icon_fa}
								/>
							) : (
								<Image style={css.links_icon} source={{ uri: data.icon }} />
							)}
							<Text style={css.links_name}>{data.name}</Text>
							<Ionicons name="ios-arrow-forward" size={28} style={css.fl_row_arrow} />
						</View>
					</View>
				</Touchable>
			)
		} catch (err) {
			return null
		}
	}

	render() {
		try {
			return (
				<FlatList
					style={css.scroll_default}
					data={this.props.type === 'card' ? this.props.linksData.slice(0, CARD_LINKS_ROWS) : this.props.linksData}
					scrollEnabled={!(this.props.type === 'card')}
					keyExtractor={(item, index) => (item.name + index)}
					renderItem={({ item: rowData }) => this.LinksListItem(rowData)}
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
	linksData: state.links.data
})

export default connect(mapStateToProps)(withNavigation(LinksList))
