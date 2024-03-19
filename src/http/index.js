import axios from 'axios'

export const API_URL = 'https://togethergame.ru:21001'

const $api = axios.create({
	baseURL: API_URL,
})

$api.interceptors.request.use(config => {
	if (config.method === 'post') {
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	}

	return config
})

export default $api
