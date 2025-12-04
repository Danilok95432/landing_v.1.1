import React, { type FC, type RefObject } from 'react'
import { type SwiperRef } from 'swiper/react'
import styles from './index.module.scss'

import cn from 'classnames'
import { SlidePrevSvg } from 'src/shared/ui/icons/slidePrevSVG'
import { SlideNextSvg } from 'src/shared/ui/icons/slideNextSVG'

type SliderProps = {
	swiperRef: RefObject<SwiperRef>
	className?: string
	color?: string
}

export const SliderBtns: FC<SliderProps> = ({ swiperRef, className, color }) => {
	const handlePrev = () => {
		swiperRef.current?.swiper.slidePrev()
	}

	const handleNext = () => {
		swiperRef.current?.swiper.slideNext()
	}
	return (
		<div className={cn(className, styles.sliderBtnsWrapper)}>
			<button type='button' onClick={handlePrev}>
				<SlidePrevSvg color={color} />
			</button>
			<button type='button' onClick={handleNext}>
				<SlideNextSvg color={color} />
			</button>
		</div>
	)
}
