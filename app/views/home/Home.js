import React from 'react'
import { ScrollView, Alert, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { checkGooglePlayServices } from 'react-native-google-api-availability-bridge'
import WeatherCardContainer from './cards/weather/WeatherCardContainer'
import ShuttleCardContainer from './cards/shuttle/ShuttleCardContainer'
import EventsCard from './cards/events/EventsCard'
import LinksCard from './cards/links/LinksCard'
import NewsCard from './cards/news/NewsCard'
import DiningCardContainer from './cards/dining/DiningCardContainer'
import SpecialEventsCardContainer from './cards/specialEvents/SpecialEventsCardContainer'
import StudentIDCardContainer from './cards/studentId/StudentIDCardContainer'
import FinalsCard from './cards/finals/FinalsCard'
import ScheduleCardContainer from './cards/classes/ScheduleCardContainer'
import ParkingCardContainer from './cards/parking/ParkingCardContainer'
import { platformAndroid, gracefulFatalReset } from '../../util/general'
import logger from '../../util/logger'

export class Home extends React.Component {
	state = {
		updatedGoogle: true, // eslint-disable-line
		refreshing: false,
	}

	componentWillMount() {
		if (platformAndroid()) {
			this.updateGooglePlay()
		}
	}

	componentDidMount() {
		logger.ga('View Loaded: Home')
		this._cards = []

		if (this._scrollview) {
			this._scrollview.scrollTo({ y: this.props.lastScroll, animated: false })
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.cards !== nextProps.cards ||
			this.props.cardOrder !== nextProps.cardOrder ||
			this.props.user.isLoggedIn !== nextProps.user.isLoggedIn) {
			return true
		} else {
			return false
		}
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.user.invalidSavedCredentials &&
			this.props.user.invalidSavedCredentials) {
			Alert.alert(
				'Logged Out.',
				'You have been logged out because your credentials could not be verified. Please try to log in again.',
				[
					{
						text: 'Cancel',
						style: 'cancel'
					},
					{
						text: 'Log in',
						onPress: () => {
							this.props.navigation.navigate('LoginScreen')
						}
					}
				]
			)
		}
	}

	pullToRefresh = () => {
		this.setState({ refreshing: true })
		this.props.updateEvents()
		this.props.updateNews()
		this.props.updateLinks()
		this.setState({ refreshing: false })
	}

	handleScroll = (event) => {
		if (this.props.updateScroll) {
			this.props.updateScroll(event.nativeEvent.contentOffset.y)
		}
	}

	loadCards = () => {
		const activeCards = []

		if (Array.isArray(this.props.cardOrder)) {
			this.props.cardOrder.forEach((card) => {
				if (this.props.cards[card].active) {
					// Skip cards if they require authentication
					// and user is not authenticated
					if (this.props.cards[card].authenticated) {
						if (!this.props.user.isLoggedIn) {
							return
						} else if (this.props.cards[card].classifications &&
                                   this.props.cards[card].classifications.student &&
                                   !this.props.user.profile.classifications.student) {
							return
						}
					}

					switch (card) {
						case 'specialEvents':
							activeCards.push(<SpecialEventsCardContainer key="specialEvents" />)
							break
						case 'studentId':
							activeCards.push(<StudentIDCardContainer key="studentId" />)
							break
						case 'finals':
							activeCards.push(<FinalsCard key="finals" />)
							break
						case 'schedule':
							activeCards.push(<ScheduleCardContainer key="schedule" />)
							break
						case 'weather':
							activeCards.push(<WeatherCardContainer key="weather" />)
							break
						case 'shuttle':
							activeCards.push(<ShuttleCardContainer key="shuttle" />)
							break
						case 'dining':
							activeCards.push(<DiningCardContainer key="dining" />)
							break
						case 'events':
							activeCards.push(<EventsCard key="events" />)
							break
						case 'quicklinks':
							activeCards.push(<LinksCard key="quicklinks" />)
							break
						case 'news':
							activeCards.push(<NewsCard key="news" />)
							break
						case 'parking':
							activeCards.push(<ParkingCardContainer key="parking" />)
							break
						default:
							return gracefulFatalReset(new Error('Invalid card in state: ', card))
					}
				}
			})
		}
		return activeCards
	}

	updateGooglePlay = () => {
		checkGooglePlayServices((result) => {
			if (result === 'update') {
				this.setState({ updatedGoogle: false }) // eslint-disable-line
			}
		})
	}

	render() {
		return (
			<ScrollView
				ref={(c) => { this._scrollview = c }}
				onScroll={this.handleScroll}
				scrollEventThrottle={0}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={() => this.pullToRefresh()}
					/>
				}
			>
				{/* LOAD CARDS */}
				{ this.loadCards() }
			</ScrollView>
		)
	}
}

function mapStateToProps(state, props) {
	return {
		cards: state.cards.cards,
		cardOrder: state.cards.cardOrder,
		lastScroll: state.home.lastScroll,
		user: state.user
	}
}

function mapDispatchtoProps(dispatch) {
	return {
		updateScroll: (scrollY) => {
			dispatch({ type: 'UPDATE_HOME_SCROLL', scrollY })
		},
		updateEvents: () => {
			dispatch({ type: 'UPDATE_EVENTS' })
		},
		updateNews: () => {
			dispatch({ type: 'UPDATE_NEWS' })
		},
		updateLinks: () => {
			dispatch({ type: 'UPDATE_Links' })
		},
	}
}
export default connect(mapStateToProps, mapDispatchtoProps)(Home)
