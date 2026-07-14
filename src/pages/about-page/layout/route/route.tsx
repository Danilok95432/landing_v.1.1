import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { Placement } from 'src/widgets/placement/placement'
import { useEvent } from 'src/app/context/event-context'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'

export const AboutRoute: FC = () => {
	const { eventId } = useEvent()
	const { data: eventData } = useGetEventByIdQuery(eventId ?? '1', { skip: !eventId })
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>О событии</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Как проехать</h2>
				<section className={styles.mapSection}>
					<Placement placeVariants={eventData?.pathways} />
				</section>
			</div>
		</div>
	)
}
