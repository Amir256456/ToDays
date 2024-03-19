import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserService from '../../services/UserService'
import styles from './Plans.module.sass'

const plans = [
	{
		purchaseName: 'todays_premium_monthly',
		plan: 'Стартовый',
		pricePerMonth: 199,
		perTime: '/ месяц',
		pricePerYear: '2 388',
		description:
			'Безлимитный доступ ко всем видам планирования, прохождение обучения и тестов без ограничений',
	},
	{
		purchaseName: 'todays_premium_3month',
		plan: 'Улучшенный',
		pricePerMonth: 399,
		perTime: '/ 3 месяца',
		pricePerYear: '1 596',
		description:
			'Безлимитный доступ ко всем видам планирования, прохождение обучения и тестов без ограничений',
	},
	{
		purchaseName: 'todays_premium_6month',
		plan: 'Продвинутый',
		pricePerMonth: 699,
		perTime: '/ 6 месяцев',
		pricePerYear: '1 398',
		description:
			'Безлимитный доступ ко всем видам планирования, прохождение обучения и тестов без ограничений',
	},
	{
		purchaseName: 'todays_premium_12month',
		plan: 'Премиум',
		pricePerMonth: 999,
		perTime: '/ 12 месяцев',
		pricePerYear: '1 398',
		description:
			'Безлимитный доступ ко всем видам планирования, прохождение обучения и тестов без ограничений',
	},
]

const Plans = ({ wasScrolled }) => {
	const isAuth = useSelector(state => state.userReducer.isAuth)
	const user = useSelector(state => state.userReducer.user)
	const ref = useRef(null)
	const navigate = useNavigate()

	const handleScroll = () => {
		ref.current.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		wasScrolled && handleScroll()
	}, [wasScrolled])

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

	const buyPremium = async (purchaseName, price) => {
		if (!isAuth) {
			navigate('/auth')
			return
		}

		const response = await UserService.buy(user, purchaseName, price)
		openURL(response.data.data)
	}

	return (
		<div className={styles.plans} ref={ref}>
			<div className={styles.container}>
				<div className={styles.headline}>
					<hr className={styles.leftLine} />
					<h2>Тарифы</h2>
					<hr className={styles.rightLine} />
				</div>

				<div className={styles.wrapper}>
					{plans.map(item => (
						<div className={styles.item} key={item.plan}>
							<h5>{item.plan}</h5>
							<h4>
								{item.pricePerMonth}.00 руб.
								<span className={styles.halfTransparentText}>
									{item.perTime}
								</span>
							</h4>
							<span className={styles.halfTransparentText}>
								Всего {item.pricePerYear}.00 руб. / год
							</span>
							<hr />
							<p>{item.description}</p>
							<button
								onClick={() =>
									buyPremium(item.purchaseName, item.pricePerMonth)
								}
							>
								Купить
							</button>
						</div>
					))}
				</div>

				<div className={styles.wrapper}>
					<p className={styles.info}>
						Оформляя подписку, вы соглашаетесь с тем, что для её продления будут
						совершаться регулярные платежи. После окончания оплаченного периода
						подписка будет действовать в течение 5 дней, параллельно с этим
						будут производиться попытки списания по выбранному методы оплаты. В
						случае невозможности оплаты подписки в указанный срок, доступ к
						возможностям подписки будет ограничен до следующего платежа. <br />{' '}
						<br /> Подписка продлевается автоматически - для её отключения
						необходимо отменить её в магазине приложений.
					</p>
				</div>
			</div>
		</div>
	)
}

export default Plans
