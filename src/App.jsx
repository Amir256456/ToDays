import Benefits from './components/Benefits/Benefits'
import Credits from './components/Credits/Credits'
import Header from './components/Header/Header'
import Plans from './components/Plans/Plans'
import styles from './styles/App.module.sass'
function App() {
	return (
		<>
			<Header></Header>
			<div className={styles.container}>
				<main>
					<Benefits></Benefits>
					<Plans></Plans>
					<Credits></Credits>
				</main>
			</div>
		</>
	)
}

export default App
