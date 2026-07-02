import { useEffect, useState, type FC } from 'react'
import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'
import { useLocation } from 'react-router-dom'
import { useGetPageHeaderQuery } from 'src/features/content/api/content'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'
import { useEvent } from 'src/app/context/event-context'

export const AboutLayoutHeader: FC = () => {
	const { eventId } = useEvent()
	const { data: eventData } = useGetEventByIdQuery(eventId ?? '1', { skip: !eventId })
	const location = useLocation()
	const { data: aboutPageData } = useGetPageHeaderQuery('about')

	const getPhotosForCurrentPage = (): ImageItemWithText[] => {
		switch (location.pathname) {
			case '/about':
				return aboutPageData?.page.photoGallery ?? []
			default:
				return []
		}
	}
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])

	useEffect(() => {
		const photos = getPhotosForCurrentPage()
		const images: ImageItemWithText[] = []

		if (eventData?.mainphoto[0]) {
			images.push(eventData?.mainphoto[0])
		}

		if (photos.length > 0) {
			images.push(...photos)
		}

		setAllPagePhoto(images)
	}, [eventData, location.pathname])

	return (
		<div className={styles.aboutLayoutHeaderPageContent}>
			<div className={styles.leftSideHeader}>
				<h2 className={styles.title}>О событии</h2>
				<FlexRow className={styles.row}>
					<div className={styles.blockquoteBody}>
						{eventData?.description && (
							<div
								className={styles.mainDescs}
								dangerouslySetInnerHTML={{ __html: eventData?.description }}
							/>
						)}
						{/* {aboutPageData?.caption && aboutPageData?.caption_show && (
						<span className={styles.blockquoteCaption}>{aboutPageData.caption}</span>
					)} */}
					</div>
				</FlexRow>
			</div>
			<div className={styles.rightSideHeader}>
				<GalleryImg images={allPagePhoto} variant='newsMain' />
			</div>
		</div>
	)
}
