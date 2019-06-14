import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import css from '../../../../styles/css'
import Touchable from '../../../common/Touchable'

const ShuttleStopsListView = (props) => {
	const { shuttle_stops } = props.navigation.state.params

	return (
		<FlatList
			style={css.main_full}
			data={shuttle_stops}
			keyExtractor={(listItem, index) => (String(listItem.id) + String(index))}
			renderItem={
				({ item: data }) => (
					<StopItem
						data={data}
						props={props}
					/>
				)
			}
			ItemSeparatorComponent={() => (<View style={css.fl_separator} />)}
		/>
	)
}

const StopItem = ({ data, props }) => (
	<Touchable
		onPress={() => {
			props.addStop(data.id)
		}}
		style={css.fl_row}
		disabled={(data.saved === true)}
	>
		<Text style={(data.saved === true) ? (css.fl_row_title_disabled) : (css.fl_row_title)}>
			{data.name.trim()}
		</Text>
		<Ionicons name="ios-arrow-forward" size={28} style={css.fl_row_arrow} />
	</Touchable>
)

const mapDispatchtoProps = dispatch => ({
	addStop: (stopID) => { dispatch({ type: 'ADD_STOP', stopID }) },
})

export default connect(null, mapDispatchtoProps)(withNavigation(ShuttleStopsListView))
