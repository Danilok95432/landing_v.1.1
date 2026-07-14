import { Section } from 'src/shared/ui/Section/section'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useGetEventProgramByIdQuery } from 'src/features/home/api/home.api'
import { Program } from 'src/widgets/program/program'
import { useEvent } from 'src/app/context/event-context'

export const SubEventsSection = () => {
	const { eventId } = useEvent()
	const { data: programDays } = useGetEventProgramByIdQuery(eventId ?? '1', { skip: !eventId })
	if (!programDays || programDays.length === 0) return null
	return (
		<Section className={cn(styles.subEvents)}>
			<Container>
				<div className={styles.programTab}>
					<FlexRow className={styles.headProgram}>
						<h2>Подсобытия</h2>
					</FlexRow>
				</div>
			</Container>
			<div className={styles.programTab}>
				<Program programDays={programDays ?? []} showAll parentView={'tab'} defaultActiveDay={1} />
			</div>
		</Section>
	)
}
