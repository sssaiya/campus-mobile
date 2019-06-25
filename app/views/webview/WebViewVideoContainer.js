import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WebView } from 'react-native'
import { withNavigation } from 'react-navigation'
import COLOR from '../../styles/ColorConstants'
import Card from '../common/Card'

// eslint-disable-next-line react/prefer-stateless-function
export class WebViewVideoContainer extends Component {
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
				style={{ height: 300, backgroundColor: COLOR.WHITE, margin: 6, borderRadius: 3  }}
			>
				<WebView
					source={{ uri: 'https://www.youtube.com/embed/trcvoFWPf9k' }}
				/>
			</Card>
		)
	}
}

const mapStateToProps = state => ({})

const ActualWebViewVideoCard = connect(mapStateToProps)(withNavigation(WebViewVideoContainer))
export default ActualWebViewVideoCard