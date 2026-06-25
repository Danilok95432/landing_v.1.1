import { type FC } from 'react'

type SeparatorIconSVGProps = {
	color?: string
	className?: string
}

export const SeparatorIconNavigationSVG: FC<SeparatorIconSVGProps> = ({
	color = '#3D4BC2',
	className,
}) => {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M9.22205 16.7908C8.92598 16.5118 8.92598 16.0596 9.22205 15.7806L13.1697 12L9.22205 8.21936C8.92598 7.94042 8.92598 7.48816 9.22205 7.20921C9.51812 6.93026 9.99814 6.93026 10.2942 7.20921L14.7779 11.4949C15.074 11.7739 15.074 12.2261 14.7779 12.5051L10.2942 16.7908C9.99814 17.0697 9.51812 17.0697 9.22205 16.7908Z'
				fill='black'
			/>
		</svg>
	)
}
