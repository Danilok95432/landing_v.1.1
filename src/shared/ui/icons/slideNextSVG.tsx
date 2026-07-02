import { type FC } from 'react'
type SlideNextSvgProps = {
	color?: string
	className?: string
}

export const SlideNextSvg: FC<SlideNextSvgProps> = ({ color = '#000', className }) => {
	return (
		<svg width='18' height='15' viewBox='0 0 18 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M10.8516 13.0625L16.8516 7.0625L10.8516 1.0625M0.75 7.0625H15.75'
				stroke={color}
				strokeWidth='1.5'
				strokeLinecap='square'
			/>
		</svg>
	)
}
