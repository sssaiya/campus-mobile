/* eslint-disable space-before-blocks */
/* eslint-disable react/no-unused-state */
/* eslint-disable handle-callback-err */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable global-require */
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Player } from 'react-native-audio-toolkit'
import CSS from '../../styles/css'
import Card from '../common/Card'
import RedDot from '../common/RedDot'
import RadioControls from './RadioControls'
import ColorConstants from '../../styles/ColorConstants'

class RadioCard extends Component {
	player: Player | null

	constructor(props) {
		super(props)
		this.state = ({
			error: null,
			paused: true,
			currentlyPlaying: '',
			upNext: ''
		})
	}

	componentWillMount() {
		this.player = null
		this._reloadPlayer()
	}

	_play(){
    this.player.play(() => {
      this.setState({ paused: true })
    })
  }

  _pause(){
    this.player.pause(() => {
      this.setState({ paused: false })
    })
  }
	
	_reloadPlayer() {
		if (this.player) {
		  this.player.destroy()
		}
	
		this.player = new Player('https://ksdt.ucsd.edu/stream.mp3', {
		  autoDestroy: false
		}).prepare((err) => {
		  if (err) {
			console.log('error at _reloadPlayer():')
			console.log(err)
		  } 
		})
	}

	render() {
		return (
			<Card
				id="radio"
				title="KSDT Radio"
			>
				<View style={{ flexDirection: 'row', alignItems: 'space-between' }}>
					<View style={{ justifyContent: 'space-evenly', alignItems: 'baseline' }}>
						<Image source={require('../../assets/images/radio/ksdt.png')} />
						<Text>{this.state.currentlyPlaying}</Text>
						<Text style={{ color: ColorConstants.DMGREY }}>Coming up next: {this.state.upNext}</Text>
					</View>
					<View style={{ flexDirection: 'column', paddingLeft: 15 }}>
						<View style={{ flexDirection: 'row' }}>
							<RedDot dotSize={20} dotStyle={{ right: 2, top: -40, position: 'relative' }} />
							<Text>Listen Live</Text>
						</View>
						<RadioControls
							onPlay={() => {
								this._pause()
							}
							}
							onPause={() => {
								this._play()
							}
							}
							paused={this.state.paused}
						/>
					</View>
				</View>
			</Card>
		)
	}
}

export default withNavigation(RadioCard)