'use strict';

import React from 'react';
import {
	AppRegistry,
	NavigatorIOS,
	Navigator,
	StatusBar
} from 'react-native';

var logger = 		require('./app/util/logger');
var general = 		require('./app/util/general');
var AppSettings = 	require('./app/AppSettings');



var Home, EventDetail, TopStoriesDetail, SurfReport, ShuttleStop, WebView, DestinationDetail;

Home = require('./app/views/Home');

if (general.platformAndroid() || AppSettings.NAVIGATOR_ENABLED) {
	ShuttleStop = 			require('./app/views/ShuttleStop');
	SurfReport = 			require('./app/views/weather/SurfReport');
	TopStoriesDetail = 		require('./app/views/topStories/TopStoriesDetail');
	EventDetail = 			require('./app/views/events/EventDetail');

	/*
	DestinationDetail = 	require('./app/views/DestinationDetail');
	WebView = 				require('./app/views/WebView');
	DiningList = 			require('./app/views/DiningSearch');
	*/
}


var nowucsandiego = React.createClass({

	getInitialState() {
		return {
			pauseRefresh: false,
		};
	},
	/*
	//check the status of a single permission
	componentDidMount: function() {

		// Listen to route focus changes
		this.refs.navRef.navigationContext.addListener('didfocus', (event) => {
			const route = event.data.route;
			console.log("IOS unFOCUS: " + route.name);

			// Make sure renders/card refreshes are only happening when in home route
			// For some reason route name for home is undefined?
			if(route.name === undefined) {
				console.log("no pause");
				this.setState({pauseRefresh: false});
			}
			else {
				this.setState({pauseRefresh: true});
			}
		});
	},*/

	render: function() {
		StatusBar.setBarStyle('light-content');

		if (general.platformAndroid() || AppSettings.NAVIGATOR_ENABLED) {
			return (
				<Navigator initialRoute={{id: 'Home', name: 'Home'}} renderScene={this.renderScene} />
			);
		} else {
			return (
				<NavigatorIOS
					initialRoute={{ 
						component: Home, 
						title: AppSettings.APP_NAME, 
						passProps: { isSimulator: this.props.isSimulator, 
						pauseRefresh: this.state.pauseRefresh,},
						backButtonTitle: "Back",}}
					style={{flex: 1}}
					tintColor='#FFFFFF'
					barTintColor='#006C92'
					titleTextColor='#FFFFFF'
					navigationBarHidden={false}
					translucent={true} 
					ref="navRef"
					/>
			);
		}

	},

	renderScene: function(route, navigator, index, navState) {

		switch (route.id) {
			case 'Home': 				return (<Home route={route} navigator={navigator} pauseRefresh={this.state.pauseRefresh} />);
			case 'ShuttleStop': 		return (<ShuttleStop route={route} navigator={navigator} pauseRefresh={this.state.pauseRefresh} />);
			case 'SurfReport': 			return (<SurfReport route={route} navigator={navigator} pauseRefresh={this.state.pauseRefresh} />);
			case 'TopStoriesDetail': 	return (<TopStoriesDetail route={route} navigator={navigator} />);
			case 'EventDetail': 		return (<EventDetail route={route} navigator={navigator} />);

			/*
			case 'DestinationDetail': 		return (<DestinationDetail route={route} navigator={navigator} />);
			case 'DiningList': 				return (<DiningList route={route} navigator={navigator} />);
			*/
			default: 				return (<Home route={route} navigator={navigator} pauseRefresh={this.state.pauseRefresh} />);
		}
	},


});

AppRegistry.registerComponent('nowucsandiego', () => nowucsandiego);