import styles from './Field.module.sass'

export const Field = ({ field, type }) => {
	return (
		<div className={styles.field}>
			<label>{type}</label>
			<input
				value={field.value}
				onChange={field.onChange}
				type={`${type === 'password' ? 'password' : 'text'}`}
			/>
		</div>
	)
}
