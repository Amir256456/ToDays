import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecoverCodeInput } from '../../components/UI/recoverCodeInput/recoverCodeInput'
import styles from './ConfirmEmaul.module.sass'
export const ConfirmEmail = () => {
	const navigate = useNavigate()

	const [recoverCode, setRecoverCode] = useState()
	const getRecoverCode = code => {
		setRecoverCode(code)
	}

	return (
		<div className={styles.confirmEmail}>
			<h1>Подтверждение</h1>
			<form>
				<RecoverCodeInput getRecoverCode={getRecoverCode}></RecoverCodeInput>
				<span className={styles.hint}>
					Ведите код, высланный на указанную почту
				</span>
				{/* <span className={styles.error}>Неверный код</span> */}
				<button onClick={() => navigate('/ToDays/dashboard')}>Далее</button>
			</form>
		</div>
	)
}
