import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { WebView } from 'react-native'
import Card from '../common/Card'

// eslint-disable-next-line react/prefer-stateless-function
export class WebViewCardContainer extends Component {
	render() {
		return (
			<Card
				id="WebView"
				title="WebView"
				style={{ height: 400 }}
			>
				<WebView
					source={{ uri: 'https://www.youtube.com/embed/OCMs-YhSp2o' }}
					style={{ marginTop: 20 }}
				/>
			</Card>
		)
	}
}

const mapStateToProps = state => ({})

const ActualWebViewCard = connect(mapStateToProps)(withNavigation(WebViewCardContainer))
export default ActualWebViewCard
