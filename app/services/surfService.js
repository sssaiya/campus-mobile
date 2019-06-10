const AppSettings = require('../AppSettings')

const SurfService = {
	FetchSurf() {
		return fetch(AppSettings.SURF_API_URL)
			.then(response => response.json())
			.then(responseData => responseData)
			.catch((err) => {
				console.log('SurfService: FetchSurf: ' + err)
				return null
			})
	},
}

export default SurfService
