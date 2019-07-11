import React, { Component } from 'react'
import { View, Text } from 'react-native'
import css from '../../styles/css'
import ParkingDetail from './ParkingDetail'
import LAYOUT from '../../styles/LayoutConstants'
import logger from '../../util/logger'


class ParkingOverview extends Component {
	getSpotType(spotTypeId) {
		const { parkingSpotData } = this.props
		const parkingSpot = parkingSpotData[spotTypeId]
		if (parkingSpot.shortName === '') {
			return 'Accessible'
		} else {
			return parkingSpot.shortName
		}
	}

	getTotalSpots() {
		try {
			const { structureData, selectedSpotIds } = this.props
			let totalAvailableSpots = 0
			for (let i = 0; i < selectedSpotIds.length; i++) {
				if (structureData.Availability && this.getSpotType(selectedSpotIds[i])) {
					const parkingSpotsPerType = structureData.Availability[this.getSpotType(selectedSpotIds[i])]
					if (parkingSpotsPerType) {
						totalAvailableSpots += Number(parkingSpotsPerType.Open)
					}
				}
			}
			return totalAvailableSpots
		} catch (err) {
			logger.trackException(err, false)
			return 0
		}
	}

	// this function returns the number of parking spots open of a given type
	// returns -1 if the structure does not have the specific type
	getOpenPerType(currentType) {
		const { structureData } = this.props
		try {
			return Number(structureData.Availability[currentType].Open)
		} catch (err) {
			return -1
		}
	}

	getTotalPerType(currentType) {
		const { structureData } = this.props
		try {
			return Number(structureData.Availability[currentType].Total)
		} catch (err) {
			return 0
		}
	}


