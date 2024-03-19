import { ChevronLeft, LogOut } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import star from '../../images/star.webp'
import UserService from '../../services/UserService.js'
import { logout } from '../../store/UserSlice'
import transactionName from '../../utils/transactions.js'
import styles from './Dashboard.module.sass'
export const Dashboard = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector(state => state.userReducer.user)
	const [userLogo, setUserLogo] = useState()
	const [transactionsHistory, setTransactionsHistory] = useState()
	const [currency, setCurrency] = useState(0)
	const logoutUser = () => {
		dispatch(logout())
		navigate('/')
	}

	useEffect(() => {
		if (Object.keys(user).length === 0) navigate('/auth')
	}, [])

	const getUserInformation = async () => {
		const response = await UserService.getUserInfo(
			user.id,
			user.email,
			localStorage.getItem('pass')
		)
		response.data.status !== 'ERROR' && setCurrency(response.data.data.currency)
	}

	const getUserPhoto = async () => {
		const response = await fetch(
			`https://togethergame.ru:21001/user/getPhoto/?user_id=${
				user.id
			}&password=${localStorage.getItem('pass')}`
		)
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const blob = await response.blob()
		setUserLogo(URL.createObjectURL(blob))
	}

	const getPurchases = async () => {
		const res = await UserService.getPurchasesHistory(user.id)
		console.log(res.data.data)
		setTransactionsHistory(
			res.data.data
				.filter(transaction => transaction.status === 'SUCCESSFUL')
				.reverse()
		)
	}

	const checkOrders = async () => {
		const res = await UserService.checkOrders(user.id)
		res.data.status != 'ERROR' && getPurchases()
		res.data.status != 'ERROR' && getUserInformation()
	}

	useEffect(() => {
		if (Object.keys(user).length != 0) {
			getUserPhoto()
			checkOrders()
			getPurchases()
			getUserInformation()
		}
	}, [user])

	useEffect(() => {
		if (Object.keys(user).length != 0) {
			getUserPhoto()
			checkOrders()
			getPurchases()
			getUserInformation()
		}
	}, [])

	const dateToString = transactionDate => {
		let date = new Date(transactionDate * 1000)

		return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${
			date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
		}.${date.getFullYear()} ${
			date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
		}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${
			date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
		}`
	}

	return (
		<div className={styles.dashboard}>
			<div className={styles.container}>
				<nav>
					<ul>
						<li>
							<Link to='/' className={styles.link}>
								<ChevronLeft />
								Главная
							</Link>
							<Link to='/' className={`${styles.link} ${styles.onlyIcon}`}>
								<ChevronLeft />
							</Link>
						</li>
						<li>Личный кабинет</li>
						<li>
							<div onClick={logoutUser} className={styles.link}>
								<LogOut className={styles.icon} />
								Выйти
							</div>
							<div
								onClick={logoutUser}
								to='/'
								className={`${styles.link} ${styles.onlyIcon}`}
							>
								<LogOut className={styles.icon} />
							</div>
						</li>
					</ul>
				</nav>
				<div className={styles.info}>
					<h3>
						<img src={star} /> {currency === '' ? 0 : currency}
					</h3>
					{userLogo ? (
						<img className={styles.userLogo} src={userLogo} />
					) : (
						<div className={styles.userLogo}> {String(user.name)[0]}</div>
					)}

					<h2>{user.name}</h2>
				</div>
				<div className={styles.transactions}>
					<h3>История транзакций</h3>
					<div className={styles.table}>
						<div className={styles.thead}>
							<div className={styles.name}>Название</div>
							<div className={styles.cash}>Сумма</div>
							<div className={styles.cash}>Дата</div>
						</div>
						{transactionsHistory &&
							transactionsHistory.map(transaction => (
								<div key={transaction.id} className={styles.record}>
									<div className={styles.name}>
										{transactionName(transaction.purchaseName)}
									</div>
									<div className={styles.cash}>{transaction.price / 100} ₽</div>
									<div className={styles.cash}>
										{dateToString(transaction.date)}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	)
}
