import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, ActivityIndicator } from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import css from '../../../../styles/css'
import LAYOUT from '../../../../styles/LayoutConstants'
import ParkingOverview from './ParkingOverview'

class ParkingList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dotIndex: 0,
		}
	}

	handleScroll = (event) => {
		if (this.props.updateScroll) {
			this.props.updateScroll(event.nativeEvent.contentOffset.x)
		}
		const dotIndex = Math.floor(event.nativeEvent.contentOffset.x / (LAYOUT.MAX_CARD_WIDTH - 12)) // minus padding
		this.setState({ dotIndex })
	}

	PageIndicator = ({ numDots, dotIndex }) => {

		console.log('PageIndicator')
		console.log('numDots: ' + numDots)
		console.log('dotIndex: ' + dotIndex)
		console.log('PageIndicator end')


		const dots = []
		for (let i = 0; i < numDots; ++i) {
			const dotName = (dotIndex === i) ? ('circle') : ('circle-thin')
			const dot = (
				<FAIcon
					style={css.scrollcard_dotStyle}
					name={dotName}
					size={10}
					key={'dot' + i}
				/>
			)
			dots.push(dot)
		}
		return (
			<View style={css.scrollcard_dotsContainer}>
				{dots}
			</View>
		)
	}

	render() {
		const selectedLots = []

		this.props.parkingData.forEach((obj) => {
			if (this.props.selectedLots.includes(obj.LocationName)) {
				selectedLots.push(obj)
			}
		})

		if (Array.isArray(selectedLots)) {
			if (selectedLots.length > 0) {

				console.log('len----')
				console.log(selectedLots.length)
				return (
					<View>
						<FlatList
							ref={(c) => { this._flatlist = c }}
							style={css.scrollcard_listStyle}
							pagingEnabled
							horizontal
							showsHorizontalScrollIndicator={false}
							onScroll={this.handleScroll}
							scrollEventThrottle={0}
							data={selectedLots}
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
						{this.PageIndicator(selectedLots.length, this.state.dotIndex)
							: null }
					</View>
				)
			} else {
				return (
					<View style={css.pc_nolots_container}>
						<Text style={css.pc_nolots_text}>Add a parking lot to begin.</Text>
					</View>
				)
			}
		} else {
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
