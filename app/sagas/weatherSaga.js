import { call, put, select, takeLatest } from 'redux-saga/effects'
import WeatherService from '../services/weatherService'

const weatherState = state => (state.cards.cards.weather)

function* updateWeather() {
	const { active } = yield select(weatherState)
	if (active) {
		const weather = yield call(WeatherService.FetchWeather)
		yield put({ type: 'SET_WEATHER', weather })
	}
}

function* weatherSaga() {
	yield takeLatest('UPDATE_WEATHER', updateWeather)
}

export default weatherSaga
