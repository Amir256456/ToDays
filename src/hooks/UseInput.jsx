import { useState } from 'react'

export const useInput = initialState => {
	const [value, setValue] = useState(initialState)

	const onChange = e => {
		setValue(e.currentTarget.value)
	}

	return { value, onChange }
}
