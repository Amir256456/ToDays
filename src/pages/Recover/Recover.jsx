import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field } from '../../components/Layouts/Field/Field'
import { RecoverCodeInput } from '../../components/UI/recoverCodeInput/recoverCodeInput'
import { useInput } from '../../hooks/UseInput'
import styles from './Recover.module.sass'

export const Recover = () => {
	const [step, setStep] = useState('recoverMail')
	const navigate = useNavigate()

	const recoverEmail = useInput('')
	const [recoverCode, setRecoverCode] = useState()
	const newPassword = useInput('')
	const confirmPassword = useInput('')

	const getRecoverCode = code => {
		setRecoverCode(code)
	}

	return (
		<div className={styles.recover}>
			<h1>Восстановление</h1>
			{step === 'recoverMail' && (
				<form>
					<Field field={recoverEmail} type='E-mail'></Field>
					<span className={styles.hint}>
						Укажите почту, к которой был привязан ваш аккаунт
					</span>
					{/* <span className={styles.error}>Почта не найдена</span> */}
					<button onClick={() => setStep('recoverCode')}>Далее</button>
				</form>
			)}

			{step === 'recoverCode' && (
				<form>
					<RecoverCodeInput getRecoverCode={getRecoverCode}></RecoverCodeInput>
					<span className={styles.hint}>
						Ведите код, высланный на указанную почту
					</span>
					{/* <span className={styles.error}>Неверный код</span> */}
					<button onClick={() => setStep('newPassword')}>Далее</button>
				</form>
			)}

			{step === 'newPassword' && (
				<form>
					<Field field={newPassword} type='Новый пароль'></Field>
					<Field field={confirmPassword} type='Подтвердите пароль'></Field>
					{/* <span className={styles.error}>Пароли не совпадают</span> */}
					<button onClick={() => navigate('/dashboard')}>Войти</button>
				</form>
			)}
		</div>
	)
}
