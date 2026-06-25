import { useEffect, useState, type FC } from 'react'
import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'
import { useLocation } from 'react-router-dom'
import { useGetPageHeaderQuery } from 'src/features/content/api/content'
import classNames from 'classnames'
import { useActions } from 'src/app/store/hooks/actions'
import { BuyTicketModal } from 'src/modals/buy-ticket-modal/buy-ticket-modal'
import { useEvent } from 'src/app/context/event-context'
import { useGetEventByIdQuery, useGetRegSettingsQuery } from 'src/features/home/api/home.api'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

export const AboutLayoutHeader: FC = () => {
	const { eventId } = useEvent()
	const { data: eventData } = useGetEventByIdQuery(eventId ?? '1', { skip: !eventId })
	const { openModal } = useActions()
	const location = useLocation()
	const { data: regSettings } = useGetRegSettingsQuery(eventId)
	const useReg = regSettings?.status
	const { data: aboutPageData } = useGetPageHeaderQuery('about')

	const getPhotosForCurrentPage = (): ImageItemWithText[] => {
		switch (location.pathname) {
			case '/about':
				return aboutPageData?.page.photoGallery ?? []
			default:
				return []
		}
	}
	const [, setAllPagePhoto] = useState<ImageItemWithText[]>([])

	useEffect(() => {
		const photos = getPhotosForCurrentPage()
		const images: ImageItemWithText[] = []

		if (aboutPageData?.page.mainphoto[0]) {
			images.push(aboutPageData?.page.mainphoto[0])
		}

		if (photos.length > 0) {
			images.push(...photos)
		}

		setAllPagePhoto(images)
	}, [aboutPageData, location.pathname])

	return (
		<div className={styles.aboutLayoutHeaderPageContent}>
			<div className={styles.leftSideHeader}>
				<h2 className={styles.title}>О событии</h2>
				<FlexRow className={styles.row}>
					<div className={styles.blockquoteBody}>
						{aboutPageData?.page.full && (
							<div
								className={styles.mainDescs}
								dangerouslySetInnerHTML={{ __html: aboutPageData.page.full }}
							/>
						)}
						{/* {aboutPageData?.caption && aboutPageData?.caption_show && (
						<span className={styles.blockquoteCaption}>{aboutPageData.caption}</span>
					)} */}
					</div>
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
				</FlexRow>
			</div>
		</div>
	)
}
