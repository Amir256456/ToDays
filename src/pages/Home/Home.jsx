import React, { useState } from 'react'
import { Benefits } from '../../components/Benefits/Benefits'
import { Credits } from '../../components/Credits/Credits'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import Plans from '../../components/Plans/Plans'

export const Home = () => {
	const [wasScrolled, setWasScrolled] = useState('')

	const handleScroll = () => {}

	return (
		<>
			<Header onClick={() => setWasScrolled(prev => prev + '1')}></Header>

			<main>
				<Benefits></Benefits>
				<Plans wasScrolled={wasScrolled}></Plans>
				<Credits></Credits>
			</main>

			<Footer></Footer>
		</>
	)
}
