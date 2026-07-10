import { useState, type FC } from 'react'

import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { formatSingleDate, parseTimeFromDate } from 'src/shared/helpers/utils'
import { MobileList } from 'src/widgets/mobile-list/mobile-list'
import { FilterPanel } from './filter-panel/filter-panel'
import { CustomTable } from 'src/widgets/custom-table/custom-table'
import { TeamCard } from 'src/widgets/team-card/team-card'
import { type TeamItem } from 'src/types/tables'

export const TableGroup: FC = () => {
	const eventDataTeams = [
		{
			id: '1',
			logo: [
				{
					id: '1',
					author: '',
					title: '',
					original:
						'https://avatars.mds.yandex.net/i?id=37bc60752fd00c0bb9258260ded299c7_l-7548061-images-thumbs&n=1',
					thumbnail: '',
				},
			],
			name: 'Название группы участников 1',
			region: 'Татарстан, республика (16)',
			participants: '3',
			type: 'Фольклористы',
			registration: '2025-06-01T14:30:00+03:00',
		},
		{
			id: '2',
			logo: [
				{
					id: '1',
					author: '',
					title: '',
					original:
						'https://avatars.mds.yandex.net/i?id=37bc60752fd00c0bb9258260ded299c7_l-7548061-images-thumbs&n=1',
					thumbnail: '',
				},
			],
			name: 'Название группы участников 1',
			region: 'Татарстан, республика (16)',
			participants: '3',
			type: 'Фольклористы',
			registration: '2025-06-01T14:30:00+03:00',
		},
		{
			id: '3',
			logo: [
				{
					id: '1',
					author: '',
					title: '',
					original:
						'https://avatars.mds.yandex.net/i?id=37bc60752fd00c0bb9258260ded299c7_l-7548061-images-thumbs&n=1',
					thumbnail: '',
				},
			],
			name: 'Название группы участников 1',
			region: 'Татарстан, республика (16)',
			participants: '3',
			type: 'Фольклористы',
			registration: '2025-06-01T14:30:00+03:00',
		},
		{
			id: '4',
			logo: [
				{
					id: '1',
					author: '',
					title: '',
					original:
						'https://avatars.mds.yandex.net/i?id=37bc60752fd00c0bb9258260ded299c7_l-7548061-images-thumbs&n=1',
					thumbnail: '',
				},
			],
			name: 'Название группы участников 1',
			region: 'Татарстан, республика (16)',
			participants: '3',
			type: 'Фольклористы',
			registration: '2025-06-01T14:30:00+03:00',
		},
	]
	// const { id } = useParams()

	// const { data } = useGetSubEventListRegQuery({ id: id ?? '', type: 'group' })

	const breakpoint = useBreakPoint()
	const navigate = useNavigate()

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

	const rowClickHandler = (id: string) => {
		navigate(`/teams/${id}`)
	}

	const tableTitles = ['ID', 'Лого', 'Название группы', 'Регион', 'Участников', 'Заявка']
	const formatEventsTableData = (teams: TeamItem[]) => {
		return teams.map((teamEl) => {
			return {
				rowId: teamEl.id,
				cells: [
					<p key='0' className={styles.idCell}>
						{teamEl.id}
					</p>,
					<img key='1' src={teamEl.logo[0].original} alt='' />,
					<p key='2'>{teamEl.name}</p>,
					<p key='3'>{teamEl.region}</p>,
					<a className={styles.participantsLink} key='4' href='#'>
						{teamEl.participants + ' участников'}
					</a>,
					<p key='6'>
						{formatSingleDate(teamEl.registration ?? new Date())}
						<br />
						{parseTimeFromDate(teamEl.registration)}
					</p>,
				],
			}
		})
	}

	return (
		<div className={styles.teamsSection}>
			<h4>Все заявки</h4>
			<div className={styles.headTeams}>
				<FilterPanel options={options} />
			</div>
			<p className={styles.numberOfFilter}>Всего групп по выбранным фильтрам: 15</p>
			{view === 'list' && breakpoint !== 'S' ? (
				<CustomTable
					className={styles.teamsTable}
					rowData={formatEventsTableData(eventDataTeams)}
					colTitles={tableTitles}
					initialVisibleRows={1}
					rowClickHandler={rowClickHandler}
				/>
			) : (
				<MobileList
					items={eventDataTeams}
					renderItem={TeamCard}
					classListItems={styles.teamsTab}
					defaultVisibleCount={3}
					classNameBtn={styles.showMoreBtnTab}
				/>
			)}
		</div>
	)
}
