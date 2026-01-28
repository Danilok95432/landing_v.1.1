import { type RefObject, useEffect, useRef, useState } from 'react'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { eventsSliderFullScreenOptions, eventsSliderOptions } from './consts'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import skeletonImg from 'src/assets/img/skeleton-img.png'

import styles from './index.module.scss'
import type { Swiper as SwiperType } from 'swiper'
import { type ImageItemWithText } from 'src/types/photos'
import { CloseSvg } from 'src/shared/ui/icons/closeSVG'
import classNames from 'classnames'
import 'swiper/css'
import 'swiper/css/pagination'

export const GallerySection = () => {
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const fullscreenSwiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	const { data: eventData } = useGetEventByIdQuery('1')

	const [activeIndex, setActiveIndex] = useState(0)
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])

	// fullscreen state
	const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
	const [fullscreenIndex, setFullscreenIndex] = useState(0)

	const handleSlideChange = (swiper: SwiperType) => {
		setActiveIndex(swiper.activeIndex)
	}

	const getButtonColors = () => {
		const isFirstSlide = activeIndex === 0
		const isLastSlide = eventData?.promo ? activeIndex === eventData.promo.length - 2 : false

		return {
			prevBtnColor: isFirstSlide ? '#00000040' : '#000',
			nextBtnColor: isLastSlide ? '#00000040' : '#000',
		}
	}

	const { prevBtnColor, nextBtnColor } = getButtonColors()

	useEffect(() => {
		if (eventData?.promo && Array.isArray(eventData.promo)) {
			setAllPagePhoto(eventData.promo)
		}
	}, [eventData])

	const openFullscreen = (index: number) => {
		setFullscreenIndex(index)
		setIsFullscreenOpen(true)
	}

	const closeFullscreen = () => {
		setIsFullscreenOpen(false)
	}

	useEffect(() => {
		if (!isFullscreenOpen) return

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeFullscreen()
			}
		}

		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [isFullscreenOpen])

	return (
		<Section id='photo' className={styles.gallerySection}>
			<Container className={styles.galleryCont}>
				<Swiper
					{...eventsSliderOptions}
					ref={swiperRef}
					className={styles.sliderMain}
					onSlideChange={handleSlideChange}
					onInit={(swiper) => setActiveIndex(swiper.activeIndex)}
				>
					{eventData?.promo.map((slideEl, idx) => {
						return (
							<SwiperSlide key={slideEl.id}>
								<FlexRow className={styles.slideRow}>
									<div className={styles.imgWrapper}>
										{slideEl.original ? (
											<img
												className={styles.sliderImg}
												src={slideEl.original}
												alt='image'
												onClick={() => openFullscreen(idx)}
											/>
										) : (
											<img
												className={styles.skeletonImg}
												src={skeletonImg}
												alt='image'
												onClick={() => openFullscreen(idx)}
											/>
										)}
									</div>
								</FlexRow>
							</SwiperSlide>
						)
					})}
				</Swiper>

				<SliderBtns
					className={styles.sliderBtns}
					swiperRef={swiperRef}
					color={'#fff'}
					prevBtnColor={prevBtnColor}
					nextBtnColor={nextBtnColor}
				/>
			</Container>

			{/* FULLSCREEN OVERLAY */}
			{isFullscreenOpen && (
				<div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
					<div className={styles.fullscreenInner} onClick={(e) => e.stopPropagation()}>
						<Swiper
							{...eventsSliderFullScreenOptions}
							ref={fullscreenSwiperRef}
							className={styles.fullscreenSwiper}
							slidesPerView={1}
							centeredSlides
							initialSlide={fullscreenIndex}
							onSlideChange={(swiper) => setFullscreenIndex(swiper.activeIndex)}
						>
							{allPagePhoto.map((slideEl) => (
								<SwiperSlide key={`fullscreen-${slideEl.id}`}>
									<div className={styles.fullscreenImgWrapper}>
										{slideEl.original ? (
											<img className={styles.fullscreenImg} src={slideEl.original} alt='image' />
										) : (
											<img className={styles.fullscreenImg} src={skeletonImg} alt='image' />
										)}
									</div>
								</SwiperSlide>
							))}
						</Swiper>
						<div
							className={classNames('swiper-pagination', styles.paginationContainer)}
							slot='pagination'
						/>
						<SliderBtns
							className={styles.fullscreenBtns}
							swiperRef={fullscreenSwiperRef}
							color={'#fff'}
							prevBtnColor={'#000'}
							nextBtnColor={'#000'}
						/>

						<button type='button' className={styles.fullscreenClose} onClick={closeFullscreen}>
							<CloseSvg />
						</button>
					</div>
				</div>
			)}
		</Section>
	)
}
