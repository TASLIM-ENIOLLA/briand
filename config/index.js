const dev = process.env.NODE_ENV !== 'production'

export const server = {
	frontend: {
		url: (
			(dev)
			? 'http://localhost:3000/'
			: ''
		)
	},
	backend: {
		url: (
			(dev)
			? 'http://localhost:80/praise-project/'
			: ''
		)
	}
}

export const api_routes = {
	login: `${server.backend.url}php/processes/Login.php`,
	register: `${server.backend.url}php/processes/Register.php`,
	business_category: `${server.backend.url}php/processes/GetBusinessCategory.php`,
	user_data: `${server.backend.url}php/processes/GetUserData.php`,
	user: {}
}

export const cookie_name = 'PRAISE_PROJECT'