import React from 'react'
import { View, Text, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import COLOR from '../../styles/ColorConstants'
import Touchable from '../common/Touchable'
import css from '../../styles/css'

class ParkingSpotType extends React.Component {
	rowTouched(parkingObj) {
		const { removeSpotType, addSpotType,  renderWarning, selectedSpotIds } = this.props
		const spotTypeId = parkingObj.item.id

		if (selectedSpotIds.includes(spotTypeId)) {
			// user is trying to unselect a row
			parkingObj.separators.unhighlight()
			removeSpotType( spotTypeId, selectedSpotIds)
			renderWarning(false)
		} else if (selectedSpotIds.length < 3) {
			// user is trying to select a row
			parkingObj.separators.highlight()
			addSpotType( spotTypeId, selectedSpotIds)
		} else {
			renderWarning(true)
		}
		// user tried to select a row but reached limit, so do nothing
	}

	// this function returns a touchable that has all the elements needed for each row
	// also decides if the row is selected or unselcted based on the state
	renderRow(parkingObj) {
		const { id } = parkingObj.item
		const { selectedSpotIds } = this.props

		return (
			<Touchable
				onPress={() => this.rowTouched(parkingObj)}
			>
				{selectedSpotIds.includes(id) ? getSelectedRow({ parkingObj }) : getUnselectedRow({ parkingObj })}
			</Touchable>
		)
	}

	// the flat list doesn't need extraData prop becuase it rerenders when an item is highlighted or unhighlighted
	// the highlight and unhihglight methods are given in renderItem prop (parkingObj)
	render() {
		return (
			<View
				style={css.pst_full_container}
			>
				<FlatList
					style={css.pst_flat_list}
					scrollEnabled={false}
					showsVerticalScrollIndicator={false}
					keyExtractor={parkingType => parkingType.id.toString()}
					data={this.props.parkingSpotData}
					renderItem={parkingObj => this.renderRow(parkingObj)}
					enableEmptySections={true}
					ItemSeparatorComponent={
						({ leadingItem, highlighted }) => {
							// added a one because leadingItem is the object preceding the seperator
							if (this.props.selectedSpotIds.includes(leadingItem.id + 1)) {
								return renderSeparator(true)
							}
							return renderSeparator(false)
						}
					}
					ListFooterComponent={renderSeparator(false)}
					ListHeaderComponent={renderSeparator(false)}
				/>
				{this.props.showWarning ? displayWarning() : null}
			</View>
		)
	}
}

// returns a list seperator if given argument "highlight" is false
// otherwise returns a placeholder for the list separator
const renderSeparator = (highlighted) => {
	if (highlighted) {
		return (
			<View
				style={css.pst_flat_list_empty_separator}
			/>
		)
	}
	return <View style={css.pst_flat_list_separator} />
}

// returns the warning sign
const displayWarning = () =>  (
	<View style={css.pst_warning_container_view}>
		<Text style={css.pst_warning_header_text} >
			{'Max Selection (3)'}
		</Text>
		<Text>
			{'Only up to 3 type selections'}
		</Text>
		<Text>
			{'are allowed at one time.'}
		</Text>
		<Text>
			{'\nCancel a parking type selection to'}
		</Text>
		<Text>
			{'add another parking type.'}
		</Text>
	</View>

)


// returns an elevated view that contains all elemnts of a selected row
function getSelectedRow({ parkingObj }) {
	const { type, textColor, backgroundColor, shortName } = parkingObj.item
	return (
		<View style={css.pst_elevated_row_view}>
			<View style={[css.pst_circle, { backgroundColor }]}>
				<Text
					style={[css.pst_character, { color: textColor }]}
					allowFontScaling={false}
				>
					{shortName || accessibleIcon()}
				</Text>
			</View>
			<Text
				style={css.pst_row_text}
			>
				{type}
			</Text>
			{checkedIcon()}
		</View>
	)
}
// returns a view containing an unslected row
function getUnselectedRow({ parkingObj }) {
	const { type, textColor, backgroundColor, shortName } = parkingObj.item
	return (
		<View style={css.pst_unelevated_row_view}>
			<View style={[css.pst_circle, { backgroundColor }]}>
				<Text
					style={[css.pst_character, { color: textColor }]}
					allowFontScaling={false}
				>
					{shortName || accessibleIcon()}
				</Text>
			</View>
			<Text
				style={css.pst_row_text}
			>
				{type}
			</Text>
			{uncheckedIcon()}
		</View>
	)
}

const accessibleIcon = () => (
	<Icon name="accessible" size={25} color="white" />
)

const checkedIcon = () => (
	<Icon name="check" size={25} color={COLOR.DGREY} style={{ paddingRight: 20 }} />
)

const uncheckedIcon = () => (
	<Icon name="check" size={25} color={COLOR.MGREY} style={{ paddingRight: 20 }} />
)

const mapStateToProps = state => ({
	selectedSpotIds: state.parking.selectedSpotIds,
	showWarning: state.parking.showWarning,
	parkingSpotData: state.parking.parkingSpotData,
})


const mapDispatchToProps = dispatch => (
	{
		removeSpotType: (spotTypeId) => {
			dispatch({ type: 'REMOVE_PARKING_SPOT_TYPE', spotTypeId })
		},
		addSpotType: (spotTypeId) => {
			dispatch({ type: 'ADD_PARKING_SPOT_TYPE', spotTypeId })
		},
		renderWarning: (showWarning) => {
			dispatch({ type: 'SET_WARNING_SIGN', showWarning })
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(ParkingSpotType)
