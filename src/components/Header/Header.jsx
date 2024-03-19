import { LogIn } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/logo.webp'
import styles from './Header.module.sass'
export const Header = ({ onClick }) => {
	const navigate = useNavigate()

	const isAuth = useSelector(state => state.userReducer.isAuth)

	return (
		<header>
			<nav>
				<ul>
					<li></li>
					<li>
						<img src={logo} alt='Logo' />
					</li>
					<li>
						<button
							className={styles.userBtn}
							onClick={() =>
								isAuth ? navigate('/dashboard') : navigate('/auth')
							}
						>
							Личный кабинет
						</button>

						<button
							className={styles.userLogo}
							onClick={() =>
								isAuth ? navigate('/dashboard') : navigate('/auth')
							}
						>
							<LogIn />
						</button>
					</li>
				</ul>
			</nav>

			<h1>
				<span className={styles.gradientText}>Премиум</span> - идеальное решение
				для настоящих ценителей времени!
			</h1>
			<span className={styles.subtitle}>
				Повышайте свою продуктивность с подпиской - ваш ключ к невероятным
				приключениям
			</span>
			<button className={styles.subscribeBtn} onClick={onClick}>
				Подписывайся
			</button>
		</header>
	)
}
