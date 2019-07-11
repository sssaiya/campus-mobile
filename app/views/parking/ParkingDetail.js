import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import ColorConstants from '../../styles/ColorConstants'
import css from '../../styles/css'


class ParkingDetail extends Component {


	mapAvailabilityToColor()  {
		const { spotsAvailable, totalSpots } = this.props

		const percentAvailable = spotsAvailable / totalSpots
		if (percentAvailable > 0.5) {
			return ColorConstants.AVAILABILITY_HIGH
		} else if (percentAvailable >= 0.25 && percentAvailable < 0.5) {
			return ColorConstants.AVAILABILITY_MEDIUM
		} else {
			return ColorConstants.AVAILABILITY_LOW
		}
	}

	mapSpotsToDisplay() {
		const {
			spotsAvailable,
			totalSpots,
			progressNumber,
			progressPercent
		} = this.props

		if (spotsAvailable === -1) {
			return (
				<View style={css.po_fill_info}>
					<Text style={[css.po_circle_number_na, { fontSize: progressNumber * 0.65 }]}>
						N/A
					</Text>
				</View>
			)
		} else {
			const fillAmount = (spotsAvailable / totalSpots) * 100
			return (
				<View style={css.po_fill_info}>
					<Text style={[css.po_circle_number, { color: this.mapAvailabilityToColor() }, { fontSize: progressNumber }]}>
						{fillAmount ? Math.trunc(fillAmount) : 0}
						<Text style={[css.po_circle_percent,{ color: this.mapAvailabilityToColor() }, { fontSize: progressPercent }]}>%</Text>
					</Text>
				</View>
			)
		}
	}

	accessibleIcon = () => (
		<Icon name="accessible" size={35} color="white" />
	)

	render() {
		const {
			spotTypeId,
			parkingSpotData,
			spotsAvailable,
			totalSpots,
			size,
			widthMultiplier,
			circleRadius,
			letterSize,
		} = this.props
		const fillAmount = (spotsAvailable / totalSpots) * 100
		const { textColor, backgroundColor, shortName } = parkingSpotData[spotTypeId]

		return (
			<View style={{ alignItems: 'center' }}>
				<AnimatedCircularProgress
					duration={1500}
					size={size}
					width={widthMultiplier}
					fill={
						!Number.isNaN(fillAmount)
						&& Number.isFinite(fillAmount) ? fillAmount : 0
					}
					tintColor={this.mapAvailabilityToColor()}
					backgroundColor={ColorConstants.LGREY2}
					rotation={360}
					style={css.po_acp}
				>
					{fill => (
						<View>
							{this.mapSpotsToDisplay()}
						</View>
					)}
				</AnimatedCircularProgress>
				<View style={[css.po_circle,{ backgroundColor },{ borderRadius: circleRadius, width: (circleRadius * 2), height: (circleRadius * 2) }]}>
					<Text style={[css.po_character, { color: textColor }, { fontSize: letterSize }]}>
						{shortName || this.accessibleIcon()}
					</Text>
				</View>
			</View>
		)
	}
}

export default ParkingDetail
