import React, { Component } from 'react'
import { View } from 'react-native'
import { setJSExceptionHandler } from 'react-native-exception-handler'
import { Provider } from 'react-redux'
import AppRedux from './AppRedux'
import PushNotificationContainer from './containers/PushNotificationContainer'
import AppStateContainer from './containers/AppStateContainer'
import AppNavigation from './AppNavigation'
import { gracefulFatalReset } from './util/general'
import css from './styles/css'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			store: AppRedux({}, this.finishLoading),
			isLoading: true,
		}
	}

	finishLoading = () => {
		this.setState({ isLoading: false })
		const errorHandler = (e, isFatal) => {
			if (isFatal) {
				gracefulFatalReset(new Error('Crash: ' + e.name + ': ' + e.message + ': ' + e.stack))
			}
		}
		setJSExceptionHandler(errorHandler, true)
	}

	render() {
		if (!this.state.isLoading) {
			return (
				<Provider store={this.state.store}>
					<View style={css.main}>
						<AppNavigation />
						<AppStateContainer />
						<PushNotificationContainer />
					</View>
				</Provider>
			)
		} else {
			return null
		}
	}
}
