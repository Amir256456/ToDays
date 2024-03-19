import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import styles from './Field.module.sass'
export const Field = ({ field, type }) => {
	const [isPasswordVisible, setPasswordVisible] = useState(false)
	return (
		<div className={styles.field}>
			<label>{type}</label>
			{String(type).includes('Пароль') ? (
				<>
					{' '}
					<input
						value={field.value}
						onChange={field.onChange}
						type={`${isPasswordVisible ? 'text' : 'password'}`}
					/>
					{isPasswordVisible ? (
						<Eye
							className={styles.icon}
							onClick={() => setPasswordVisible(false)}
						></Eye>
					) : (
						<EyeOff
							className={styles.icon}
							onClick={() => setPasswordVisible(true)}
						></EyeOff>
					)}
				</>
			) : (
				<input value={field.value} onChange={field.onChange} type='text' />
			)}
		</div>
	)
}
