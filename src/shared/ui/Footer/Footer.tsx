import { Link } from 'react-router-dom'
import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'
import { BuyTicketModal } from 'src/modals/buy-ticket-modal/buy-ticket-modal'
import { useActions } from 'src/app/store/hooks/actions'
import { useEvent } from 'src/app/context/event-context'
import { useGetEventByIdQuery, useGetRegSettingsQuery } from 'src/features/home/api/home.api'
import classNames from 'classnames'

export const Footer = () => {
	const { eventId } = useEvent()
	const { data: eventData } = useGetEventByIdQuery(eventId ?? '1', { skip: !eventId })
	const { openModal } = useActions()
	const { data: regSettings } = useGetRegSettingsQuery(eventId ?? '1')
	const useReg = regSettings?.status
	return (
		<footer className={styles.footer}>
			<Container>
				<FlexRow className={styles.footerCont}>
					<button
						className={classNames(styles.buyBtn, { [styles.disabled]: !useReg })}
						onClick={() => openModal(<BuyTicketModal id={eventId ?? '1'} />)}
						disabled={!useReg}
					>
						<div className={styles.text}>
							<p>Купить билет</p>
							<p>от {eventData?.min_price} ₽</p>
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
							{/* <p>
								18<span className={styles.plus}>+</span>
							</p> */}
						</div>
					</FlexRow>
				</FlexRow>
			</Container>
		</footer>
	)
}
