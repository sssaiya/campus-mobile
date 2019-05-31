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
			playPauseButton: 'Preparing...',
      		stopButtonDisabled: true,
     		playButtonDisabled: true,
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
	
	  _updateState(err) {
		this.setState({
		  playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',
	
		  stopButtonDisabled: !this.player || !this.player.canStop,
		  playButtonDisabled: !this.player || !this.player.canPlay,
		})
	  }
	
	  _playPause() {
		this.player.playPause((err, paused) => {
		  if (err) {
			this.setState({
			  error: err.message
			})
		  }
		  this._updateState()
		})
	  }
	
	  _stop() {
		this.player.stop(() => {
		  this._updateState()
		});
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
	
		  this._updateState()
		});
	
		this._updateState()
	
		this.player.on('ended', () => {
		  this._updateState()
		})
		this.player.on('pause', () => {
		  this._updateState()
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
								this.setState({ paused: false })
								this._playPause()
							}
							}
							onPause={() => {
								this.setState({ paused: true })
								this._playPause()
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