import React from 'react'
import { View, Text, ScrollView, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import LastUpdated from '../../../common/LastUpdated'
import css from '../../../../styles/css'
import logger from '../../../../util/logger'

const surfBanner = require('../../../../assets/images/surf_report_header.jpg')

class SurfReport extends React.Component {
	state = {
		refreshing: false,
	}

	componentDidMount() {
		logger.ga('View Loaded: Surf Report')
		this.props.navigation.addListener('willFocus', () => {
			this.props.updateSurf()
		})
	}

	pullToRefresh = () => {
		this.setState({ refreshing: true })
		this.props.updateSurf()
		this.setState({ refreshing: false })
	}

	render() {
		console.log('lastUpdated: ' + this.props.lastUpdated)
		return (
			<ScrollView
				style={css.scroll_default}
				contentContainerStyle={css.main_full}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={() => this.pullToRefresh()}
					/>
				}
			>
				<Image style={css.sr_headerImage} source={surfBanner} />
				{ this.props.surfData ? (
					<View style={css.sr_container}>
						<Text style={css.sr_title}>
							Surf Report for {moment().format('dddd, MMMM Do')} {/* Sunday, June 9th */}
						</Text>
						<Text style={css.sr_desc}>{this.props.surfData.forecast[3]}</Text>
						<FlatList
							style={css.sr_beach_list}
							data={this.props.surfData.spots}
							keyExtractor={(listItem, index) => (listItem.title + listItem.date + index)}
							renderItem={({ item: rowData }) => (
								<View style={css.sr_surf_row}>
									<Text style={css.sr_beach_name}>{rowData.title}</Text>
									<Text style={css.sr_beach_surf}>{rowData.surf_min}{'-'}{rowData.surf_max}{'ft'}</Text>
								</View>
							)}
						/>
						<LastUpdated
							lastUpdated={this.props.lastUpdated}
							error={this.props.requestError ? "We're having trouble updating right now." : null}
							warning={this.props.requestError ? "We're having trouble updating right now." : null}
						/>
					</View>
				) : (
					<ActivityIndicator size="large" style={css.activity_indicator} />
				)}
			</ScrollView>
		)
	}
}

function mapDispatchtoProps(dispatch) {
	return {
		updateSurf: () => {
			dispatch({ type: 'UPDATE_SURF' })
		}
	}
}

function mapStateToProps(state) {
	return {
		surfData: state.surf.data,
		lastUpdated: state.surf.lastUpdated,
	}
}

export default connect(mapStateToProps, mapDispatchtoProps)(SurfReport)
