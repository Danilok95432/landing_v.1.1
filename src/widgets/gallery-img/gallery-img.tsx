import React, { type FC, type RefObject, useRef, useState, useCallback, useMemo } from 'react'
import { type ImageItem } from 'src/types/photos'
import cn from 'classnames'

import SwiperCore, { Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { mainFormatDate } from 'src/shared/helpers/utils'
import { CloseSvg } from 'src/shared/ui/icons/closeSVG'
import { LimitArrowDown } from 'src/shared/ui/icons/limitArrowDown'
import { LimitArrowTop } from 'src/shared/ui/icons/limitArrowTop'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { SliderBtns } from '../slider-btns/slider-btns'
import {
	galleryFullScreenSliderOptions,
	gallerySliderOptions,
	gallerySliderNewsDetailsOptions,
} from './consts'

SwiperCore.use([Navigation, Pagination])

type ImageGalleryProps = {
	className?: string
	listClassName?: string
	images?: ImageItem[]
	allPageImages?: ImageItem[]
	limit?: number
	limitController?: boolean
	variant?: 'list' | 'slider' | 'newsMain' | 'newsDetailsSlider' | 'homeSliderDetails'
}

export const GalleryImg: FC<ImageGalleryProps> = ({
	className,
	listClassName,
	images,
	allPageImages,
	limit,
	limitController,
	variant = 'list',
}) => {
	const [expandedGallery, setExpandedGallery] = useState<boolean>(false)
	const [overlayVisible, setOverlayVisible] = useState<boolean>(false)
	const [initialSlide, setInitialSlide] = useState<number>(0)
	const overlaySwiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const breakpoint = useBreakPoint()

	const imagesForOverlay = useMemo(() => {
		return allPageImages ?? images
	}, [allPageImages, images])

	const openOverlay = useCallback(
		(clickedImage: ImageItem) => {
			if (imagesForOverlay) {
				const indexInOverlay = imagesForOverlay.findIndex((img) => img.id === clickedImage.id)
				if (indexInOverlay !== -1) {
					setInitialSlide(indexInOverlay)
					setOverlayVisible(true)
					document.body.classList.add(styles.noScroll)
				} else {
					console.warn('Image not found in overlay images')
					setOverlayVisible(false)
				}
			}
		},
		[imagesForOverlay],
	)

	const closeOverlay = useCallback(() => {
		setOverlayVisible(false)
		document.body.classList.remove(styles.noScroll)
	}, [])

	const handleNewsMainClick = useCallback(() => {
		if (images && images.length > 0) {
			openOverlay(images[0])
		}
	}, [openOverlay, images])

	const sliderBtns = useMemo(
		() => (
			<SliderBtns
				className={styles.fullScreenSliderBtns}
				swiperRef={overlaySwiperRef}
				color={breakpoint === 'Xs' ? '#FFF' : '#FFFFFFB5'}
			/>
		),
		[breakpoint, overlaySwiperRef],
	)

	const swiperComponent = useMemo(
		() => (
			<Swiper
				{...galleryFullScreenSliderOptions}
				ref={overlaySwiperRef}
				initialSlide={initialSlide}
				pagination={{ clickable: true }}
				className={styles.overlaySwiper}
			>
				{imagesForOverlay?.map((image, index) => (
					<SwiperSlide key={image?.id}>
						<img src={image?.original} alt={image?.title} className={styles.overlayImage} />
					</SwiperSlide>
				))}
			</Swiper>
		),
		[imagesForOverlay, initialSlide, overlaySwiperRef],
	)

	if (!images?.length) return null

	if (variant === 'newsMain') {
		return (
			<div className={cn(className, styles.newsMainGallery)}>
				<div className={styles.newsMainImageWrapper} onClick={handleNewsMainClick}>
					<img src={images[0]?.original} alt={images[0]?.title} className={styles.newsMainImage} />
				</div>

				{overlayVisible && (
					<div className={styles.imageOverlay} onClick={closeOverlay}>
						<div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
							<button className={styles.closeButton} onClick={closeOverlay}>
								<CloseSvg />
							</button>
							{swiperComponent}
							{sliderBtns}
						</div>
					</div>
				)}
			</div>
		)
	}

	if (variant === 'homeSliderDetails') {
		return (
			<div className={className}>
				<div className={styles.gallerySliderWrapper}>
					<Swiper {...gallerySliderNewsDetailsOptions} ref={swiperRef}>
						{images?.map((slideItem, idx) => (
							<SwiperSlide
								className={styles.gallerySlide}
								key={idx}
								onClick={() => openOverlay(slideItem)}
							>
								<div className={styles.slideItem}>
									<div className={styles.slideImg}>
										<img src={slideItem.original} alt={slideItem.title} />
									</div>
									<h6>{slideItem.title}</h6>
									{slideItem.author !== '' ? (
										<span className={styles.author}>Автор: {slideItem.author}</span>
									) : null}
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					<SliderBtns
						className={styles.galleryBtns}
						swiperRef={swiperRef}
						color={breakpoint === 'XS' ? '#FFF' : '#5C5C5C'}
					/>
				</div>
				{limitController && limit && limit < images.length && (
					<button
						className={styles.limitController}
						type='button'
						onClick={() => setExpandedGallery(!expandedGallery)}
					>
						{expandedGallery ? (
							<>
								Скрыть
								<LimitArrowTop />
							</>
						) : (
							<>
								Показать еще {images.length - limit} фото
								<LimitArrowDown />
							</>
						)}
					</button>
				)}

				{overlayVisible && (
					<div className={styles.imageOverlay} onClick={closeOverlay}>
						<div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
							<button className={styles.closeButton} onClick={closeOverlay}>
								<CloseSvg />
							</button>
							{swiperComponent}
							{sliderBtns}
						</div>
					</div>
				)}
			</div>
		)
	}

	if (variant === 'newsDetailsSlider') {
		return (
			<div className={className}>
				<div className={styles.gallerySliderWrapper}>
					<Swiper {...gallerySliderNewsDetailsOptions} ref={swiperRef}>
						{images?.map((slideItem, idx) => (
							<SwiperSlide
								className={styles.gallerySlide}
								key={idx}
								onClick={() => openOverlay(slideItem)}
							>
								<div className={styles.slideItem}>
									<div className={styles.slideImg}>
										<img src={slideItem.original} alt={slideItem.title} />
									</div>
									<h6>{slideItem.title}</h6>
									{slideItem.author !== '' ? (
										<span className={styles.author}>Автор: {slideItem.author}</span>
									) : null}
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					<SliderBtns
						className={styles.galleryBtns}
						swiperRef={swiperRef}
						color={breakpoint === 'XS' ? '#FFF' : '#5C5C5C'}
					/>
				</div>
				{limitController && limit && limit < images.length && (
					<button
						className={styles.limitController}
						type='button'
						onClick={() => setExpandedGallery(!expandedGallery)}
					>
						{expandedGallery ? (
							<>
								Скрыть
								<LimitArrowTop />
							</>
						) : (
							<>
								Показать еще {images.length - limit} фото
								<LimitArrowDown />
							</>
						)}
					</button>
				)}

				{overlayVisible && (
					<div className={styles.imageOverlay} onClick={closeOverlay}>
						<div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
							<button className={styles.closeButton} onClick={closeOverlay}>
								<CloseSvg />
							</button>
							{swiperComponent}
							{sliderBtns}
						</div>
					</div>
				)}
			</div>
		)
	}

	return (
		<div className={className}>
			{variant === 'slider' ? (
				<div className={styles.gallerySliderWrapper}>
					<Swiper {...gallerySliderOptions} ref={swiperRef}>
						{images?.map((slideItem, idx) => (
							<SwiperSlide
								className={styles.gallerySlide}
								key={idx}
								onClick={() => openOverlay(slideItem)}
							>
								<div className={styles.slideItem}>
									<div className={styles.slideImg}>
										<img src={slideItem.original} alt={slideItem.title} />
									</div>
									<h6>{slideItem.title}</h6>
									{slideItem.author !== '' ? (
										<span className={styles.author}>Автор: {slideItem.author}</span>
									) : null}
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					<SliderBtns
						className={styles.galleryBtns}
						swiperRef={swiperRef}
						color={breakpoint === 'XS' ? '#FFF' : '#5C5C5C'}
					/>
				</div>
			) : (
				<ul className={cn(styles.gridGallery, listClassName)}>
					{images.slice(0, expandedGallery ? images.length : limit).map((img, idx) => (
						<li key={img.id} onClick={() => openOverlay(img)}>
							{' '}
							{/* Передаем объект ImageItem */}
							<div className={styles.gridImgWrapper}>
								<img src={img.thumbnail} alt={`image ${idx + 1}`} />
							</div>
							{img.title && <h6>{img.title}</h6>}
							{img.author !== '' ? (
								<span className={styles.author}>Автор: {img.author}</span>
							) : null}
							{img.date && <span className={styles.imgDate}>{mainFormatDate(img.date)}</span>}
						</li>
					))}
				</ul>
			)}

			{limitController && limit && limit < images.length && (
				<button
					className={styles.limitController}
					type='button'
					onClick={() => setExpandedGallery(!expandedGallery)}
				>
					{expandedGallery ? (
						<>
							Скрыть
							<LimitArrowTop />
						</>
					) : (
						<>
							Показать еще {images.length - limit} фото
							<LimitArrowDown />
						</>
					)}
				</button>
			)}

			{overlayVisible && (
				<div className={styles.imageOverlay} onClick={closeOverlay}>
					<div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
						<button className={styles.closeButton} onClick={closeOverlay}>
							<CloseSvg />
						</button>
						{swiperComponent}
						{sliderBtns}
					</div>
				</div>
			)}
		</div>
	)
}
