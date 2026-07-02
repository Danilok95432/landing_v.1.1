import React, { type FC, type RefObject, useCallback, useEffect, useState } from 'react'
import { type SwiperRef } from 'swiper/react'
import styles from './index.module.scss'

import cn from 'classnames'
import { SlidePrevSvg } from 'src/shared/ui/icons/slidePrevSVG'
import { SlideNextSvg } from 'src/shared/ui/icons/slideNextSVG'

type SliderProps = {
	swiperRef: RefObject<SwiperRef>
	className?: string
	prevBtnColor?: string
	nextBtnColor?: string
	color?: string
	disabledColor?: string
}

export const SliderBtns: FC<SliderProps> = ({
	swiperRef,
	className,
	color = '#000',
	disabledColor = '#fff',
	prevBtnColor,
	nextBtnColor,
}) => {
	const [isBeginning, setIsBeginning] = useState(true)
	const [isEnd, setIsEnd] = useState(false)

	const updateSliderState = useCallback(() => {
		const swiper = swiperRef.current?.swiper

		if (!swiper) return

		setIsBeginning(swiper.isBeginning || swiper.isLocked)
		setIsEnd(swiper.isEnd || swiper.isLocked)
	}, [swiperRef])

	useEffect(() => {
		const swiper = swiperRef.current?.swiper

		if (!swiper) return

		updateSliderState()

		swiper.on('slideChange', updateSliderState)
		swiper.on('reachBeginning', updateSliderState)
		swiper.on('reachEnd', updateSliderState)
		swiper.on('fromEdge', updateSliderState)
		swiper.on('resize', updateSliderState)

		return () => {
			swiper.off('slideChange', updateSliderState)
			swiper.off('reachBeginning', updateSliderState)
			swiper.off('reachEnd', updateSliderState)
			swiper.off('fromEdge', updateSliderState)
			swiper.off('resize', updateSliderState)
		}
	}, [swiperRef, updateSliderState])

	const handlePrev = () => {
		swiperRef.current?.swiper.slidePrev()
		updateSliderState()
	}

	const handleNext = () => {
		swiperRef.current?.swiper.slideNext()
		updateSliderState()
	}
	return (
		<div className={cn(className, styles.sliderBtnsWrapper)}>
			<button
				type='button'
				onClick={handlePrev}
				disabled={isBeginning}
				style={{ background: prevBtnColor }}
			>
				<SlidePrevSvg color={isBeginning ? disabledColor : color} />
			</button>

			<button
				type='button'
				onClick={handleNext}
				disabled={isEnd}
				style={{ background: nextBtnColor }}
			>
				<SlideNextSvg color={isEnd ? disabledColor : color} />
			</button>
		</div>
	)
}
