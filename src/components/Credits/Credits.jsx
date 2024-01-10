import React from 'react'
import stars10 from '../../images/10stars.webp'
import stars18 from '../../images/18stars.webp'
import stars5 from '../../images/5stars.webp'
import styles from './Credits.module.sass'

const items = [
	{
		url: stars5,
		amountOfStars: '5 звёзд',
		price: '/ ₽99.00',
	},
	{
		url: stars10,
		amountOfStars: '10 звёзд',
		price: '/ ₽199.00',
	},
	{
		url: stars18,
		amountOfStars: '18 звёзд',
		price: '/ ₽349.00',
	},
]

export const Credits = () => {
	return (
		<div className={styles.credits}>
			<div className={styles.container}>
				<div className={styles.headline}>
					<hr />
					<h2>Валюта</h2>
					<hr />
				</div>

				<div className={styles.wrapper}>
					{items.map(item => (
						<div className={styles.item} key={item.amountOfStars}>
							<img src={item.url} alt='Card Photo' />
							<h4>
								{item.amountOfStars}
								<span className={styles.halfTransparentText}>{item.price}</span>
							</h4>
							<button>Купить</button>
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
