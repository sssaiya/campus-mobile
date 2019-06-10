import React from 'react'
import { ScrollView } from 'react-native'
import UserAccount from './user/UserAccount'
import ProfileItem from './ProfileItem'
import AppSettings from '../../AppSettings'

const PreferencesView = () => (
	<ScrollView>
		<UserAccount />
		<ProfileItem title="Notifications" iconPack="FontAwesome" icon="bell-o" linkType="internal" link="NotificationTopics" />
		<ProfileItem title="Cards" iconPack="MaterialIcons" icon="reorder" linkType="internal" link="CardPreferences" />
		<ProfileItem title="Feedback" iconPack="Entypo" icon="new-message" linkType="internal" link="Feedback" />
		<ProfileItem title="Privacy Policy" iconPack="Feather" icon="lock" linkType="external" link={AppSettings.PRIVACY_POLICY_URL} />
	</ScrollView>
)

export default PreferencesView
