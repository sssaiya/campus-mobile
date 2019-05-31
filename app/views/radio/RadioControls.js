/* eslint-disable react/jsx-indent */
import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'

const RadioControls = ({
	paused,
	onPause,
	onPlay }) => (
	<View>
		<View>
			{!paused ?
				<TouchableOpacity onPress={onPause}>
					<View>
						<Image source={require('../../assets/images/radio/pause_button.png')} />
					</View>
				</TouchableOpacity> :
				<TouchableOpacity onPress={onPlay}>
					<View>
						<Image source={require('../../assets/images/radio/play_arrow.png')} />
					</View>
				</TouchableOpacity>
			}
		</View>
	</View>
)

export default RadioControls
