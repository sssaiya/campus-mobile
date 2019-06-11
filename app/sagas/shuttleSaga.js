import { call, fork, put, select, takeLatest } from 'redux-saga/effects'
import ShuttleService from '../services/shuttleService'
import { getDistance } from '../util/map'

const getShuttle = state => (state.shuttle)
const shuttleState = state => (state.cards.cards.shuttle)
const getLocation = state => (state.location)

function* updateShuttle() {
	const { active } = yield select(shuttleState)
	if (active) {
		const stopsData = yield call(ShuttleService.FetchMasterStopsNoRoutes)
		const routesData = yield call(ShuttleService.FetchMasterRoutes)
		const initialToggles = {}
		Object.keys(routesData).forEach((key, index) => {
			initialToggles[key] = false
		})
		yield put({ type: 'SET_SHUTTLE', stops: stopsData, routes: routesData, toggles: initialToggles })
	}
}

function* updateShuttleArrivals() {
	const { savedStops, closestStop, toggles } = yield select(getShuttle)

	// Update Arrivals
	if (Array.isArray(savedStops)) {
		// Fetch arrivals for all saved stops
		for (let i = 0; i < savedStops.length; ++i) {
			const stopID = savedStops[i].id
			yield call(fetchArrival, stopID)
		}
		if (closestStop) {
			yield call(fetchArrival, closestStop.id)
		}
	}

	// Update Vehicles
	if (toggles) {
		const toggleKeys = Object.keys(toggles)
		for (let i = 0; i < toggleKeys.length; ++i) {
			const routeKey = toggleKeys[i]
			const route = toggles[routeKey]
			// Update vehicle info if route is turned on
			if (route) {
				yield call(updateVehicles, routeKey)
			}
		}
	}
}

function* updateShuttleClosestStop() {
	const location = yield select(getLocation)
	if (location.permission === 'authorized' && location.position && location.position.coords) {
		const shuttle = yield select(getShuttle)
		const { stops } = shuttle
		const currClosestStop = shuttle.closestStop

		let closestDist = 1000000000
		let closestStop
		let closestSavedIndex = 0

		if (currClosestStop && currClosestStop.savedIndex) {
			closestSavedIndex = currClosestStop.savedIndex
		}

		console.log('closestStop1:')
		console.log(closestStop)

		Object.keys(stops).forEach((stopID, index) => {
			const stop = stops[stopID]
			const distanceFromStop = getDistance(location.position.coords.latitude, location.position.coords.longitude, stop.lat, stop.lon)
			if (distanceFromStop < closestDist) {
				closestStop = Object.assign({}, stop)
				closestDist = distanceFromStop
			}
		})

		console.log('closestStop2:')
		console.log(closestStop)

		closestStop.closest = true
		closestStop.savedIndex = closestSavedIndex

		console.log('closestStop3:')
		console.log(closestStop)

		yield put({ type: 'SET_CLOSEST_STOP', closestStop })
	} else {
		console.log('location.permission:')
		console.log(location.permission)

		console.log('location.position:')
		console.log(location.position)
		
		console.log('location.position.coords:')
		console.log(location.position.coords)
	}
}

function* updateShuttleToggledRoute(action) {
	const { toggles, stops, routes } = yield select(getShuttle)
	const { route } = action

	const newRoute = null
	const newToggles = Object.assign({}, toggles)
	// Performs a deep copy of stops
	const newStops = JSON.parse(JSON.stringify(stops))

	if (toggles[route]) {
		// If route is on, toggle off
		newToggles[route] = false

		// Remove route from every stop
		Object.keys(routes[route].stops).forEach((stop) => {
			if (stops[stop]) {
				const newStop = { ...stops[stop] }
				delete newStop.routes[route]
				/*
				newStops = {
					...newStops,
					newStop
				}
				*/
				newStops[stop] = newStop
			}
		})
	} else {
		// Temporary: Deselect other selected routes
		Object.keys(newToggles).forEach((toggledRoute) => {
			if (newToggles[toggledRoute] && toggledRoute !== route) {
				newToggles[toggledRoute] = false

				// Remove route from every stop
				Object.keys(routes[toggledRoute].stops).forEach((stop) => {
					if (stops[stop]) {
						const newStop = { ...stops[stop] }
						delete newStop.routes[route]
						/*
						newStops = {
							...newStops,
							newStop
						}
						*/
						newStops[stop] = newStop
					}
				})
			}
		})

		// Turn route on
		newToggles[route] = true

		// Add route to stops
		Object.keys(routes[route].stops).forEach((stop) => {
			if (stops[stop]) {
				const newStop = {
					...stops[stop],
					routes: {}
				}
				/*
				newStop.routes[route] = routes[route]
				newStops = {
					...newStops,
					newStop
				}
				*/
				newStop.routes[route] = true
				newStops[stop] = newStop
			}
		})
	}

	yield put({ type: 'SET_TOGGLED_ROUTE', route, newRoute, newToggles, newStops })
}

