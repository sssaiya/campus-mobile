import React from 'react'
import { View, Text, Alert } from 'react-native'
import { connect } from 'react-redux'
import css from '../../styles/css'
import Touchable from '../common/Touchable'

class DiningSortBar extends React.Component {
	constructor(props) {
		super()
	}

	_handleClosestButtonTapped() {
		const { updateDiningSort, enabled } = this.props
		if (enabled) {
			updateDiningSort('Closest')
		} else {
			Alert.alert(
				'Location Required',
				'To see closest dining, turn on Location Services.',
				[
					{
						text: 'OK',
						style: 'cancel'
					}
				],
				{ cancelable: false }
			)
		}
	}

	_handleAZButtonTapped() {
		const { updateDiningSort } = this.props
		updateDiningSort('A-Z')
	}

	renderClosestButton() {
		const { sortBy, enabled } = this.props
		return (
			<Touchable onPress={() => this._handleClosestButtonTapped()}>
				{
					(sortBy === 'Closest' && enabled) ?
						(
							<Text style={css.dn_sort_bar_selected_text}>
								Closest
							</Text>
						) : (
							(enabled) ?
								(
									<Text style={css.dn_sort_bar_unselected_text}>
										Closest
									</Text>
								) : (
									<Text style={css.dn_sort_bar_unselected_text_blocked}>
										Closest
									</Text>
								)
						)
				}
			</Touchable>
		)
	}

	renderAZButton() {
		const { sortBy, enabled } = this.props
		return (
			<Touchable onPress={() => this._handleAZButtonTapped()}>
				{
					(sortBy === 'A-Z' || !enabled) ?
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
		return (
			<View style={css.dn_sort_bar_container}>
				<View style={css.dn_sort_bar_content}>
					<Text style={css.dn_sort_by_text}>
						{'Sort By:'}
					</Text>
					{this.renderAZButton()}
					{this.renderClosestButton()}
				</View>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		sortBy: state.dining.sortBy,
		enabled: state.location.enabled
	}
}

const mapDispatchToProps = dispatch => (
	{
		updateDiningSort: (sortBy) => {
			dispatch({ type: 'SET_DINING_SORT', sortBy })
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(DiningSortBar)