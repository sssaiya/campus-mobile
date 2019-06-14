import React from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import css from '../../../../styles/css'
import Touchable from '../../../common/Touchable'

class ShuttleRoutesListView extends React.Component {
	isSaved(stop) {
		const { savedStops } = this.props
		if (Array.isArray(savedStops)) {
			for (let i = 0; i < savedStops.length; ++i) {
				if (savedStops[i].id === stop.id) {
					return true
				}
			}
		}
		return false
	}

	RouteItem(data, props) {
		return (
			<Touchable
				onPress={() => {
					const alphaStops = []
					Object.keys(data.stops)
						.sort((a, b) => data.stops[a].name.trim().localeCompare(data.stops[b].name.trim()))
						.forEach((key) => {
							const stop = Object.assign({}, data.stops[key])
							if (this.isSaved(stop)) {
								stop.saved = true
							}
							alphaStops.push(stop)
						})
					props.navigation.navigate('ShuttleStopsListView', { shuttle_stops: alphaStops })
				}}
				style={css.fl_row}
			>
				<Text style={css.fl_row_title}>
					{data.name}
				</Text>
				<Ionicons name="ios-arrow-forward" size={28} style={css.fl_row_arrow} />
			</Touchable>
		)
	}

	render() {
		const alphaRoutes = []
		Object.keys(this.props.routes)
			.sort((a, b) => this.props.routes[a].name.trim().localeCompare(this.props.routes[b].name.trim()))
			.forEach((key) => {
				alphaRoutes.push(this.props.routes[key])
			})

		if (Array.isArray(alphaRoutes)) {
			return (
				<FlatList
					style={css.main_full}
					data={alphaRoutes}
					keyExtractor={item => String(item.id)}
					renderItem={({ item: data }) => this.RouteItem(data, this.props)}
					ItemSeparatorComponent={() => (<View style={css.fl_separator} />)}
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
	routes: state.shuttle.routes,
	savedStops: state.shuttle.savedStops,
})

export default connect(mapStateToProps)(withNavigation(ShuttleRoutesListView))
