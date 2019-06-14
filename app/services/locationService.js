const positionOptions = {
	enableHighAccuracy: false,
	timeout: 5000,
}

const LocationService = {
	GetCurrentPosition() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position) => { resolve(position) },
				(error) => { reject(error) },
				positionOptions
			)
		})
	},
}

export default LocationService
