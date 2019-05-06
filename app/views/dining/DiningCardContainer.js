import React from 'react'
import { connect } from 'react-redux'
import { View, Text, ActivityIndicator, Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import css from '../../styles/css'
import Card from '../common/Card'
import Touchable from '../common/Touchable'
import DiningListView  from './DiningListView'
import dining from '../../util/dining'

class DiningCardContainer extends React.Component {
	constructor(props) {
		super()
	}
	render() {
		const {
			navigation,
			diningData,
			rows,
			updateDiningSort,
			sortBy,
			enabled
		} = this.props

		const displayLocationAlert = () => {
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
		const sortAlphaNumeric = () => {
			updateDiningSort('A-Z')
		}
		const sortDistance = () => {
			if (enabled) {
				updateDiningSort('Closest')
			} else {
				displayLocationAlert()
			}
		}
		const extraActions = [
			{
				name: 'A > Z',
				action: sortAlphaNumeric
			},
			{
				name: 'Closest',
				action: sortDistance
			}
		]
		let sortedData = dining.sortDiningList(sortBy, diningData)
		if (!enabled) {
			sortedData = dining.setDistanceToDashes(sortedData)
			sortedData = dining.sortDiningList('A-Z', sortedData)
		} else {
			sortedData = dining.sortDiningList(sortBy, diningData)
		}
		return (
			<Card id="dining" title="Dining" extraActions={extraActions}>
				{ sortedData ? (
					<View>
						<DiningListView
							data={sortedData}
							rows={rows}
							scrollEnabled={false}
							style={css.DataList_card_list}
						/>
						<Touchable
							style={css.card_button_container}
							onPress={() => navigation.navigate('DiningListViewAll')}
						>
							<Text style={css.card_button_text}>View All</Text>
						</Touchable>
					</View>
				) : (
					<View style={[css.dlc_cardcenter, css.dlc_wc_loading_height]}>
						<ActivityIndicator size="large" />
					</View>
				)}
			</Card>
		)
	}
}

function mapStateToProps(state) {
	return {
		diningData: state.dining.data,
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

DiningCardContainer.defaultProps = {
	rows: 3
}

const ActualDiningCard = connect(mapStateToProps,mapDispatchToProps)(withNavigation(DiningCardContainer))
export default ActualDiningCard