	renderDetails() {
		const { selectedSpotIds, parkingSpotData  } = this.props
		if (selectedSpotIds.length === 0) {
			return null
		} else if (selectedSpotIds.length === 1) {
			return (
				<View style={css.po_one_spot_selected}>
					<ParkingDetail
						spotTypeId={selectedSpotIds[0]}
						parkingSpotData={parkingSpotData}
						spotsAvailable={this.getOpenPerType(this.getSpotType(selectedSpotIds[0]))}
						totalSpots={this.getTotalPerType(this.getSpotType(selectedSpotIds[0]))}
						size={LAYOUT.MAX_CARD_WIDTH * 0.38}
						widthMultiplier={LAYOUT.MAX_CARD_WIDTH * 0.037}
						circleRadius={(LAYOUT.MAX_CARD_WIDTH * 0.14) / 2}
						letterSize={LAYOUT.MAX_CARD_WIDTH * 0.08}
						progressNumber={LAYOUT.MAX_CARD_WIDTH * 0.14}
						progressPercent={LAYOUT.MAX_CARD_WIDTH * 0.06}
					/>
				</View>
			)
		} else if (selectedSpotIds.length === 2) {
			return (
				<View style={css.po_two_spots_selected}>
					<ParkingDetail
						spotTypeId={selectedSpotIds[0]}
						parkingSpotData={parkingSpotData}
						spotsAvailable={this.getOpenPerType(this.getSpotType(selectedSpotIds[0]))}
						totalSpots={this.getTotalPerType(this.getSpotType(selectedSpotIds[0]))}
						size={LAYOUT.MAX_CARD_WIDTH * 0.32}
						widthMultiplier={LAYOUT.MAX_CARD_WIDTH * 0.032}
						circleRadius={(LAYOUT.MAX_CARD_WIDTH * 0.137) / 2}
						letterSize={LAYOUT.MAX_CARD_WIDTH * 0.075}
						progressNumber={LAYOUT.MAX_CARD_WIDTH * 0.12}
						progressPercent={LAYOUT.MAX_CARD_WIDTH * 0.05}
					/>
					<View style={css.po_acp_gap_1} />
					<ParkingDetail
						spotTypeId={selectedSpotIds[1]}
						parkingSpotData={parkingSpotData}
						spotsAvailable={this.getOpenPerType(this.getSpotType(selectedSpotIds[1]))}
						totalSpots={this.getTotalPerType(this.getSpotType(selectedSpotIds[1]))}
						size={LAYOUT.MAX_CARD_WIDTH * 0.32}
						widthMultiplier={LAYOUT.MAX_CARD_WIDTH * 0.032}
						circleRadius={(LAYOUT.MAX_CARD_WIDTH * 0.137) / 2}
						letterSize={LAYOUT.MAX_CARD_WIDTH * 0.075}
						progressNumber={LAYOUT.MAX_CARD_WIDTH * 0.12}
						progressPercent={LAYOUT.MAX_CARD_WIDTH * 0.05}
					/>
				</View>
			)
		} else {
			return (
				<View style={css.po_three_spots_selected}>
					<ParkingDetail
						spotTypeId={selectedSpotIds[0]}
						parkingSpotData={parkingSpotData}
						spotsAvailable={this.getOpenPerType(this.getSpotType(selectedSpotIds[0]))}
						totalSpots={this.getTotalPerType(this.getSpotType(selectedSpotIds[0]))}
						size={LAYOUT.MAX_CARD_WIDTH * 0.25}
						widthMultiplier={LAYOUT.MAX_CARD_WIDTH * 0.025}
						circleRadius={(LAYOUT.MAX_CARD_WIDTH * 0.124) / 2}
						letterSize={LAYOUT.MAX_CARD_WIDTH * 0.062}
						progressNumber={LAYOUT.MAX_CARD_WIDTH * 0.08}
						progressPercent={LAYOUT.MAX_CARD_WIDTH * 0.035}
					/>
					<View style={css.po_acp_gap_2} />
					<ParkingDetail
						spotTypeId={selectedSpotIds[1]}
						parkingSpotData={parkingSpotData}
						spotsAvailable={this.getOpenPerType(this.getSpotType(selectedSpotIds[1]))}
						totalSpots={this.getTotalPerType(this.getSpotType(selectedSpotIds[1]))}
						size={LAYOUT.MAX_CARD_WIDTH * 0.25}
						widthMultiplier={LAYOUT.MAX_CARD_WIDTH * 0.025}
						circleRadius={(LAYOUT.MAX_CARD_WIDTH * 0.124) / 2}
						letterSize={LAYOUT.MAX_CARD_WIDTH * 0.062}
						progressNumber={LAYOUT.MAX_CARD_WIDTH * 0.08}
						progressPercent={LAYOUT.MAX_CARD_WIDTH * 0.035}
					/>
					<View style={css.po_acp_gap_2} />
					<ParkingDetail
						spotTypeId={selectedSpotIds[2]}
						parkingSpotData={parkingSpotData}
						spotsAvailable={this.getOpenPerType(this.getSpotType(selectedSpotIds[2]))}
						totalSpots={this.getTotalPerType(this.getSpotType(selectedSpotIds[2]))}
						size={LAYOUT.MAX_CARD_WIDTH * 0.25}
						widthMultiplier={LAYOUT.MAX_CARD_WIDTH * 0.025}
						circleRadius={(LAYOUT.MAX_CARD_WIDTH * 0.124) / 2}
						letterSize={LAYOUT.MAX_CARD_WIDTH * 0.062}
						progressNumber={LAYOUT.MAX_CARD_WIDTH * 0.08}
						progressPercent={LAYOUT.MAX_CARD_WIDTH * 0.035}
					/>
				</View>
			)
		}
	}

	render() {
		const { structureData, selectedSpotIds } = this.props

		let message
		if (Array.isArray(selectedSpotIds) && selectedSpotIds.length) {
			let totalSpots
			if (structureData.AvailabilityType === 'aggregate') {
				totalSpots = structureData.Open
			} else {
				totalSpots = this.getTotalSpots()
			}

			if ( Object.entries(structureData.Availability).length === 0) message = 'Data unavailable. Please try again later.'
			else if (totalSpots === 1) 	message = '~' + totalSpots + ' Spot Available'
			else 					message = '~' + totalSpots + ' Spots Available'
		} else {
			message = 'Please select a parking type'
		}

		return (
			<View style={css.po_container}>
				<Text style={css.po_structure_name}>{structureData.LocationName}</Text>
				<Text style={css.po_structure_context}>{structureData.LocationContext}</Text>
				<Text style={css.po_structure_spots_available}>{message}</Text>
				{this.renderDetails()}
			</View>
		)
	}
}

export default ParkingOverview
