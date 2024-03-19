import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Field } from '../../components/Layouts/Field/Field'
import { useInput } from '../../hooks/UseInput'
import { createUser, login } from '../../store/UserSlice'
import styles from './Auth.module.sass'
export const Auth = () => {
	const [formType, setFormType] = useState('login')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isAuth = useSelector(state => state.userReducer.isAuth)
	const error = useSelector(state => state.userReducer.error)
	const [localError, setLocalError] = useState('')

	const email = useInput('')
	const password = useInput('')
	const userName = useInput('')

	useEffect(() => {
		isAuth && navigate('/dashboard')
	}, [])

	useEffect(() => {
		setLocalError('')
	}, [formType])

	const handleSubmit = async e => {
		e.preventDefault()

		if (!email.value || !email.value.includes('@')) {
			setLocalError('Email указан неверно')
			return
		} else {
			setLocalError('')
		}

		if (!userName) {
			setLocalError('Придумайте имя')
			return
		} else {
			setLocalError('')
		}

		const isUserNameNotValid = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
			userName.value
		)
		if (isUserNameNotValid) {
			setLocalError(
				'Имя содержит некоректные символы (можно только латиницу, кириллицу и цифры)'
			)
			return
		} else {
			setLocalError('')
		}

		if (password.value.length < 6) {
			setLocalError('Пароль должен содержать как минимум 6 символов')
			return
		} else {
			setLocalError('')
		}

		const isPasswordValid = /^(?=.*[a-zA-Z])(?=.*\d)/.test(password.value)
		if (!isPasswordValid) {
			setLocalError(
				'Пароль должен содержать латинские буквы, цифры и специальные символы(!@#$&*~_-)'
			)
			return
		} else {
			setLocalError('')
		}

		if (formType === 'registration') {
			setLocalError('')
			const response = await dispatch(
				createUser({
					email: email.value,
					password: password.value,
					userName: userName.value,
				})
			)
			localStorage.setItem('pass', password.value)
			response.payload.status === 'SUCCESS' && navigate('/confirmEmail')
		}

		if (formType === 'login') {
			setLocalError('')
			const response = await dispatch(
				login({ email: email.value, password: password.value })
			)
			localStorage.setItem('pass', password.value)
			response.payload.status === 'SUCCESS' && navigate('/dashboard')
		}
	}

	return (
		<div className={styles.auth}>
			<h1>
				{formType === 'login' && 'Авторизация'}
				{formType === 'registration' && 'Регистрация'}
			</h1>
			<form onSubmit={e => handleSubmit(e)}>
				<Field field={email} type='E-mail'></Field>

				{formType === 'registration' && (
					<Field field={userName} type='Имя'></Field>
				)}

				<Field field={password} type='Пароль'></Field>
				<span className={styles.error}>
					{error} <br /> {localError}
				</span>
				<button type='submit'>
					{formType === 'login' && 'Войти'}
					{formType === 'registration' && 'Создать'}
				</button>

				<div className={styles.options}>
					{formType === 'login' && (
						<>
							<span onClick={() => navigate('/recover')}>Забыли пароль?</span>
							<span onClick={() => setFormType('registration')}>
								Нет аккаунта?
							</span>
						</>
					)}
					{formType === 'registration' && (
						<span onClick={() => setFormType('login')}>Есть аккаунт?</span>
					)}
				</div>
			</form>
		</div>
	)
}
