import React from 'react'
import appStore from '../../images/appStore.webp'
import googlePlay from '../../images/googlePlay.webp'
import styles from './Footer.module.sass'
export const Footer = () => {
	return (
		<footer>
			<div className={styles.apps}>
				<h5>Доступно в магазинах приложений</h5>
				<div className={styles.wrapper}>
					<button>
						<img src={googlePlay} />
						<div className={styles.text}>
							<span>Get it on</span>
							<span className={styles.platform}>Google Play</span>
						</div>
					</button>
					<button>
						<img src={appStore} />
						<div className={styles.text}>
							<span>Download on the</span>
							<span className={styles.platform}>App Store</span>
						</div>
					</button>
				</div>
			</div>
			<div className={styles.info}>
				<div className={styles.container}>
					<h6>
						Фактический/юридический адрес - 426011, УДМУРТСКАЯ РЕСПУБЛИКА, Г.О.
						ГОРОД ИЖЕВСК, Г ИЖЕВСК, УЛ 10 ЛЕТ ОКТЯБРЯ, Д. 17А, КВ. 113
					</h6>
					<hr />
					<div className={styles.details}>
						<span>Реквизиты юр лица (инн/огрн) - ИНН 1831207937</span>
						<span>Номер телефона - +79128516839 </span>
						<span>Название юр лица - ООО "АЙВИ-ГРУПП"</span>
					</div>
				</div>
			</div>
		</footer>
	)
}
