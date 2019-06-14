const AppSettings = require('../AppSettings')

// .then(responseData => responseData)

const ShuttleService = {
	FetchShuttleArrivalsByStop(stopID) {
		return fetch(AppSettings.SHUTTLE_STOPS_API_URL + stopID + '/arrivals')
			.then(response => response.json())
			.catch(err => console.log('FetchShuttleArrivalsByStop:' + err))
	},

	FetchVehiclesByRoute(routeID) {
		return fetch(AppSettings.SHUTTLE_VEHICLES_API_URL + routeID)
			.then(response => response.json())
			.catch(err => console.log('FetchVehiclesByRoute:' + err))
	},

	FetchMasterStopsNoRoutes() {
		return fetch(AppSettings.SHUTTLE_STOPS_MASTER)
			.then(response => response.json())
			.catch(err => console.log('FetchMasterStopsNoRoutes:' + err))
	},

	FetchMasterRoutes() {
		return fetch(AppSettings.SHUTTLE_ROUTES_MASTER)
			.then(response => response.json())
			.catch(err => console.log('FetchMasterRoutes:' + err))
	},
}

export default ShuttleService