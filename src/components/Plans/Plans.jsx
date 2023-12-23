import React from 'react'
import styles from './Plans.module.sass'

const items = [
	{
		plan: 'Стартовый',
		pricePerMonth: 199,
		perTime: '/ месяц',
		pricePerYear: '2 388',
		description:
			'Безлимитный доступ ко всем видам планирования, прохождение обучения и тестов без ограничений',
	},
	{
		plan: 'Улучшенный',
		pricePerMonth: 399,
		perTime: '/ 3 месяца',
		pricePerYear: '1 596',
		description:
			'Безлимитный доступ ко всем видам планирования, прохождение обучения и тестов без ограничений',
	},
	{
		plan: 'Продвинутый',
		pricePerMonth: 699,
		perTime: '/ 6 месяцев',
		pricePerYear: '1 398',
		description:
			'Безлимитный доступ ко всем видам планирования, прохождение обучения и тестов без ограничений',
	},
	{
		plan: 'Премиум',
		pricePerMonth: 999,
		perTime: '/ 12 месяцев',
		pricePerYear: '1 398',
		description:
			'Безлимитный доступ ко всем видам планирования, прохождение обучения и тестов без ограничений',
	},
]

const Plans = () => {
	return (
		<div className={styles.plans}>
			<div className={styles.headline}>
				<hr />
				<h2>Тарифы</h2>
				<hr />
			</div>

			<div className={styles.wrapper}>
				{items.map(item => (
					<div className={styles.item} key={item.plan}>
						<h5>{item.plan}</h5>
						<h4>
							{item.pricePerMonth}.00 руб.{' '}
							<span className={styles.halfTransparentText}>
								{' '}
								{item.perTime}
							</span>
						</h4>
						<span className={styles.halfTransparentText}>
							Всего {item.pricePerYear}.00 руб. / год
						</span>
						<hr />
						<p>{item.description}</p>
						<button>Купить</button>
					</div>
				))}
			</div>

			<div className={styles.wrapper}>
				<p className={styles.info}>
					Оформляя подписку, вы соглашаетесь с тем, что для её продления будут
					совершаться регулярные платежи. После окончания оплаченного периода
					подписка будет действовать в течение 5 дней, параллельно с этим будут
					производиться попытки списания по выбранному методы оплаты. В случае
					невозможности оплаты подписки в указанный срок, доступ к возможностям
					подписки будет ограничен до следующего платежа. <br /> <br /> Подписка
					продлевается автоматически - для её отключения необходимо отменить её
					в магазине приложений.
				</p>
			</div>
		</div>
	)
}

export default Plans
