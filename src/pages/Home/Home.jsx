import React from 'react'
import { Benefits } from '../../components/Benefits/Benefits'
import { Credits } from '../../components/Credits/Credits'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { Plans } from '../../components/Plans/Plans'
import styles from './Home.module.sass'

export const Home = () => {
	return (
		<>
			<Header></Header>

			<main>
				<div className={styles.container}>
					<Benefits></Benefits>
				</div>
				<Plans></Plans>
				<Credits></Credits>
			</main>

			<Footer></Footer>
		</>
	)
}
