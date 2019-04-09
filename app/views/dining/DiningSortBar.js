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

	_handleClosestButtonTapped() {
		const { sortBy, updateDiningSort } = this.props
		if (sortBy !== 'Closest') {
			SystemSetting.isLocationEnabled().then((enable) => {
				if (enable) {
					updateDiningSort('Closest')
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
		}
	}

	_handleAZButtonTapped() {
		const { sortBy, updateDiningSort } = this.props
		if (sortBy !== 'A-Z') {
			updateDiningSort('A-Z')
		}
	}

	renderClosestButton() {
		const { sortBy } = this.props
		return (
			<Touchable onPress={() => this._handleClosestButtonTapped()}>
				{
					(sortBy === 'Closest') ?
						(
							<Text style={css.dn_sort_bar_selected_text}>
								Closest
							</Text>
						) : (
							<Text style={css.dn_sort_bar_unselected_text}>
								Closest
							</Text>
						)
				}
			</Touchable>
		)
	}

	renderAZButton() {
		const { sortBy } = this.props
		return (
			<Touchable onPress={() => this._handleAZButtonTapped()}>
				{
					(sortBy === 'A-Z') ?
						(
							<Text style={css.dn_sort_bar_selected_text}>
								{' A - Z '}
							</Text>
						) : (
							<Text style={css.dn_sort_bar_unselected_text}>
								{' A - Z '}
							</Text>
						)
				}
			</Touchable>
		)
	}

	render() {
		console.log(this.props.sortBy)
		return (
			<View style={css.dn_sort_bar_container}>
				<View style={css.dn_sort_bar_content}>
					<Text style={css.dn_sort_by_text}>
						{'Sort By:'}
					</Text>
					{this.renderClosestButton()}
					{this.renderAZButton()}
				</View>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return { sortBy: state.dining.sortBy }
}

const mapDispatchToProps = dispatch => (
	{
		updateDiningSort: (sortBy) => {
			dispatch({ type: 'SET_DINING_SORT', sortBy })
			dispatch({ type: 'REORDER_DINING' })
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(DiningSortBar)