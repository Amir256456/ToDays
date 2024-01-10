import { ChevronLeft, LogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import star from '../../images/star.webp'
import userLogo from '../../images/user.webp'
import styles from './Dashboard.module.sass'
export const Dashboard = () => {
	return (
		<div className={styles.dashboard}>
			<div className={styles.container}>
				<nav>
					<ul>
						<li>
							<Link to='/ToDays/' className={styles.link}>
								<ChevronLeft />
								Главная
							</Link>
							<Link
								to='/ToDays/'
								className={`${styles.link} ${styles.onlyIcon}`}
							>
								<ChevronLeft />
							</Link>
						</li>
						<li>Личный кабинет</li>
						<li>
							<Link to='/ToDays/' className={styles.link}>
								<LogOut className={styles.icon} />
								Выйти
							</Link>
							<Link
								to='/ToDays/'
								className={`${styles.link} ${styles.onlyIcon}`}
							>
								<LogOut className={styles.icon} />
							</Link>
						</li>
					</ul>
				</nav>
				<div className={styles.info}>
					<h3>
						<img src={star} /> 100
					</h3>
					<img className={styles.userLogo} src={userLogo} />
					<h2>Konstantin konstantinov</h2>
				</div>
				<div className={styles.transactions}>
					<h3>История транзакций</h3>
					<div className={styles.table}>
						<div className={styles.thead}>
							<div className={styles.name}>Название</div>
							<div className={styles.cash}>Сумма</div>
							<div className={styles.product}>Товар</div>
						</div>
						<div className={styles.record}>
							<div className={styles.name}>Название</div>
							<div className={styles.cash}>Сумма</div>
							<div className={styles.product}>Товар</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
