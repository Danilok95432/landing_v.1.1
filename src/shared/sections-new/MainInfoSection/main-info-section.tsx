import mainImg from 'src/assets/img/main-img.png'
import styles from './index.module.scss'
import { Section } from 'src/shared/ui/Section/section'
import { Container } from 'src/shared/ui/Container/Container'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainInfoTypeSVG } from 'src/shared/ui/icons/mainInfoTypeSVG'
import { MainInfoKindSVG } from 'src/shared/ui/icons/mainInfoKindSVG'
import { MainInfoFreqSVG } from 'src/shared/ui/icons/mainInfoFreqSVG'
import { MainInfoPlaceSVG } from 'src/shared/ui/icons/mainInfoPlaceSVG'
import { useState } from 'react'
import { MainInfoDateSVG } from 'src/shared/ui/icons/mainInfoDateSVG'
import { MainInfoLocationSVG } from 'src/shared/ui/icons/mainInfoLocationSVG'
import { MainInfoOrgSVG } from 'src/shared/ui/icons/mainInfoOrgSVG'
import { BuyTicketModal } from 'src/modals/buy-ticket-modal/buy-ticket-modal'
import { useActions } from 'src/app/store/hooks/actions'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { formatMainDateRange, formatRangeMeta } from 'src/shared/helpers/utils'

export const MainInfoSection = () => {
	const { data: eventData } = useGetEventByIdQuery('1')
	const [activeCont, setActiveCont] = useState<boolean>(false)
	const { openModal } = useActions()

	return (
		<Section className={cn(styles.mainInfo)}>
			<Container className={styles.offContainer} off>
				<img src={eventData?.mainphoto[0].original} alt='main' className={styles.mobileImg} />
			</Container>
			<Container>
				<FlexRow className={styles.mainRow}>
					<img src={eventData?.mainphoto[0].original} alt='main' className={styles.imgMain} />
					<h1 id='event'>{eventData?.title}</h1>
					<FlexRow className={styles.additionalInfoRow}>
						<FlexRow className={styles.rowEl}>
							<MainInfoTypeSVG />
							<p>{eventData?.event_type_name}</p>
						</FlexRow>
						<FlexRow className={styles.rowEl}>
							<MainInfoKindSVG />
							<p>{'Культура, развлечения'}</p>
						</FlexRow>
						<FlexRow className={styles.rowEl}>
							<MainInfoFreqSVG />
							<p>{'Раз в год'}</p>
						</FlexRow>
						<FlexRow className={cn(styles.rowEl, styles.noMargin, styles.locationEl)}>
							<MainInfoPlaceSVG />
							<a href='#'>{eventData?.location.address}</a>
						</FlexRow>
						<FlexRow className={cn(styles.rowEl, styles.ageRowEl)}>
							<div className={styles.dot}></div>
							<p className={styles.age}>{`${eventData?.ageRating}+`}</p>
						</FlexRow>
						<FlexRow className={cn(styles.rowEl, styles.mobileRow)}>
							<button
								className={styles.buyBtn}
								onClick={() => openModal(<BuyTicketModal id='1' />)}
							>
								<div className={styles.text}>
									<p>Купить билет</p>
									<p>от 8 000 ₽</p>
								</div>
							</button>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.blocksRow}>
						<FlexRow className={styles.blockEl}>
							<FlexRow className={styles.infoBlock}>
								<p className={styles.title}>
									{formatMainDateRange(
										(eventData?.date as [string, string]) ?? [
											'2025-08-22T08:15:00+03:00',
											'2025-08-24T10:00:00+03:00',
										],
									)}
								</p>
								<p>
									{formatRangeMeta(
										(eventData?.date as [string, string]) ?? [
											'2025-08-22T08:15:00+03:00',
											'2025-08-24T10:00:00+03:00',
										],
									)}
								</p>
							</FlexRow>
							<div className={styles.vector}>
								<MainInfoDateSVG />
							</div>
						</FlexRow>
						<FlexRow className={styles.blockEl}>
							<FlexRow className={styles.infoBlock}>
								<p className={styles.title}>{eventData?.location.title}</p>
								<p>{eventData?.location.address}</p>
								<a
									href='https://yandex.ru/maps/geo/selo_atmanov_ugol/53031405/?ll=41.390478%2C53.131514&utm_source=main_stripe_big&z=14.95'
									target='_blank'
									rel='noreferrer'
								>
									На карте
								</a>
							</FlexRow>
							<div className={styles.vector}>
								<MainInfoLocationSVG />
							</div>
						</FlexRow>
						<FlexRow className={styles.blockEl}>
							<FlexRow className={styles.infoBlock}>
								<p className={styles.title}>{'Правительство Тамбовской области'}</p>
							</FlexRow>
							<div className={styles.vector}>
								<MainInfoOrgSVG />
							</div>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.infoRow}>
						<div className={styles.textCont}>
							<p className={cn(styles.text, { [styles.activeText]: activeCont })}>
								{eventData?.description && (
									<div dangerouslySetInnerHTML={{ __html: eventData?.description[0] }} />
								)}
							</p>
							<button
								className={cn(styles.openContBtn, { [styles.active]: activeCont })}
								onClick={() => setActiveCont(!activeCont)}
							>
								{activeCont ? 'Свернуть' : 'Развернуть'}
							</button>
						</div>
						<button className={styles.buyBtn} onClick={() => openModal(<BuyTicketModal id='1' />)}>
							<div className={styles.text}>
								<p>Купить билет</p>
								<p>от 8 000 ₽</p>
							</div>
						</button>
					</FlexRow>
				</FlexRow>
			</Container>
		</Section>
	)
}
