import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { useGetEventVideosByIdQuery } from 'src/features/home/api/home.api'
import { type RefObject, useRef } from 'react'
import { VideoCard } from './components/video-card/video-card'
import { homeVideosSliderOptions } from './consts'

export const VideosSection = () => {
	const { data: videos } = useGetEventVideosByIdQuery('1')
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	return (
		<Section className={cn(styles.videos)}>
			<Container>
				<FlexRow className={styles.videotapeSectionRow}>
					<h2>Видеолента</h2>
					<MainButton as='route' to={`https://этноспорт.рф/videos`}>
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
					<SliderBtns className={styles.videoSliderBtns} swiperRef={swiperRef} color={'black'} />
				</div>
			</Container>
		</Section>
	)
}
