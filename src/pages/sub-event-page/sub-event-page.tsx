import { Container } from 'src/shared/ui/Container/Container'
import { SubEventHeader } from './components/sub-event-header/sub-event-header'

import styles from './index.module.scss'
import { useParams } from 'react-router-dom'
import { useGetSubEventProgramByIdQuery } from 'src/features/home/api/home.api'
import cn from 'classnames'

export const SubEventPage = () => {
	const { id = '' } = useParams()
	const { data: eventData } = useGetSubEventProgramByIdQuery(id ?? '')
	return (
		<Container>
			<SubEventHeader />
			{/* {eventData?.is_group ? <TableGroup /> : <TableSolo />} */}
			<div className={styles.block}>
				<div className={eventData?.full ? cn(styles.infoBlockText, styles.descInfo) : ''}>
					{eventData?.full && <div dangerouslySetInnerHTML={{ __html: eventData?.full }} />}
				</div>
			</div>
		</Container>
	)
}
