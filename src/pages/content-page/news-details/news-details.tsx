import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
// import { type CardNewsItem } from 'src/types/news'

import styles from './index.module.scss'
import { Section } from 'src/shared/ui/Section/section'
import { Container } from 'src/shared/ui/Container/Container'
import { useGetNewsByIdQuery } from 'src/features/content/api/content'
import { useGetEventNewsByIdQuery } from 'src/features/home/api/home.api'
import { AsideNews } from 'src/widgets/aside-news/aside-news'
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

export const NewsDetailsNew = () => {
	const { id } = useParams()
	const {
		data: newsItemData,
		error: newsItemError,
		isError: isNewsItemError,
	} = useGetNewsByIdQuery(id ?? '')
	const { data: newsList = [] } = useGetEventNewsByIdQuery('1')
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
		const calculatePreviewCount = () => {
			if (contentRef.current) {
				const contentHeight = contentRef.current.offsetHeight
				const cardHeight = 252
				const count = Math.floor((contentHeight - 50) / cardHeight)
				setPreviewCount(Math.max(1, count))
			}
		}

		calculatePreviewCount()
		window.addEventListener('resize', calculatePreviewCount)

		return () => {
			window.removeEventListener('resize', calculatePreviewCount)
		}
	}, [newsItemData])

	if (!newsItemData) return null
	return (
		<>
			<Helmet>
				<title>{newsItemData?.title}</title>
			</Helmet>
			<div className={styles.newsItemPage}>
				<Section className={styles.newsListPage}>
					<Container className={styles.newsContainer}>
						<div className={styles.newsItemPageContent} ref={contentRef}>
							<Link to={'/content'} className={styles.linkBack}>
								Вернуться к новостям
							</Link>
							<FlexRow className={styles.wrapper}>
								<FlexRow className={styles.contentRow}>
									<p className={styles.date}>{formatRussianDateTime(String(newsItemData?.date))}</p>
									<h2>{newsItemData.title}</h2>
									<div className={newsItemData?.short ? styles.newsShortDescs : ''}>
										{newsItemData?.short && (
											<div dangerouslySetInnerHTML={{ __html: newsItemData.short }} />
										)}
									</div>
									{newsItemData?.mainphoto && newsItemData?.mainphoto.length > 0 && (
										<img
											src={
												newsItemData?.mainphoto && newsItemData?.mainphoto.length > 0
													? newsItemData?.mainphoto[0].original
													: ''
											}
											alt=''
										/>
									)}
									<div className={styles.newsItemInfoContent}>
										<div className={styles.contentInfo}>
											<div className={styles.newsDescs}>
												{newsItemData?.full && (
													<div dangerouslySetInnerHTML={{ __html: newsItemData.full }} />
												)}
											</div>
										</div>
									</div>
								</FlexRow>
								<div className={styles.asideNewsDetails}>
									<AsideNews
										currentNewsId={id ?? ''}
										newsList={newsList}
										previewCount={previewCount}
									/>
								</div>
							</FlexRow>
							<Link to={'/content'} className={styles.linkBack}>
								Вернуться к новостям
							</Link>
						</div>
					</Container>
				</Section>
			</div>
		</>
	)
}
