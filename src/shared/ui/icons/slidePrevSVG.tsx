import { type FC } from 'react'

type SlidePrevSvgProps = {
	color?: string
}

export const SlidePrevSvg: FC<SlidePrevSvgProps> = ({ color = '#000' }) => {
	return (
		<svg width='18' height='15' viewBox='0 0 18 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M7.0625 1.0625L1.0625 7.0625L7.0625 13.0625M17.1641 7.0625L2.16406 7.0625'
				stroke='black'
				strokeWidth='1.5'
				strokeLinecap='square'
			/>
		</svg>
	)
}
