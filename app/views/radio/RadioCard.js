/* eslint-disable global-require */
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Player } from 'react-native-audio-toolkit';
import CSS from '../../styles/css'
import Card from '../common/Card'
import RedDot from '../common/RedDot'
import RadioControls from './RadioControls'

class RadioCard extends Component {
	constructor(props) {
		super(props)
		this.state = ({
			paused: true,
			currentlyPlaying: '',
			upNext: ''
		})
		this.player = new Player('ksdt.ucsd.edu/stream.mp3',{ continuesToPlayInBackground: false })
	}

	render() {
		return(
			<Card 
				id="radio"
				title="KSDT Radio"
			>
				<View style={{ flexDirection: 'column' }}>
					<View>
						<Image source={require('../../assets/images/radio/ksdt.png')} />
						<Text>{this.state.currentlyPlaying}</Text>
						<Text>Coming up next: {this.state.upNext}</Text>
					</View>
					<View>
						<RedDot dotSize={20} dotStyle={{ right: 2, top: 2, position: 'absolute' }} />
					</View>
					<RadioControls
						onPlay={() => {
							this.setState({ paused: false })
							this.player.play()
						}
						}
						onPause={() => {
							this.setState({ paused: true })
							this.player.pause()
						}
						}
						paused={this.state.paused}
					/>
				</View>
			</Card>
		)
	}
}

export default withNavigation(RadioCard)