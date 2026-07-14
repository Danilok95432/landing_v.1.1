import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { useEvent } from 'src/app/context/event-context'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'

export const AboutSchema: FC = () => {
	const { eventId } = useEvent()
	const { data: eventData } = useGetEventByIdQuery(eventId ?? '1', { skip: !eventId })
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>О событии</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Схема площадки</h2>
				<img
					src={
						eventData?.event_schema && eventData?.event_schema.length > 0
							? eventData?.event_schema[0].original
							: ''
					}
					alt=''
				/>
			</div>
		</div>
	)
}
