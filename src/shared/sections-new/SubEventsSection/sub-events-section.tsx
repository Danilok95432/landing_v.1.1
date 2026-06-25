import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { useGetEventVideosByIdQuery } from 'src/features/home/api/home.api'
import { type RefObject, useEffect, useRef, useState } from 'react'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useEvent } from 'src/app/context/event-context'
import { homeVideosSliderOptions } from './consts'
import { SubEventCard } from './components/sub-events-card/sub-events-card'

export const SubEventsSection = () => {
	const { eventId } = useEvent()
	const { data: videos } = useGetEventVideosByIdQuery(eventId ?? '1', { skip: !eventId })
	const [isMobile, setIsMobile] = useState(false)
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
		<Section className={cn(styles.videos)}>
			<Container off={isMobile}>
				<FlexRow className={styles.btnRow}>
					<h2 className={styles.sectionTitle}>Подсобытия</h2>
				</FlexRow>
				<div>
					<Swiper {...homeVideosSliderOptions} ref={swiperRef}>
						{videos?.map((slideItem, idx) => (
							<SwiperSlide key={idx}>
								<SubEventCard key={slideItem.id} {...slideItem} />
							</SwiperSlide>
						))}
					</Swiper>
					<SliderBtns
						className={styles.videoSliderBtns}
						swiperRef={swiperRef}
						color={'#fff'}
						nextBtnColor='#0000000D'
						prevBtnColor='#0000000D'
					/>
				</div>
			</Container>
		</Section>
	)
}
