import { Container } from 'src/shared/ui/Container/Container'
import { SubEventHeader } from './components/sub-event-header/sub-event-header'
import { useParams } from 'react-router-dom'
import { useGetSubEventProgramByIdQuery } from 'src/features/home/api/home.api'
import { TableGroup } from './components/table-group/table-group'
import { TableSolo } from './components/table-solo/table-solo'

export const SubEventPage = () => {
	const { id = '' } = useParams()
	const { data: eventData } = useGetSubEventProgramByIdQuery(id ?? '')
	return (
		<Container>
			<SubEventHeader />
			{eventData?.is_group ? <TableGroup /> : <TableSolo />}
		</Container>
	)
}
