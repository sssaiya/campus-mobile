import { call, put, select, takeLatest } from 'redux-saga/effects'
import NewsService from '../services/newsService'

const newsState = state => (state.cards.cards.news)

function* updateNews() {
	const { active } = yield select(newsState)
	if (active) {
		const news = yield call(NewsService.FetchNews)
		yield put({ type: 'SET_NEWS', news })
	}
}

function* newsSaga() {
	yield takeLatest('UPDATE_NEWS', updateNews)
}

export default newsSaga