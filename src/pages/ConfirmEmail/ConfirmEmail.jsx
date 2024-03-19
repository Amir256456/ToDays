import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RecoverCodeInput } from '../../components/UI/recoverCodeInput/recoverCodeInput'
import { confirmEmail, sendConfirmCode } from '../../store/UserSlice'
import styles from './ConfirmEmail.module.sass'
export const ConfirmEmail = () => {
	const navigate = useNavigate()
	const user = useSelector(state => state.userReducer.user)
	const isAuth = useSelector(state => state.userReducer.isAuth)
	const dispatch = useDispatch()
	const error = useSelector(state => state.userReducer.error)
	const [localError, setLocalError] = useState('')
	const [recoverCode, setRecoverCode] = useState()
	const getRecoverCode = code => {
		setRecoverCode(code)
	}

	useEffect(() => {
		isAuth && navigate('/dashboard')
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()

		if (recoverCode.length < 6) {
			setLocalError('Код должен содержать 6 цифр')
			return
		} else {
			setLocalError('')
		}

		const response = await dispatch(
			confirmEmail({
				user_id: user.id,
				code: recoverCode,
				password: localStorage.getItem('pass'),
			})
		)

		response.payload.status === 'SUCCESS' && navigate('/dashboard')
	}

	useEffect(() => {
		dispatch(
			sendConfirmCode({
				user_id: user.id,
				password: localStorage.getItem('pass'),
			})
		)
	}, [])

	return (
		<div className={styles.confirmEmail}>
			<h1>Подтверждение</h1>
			<form onSubmit={e => handleSubmit(e)}>
				<RecoverCodeInput getRecoverCode={getRecoverCode}></RecoverCodeInput>
				<span className={styles.hint}>
					Ведите код, высланный на указанную почту
				</span>
				<span className={styles.error}>
					{error} <br /> {localError}
				</span>
				<button type='submit'>Далее</button>
			</form>
		</div>
	)
}
