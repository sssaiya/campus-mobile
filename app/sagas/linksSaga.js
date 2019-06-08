import { Image } from 'react-native'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import LinksService from '../services/linksService'

const linksState = state => (state.cards.cards.links)

function* updateLinks() {
	console.log('updateLinks-----')
	const { active } = yield select(linksState)
	if (active) {
		console.log('updateLinks')
		const links = yield call(LinksService.FetchQuicklinks)
		yield put({ type: 'SET_LINKS', links })
		prefetchLinkImages(links)
	}
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