import React from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { FlatList, Alert } from 'react-native'
import Toast from 'react-native-simple-toast'
import ShuttleOverview from './ShuttleOverview'
import css from '../../../../styles/css'
import logger from '../../../../util/logger'

class ShuttleList extends React.Component {
	gotoRoutesList(navigation) {
		if (Array.isArray(this.props.savedStops) && this.props.savedStops.length < 10) {
			const { shuttle_routes } = this.props
			// Sort routes by alphabet
			const alphaRoutes = []
			Object.keys(shuttle_routes)
				.sort((a, b) => shuttle_routes[a].name.trim().localeCompare(shuttle_routes[b].name.trim()))
				.forEach((key) => {
					alphaRoutes.push(shuttle_routes[key])
				})
			navigation.navigate('ShuttleRoutesListView', { shuttle_routes: alphaRoutes, gotoStopsList: this.gotoStopsList })
		} else {
			Alert.alert(
				'Add a Stop',
				'Unable to add more than 10 stops, please remove a stop and try again.',
				[
					{ text: 'Manage Stops', onPress: () => this.gotoSavedList() },
					{ text: 'Cancel' }
				]
			)
		}
	}

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

	gotoStopsList(stops) {
		const { navigation } = this.props
		// Sort stops A->Z
		const alphaStops = []
		Object.keys(stops)
			.sort((a, b) => stops[a].name.trim().localeCompare(stops[b].name.trim()))
			.forEach((key) => {
				const stop = Object.assign({}, stops[key])
				if (this.isSaved(stop)) {
					stop.saved = true
				}
				alphaStops.push(stop)
			})

		navigation.navigate('ShuttleStopsListView', { shuttle_stops: alphaStops, addStop: this.addStop })
	}

	gotoSavedList() {
		const { navigation } = this.props
		navigation.navigate('ShuttleSavedListView', { gotoRoutesList: this.gotoRoutesList })
	}

	addStop(stopID, stopName) {
		const { navigation } = this.props
		logger.ga('Shuttle: Added stop "' + stopName + '"')
		Toast.showWithGravity('Stop added.', Toast.SHORT, Toast.CENTER)
		this.props.addStop(stopID)
		navigation.popToTop()
	}

	render() {
		const displayStops = this.props.savedStops.slice()
		if (this.props.closestStop) {
			displayStops.splice(this.props.closestStop.savedIndex, 0, this.props.closestStop)
		}

		console.log('displayStops---------------')
		console.log(displayStops)

		return (
			<FlatList
				style={css.scrollcard_listStyle}
				pagingEnabled
				horizontal
				showsHorizontalScrollIndicator={true}
				data={displayStops}
				keyExtractor={(item, index) => String(item.id)}
				renderItem={
					({ item: rowData }) => (
						<ShuttleOverview
							onPress={() => this.props.navigation.navigate('ShuttleStop', { stopID: rowData.id })}
							stopData={this.props.stopsData[rowData.id]}
							closest={Object.prototype.hasOwnProperty.call(rowData, 'savedIndex')}
						/>
					)
				}
			/>
		)
	}
}

const mapStateToProps = state => ({
	closestStop: state.shuttle.closestStop,
	stopsData: state.shuttle.stops,
	shuttle_routes: state.shuttle.routes,
	shuttle_stops: state.shuttle.stops,
	savedStops: state.shuttle.savedStops,
	lastUpdated: state.shuttle.lastUpdated,
})

const mapDispatchtoProps = dispatch => ({
	addStop: (stopID) => { dispatch({ type: 'ADD_STOP', stopID }) },
	updateScroll: (scrollX) => { dispatch({ type: 'UPDATE_SHUTTLE_SCROLL', scrollX }) }
})

export default connect(mapStateToProps, mapDispatchtoProps)(withNavigation(ShuttleList))