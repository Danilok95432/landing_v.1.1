import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { useEvent } from 'src/app/context/event-context'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
// import { useGetPageHeaderQuery } from 'src/features/content/api/content'

export const AboutRules: FC = () => {
	const { eventId } = useEvent()
	const { data: eventData } = useGetEventByIdQuery(eventId ?? '1', { skip: !eventId })
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>О событии</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Условия участия</h2>
				{eventData?.conditions && (
					<div
						className={styles.mainDescs}
						dangerouslySetInnerHTML={{ __html: eventData?.conditions }}
					/>
				)}
			</div>
		</div>
	)
}
