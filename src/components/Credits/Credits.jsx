import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import stars18 from '../../images/18stars.webp'
import stars36 from '../../images/36stars.webp'
import stars54 from '../../images/54stars.webp'
import UserService from '../../services/UserService'
import styles from './Credits.module.sass'

const products = [
	{
		purchaseName: 'todays_18_stars',
		url: stars18,
		stars: '18 звезд',
		price: 99,
	},
	{
		purchaseName: 'todays_36_stars',
		url: stars36,
		stars: '36 звезд',
		price: 169,
	},
	{
		purchaseName: 'todays_54_stars',
		url: stars54,
		stars: '54 звезд',
		price: 249,
	},
]

export const Credits = () => {
	const navigate = useNavigate()
	const isAuth = useSelector(state => state.userReducer.isAuth)
	const user = useSelector(state => state.userReducer.user)

	function openURL(link) {
		var a = window.document.createElement('a')
		a.target = '_blank'
		a.href = link

		// Dispatch fake click
		var e = window.document.createEvent('MouseEvents')
		// e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		e.initMouseEvent(
			'click',
			true,
			true,
			window,
			0,
			0,
			0,
			0,
			0,
			true,
			false,
			false,
			false,
			0,
			null
		)
		a.dispatchEvent(e)
	}

	const isSafariBrowser = () =>
		navigator.userAgent.indexOf('Safari') > -1 &&
		navigator.userAgent.indexOf('Chrome') <= -1

	const buyCredits = async (purchaseName, price) => {
		if (!isAuth) {
			navigate('/auth')
			return
		}

		const response = await UserService.buy(user, purchaseName, price)
		isSafariBrowser()
			? (window.location.href = `${response.data.data}`)
			: openURL(response.data.data)
	}

	return (
		<div className={styles.credits}>
			<div className={styles.container}>
				<div className={styles.headline}>
					<hr />
					<h2>Валюта</h2>
					<hr />
				</div>

				<div className={styles.wrapper}>
					{products.map(item => (
						<div className={styles.item} key={item.stars}>
							<div className={styles.cardImage}>
								<img src={item.url} alt='Card Photo' />
							</div>
							<h4>
								{item.stars}
								<span className={styles.halfTransparentText}>
									{' '}
									/ {item.price} ₽
								</span>
							</h4>
							<button onClick={() => buyCredits(item.purchaseName, item.price)}>
								Купить
							</button>
						</div>
					))}
					<p>
						Звёзды это цифровой товар, использующийся внутри приложения для
						приобретения в бессрочное пользование закрытых методов планирования
						(в случае если у пользователя нет подписки)
					</p>
				</div>
			</div>
		</div>
	)
}
