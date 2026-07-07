import { type FC, useState } from 'react'
import { type ProgramDay } from 'src/types/program'
import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { ProgramList } from './components/program-list/program-list'
import { ProgramNav } from './components/program-nav/program-nav'

type EventProgramProps = {
	programDays: ProgramDay[] | []
	parentView?: string
	defaultActiveDay?: number
	showAll?: boolean
}

export const Program: FC<EventProgramProps> = ({
	programDays,
	parentView = 'list',
	defaultActiveDay = 0,
	showAll = false,
}) => {
	const [activeDayId, setActiveDayId] = useState(defaultActiveDay)
	const allDays = programDays.flatMap((day) =>
		day.programList
			.filter((program) => program.use_real === 1)
			.map((program) => ({
				...program,
				date: day.date,
			})),
	)

	const filteredDays = programDays.filter((day) =>
		day.programList.some((program) => program.use_real === 1),
	)

	const safeActiveDayId = filteredDays.some((day) => day.id === activeDayId)
		? activeDayId
		: filteredDays[0]?.id || 0

	const navDays = filteredDays.map((day) => ({
		id: day.id,
		date: day.date,
	}))

	const handleChangeActiveDay = (id: number) => {
		setActiveDayId(id)
	}

	const getActiveProgram = () => {
		const currentDay = programDays.find((day) => day.id === safeActiveDayId)
		return currentDay?.programList?.filter((program) => program.use_real === 1) ?? []
	}

	if (!programDays?.length) return <h4>нет программы</h4>

	return (
		<div className={styles.head}>
			{!showAll && (
				<FlexRow className={styles.headProgram}>
					<ProgramNav
						days={navDays}
						activeDayId={safeActiveDayId}
						onChangeActiveDay={handleChangeActiveDay}
					/>
				</FlexRow>
			)}
			<ProgramList list={showAll ? allDays : getActiveProgram()} viewMode={'tab'} />
		</div>
	)
}
