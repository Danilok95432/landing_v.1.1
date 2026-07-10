import { useParams } from 'react-router-dom'
import cn from 'classnames'

import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { type ImageItemWithText } from 'src/types/photos'
import { useGetSubEventProgramByIdQuery } from 'src/features/home/api/home.api'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additional-crumbs'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'
import { formatDateWithTime } from 'src/shared/helpers/utils'
import { CalendarSVG } from 'src/shared/ui/icons/calendarSVG'

export const SubEventHeader = () => {
	const { id = '' } = useParams()
	const { data: eventData } = useGetSubEventProgramByIdQuery(id ?? '')

	useAdditionalCrumbs(eventData?.title)
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (eventData) {
			const images: ImageItemWithText[] = []
			if (eventData.mainphoto) {
				images.push(eventData.mainphoto[0])
			}
			setAllPagePhoto(images)
		}
	}, [eventData])
	return (
		<div className={styles.eventInfoWrapper}>
			<div className={styles.mainInfo}>
				<FlexRow className={styles.row}>
					<div className={styles.infoBlock}>
						<h2>{eventData?.title}</h2>
						<FlexRow className={styles.topLineEvent}>
							<FlexRow className={styles.calendarRow}>
								<CalendarSVG />
								<p>{formatDateWithTime(eventData?.itemdate, eventData?.begin_time)}</p>
							</FlexRow>
							{/* <div className={styles.dot}></div>
							<p>{eventData?.is_etnosport ? 'Этноспорт' : 'Вид'}</p>
							<div className={styles.dot}></div>
							<FlexRow className={styles.calendarRow}>
								<GroupSVG />
								<p>{eventData?.is_group ? 'Групповой вид' : 'Одиночный вид'}</p>
							</FlexRow>
							<EventStatus className={styles.status} statusCode={eventData?.status} />
							<div className={cn(styles.dot)}></div>
							<p>{`Вид этноспорта «${eventData?.vid}»`}</p>
							<div className={cn(styles.dot)}></div>
							<p className={styles.ageRating}>{eventData?.ageRating ?? '18'}+</p> */}
						</FlexRow>
						{/* <FlexRow className={styles.linkRules}>
							<a href='#'>Правила вида</a>
							<a href='#'>Регламент проведения</a>
							<a href='#'>Требования к участникам</a>
						</FlexRow> */}
						{/* <FlexRow className={styles.regButtons}>
							<MainButton>Подать заявку</MainButton>
						</FlexRow> */}
						{/* <div className={styles.listInfo}>
							<div className={styles.locationInfo}>
								{eventData?.address && (
									<InfoRow
										title=''
										label={<span className={styles.infoBlockText}>{eventData?.address}</span>}
										icon={<PlaceIconSVG />}
										$titleWidth='auto'
										$gap='10px'
										$margin='0'
										$alignItems='center'
										wrapperClassname={styles.infoRowEvent}
									/>
								)}

								{eventData?.organizator && (
									<InfoRow
										title=''
										label={<span className={styles.infoBlockText}>{eventData?.organizator}</span>}
										icon={<ObjectIconSVG />}
										$titleWidth='auto'
										$gap='10px'
										$margin='0'
										$alignItems='center'
										titleClassname={styles.infoBlockText}
										wrapperClassname={styles.infoRowEvent}
									/>
								)}

								{eventData?.url && (
									<InfoRow
										title=''
										label={
											<a href={eventData?.url} className={styles.infoBlockText}>
												{eventData?.url}
											</a>
										}
										icon={<SiteIconSVG />}
										$titleWidth='auto'
										$gap='10px'
										$margin='0'
										$alignItems='center'
										titleClassname={styles.infoBlockText}
										wrapperClassname={styles.infoRowEvent}
									/>
								)}
							</div>
							<div className={styles.contactsInfo}>
								{eventData?.phone && (
									<InfoRow
										title=''
										label={
											<a href={`tel:${eventData?.phone}`} className={styles.infoBlockText}>
												{eventData?.phone}
											</a>
										}
										icon={<PhoneEventIconSVG />}
										$titleWidth='auto'
										$gap='10px'
										$margin='0'
										$alignItems='center'
										titleClassname={styles.infoBlockText}
										wrapperClassname={styles.infoRowEvent}
									/>
								)}

								{eventData?.telegram && (
									<InfoRow
										title=''
										label={
											<a href={eventData?.telegram} className={styles.infoBlockText}>
												{eventData?.telegram}
											</a>
										}
										icon={<TgEventIconSVG />}
										$titleWidth='auto'
										$gap='10px'
										$margin='0'
										$alignItems='center'
										titleClassname={styles.infoBlockText}
										wrapperClassname={styles.infoRowEvent}
									/>
								)}

								{eventData?.email && (
									<InfoRow
										title=''
										label={
											<a href={`mailto:${eventData?.email}`} className={styles.infoBlockText}>
												{eventData?.email}
											</a>
										}
										icon={<MailEventIconSVG />}
										$titleWidth='auto'
										$gap='10px'
										$margin='0'
										$alignItems='center'
										titleClassname={styles.infoBlockText}
										wrapperClassname={styles.infoRowEvent}
									/>
								)}
							</div>
						</div> */}
						<div className={eventData?.short ? cn(styles.infoBlockText, styles.descInfo) : ''}>
							{eventData?.short && <div dangerouslySetInnerHTML={{ __html: eventData?.short }} />}
						</div>
					</div>
				</FlexRow>
				<div className={styles.avatarWrapper}>
					<GalleryImg images={allPagePhoto} variant='newsMain' />
				</div>
			</div>
		</div>
	)
}
