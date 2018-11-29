import React, { Component } from 'react'
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Modal } from 'react-native'
import { withNavigation } from 'react-navigation'
import SetDates from './SetDates'

class SetDatesContainer extends Component {
	constructor(props) {
		super(props)

		this.state = { modalVisible: false }
	}

	setModal(visibility) {
		this.setState({ modalVisible: visibility })
	}

	render() {
		return(
			<View>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
				 >
				 	<TouchableOpacity onPress={() => {
						this.setModal(!this.state.modalVisible);
						console.log("closed");
					}} style={{ backgroundColor: 'blue', width: 50, height: 50, alignSelf: 'center' }}>
				 		<SetDates />
					</TouchableOpacity>
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
