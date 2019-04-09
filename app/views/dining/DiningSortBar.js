import React from 'react'
import { View, Text, Alert } from 'react-native'
import SystemSetting from 'react-native-system-setting'
import { connect } from 'react-redux'
import css from '../../styles/css'
import Touchable from '../common/Touchable'


class DiningSortBar extends React.Component {
	constructor(props) {
		super()
	}

	render() {
		console.log('RENDERING')
		const { updateDiningSort } = this.props
		const { sortBy } = this.props

		if (sortBy === 'A-Z') {
			return (
				<View style={css.dn_sort_bar_container}>
					<View style={css.dn_sort_bar_content}>
						<Text style={css.dn_sort_by_text}>
							{'Sort By:'}
						</Text>
						<Touchable onPress={() => updateDiningSort('Closest')}>
							<Text style={css.dn_sort_bar_selected_text}>
								Closest
							</Text>
						</Touchable>
						<Text style={css.dn_sort_bar_unselected_text}>
							{' A - Z '}
						</Text>
					</View>
				</View>
			)
		} else {
			return (
				<View style={css.dn_sort_bar_container}>
					<View style={css.dn_sort_bar_content}>
						<Text style={css.dn_sort_by_text}>
							{'Sort By:'}
						</Text>
						<Text style={css.dn_sort_bar_unselected_text}>
							Closest
						</Text>
						<Touchable onPress={() => updateDiningSort('A-Z')}>
							<Text style={css.dn_sort_bar_selected_text}>
								{' A - Z '}
							</Text>
						</Touchable>
					</View>
				</View>
			)
		}
	}
}

// const renderClosestBtn = (sortBy) => {
// 	SystemSetting.isLocationEnabled().then((enable) => {
// 		if (enable) {
// 		} else {
// 		}
// 	})
// }

function mapStateToProps(state) {
	return { sortBy: state.dining.sortBy }
}

const mapDispatchToProps = dispatch => (
	{
		updateDiningSort: (sortBy) => {
			if (sortBy === 'Closest') {
				SystemSetting.isLocationEnabled().then((enable) => {
					if (enable) {
						dispatch({ type: 'SET_DINING_SORT', sortBy })
						dispatch({ type: 'REORDER_DINING' })
					} else {
						Alert.alert(
							'Location Required',
							'If you would like to see closest dining, please enable Location Services.',
							[
								{
									text: 'OK',
									style: 'cancel'
								}
							],
							{ cancelable: false }
						)
					}
				})
			} else {
				dispatch({ type: 'SET_DINING_SORT', sortBy })
				dispatch({ type: 'REORDER_DINING' })
			}
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(DiningSortBar)