function* addStop(action) {
	const shuttle = yield select(getShuttle)

	if (Array.isArray(shuttle.savedStops)) {
		const savedStops = shuttle.savedStops.slice()
		const stops = Object.assign({}, shuttle.stops)
		const closestStop = (shuttle.closestStop) ? Object.assign({}, shuttle.closestStop) : null
		let contains = false

		// Make sure stop hasn't already been saved
		for (let i = 0;  i < savedStops.length; ++i) {
			if (savedStops[i].id === action.stopID) {
				contains = true
				break
			}
		}
		if (!contains) {
			savedStops.unshift(stops[action.stopID])
		}

		// Updated closestStop index
		if (closestStop) {
			++closestStop.savedIndex
			yield put({ type: 'SET_CLOSEST_STOP', closestStop })
		}

		yield put({ type: 'CHANGED_STOPS', savedStops })
		yield call(resetScroll)
		yield fork(fetchArrival, action.stopID)
	}
}

function* removeStop(action) {
	const shuttle = yield select(getShuttle)

	if (Array.isArray(shuttle.savedStops)) {
		const savedStops = shuttle.savedStops.slice()
		const closestStop = (shuttle.closestStop) ? Object.assign({}, shuttle.closestStop) : null

		// Remove stop from saved array
		let i
		for (i = 0; i < savedStops.length; ++i) {
			if (savedStops[i].id === action.stopID) {
				savedStops.splice(i, 1)
				break
			}
		}

		if (closestStop) {
			// Update closestStop index
			if (i < closestStop.savedIndex) {
				--closestStop.savedIndex
			}
			yield put({ type: 'SET_CLOSEST_STOP', closestStop })
		}

		yield put({ type: 'CHANGED_STOPS', savedStops })
		yield call(resetScroll)
	}
}

function* orderStops(action) {
	try {
		const { newOrder } = action
		if (Array.isArray(newOrder) && newOrder.length > 0) {
			const { newStops, newClosest } = yield call(doOrder, newOrder)

			yield put({ type: 'CHANGED_STOPS', savedStops: newStops })
			if (newClosest) {
				yield put({ type: 'SET_CLOSEST_STOP', closestStop: newClosest })
			}
			yield call(resetScroll)
		}
	} catch (error) {
		console.log('Error re-ordering stops: ' + error)
	}
}

function doOrder(newOrder) {
	const newStops = []
	let closestStop = null

	if (Array.isArray(newOrder)) {
		for (let i = 0; i < newOrder.length; ++i) {
			if (newOrder[i].closest) {
				// Update closest stop index
				newOrder[i].savedIndex = i
				closestStop = newOrder[i]
			} else {
				newStops.push(newOrder[i])
			}
		}
	}
	return { newStops, newClosest: closestStop }
}

function* resetScroll() {
	yield put({ type: 'SET_SHUTTLE_SCROLL', lastScroll: 0 })
}

function* setScroll(action) {
	yield put({ type: 'SET_SHUTTLE_SCROLL', lastScroll: action.scrollX })
}

function* fetchArrival(stopID) {
	const shuttle = yield select(getShuttle)

	try {
		const arrivals = yield call(ShuttleService.FetchShuttleArrivalsByStop, stopID)

		if (arrivals) {
			// Sort arrivals, should be on lambda?
			arrivals.sort((a, b) => {
				const aSecs = a.secondsToArrival
				const bSecs = b.secondsToArrival

				if ( aSecs < bSecs ) return -1
				if ( aSecs > bSecs) return 1
				return 0
			})

			const stops = {
				...shuttle.stops,
				[stopID]: {
					...shuttle.stops[stopID],
					arrivals
				}
			}

			yield put({ type: 'SET_ARRIVALS', stops })
		}
	} catch (error) {
		console.log('Error fetching arrival for ' + stopID + ': ' + error)
	}
}

// Update vehicles for given route
function* updateVehicles(route) {
	const vehicles = yield call(ShuttleService.FetchVehiclesByRoute, route)
	yield put({
		type: 'SET_VEHICLES',
		route,
		vehicles
	})
}

function* shuttleSaga() {
	yield takeLatest('ADD_STOP', addStop)
	yield takeLatest('REMOVE_STOP', removeStop)
	yield takeLatest('ORDER_STOPS', orderStops)
	yield takeLatest('UPDATE_SHUTTLE', updateShuttle)
	yield takeLatest('UPDATE_SHUTTLE_ARRIVALS', updateShuttleArrivals)
	yield takeLatest('UPDATE_SHUTTLE_CLOSEST_STOP', updateShuttleClosestStop)
	yield takeLatest('UPDATE_SHUTTLE_SCROLL', setScroll)
	yield takeLatest('UPDATE_SHUTTLE_TOGGLED_ROUTE', updateShuttleToggledRoute)
}

export default shuttleSaga
