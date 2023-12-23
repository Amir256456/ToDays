import React from 'react'
import methods from '../../images/7methods.webp'
import newTheme from '../../images/newTheme.webp'
import noAds from '../../images/noAds.webp'
import widgets from '../../images/widgets.webp'
import styles from './Benefits.module.sass'

const items = [
	{
		url: methods,
		benefitCardText: 'Доступ ко всем видам планирования',
		title: '7 методов',
	},
	{
		url: newTheme,
		benefitCardText: 'Доступ к бумажной теме',
		title: 'Новая тема',
	},
	{
		url: noAds,
		benefitCardText: '',
		title: 'Без рекламы',
	},
	{
		url: widgets,
		benefitCardText: '',
		title: 'Виджеты',
	},
]

const Benefits = () => {
	return (
		<div className={styles.container}>
			<div className={styles.benefits}>
				{items.map(item => (
					<div className={styles.item} key={item.title}>
						<img src={item.url} alt='Card Photo' />
						<span className={styles.benefitCardText}>
							{item.benefitCardText}
						</span>
						<h2>{item.title}</h2>
					</div>
				))}
			</div>
		</div>
	)
}

export default Benefits
