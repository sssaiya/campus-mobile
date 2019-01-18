import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, Text, Modal } from 'react-native'
import { withNavigation } from 'react-navigation'
import SetDates from './SetDates'
import css from '../../../styles/css'
import LAYOUT from '../../../styles/LayoutConstants'

class SetDatesContainer extends Component {
	constructor(props) {
		super(props)

		this.state = { modalVisible: false }
		this.handler = this.handler.bind(this)
	}

	setModal(visibility) {
		this.setState({ modalVisible: visibility })
	}

	handler() {
		this.setModal(!this.state.modalVisible)
	}

	render() {
		return (
			<View>
				<Modal
					animationType="none"
					transparent={true}
					visible={this.state.modalVisible}
					style={css.notifications_set_date_container_modal}
				>
					<View
						style={css.notifications_set_date_container}
					>
						<SetDates onTouch={this.handler} />
					</View>
				</Modal>
				<TouchableWithoutFeedback onPress={() => {
					this.setModal(!this.state.modalVisible)
				}}
				>
					<View>
						<Text>
							M-F
						</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		)
	}
}

export default SetDatesContainer
