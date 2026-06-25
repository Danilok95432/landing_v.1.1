import { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'

import { GalleryImg } from 'src/widgets/gallery-img/gallery-img'
import { useGetPageHeaderQuery } from 'src/features/content/api/content'

export const AboutHistory: FC = () => {
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	const { data: aboutPageData } = useGetPageHeaderQuery('about')
	useEffect(() => {
		if (aboutPageData) {
			const images: ImageItemWithText[] = []
			if (aboutPageData?.page.mainphoto[0]) {
				images.push(aboutPageData?.page.mainphoto[0])
			}
			if (aboutPageData.page.photoGallery && Array.isArray(aboutPageData.page.photoGallery)) {
				images.push(...aboutPageData.page.photoGallery)
			}
			setAllPagePhoto(images)
		}
	}, [aboutPageData])

	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>О событии</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Информация</h2>
				<GalleryImg variant='slider' allPageImages={allPagePhoto} className={styles.gallery} />
				{aboutPageData?.page.full2 && (
					<div
						className={styles.mainDescs}
						dangerouslySetInnerHTML={{ __html: aboutPageData.page.full2 }}
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
					<h3>Контакты Оргкомитета Беляевской премии</h3>
					<FlexRow className={styles.wrapper}>
						<FlexRow className={styles.iconWrapper}>
							<TgEventIconSVG />
							<p>+7 (925) 314-38-58</p>
						</FlexRow>
						<p>belyaevprize@gmail.com</p>
					</FlexRow>
				</FlexRow> */}
			</div>
		</div>
	)
}
