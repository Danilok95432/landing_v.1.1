import { DisplayBreakpoints } from 'src/shared/helpers/consts'
import { type SwiperProps } from 'swiper/react/swiper-react'

export const partnersSliderOptions: SwiperProps = {
	slidesPerView: 1.3,
	slidesPerGroup: 1,
	spaceBetween: 20,
	autoHeight: false,
	loop: false,
	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	breakpoints: {
		[DisplayBreakpoints.Xss]: {
			slidesPerView: 3.5,
		},
		[DisplayBreakpoints.Xs]: {
			slidesPerView: 4,
		},
		[DisplayBreakpoints.Sm]: {
			slidesPerView: 5,
		},
		[DisplayBreakpoints.Md]: {
			slidesPerView: 6,
		},
		[DisplayBreakpoints.ShortLg]: {
			slidesPerView: 9,
		},
		[DisplayBreakpoints.Lg]: {
			slidesPerView: 9,
		},
		[DisplayBreakpoints.Xll]: {
			slidesPerView: 9,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 9,
		},
	},
}
