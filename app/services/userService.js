import { authorizedFetch } from '../util/auth'

const { MP_REGISTRATION_API_URL } = require('../AppSettings')

const userService = {
	* FetchUserProfile() {
		try {
			const profile = JSON.parse(yield authorizedFetch(MP_REGISTRATION_API_URL + '/profile'))

			if (profile) {
				return profile
			} else {
				throw new Error('FetchUserProfile: profile is null')
			}
		} catch (error) {
			throw error
		}
	},

	* PostUserProfile(profile) {
		try {
			const result = yield authorizedFetch(MP_REGISTRATION_API_URL + '/profile', profile)
			if (result === 'Success') {
				return result
			} else {
				throw new Error('PostUserProfile: Unable to update user profile: ' + result)
			}
		} catch (error) {
			throw error
		}
	},
}

export default userService
