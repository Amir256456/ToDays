const transactionName = transactionNameFromDB => {
	if (transactionNameFromDB === 'todays_18_stars') return '18 звёзд'
	if (transactionNameFromDB === 'todays_36_stars') return '36 звёзд'
	if (transactionNameFromDB === 'todays_54_stars') return '54 звёзд'
	if (transactionNameFromDB === 'todays_premium_monthly')
		return 'Премиум (1 месяц)'
	if (transactionNameFromDB === 'todays_premium_3month')
		return 'Премиум (3 месяца)'
	if (transactionNameFromDB === 'todays_premium_6month')
		return 'Премиум (6 месяцев)'
	if (transactionNameFromDB === 'todays_premium_12month')
		return 'Премиум (12 месяцев)'
}

export default transactionName
