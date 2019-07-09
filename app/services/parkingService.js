const AppSettings = require('../AppSettings')

const ParkingService = {
	FetchParking() {
		return fetch(AppSettings.PARKING_API_URL)
			.then(response => response.json())
			.then(responseData => responseData)
			.catch((err) => {
				console.log('Error fetching parking lots: ' + err)
				return null
			})
	},
	FetchParkingSpotTypes() {
		return fetch(AppSettings.PARKING_SPOT_TYPES_API_URL)
			.then(response => response.json())
			.then(responseData => responseData)
			.catch((err) => {
				console.log('Error fetching parking lot types: ' + err)
				return null
			})
	}
}
export default ParkingService
