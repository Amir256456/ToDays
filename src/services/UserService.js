import $api from '../http'

export default class UserService {
	static async createUser(email, password, name) {
		const params = new URLSearchParams()
		params.append('email', String(email))
		params.append('password', String(password))
		params.append('name', String(name))
		return $api.post('/user/create/', params)
	}

	static async sendConfirmCode(user_id, password) {
		const params = new URLSearchParams()
		params.append('user_id', String(user_id))
		params.append('password', String(password))
		return $api.post('/user/sendEmailConfirmCode/', params)
	}

	static async confirmEmail(user_id, code, password) {
		const params = new URLSearchParams()
		params.append('code', String(code))
		params.append('user_id', Number(user_id))
		params.append('password', String(password))
		return $api.post('/user/confirmEmail/', params)
	}

	static async login(email, password) {
		const response = await fetch(
			`https://togethergame.ru:21001/user/getInfo/?password=${password}&email=${email}`
		)
		const data = await response.json()
		return data
	}

	static async resetPassword(email) {
		const params = new URLSearchParams()
		params.append('email', String(email))
		return $api.post('/user/resetPassword/', params)
	}

	static async setPassword(email, new_password, reset_code) {
		const params = new URLSearchParams()
		params.append('email', String(email))
		params.append('new_password', String(new_password))
		params.append('reset_code', String(reset_code))
		return $api.post('/user/setPassword/', params)
	}

	static async getUserLogo(user_id, password) {
		let config = {
			responseType: 'blob',
		}
		const params = { user_id: user_id, password: password }
		return $api.get('/user/getPhoto', { params }, config)
	}

	static async getUserInfo(user_id, email, password) {
		const params = { user_id: user_id, password: password, email: email }
		return $api.get('/user/getInfo', { params })
	}

	static async buy(user, purchaseName, price) {
		const params = new URLSearchParams()
		params.append('userId', Number(user.id))
		params.append('password', String(localStorage.getItem('pass')))
		params.append('purchaseName', String(purchaseName))
		params.append('price', Number(price) * 100)
		params.append('pageView', 'DESKTOP')
		params.append('email', String(user.email))
		return $api.post('/payment/registerOrder/', params)
	}

	static async checkOrders(userId) {
		const params = new URLSearchParams()
		params.append('userId', Number(userId))
		params.append('password', String(localStorage.getItem('pass')))
		return $api.post('/payment/checkOrders/', params)
	}

	static async getPurchasesHistory(user_id) {
		const params = { user_id: user_id }
		return $api.get('payment/getInfo', { params })
	}
}
