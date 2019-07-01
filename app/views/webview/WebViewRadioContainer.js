import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView } from 'react-native'
import { withNavigation } from 'react-navigation'
import COLOR from '../../styles/ColorConstants'
import Card from '../common/Card'

// eslint-disable-next-line react/prefer-stateless-function
export class WebViewRadioContainer extends Component {
	constructor( props ) {
		super( props )
		this.webView = null
		this.token = null
	}

	render() {
		return (
			<Card
				id="WebView"
				title="WebView"
				style={{ height: 150, backgroundColor: COLOR.WHITE, margin: 6, borderRadius: 3  }}
			>
				<WebView
					source={{ uri: 'https://ksdt.ucsd.edu/stream.mp3' }}
				/>
			</Card>
		)
	}
}

const mapStateToProps = state => ({})

const ActualWebViewRadioCard = connect(mapStateToProps)(withNavigation(WebViewRadioContainer))
export default ActualWebViewRadioCard