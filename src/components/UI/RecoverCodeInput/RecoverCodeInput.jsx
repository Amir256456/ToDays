import React, { useEffect, useRef, useState } from 'react'
import styles from './RecoverCodeInput.module.sass'

export const RecoverCodeInput = ({ getRecoverCode }) => {
	let [code, setCode] = useState([
		{ value: null, id: 0 },
		{ value: null, id: 1 },
		{ value: null, id: 2 },
		{ value: null, id: 3 },
		{ value: null, id: 4 },
		{ value: null, id: 5 },
	])

	const inputRefs = useRef([])

	useEffect(() => {
		getRecoverCode(code.map(a => a.value).join(''))
	}, [code])

	return (
		<div className={styles.recoverCode}>
			{code.map(digit => (
				<input
					ref={element => {
						inputRefs.current[digit.id] = element
					}}
					key={digit.id}
					type='number'
					maxLength={1}
					onKeyDown={e => {
						e.keyCode == 8 &&
							!digit.value &&
							digit.id != 0 &&
							inputRefs.current[digit.id - 1].focus()

						e.target.value = e.keyCode == 69 ? null : e.target.value
					}}
					onChange={e => {
						e.target.value =
							e.target.value >= 10 ? e.target.value[1] : e.target.value
						e.target.value =
							e.target.value.length > 1 ? e.target.value[1] : e.target.value
						digit.id != 5 &&
							e.target.value &&
							inputRefs.current[digit.id + 1].focus()

						return setCode(
							code.map(number =>
								number.id === digit.id
									? {
											...number,
											value: e.target.value,
									  }
									: number
							)
						)
					}}
					value={digit.value ? digit.value : ''}
				/>
			))}
		</div>
	)
}
