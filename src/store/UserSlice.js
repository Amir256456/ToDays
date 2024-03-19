import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import UserService from '../services/UserService'

const initialState = {
	user: {},
	userLogo: '',
	error: '',
	isLoading: false,
	isAuth: false,
}

export const createUser = createAsyncThunk(
	'user/createUser',
	async function ({ email, password, userName }) {
		const response = await UserService.createUser(email, password, userName)
		return response.data
	}
)

export const sendConfirmCode = createAsyncThunk(
	'user/sendConfirmCode',
	async function ({ user_id, password }) {
		const response = await UserService.sendConfirmCode(user_id, password)
		return response.data
	}
)

export const confirmEmail = createAsyncThunk(
	'user/confirmEmail',
	async function ({ user_id, code, password }) {
		const response = await UserService.confirmEmail(user_id, code, password)
		return response.data
	}
)

export const login = createAsyncThunk(
	'user/login',
	async function ({ email, password }) {
		const response = await UserService.login(email, password)
		return response
	}
)

export const resetPassword = createAsyncThunk(
	'user/resetPassword',
	async function (email) {
		const response = await UserService.resetPassword(email)
		return response.data
	}
)

export const setPassword = createAsyncThunk(
	'user/setPassword',
	async function ({ email, new_password, reset_code }) {
		const response = await UserService.setPassword(
			email,
			new_password,
			reset_code
		)
		return response.data
	}
)

export const getUserLogo = createAsyncThunk(
	'user/getUserLogo',
	async function ({ user_id, password }) {
		const response = await UserService.getUserLogo(user_id, password)
		const blob = await response.blob()
		return URL.createObjectURL(blob)
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state, action) => {
			localStorage.setItem('user', '')
			state.user = {}
			state.isAuth = false
		},
		setAuth: (state, action) => {
			state.user = action.payload
			state.isAuth = true
		},
		setCurrency: (state, action) => {
			state.user.currency = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(createUser.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(createUser.fulfilled, (state, action) => {
			if (action.payload.status === 'SUCCESS') {
				localStorage.setItem('user', JSON.stringify(action.payload.data))
				state.user = action.payload.data
				state.error = ''
			} else {
				if (action.payload.message === 'User with this email already exists') {
					state.error = 'Пользователь с таким e-mail уже существует'
				}
			}

			state.isLoading = false
		})
		builder.addCase(createUser.rejected, (state, action) => {
			state.isLoading = false
		})

		builder.addCase(login.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(login.fulfilled, (state, action) => {
			if (action.payload.status === 'SUCCESS') {
				localStorage.setItem('user', JSON.stringify(action.payload.data))
				state.user = action.payload.data
				state.isAuth = true
				state.error = ''
			} else {
				if (action.payload.message === 'User not found') {
					state.error = 'Данные указаны неверно'
				}
			}

			state.isLoading = false
		})
		builder.addCase(login.rejected, (state, action) => {
			state.isLoading = false
		})

		builder.addCase(sendConfirmCode.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(sendConfirmCode.fulfilled, (state, action) => {
			state.isLoading = false
		})
		builder.addCase(sendConfirmCode.rejected, (state, action) => {
			state.isLoading = false
		})

		builder.addCase(confirmEmail.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(confirmEmail.fulfilled, (state, action) => {
			if (action.payload.status === 'SUCCESS') {
				state.user = action.payload.data
				state.isAuth = true
				state.error = ''
			} else {
				if (action.payload.message === 'User not found') {
					state.error = 'Неверный код подтверждения'
				}
			}

			state.isLoading = false
		})
		builder.addCase(confirmEmail.rejected, (state, action) => {
			state.isLoading = false
		})

		builder.addCase(resetPassword.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(resetPassword.fulfilled, (state, action) => {
			if (action.payload.message === 'User not found') {
				state.error = 'К данному Email не привязан аккаунт'
			}
			state.isLoading = false
		})
		builder.addCase(resetPassword.rejected, (state, action) => {
			state.isLoading = false
		})

		builder.addCase(getUserLogo.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(getUserLogo.fulfilled, (state, action) => {
			state.userLogo = action.payload
			state.isLoading = false
		})
		builder.addCase(getUserLogo.rejected, (state, action) => {
			state.isLoading = false
		})

		builder.addCase(setPassword.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(setPassword.fulfilled, (state, action) => {
			if (action.payload.status === 'ERROR') {
				if (action.payload.message === 'User not found') {
					state.error = 'Неверный код подтверждения'
				}
				return
			}
			state.error = ''
			state.isLoading = false
		})
		builder.addCase(setPassword.rejected, (state, action) => {
			state.isLoading = false
		})
	},
})

export const { logout, setAuth, setCurrency } = userSlice.actions
export default userSlice.reducer
