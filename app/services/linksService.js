const AppSettings = require('../AppSettings')

const LinksService = {
	FetchLinks() {
		return fetch(AppSettings.LINKS_API_URL, {
			headers: { 'Cache-Control': 'no-cache' }
		})
			.then(response => response.json())
			.catch((err) => {
				console.log('Error fetching linkslinks' + err)
				return null
			})
	}
}

export default LinksService
