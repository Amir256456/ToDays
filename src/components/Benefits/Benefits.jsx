import React from 'react'
import groupTasks from '../../images/groupTasks.webp'
import methods from '../../images/methods.webp'
import noAds from '../../images/noAds.webp'
import styles from './Benefits.module.sass'
export const items = [
	{
		url: methods,
		benefitCardText: 'Доступ ко всем видам планирования',
		title: '6 методов',
	},
	{
		url: groupTasks,
		benefitCardText:
			'Возможность становиться эффективнее вместе с семьей или друзьями',
		title: 'Групповые задачи',
	},
	{
		url: noAds,
		benefitCardText: 'Отключение рекламы ',
		title: 'Без рекламы',
	},
]

export const Benefits = () => {
	return (
		<div className={styles.benefits}>
			<div className={styles.container}>
				<div className={styles.wrapper}>
					{items.map(item => (
						<div className={styles.item} key={item.title}>
							<span className={styles.benefitCardText}>
								{item.benefitCardText}
							</span>
							<div className={styles.cardImage}>
								<img src={item.url} alt='Card Photo' />
							</div>
							<h2>{item.title}</h2>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
