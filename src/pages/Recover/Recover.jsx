import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Field } from '../../components/Layouts/Field/Field'
import { RecoverCodeInput } from '../../components/UI/recoverCodeInput/recoverCodeInput'
import { useInput } from '../../hooks/UseInput'
import { resetPassword, setPassword } from '../../store/UserSlice'
import styles from './Recover.module.sass'

export const Recover = () => {
	const [step, setStep] = useState('recoverMail')
	const navigate = useNavigate()

	const dispatch = useDispatch()
	const isAuth = useSelector(state => state.userReducer.isAuth)
	const [userId, setUserId] = useState(null)
	const error = useSelector(state => state.userReducer.error)
	const recoverEmail = useInput('')
	const [recoverCode, setRecoverCode] = useState()
	const newPassword = useInput('')
	const confirmPassword = useInput('')
	const [localError, setLocalError] = useState('')

	const getRecoverCode = code => {
		setRecoverCode(code)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (!recoverEmail.value || !recoverEmail.value.includes('@')) {
			setLocalError('Email указан неверно')
			return
		} else {
			setLocalError('')
		}

		if (step === 'recoverMail') {
			setLocalError('')
			const response = await dispatch(resetPassword(recoverEmail.value))
			if (response.payload.status === 'SUCCESS') {
				setUserId(response.payload)
				setStep('newPassword')
			}
			return
		}

		if (recoverCode.length < 6) {
			setLocalError('Код должен содержать 6 цифр')
			return
		} else {
			setLocalError('')
		}

		if (newPassword.value.length < 6) {
			setLocalError('Пароль должен содержать как минимум 6 символов')
			return
		} else {
			setLocalError('')
		}

		const isPasswordValid =
			/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$&*~_-])[A-Za-z\d!@#$&*~_-]/.test(
				newPassword.value
			)
		if (!isPasswordValid) {
			setLocalError(
				'Пароль должен содержать латинские буквы, цифры и специальные символы(!@#$&*~_-)'
			)
			return
		} else {
			setLocalError('')
		}

		if (step === 'newPassword') {
			setLocalError('')
			const response = await dispatch(
				setPassword({
					email: recoverEmail.value,
					new_password: newPassword.value,
					reset_code: recoverCode,
				})
			)
			response.payload.status === 'SUCCESS' && navigate('/auth')
			return
		}
	}

	return (
		<div className={styles.recover}>
			<h1>Восстановление</h1>
			{step === 'recoverMail' && (
				<form onSubmit={e => handleSubmit(e)}>
					<Field field={recoverEmail} type='E-mail'></Field>
					<span className={styles.hint}>
						Укажите почту, к которой был привязан ваш аккаунт
					</span>
					<span className={styles.error}>
						{error} <br /> {localError}
					</span>
					<button type='submit'>Далее</button>
				</form>
			)}

			{step === 'newPassword' && (
				<form onSubmit={e => handleSubmit(e)}>
					<RecoverCodeInput getRecoverCode={getRecoverCode}></RecoverCodeInput>
					<span className={styles.hint}>
						Ведите код, высланный на указанную почту
					</span>
					<Field field={newPassword} type='Новый пароль'></Field>
					<Field field={confirmPassword} type='Подтвердите пароль'></Field>
					<span className={styles.error}>
						{error} <br /> {localError}
					</span>
					<button type='submit'>Войти</button>
				</form>
			)}
		</div>
	)
}
