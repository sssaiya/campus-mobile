import React from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Card from '../../../common/Card'
import css from '../../../../styles/css'
import Touchable from '../../../common/Touchable'
import AppSettings from '../../../../AppSettings'
import LastUpdated from '../../../common/LastUpdated'

const WeatherCard = props => (
	<Card id="weather" title="Weather">
		<View>
			{props.weatherData ? (
				<View>
					<WeatherNow {...props} />
					<WeatherForecast {...props} />
				</View>
			) : (
				<ActivityIndicator size="large" style={css.activity_indicator} />
			)}
			<LastUpdated
				lastUpdated={props.lastUpdated}
				error={props.requestError ? "We're having trouble updating right now." : null}
				warning={props.requestError ? "We're having trouble updating right now." : null}
				style={css.last_updated_card}
			/>
			<Touchable onPress={() => (props.navigation.navigate('SurfReport'))}>
				<View style={css.card_button_container}>
					<Text style={css.card_button_text}>Surf Report</Text>
				</View>
			</Touchable>
		</View>
	</Card>
)

const WeatherNow = props => (
	<View style={css.wc_topRowContainer}>
		<View style={css.wc_topLeftContainer}>
			<Text style={css.wc_tempText}>
				{ props.weatherData.currently.temperature }&deg; in San Diego
			</Text>
			<Text style={css.wc_summaryText}>
				{ props.weatherData.currently.summary }
			</Text>
		</View>
		<View style={css.wc_topRightContainer}>
			<Image
				style={css.wc_topIcon}
				source={{ uri: AppSettings.WEATHER_ICON_BASE_URL + props.weatherData.currently.icon + '.png' }}
			/>
		</View>
	</View>
)

const WeatherForecast = props => (
	<View style={css.ww_weekContainer}>
		{props.weatherData.daily.data.map((data, index) => (
			<View style={css.wd_dayContainer} key={data.dayofweek}>
				<Text style={css.wd_dayText}>
					{data.dayofweek}
				</Text>
				<Image
					style={css.wd_icon}
					source={{ uri: AppSettings.WEATHER_ICON_BASE_URL + data.icon + '.png' }}
				/>
				<Text style={css.wd_maxText}>
					{data.tempMax}&deg;
				</Text>
				<Text style={css.wd_minText}>
					{data.tempMin}&deg;
				</Text>
			</View>
		))}
	</View>
)

const mapStateToProps = state => ({
	weatherData: state.weather.data,
	lastUpdated: state.weather.lastUpdated,
})

export default connect(mapStateToProps)(withNavigation(WeatherCard))
