import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { useGetEventVideosByIdQuery } from 'src/features/home/api/home.api'
import { type RefObject, useEffect, useRef, useState } from 'react'
import { VideoCard } from './components/video-card/video-card'
import { homeVideosSliderOptions } from './consts'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useNavigate } from 'react-router-dom'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useEvent } from 'src/app/context/event-context'

export const VideosSection = () => {
	const { eventId } = useEvent()
	const { data: videos } = useGetEventVideosByIdQuery(eventId ?? '1', { skip: !eventId })
	const [isMobile, setIsMobile] = useState(false)
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const navigate = useNavigate()

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])
	return (
		<Section id='videos' className={cn(styles.videos)}>
			<Container off={isMobile}>
				<FlexRow className={styles.btnRow}>
					<h2 className={styles.sectionTitle}>Видео</h2>
					<MainButton className={styles.allBtn} onClick={() => navigate('/videos')}>
						Все видео
					</MainButton>
				</FlexRow>
				<div>
					<Swiper {...homeVideosSliderOptions} ref={swiperRef}>
						{videos?.map((slideItem, idx) => (
							<SwiperSlide key={idx}>
								<VideoCard key={slideItem.id} {...slideItem} />
							</SwiperSlide>
						))}
					</Swiper>
					<SliderBtns
						className={styles.videoSliderBtns}
						swiperRef={swiperRef}
						color='#000'
						disabledColor='#fff'
						nextBtnColor='#0000000D'
						prevBtnColor='#0000000D'
					/>
				</div>
			</Container>
		</Section>
	)
}
