import React, { Component } from 'react'
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Modal } from 'react-native'
import { withNavigation } from 'react-navigation'
import SetDates from './SetDates'
import LAYOUT from '../../../styles/LayoutConstants'

class SetDatesContainer extends Component {
	constructor(props) {
		super(props)

		this.state = { modalVisible: false }
	}

	setModal(visibility) {
		if(visibility)
		{
			this.setState({ modalVisible: visibility })
		}
	}

	render() {
		return(
			<View>
				<Modal
					animationType="none"
					transparent={true}
					visible={this.state.modalVisible}
					style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
				 >
				 	<View
						style={{ backgroundColor: 'rgba(19, 22, 22, 0.79)', width: LAYOUT.WINDOW_WIDTH, height: LAYOUT.WINDOW_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
				 		<SetDates />
					</View>
				 </Modal>
				<TouchableWithoutFeedback onPress={() => {
					this.setModal(!this.state.modalVisible);
					console.log("test");
				}}>
					<View>
						<Text>
							M-F
						</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

export default SetDatesContainer
