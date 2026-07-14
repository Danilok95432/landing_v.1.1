import React, { useEffect, useRef, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { Link, useNavigate, useParams } from 'react-router-dom'

import styles from './index.module.scss'
import { useGetEventVideosByIdQuery } from 'src/features/home/api/home.api'
import { useGetVideoByIdQuery } from 'src/features/content/api/content'
import { AsideVideos } from 'src/widgets/aside-videos/aside-videos'
import { Section } from 'src/shared/ui/Section/section'
import { Container } from 'src/shared/ui/Container/Container'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { toast } from 'react-toastify'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { formatRussianDateTime } from 'src/shared/helpers/utils'

type ApiErrorResponse = {
	status: 'error'
	error: string
}

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
	return typeof error === 'object' && error !== null && 'status' in error
}

const getApiErrorMessage = (error: unknown): string => {
	if (isFetchBaseQueryError(error)) {
		const errorData = error.data as Partial<ApiErrorResponse> | undefined

		if (errorData?.status === 'error' && errorData?.error) {
			return errorData.error
		}
	}

	return 'Произошла ошибка при загрузке новости'
}

export const VideoDetails: FC = () => {
	const { id } = useParams()
	const {
		data: videoDetails,
		error: newsItemError,
		isError: isNewsItemError,
	} = useGetVideoByIdQuery(id ?? '')
	const { data: videosList = [] } = useGetEventVideosByIdQuery('1')

	const [isSmallScreen, setIsSmallScreen] = useState(false)
	const [previewCount, setPreviewCount] = useState<number>(1)
	const contentRef = useRef<HTMLDivElement>(null)
	const navigate = useNavigate()
	useEffect(() => {
		if (!isNewsItemError) return

		const message = getApiErrorMessage(newsItemError)

		toast.error(message, {
			toastId: `news-error-${id}`,
		})

		navigate('/', { replace: true })
	}, [isNewsItemError, newsItemError, navigate, id])
	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 1300)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	useEffect(() => {
		const calculatePreviewCount = () => {
			if (contentRef.current) {
				const contentHeight = contentRef.current.offsetHeight
				const cardHeight = 190
				const count = Math.floor((contentHeight - 50) / cardHeight)
				setPreviewCount(Math.max(1, count))
			}
		}

		calculatePreviewCount()
		window.addEventListener('resize', calculatePreviewCount)

		return () => {
			window.removeEventListener('resize', calculatePreviewCount)
		}
	}, [videoDetails])

	if (!videoDetails) return

	return (
		<>
			<Helmet>
				<title>{videoDetails?.title}</title>
			</Helmet>
			<Section>
				<Container>
					<div className={styles.videoDetailPage}>
						<Link to={'/videos'} className={styles.linkBack}>
							Вернуться к видеозаписям
						</Link>
						<FlexRow className={styles.wrapper}>
							<FlexRow className={styles.contentRow}>
								<p className={styles.date}>{formatRussianDateTime(String(videoDetails?.date))}</p>
								<h2>{videoDetails.title}</h2>
								<div className={styles.mainVideo}>
									<iframe
										src={videoDetails.url ?? ''}
										allow='encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;'
										allowFullScreen
									></iframe>
								</div>
								<div className={styles.videoContent} ref={contentRef}>
									<div className={styles.contentInfo}>
										<div className={styles.descVideo}>
											<p className={styles.descVideoText}>{videoDetails?.short}</p>
										</div>
									</div>
								</div>
							</FlexRow>
							<AsideVideos
								videosList={videosList}
								title='Другие видеоролики'
								orient={isSmallScreen ? 'horizontal' : 'vertical'}
								currentVideoId={id}
								previewCount={previewCount}
							/>
						</FlexRow>
						<Link to={'/videos'} className={styles.linkBack}>
							Вернуться к видеозаписям
						</Link>
					</div>
				</Container>
			</Section>
		</>
	)
}
