import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field } from '../../components/Layouts/Field/Field'
import { useInput } from '../../hooks/UseInput'
import styles from './Auth.module.sass'
export const Auth = () => {
	const [formType, setFormType] = useState('login')
	const navigate = useNavigate()

	const email = useInput('')
	const password = useInput('')
	const userName = useInput('')

	return (
		<div className={styles.auth}>
			{formType === 'login' && (
				<>
					<h1>Авторизация</h1>
					<form>
						<Field field={email} type='E-mail'></Field>
						<Field field={password} type='Пароль'></Field>
						{/* <span className={styles.error}>
							Почта или пароль введены неверно
						</span> */}
						<button onClick={() => navigate('/ToDays/dashboard')}>Войти</button>
						<div className={styles.options}>
							<span onClick={() => navigate('/ToDays/recover')}>
								Забыли пароль?
							</span>
							<span onClick={() => setFormType('registration')}>
								Нет аккаунта?
							</span>
						</div>
					</form>
				</>
			)}

			{formType === 'registration' && (
				<>
					<h1>Регистрация</h1>
					<form>
						<Field field={email} type='E-mail'></Field>
						<Field field={userName} type='Имя'></Field>
						<Field field={password} type='Пароль'></Field>
						{/* <span className={styles.error}>
							Почта, имя или пароль введены неверно
						</span> */}
						<button onClick={() => navigate('/ToDays/confirmEmail')}>
							Создать
						</button>
						<div className={styles.options}>
							<span onClick={() => setFormType('login')}>Есть аккаунт?</span>
						</div>
					</form>
				</>
			)}
		</div>
	)
}
