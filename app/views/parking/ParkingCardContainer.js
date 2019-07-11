import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import ParkingCard from './ParkingCard'

export class ParkingCardContainer extends Component {
	gotoParkingSpotType = (navigation) => {
		navigation.navigate('ParkingSpotType')
	}
	gotoManageParkingLots = (navigation) => {
		navigation.navigate('ManageParkingLots')
	}

	render() {
		const {
			navigation,
			parkingData,
			selectedSpots,
			selectedSpotIds,
			parkingSpotData,
			selectedLots
		} = this.props
		return (
			<ParkingCard
				savedStructures={parkingData}
				gotoParkingSpotType={() => this.gotoParkingSpotType(navigation)}
				gotoManageParkingLots={() => this.gotoManageParkingLots(navigation)}
				selectedSpots={selectedSpots}
				selectedSpotIds={selectedSpotIds}
				parkingSpotData={parkingSpotData}
				selectedLots={selectedLots}
			/>
		)
	}
}

const mapStateToProps = state => (
	{
		parkingData: state.parking.parkingData,
		isChecked: state.parking.isChecked,
		selectedSpots: state.parking.selectedSpots,
		selectedSpotIds: state.parking.selectedSpotIds,
		parkingSpotData: state.parking.parkingSpotData,
		selectedLots: state.parking.selectedLots
	}
)


const ActualParkingCard = connect(mapStateToProps)(withNavigation(ParkingCardContainer))
export default ActualParkingCard
