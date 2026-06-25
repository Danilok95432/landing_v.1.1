import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
// import { useGetPageHeaderQuery } from 'src/features/content/api/content'

export const AboutPlacement: FC = () => {
	// const { data: aboutPageData } = useGetPageHeaderQuery('premia')
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>О событии</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Размещение</h2>
			</div>
		</div>
	)
}
