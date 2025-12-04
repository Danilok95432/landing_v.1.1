import { Link } from 'react-router-dom'
import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<FlexRow className={styles.footerCont}>
					<button className={styles.buyBtn}>
						<div className={styles.text}>
							<p>Купить билет</p>
							<p>от 8 000 ₽</p>
						</div>
					</button>
					<FlexRow className={styles.footerRow}>
						<p>
							© <strong>2025 ООО «НПО«ТАУ»</strong>
						</p>
						<FlexRow className={styles.linksRow}>
							<Link to={''}>
								<p>Политика конфиденциальности</p>
							</Link>
							<Link to={''}>
								<p>Согласие на обработку персональных данных</p>
							</Link>
							<Link to={''}>
								<p>Пользовательское соглашение</p>
							</Link>
						</FlexRow>
						<div className={styles.ageBlock}>
							<p>
								18<span className={styles.plus}>+</span>
							</p>
						</div>
					</FlexRow>
				</FlexRow>
			</Container>
		</footer>
	)
}
