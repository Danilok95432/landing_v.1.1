import { useGetEventNewsByIdQuery } from 'src/features/home/api/home.api'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'
import { type RefObject, useRef, useEffect, useState } from 'react'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { newsSliderOptions } from './consts'
import { NewsCard } from './components/NewsCard/news-card'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useNavigate } from 'react-router-dom'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

export const NewsSection = () => {
	const { data: newsList } = useGetEventNewsByIdQuery('1')
	const [isMobile, setIsMobile] = useState(false)
	const navigate = useNavigate()
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<Section id='news' className={cn(styles.news)}>
			<Container off={isMobile} className={styles.newsCont}>
				<FlexRow className={styles.btnRow}>
					<MainButton className={styles.allBtn} onClick={() => navigate('/content')}>
						Все новости
					</MainButton>
				</FlexRow>
				{newsList && newsList?.length > 0 && (
					<>
						<Swiper {...newsSliderOptions} ref={swiperRef} className={styles.newsSlider}>
							{newsList.map((newsEl, idx) => (
								<SwiperSlide className={styles.newsSlide} key={idx}>
									<NewsCard key={newsEl.id} {...newsEl} />
								</SwiperSlide>
							))}
						</Swiper>
						<SliderBtns
							className={styles.newsSliderBtns}
							swiperRef={swiperRef}
							color={'#fff'}
							nextBtnColor='#000'
							prevBtnColor='#000'
						/>
					</>
				)}
			</Container>
		</Section>
	)
}
