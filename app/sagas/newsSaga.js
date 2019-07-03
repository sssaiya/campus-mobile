import { call, put, select, takeLatest } from 'redux-saga/effects'
import moment from 'moment'
import NewsService from '../services/newsService'

const newsState = state => (state.cards.cards.news)

function* updateNews() {
	const { active } = yield select(newsState)
	if (active) {
		const newsData = yield call(NewsService.FetchNews)

		console.log('\nupdateNews:')
		console.log(newsData)

		console.log('\nupdateNews:')
		console.log(newsData)

		// TODO: move server side
		if (Array.isArray(newsData)) {
			newsData.forEach((element, index) => {
				newsData[index] = {
					...element,
					subtext: moment(element.date).format('MMM Do, YYYY')
				}
			})

			console.log('\nupdateNews2:')
			console.log(newsData)
			yield put({ type: 'SET_NEWS', newsData })
		} else {
			console.log('\nupdateNews3:')
			console.log(newsData)
		}
	}
}

function* newsSaga() {
	yield takeLatest('UPDATE_NEWS', updateNews)
}

export default newsSaga
