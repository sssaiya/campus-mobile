import React from 'react'
import { Image } from 'react-native'
import {
	createStackNavigator,
	createBottomTabNavigator,
	createMaterialTopTabNavigator,
	createAppContainer
} from 'react-navigation'
import { MenuProvider } from 'react-native-popup-menu'
import { connect } from 'react-redux'
import { platformAndroid } from './util/general'
import css from './styles/css'
import COLOR from './styles/ColorConstants'
import TabIcons from './views/common/TabIcons'
import NavigationService from './services/navigationService'

// VIEWS
import CardPreferences from './views/profile/card/CardPreferences'
import DiningDetail from './views/home/cards/dining/DiningDetail'
import DiningList from './views/home/cards/dining/DiningList'
import DiningNutrition from './views/home/cards/dining/DiningNutrition'
import EventsDetail from './views/home/cards/events/EventsDetail'
import EventsList from './views/home/cards/events/EventsList'
import Feedback from './views/profile/feedback/Feedback'
import FullSchedule from './views/home/cards/classes/FullScheduleListView'
import Home from './views/home/Home'
import LinksList from './views/home/cards/links/LinksList'
import ManageParkingLots from './views/home/cards/parking/ManageParkingLots'
import Map from './views/map/Map'
import Messaging from './views/messaging/Messaging'
import NewsDetail from './views/home/cards/news/NewsDetail'
import NewsList from './views/home/cards/news/NewsList'
import NotificationTopics from './views/profile/notifications/NotificationTopics'
import OnboardingIntro from './views/onboarding/OnboardingIntro'
import OnboardingLogin from './views/onboarding/OnboardingLogin'
import ParkingSpotType from './views/home/cards/parking/ParkingSpotType'
import Profile from './views/profile/Profile'
import ShuttleRoutesListView from './views/home/cards/shuttle/ShuttleRoutesListView'
import ShuttleSavedListView from './views/home/cards/shuttle/ShuttleSavedListView'
import ShuttleStop from './views/home/cards/shuttle/ShuttleStop'
import ShuttleStopsListView from './views/home/cards/shuttle/ShuttleStopsListView'
import SpecialEventsDetailView from './views/home/cards/specialEvents/SpecialEventsDetailView'
import SpecialEventsFilterListView from './views/home/cards/specialEvents/SpecialEventsFilterListView'
import SpecialEventsView from './views/home/cards/specialEvents/SpecialEventsView'
import SurfReport from './views/home/cards/weather/SurfReport'

const campusLogoImage = require('./assets/images/UCSanDiegoLogo-nav.png')

const TabNavScreens = {
	Home: { screen: Home },
	Map: { screen: Map },
	Messaging: { screen: Messaging },
	Profile: { screen: Profile }
}

const TabNavSetup = {
	tabBarOptions: {
		showLabel: false,
		showIcon: true,
		pressColor: COLOR.MGREY,
		indicatorStyle: { backgroundColor: platformAndroid() ? COLOR.PRIMARY : COLOR.TRANSPARENT },
		style: css.tabBar,
	},
	defaultNavigationOptions: ({ navigation }) => ({
		tabBarIcon: ({ focused }) => {
			const { routeName } = navigation.state
			return <TabIcons title={routeName} focused={focused} />
		},
		swipeEnabled: false
	})
}

let TabNav
if (platformAndroid()) {
	TabNav = createMaterialTopTabNavigator(TabNavScreens, TabNavSetup)
} else {
	TabNav = createBottomTabNavigator(TabNavScreens, TabNavSetup)
}

TabNav.navigationOptions = ({ navigation }) => {
	const { routeName } = navigation.state.routes[navigation.state.index]
	let headerTitle = ( routeName === 'Home') ? <Image source={campusLogoImage} style={css.navCampusLogoTitle} /> : routeName
	switch (routeName) {
		case 'Messaging':
			headerTitle = 'Notifications'
			break
		case 'Profile':
			headerTitle = 'User Profile'
	}
	return { headerTitle }
}

