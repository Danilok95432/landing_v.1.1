import { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'

import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'
import { useEvent } from 'src/app/context/event-context'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'

export const AboutHistory: FC = () => {
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	const { eventId } = useEvent()
	const { data: eventData } = useGetEventByIdQuery(eventId ?? '1', { skip: !eventId })
	useEffect(() => {
		if (eventData) {
			const images: ImageItemWithText[] = []
			if (eventData?.mainphoto[0]) {
				images.push(eventData?.mainphoto[0])
			}
			if (eventData?.photos && Array.isArray(eventData?.photos)) {
				images.push(...eventData?.photos)
			}
			setAllPagePhoto(images)
		}
	}, [eventData])

	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>О событии</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Информация</h2>
				<GalleryImg
					variant='slider'
					images={eventData?.photos}
					allPageImages={allPagePhoto}
					className={styles.gallery}
				/>
				{eventData?.descs && (
					<div
						className={styles.mainDescs}
						dangerouslySetInnerHTML={{ __html: eventData?.descs }}
					/>
				)}
				{/* <div className={styles.infoWrapper}>
					<FlexRow className={styles.infoGrid}>
						<FlexRow className={classNames(styles.infoRowEl, styles.end)}>
							<p className={styles.title}>
								35 <span>лет</span>
							</p>
							<p>премия основана в 1990 году</p>
						</FlexRow>
						<FlexRow className={styles.infoRowEl}>
							<p className={styles.title}>
								{'>200'}
								<span>лауреатов</span>
							</p>
							<p>некоммерческая премия</p>
						</FlexRow>
						<FlexRow className={styles.infoRowEl}>
							<p className={styles.title}>
								{'>40'} <span>членов жюри</span>
							</p>
							<p>выборный состав</p>
						</FlexRow>
						<FlexRow className={styles.infoRowEl}>
							<p className={styles.title}>
								{'10'}
								<span>номинаций</span>
							</p>
							<p>авторы и медиа</p>
						</FlexRow>
					</FlexRow>
				</div> */}
				{/* <HistorySection noTitle className={styles.historySection} /> */}

				{/* <FlexRow className={styles.contactsRow}>
					<h3>Контакты оргкомитета</h3>
					<FlexRow className={styles.wrapper}>
						<FlexRow className={styles.iconWrapper}>
							<TgContactEventIconSVG />
							<p>+7 (925) 314-38-58</p>
						</FlexRow>
						<a href={`mailto:${'atmanki@gmail.ru'}`}>atmanki@gmail.ru</a>
					</FlexRow>
				</FlexRow> */}
			</div>
		</div>
	)
}
