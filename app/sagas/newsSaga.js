import { call, put, select, takeLatest } from 'redux-saga/effects'
import NewsService from '../services/newsService'

const newsState = state => (state.cards.cards.news)

function* updateNews() {
	console.log('updateNews-----')
	const { active } = yield select(newsState)
	if (active) {
		console.log('SET_NEWS')
		const news = yield call(NewsService.FetchNews)
		yield put({ type: 'SET_NEWS', news })
	}
}

function* newsSaga() {
	yield takeLatest('UPDATE_NEWS', updateNews)
}

export default newsSaga