let MainStack = createStackNavigator(
	{
		MainTabs: { screen: TabNav },
		SurfReport: {
			screen: SurfReport,
			navigationOptions: {
				title: 'Surf Report'
			}
		},
		NewsList: {
			screen: NewsList,
			navigationOptions: {
				title: 'News',
			}
		},
		NewsDetail: {
			screen: NewsDetail,
			navigationOptions: {
				title: 'News',
			}
		},
		EventsList: {
			screen: EventsList,
			navigationOptions: {
				title: 'Events',
			}
		},
		EventsDetail: {
			screen: EventsDetail,
			navigationOptions: {
				title: 'Events',
			}
		},
		LinksList: {
			screen: LinksList,
			navigationOptions: {
				title: 'Links',
			}
		},
		DiningDetail: {
			screen: DiningDetail,
			navigationOptions: {
				title: 'Dining',
			}
		},
		DiningList: {
			screen: DiningList,
			navigationOptions: {
				title: 'Dining',
			}
		},
		DiningNutrition: {
			screen: DiningNutrition,
			navigationOptions: {
				title: 'Nutrition',
			}
		},
		ShuttleStop: {
			screen: ShuttleStop,
			navigationOptions: {
				title: 'Shuttle',
			}
		},
		ShuttleStopsListView: {
			screen: ShuttleStopsListView,
			navigationOptions: {
				title: 'Choose Stop',
			}
		},
		ShuttleSavedListView: {
			screen: ShuttleSavedListView,
			navigationOptions: {
				title: 'Manage Stops',
			}
		},
		ShuttleRoutesListView: {
			screen: ShuttleRoutesListView,
			navigationOptions: {
				title: 'Choose Route',
			}
		},
		ParkingSpotType: {
			screen: ParkingSpotType,
			navigationOptions: {
				title: 'Spot Types',
			}
		},
		ManageParkingLots: {
			screen: ManageParkingLots,
			navigationOptions: {
				title: 'Manage Lots',
			}
		},
		SpecialEventsView: { screen: SpecialEventsView },
		SpecialEventsFilters: {
			screen: SpecialEventsFilterListView,
			navigationOptions: ({ navigation }) => {
				const { params } = navigation.state
				const { title } = params
				return {
					title,
				}
			}
		},
		SpecialEventsDetailView: {
			screen: SpecialEventsDetailView,
			navigationOptions: ({ navigation }) => {
				const { params } = navigation.state
				const { title } = params
				return {
					title,
				}
			}
		},
		FullSchedule: {
			screen: FullSchedule,
			navigationOptions: {
				title: 'Classes',
			}
		},
		LoginScreen: {
			screen: OnboardingLogin,
			navigationOptions: { header: null }
		},
		Feedback: {
			screen: Feedback,
			navigationOptions: {
				title: 'Feedback'
			}
		},
		NotificationTopics: {
			screen: NotificationTopics,
			navigationOptions: {
				title: 'Notifications',
			}
		},
		CardPreferences: {
			screen: CardPreferences,
			navigationOptions: {
				title: 'Cards',
			}
		},
	},
	{
		initialRouteName: 'MainTabs',
		defaultNavigationOptions: {
			headerStyle: css.nav,
			headerTitleStyle: css.navTitle,
			headerTintColor: COLOR.WHITE,
		},
		headerLayoutPreset: 'center',
		cardStyle: { backgroundColor: COLOR.BG_GRAY }
	}
)

let OnboardingStack = createStackNavigator(
	{
		OnboardingIntro: {
			screen: OnboardingIntro,
			navigationOptions: { header: null }
		},
		OnboardingLogin: {
			screen: OnboardingLogin,
			navigationOptions: { header: null }
		},
	},
	{
		initialRouteName: 'OnboardingIntro',
		headerMode: 'none',
		cardStyle: { backgroundColor: COLOR.BG_GRAY }
	},
)

MainStack = createAppContainer(MainStack)
OnboardingStack = createAppContainer(OnboardingStack)

// TODO: circle back on Monday

const AppNavigation = ({ onboardingComplete }) => {
	if (onboardingComplete) {
		return (
			<MenuProvider>
				<MainStack ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
			</MenuProvider>
		)
	} else {
		return (
			<OnboardingStack ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
		)
	}
}

const mapStateToProps = (state, props) => (
	{ onboardingComplete: state.app.onboardingComplete }
)

export default connect(mapStateToProps)(AppNavigation)
