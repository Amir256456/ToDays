import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from '../pages/Auth/Auth'
import { ConfirmEmail } from '../pages/ConfirmEmail/ConfirmEmail'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import { Home } from '../pages/Home/Home'
import { Recover } from '../pages/Recover/Recover'

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/auth' element={<Auth />}></Route>
				<Route path='/recover' element={<Recover />}></Route>\
				<Route path='/confirmEmail' element={<ConfirmEmail />}></Route>
				<Route path='/dashboard' element={<Dashboard />}></Route>
			</Routes>
		</BrowserRouter>
	)
}
