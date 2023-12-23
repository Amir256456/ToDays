import React from 'react'
import logo from '../../images/logo.webp'
import user from '../../images/user.webp'
import styles from './Header.module.sass'

const Header = () => {
	return (
		<header>
			<nav>
				<ul>
					<li></li>
					<li>
						<img src={logo} alt='Logo' />
					</li>
					<li>
						<button className={styles.userBtn}>
							Константин <img src={user}></img>
						</button>

						<button className={styles.userLogo}>
							<img src={user}></img>
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
			<button className={styles.subscribeBtn}>Подписывайся</button>
		</header>
	)
}

export default Header
