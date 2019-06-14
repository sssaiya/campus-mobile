import { Image } from 'react-native'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import LinksService from '../services/linksService'
import { dynamicSort } from '../util/general'

const linksState = state => (state.cards.cards.links)

function* updateLinks() {
	const { active } = yield select(linksState)
	if (active) {
		const links = yield call(LinksService.FetchLinks)
		prefetchLinkImages(links)
		const sortedLinks = yield call(sortLinks, links)
		yield put({ type: 'SET_LINKS', links: sortedLinks })
	}
}

function sortLinks(linksData) {
	// Sort links by card-order
	return new Promise((resolve, reject) => {
		if (Array.isArray(linksData)) {
			const sortedLinks = linksData.slice()
			sortedLinks.sort(dynamicSort('card-order'))
			resolve(sortedLinks)
		} else {
			reject(new Error('sortLinks: Err:_sortDining:' + linksData))
		}
	})
}

function prefetchLinkImages(links) {
	if (Array.isArray(links)) {
		links.forEach((item) => {
			const imageUrl = item.icon
			// Check if actually a url and not icon name
			if (imageUrl.indexOf('fontawesome:') !== 0) {
				Image.prefetch(imageUrl)
			}
		})
	}
}

function* linksSaga() {
	yield takeLatest('UPDATE_LINKS', updateLinks)
}

export default linksSaga