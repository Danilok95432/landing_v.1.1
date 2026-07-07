import { useState, type FC } from 'react'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { formatSingleDate, parseTimeFromDate } from 'src/shared/helpers/utils'
import { type ParticipantItem } from 'src/types/tables'
import { CustomTable } from 'src/widgets/custom-table/custom-table'
import { MobileList } from 'src/widgets/mobile-list/mobile-list'
import { FilterPanel } from './filter-panel/filter-panel'
import styles from './index.module.scss'
import { ParticipantCard } from 'src/widgets/participant-card/participant-card'

export const TableSolo: FC = () => {
	const breakpoint = useBreakPoint()

	const [searchName, setSearchName] = useState<string>('')
	const [searchRegion, setSearchRegion] = useState<string>('')
	const [searchType, setSearchType] = useState<string>('0')
	const [view, setView] = useState<string>('list')

	const options = {
		name: searchName,
		setSearchName,
		region: searchRegion,
		setSearchRegion,
		type: searchType,
		setSearchType,
		view,
		setView,
	}

	const tableTitles = [
		'ID',
		'Фото',
		'Имя, фамилия, прозвище',
		'Регион',
		'Возраст',
		'Группа',
		'Тип участия',
		'Регистрация',
	]
	const formatEventsTableData = (participants: ParticipantItem[]) => {
		return participants?.map((participantEl) => {
			return {
				rowId: participantEl.id,
				cells: [
					<p key='0' className={styles.idCell}>
						{participantEl.id}
					</p>,
					<img key='1' src={participantEl.photo?.[0]?.original ?? ''} alt='' />,
					<p key='2'>{`${participantEl.surname} ${participantEl.firstname} ${participantEl.fathname}`}</p>,
					<p key='3'>{participantEl.region_name}</p>,
					<p className={styles.ageCell} key='4'>
						{participantEl.age}
					</p>,
					<p key='5'>{participantEl.group_name}</p>,
					<p key='6'>
						{participantEl.user_roles?.map((role) => role.title).join(', ') || 'Не указано'}
					</p>,
					<p key='7'>
						{formatSingleDate(participantEl.createdate ?? new Date())}
						<br />
						{parseTimeFromDate(participantEl.createdate)}
					</p>,
				],
			}
		})
	}

	return (
		<div className={styles.participantsSection}>
			<h4>Участники</h4>
			<div className={styles.headParticipant}>
				<FilterPanel options={options} />
			</div>
			<p className={styles.numberOfFilter}>Всего участников по выбранным фильтрам: 15</p>
			{view === 'list' && [] && breakpoint !== 'S' ? (
				<CustomTable
					className={styles.participantsTable}
					rowData={formatEventsTableData([])}
					colTitles={tableTitles}
				/>
			) : (
				<MobileList
					items={[]}
					renderItem={ParticipantCard}
					classListItems={styles.participantsTab}
					defaultVisibleCount={3}
					classNameBtn={styles.showMoreBtnTab}
				/>
			)}
		</div>
	)
}
