import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppRouter } from './router/AppRouter'
import { setAuth } from './store/UserSlice'
import './styles/App.module.sass'
function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		if (localStorage.getItem('user')) {
			if (localStorage.getItem('user') != '') {
				const user = JSON.parse(localStorage.getItem('user'))
				Object.keys(user).length !== 0 && dispatch(setAuth(user))
			}
		}
	}, [])

	return <AppRouter></AppRouter>
}

export default App
