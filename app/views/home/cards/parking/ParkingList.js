import React from 'react'
import { connect } from 'react-redux'
import { FlatList, Text, ActivityIndicator } from 'react-native'
import css from '../../../../styles/css'
import ParkingOverview from './ParkingOverview'

class ParkingList extends React.Component {
	render() {
		try {
			const updatedSelectedLots = []
			this.props.parkingData.forEach((obj) => {
				if (this.props.selectedLots.includes(obj.LocationName)) {
					updatedSelectedLots.push(obj)
				}
			})

			if (updatedSelectedLots.length > 0) {
				return (
					<FlatList
						style={css.scrollcard_listStyle}
						pagingEnabled
						horizontal
						showsHorizontalScrollIndicator={true}
						onScroll={this.handleScroll}
						scrollEventThrottle={0}
						data={updatedSelectedLots}
						enableEmptySections={true}
						keyExtractor={(listItem, index) => listItem.LocationId}
						renderItem={({ item, index }) => (
							<ParkingOverview
								structureData={item}
								selectedSpots={this.props.selectedSpots}
								totalLotCount={this.props.parkingData.length}
							/>
						)}
					/>
				)
			} else {
				return (
					<Text style={css.pc_nolots_text}>Add a parking lot to begin.</Text>
				)
			}
		} catch (err) {
			return (
				<ActivityIndicator size="large" style={css.activity_indicator} />
			)
		}
	}
}

const mapStateToProps = state => ({
	parkingData: state.parking.parkingData,
	selectedSpots: state.parking.selectedSpots, // enabled spot types array
	selectedLots: state.parking.selectedLots, // enabled lot name array
})

export default connect(mapStateToProps)(ParkingList)
