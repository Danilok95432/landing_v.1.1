import { Pagination, Autoplay } from 'swiper' // Добавьте Autoplay
import { type SwiperProps } from 'swiper/react'

export const eventsSliderOptions: SwiperProps = {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 0,
	autoHeight: false,
	loop: false,
	autoplay: {
		delay: 6000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	pagination: {
		clickable: true,
		dynamicBullets: false,
		el: '.custom-pagination',
		type: 'bullets',
		bulletClass: 'swiper-pagination-bullet',
		bulletActiveClass: 'swiper-pagination-bullet-active',
	},
	modules: [Pagination, Autoplay], // Добавьте Autoplay сюда
}
