import appGalery from '../../images/appGalery.webp'
import appStore from '../../images/appStore.webp'
import footerPayments from '../../images/footerPayments.webp'
import googlePlay from '../../images/googlePlay.webp'
import ruStore from '../../images/ruStore.webp'
import styles from './Footer.module.sass'
export const Footer = () => {
	const redirect = url => window.open(url, '_blank')

	return (
		<footer>
			<div className={styles.apps}>
				<h5>Доступно в магазинах приложений</h5>
				<div className={styles.wrapper}>
					<button
						onClick={() =>
							redirect(
								'https://play.google.com/store/apps/details?id=pro.ivgroup.todays'
							)
						}
					>
						<img src={googlePlay} />
						<div className={styles.text}>
							<span>Get it on</span>
							<span className={styles.platform}>Google Play</span>
						</div>
					</button>
					<button
						onClick={() =>
							redirect('https://apps.apple.com/app/todays/id6463758256')
						}
					>
						<img src={appStore} />
						<div className={styles.text}>
							<span>Download on the</span>
							<span className={styles.platform}>App Store</span>
						</div>
					</button>
					<button
						onClick={() =>
							redirect('https://apps.rustore.ru/app/pro.ivgroup.todays')
						}
					>
						<img src={ruStore} />
						<div className={styles.text}>
							<span>Доступно в</span>
							<span className={styles.platform}>RuStore</span>
						</div>
					</button>

					<button
						onClick={() =>
							redirect('https://appgallery.huawei.com/#/app/C109060447')
						}
					>
						<img src={appGalery} />
						<div className={styles.text}>
							<span>Explore it on</span>
							<span className={styles.platform}>AppGallery</span>
						</div>
					</button>
				</div>
			</div>

			<div className={styles.info}>
				<div className={styles.infoItem}></div>
				<div className={styles.infoItem}>
					<h6>
						Основная деятельность компании - разработка программного обеспечения
					</h6>
					<div className={styles.container}>
						<h6>
							Фактический/юридический адрес - 426011, <br /> УДМУРТСКАЯ
							РЕСПУБЛИКА, Г.О. ГОРОД <br /> ИЖЕВСК, Г ИЖЕВСК, УЛ 10 ЛЕТ ОКТЯБРЯ,
							Д. <br />
							17А, КВ. 113
						</h6>
						<hr />
						<div className={styles.details}>
							<span>Реквизиты юр лица (инн/огрн) - ИНН 1831207937</span>
							<span>Номер телефона - +79128516839 </span>
							<span>Название юр лица - ООО "АЙВИ-ГРУПП"</span>
						</div>
					</div>
				</div>
				<div className={styles.infoItem}>
					<div>
						<img src={footerPayments} alt='paymentLogo' />
					</div>
				</div>
			</div>
		</footer>
	)
}
