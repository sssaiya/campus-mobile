import React from 'react'
import { connect } from 'react-redux'
import DataListCard from '../../../common/DataListCard'
import general from '../../../../util/general'

export const LinksCard = ({ linksData }) => (
	<DataListCard
		id="quicklinks"
		title="Links"
		data={linksData}
		rows={4}
		item="LinksItem"
		cardSort={general.dynamicSort('card-order')}
	/>
)

const mapStateToProps = state => (
	{ linksData: state.links.data }
)

const ActualLinksCard = connect(mapStateToProps)(LinksCard)

export default ActualLinksCard
