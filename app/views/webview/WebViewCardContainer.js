import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView } from 'react-native'
import { withNavigation } from 'react-navigation'
import COLOR from '../../styles/ColorConstants'
import Card from '../common/Card'

const auth = require('../../util/auth')

// eslint-disable-next-line react/prefer-stateless-function
export class WebViewCardContainer extends Component {
	constructor( props ) {
		super( props )
		this.webView = null
		this.token = null
	}

	componentWillMount() {
		auth.retrieveAccessToken()
			.then((token) => {
				this.token = token
				this.sendStringToken()
			})
	}

	componentDidMount() {}

	_reWebView = (webView) => {
		this.webView = webView
	}

	sendStringToken = () => {
		console.log( 'Sending String Token' )
		console.log('Token: ' + this.token)

		this.webView.postMessage(this.token)
	}

	sendJSON = () => {
		console.log( 'Sending JSON Data' )
		console.log('Token: ' + this.token)
		const jsonOBject = {
			token: this.token
		  }

		const jsonObjStr = JSON.stringify(jsonOBject)

		console.log(jsonObjStr)
		this.webView.postMessage(jsonObjStr)
	}

	sendPostMessage() {
		console.log( 'Sending post message' )
		this.webView.postMessage( 'Post message from react native' )
	}

	render() {
		return (
			<Card
				id="WebView"
				title="WebView"
				style={{ height: 400, backgroundColor: COLOR.WHITE, margin: 6, borderRadius: 3  }}
			>
				<WebView
					source={{ uri: 'http://10.0.2.2:8080/index.html' }}
					ref={this._reWebView}
				/>
			</Card>
		)
	}
}

const mapStateToProps = state => ({})

const ActualWebViewCard = connect(mapStateToProps)(withNavigation(WebViewCardContainer))
export default ActualWebViewCard
