import { useGetEventProgramByIdQuery } from 'src/features/home/api/home.api'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useState } from 'react'
import { MainProgramNav } from 'src/widgets/main-program-navigation/main-program-nav'
import { DefisSVG } from 'src/shared/ui/icons/defisSVG'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { type RefObject, useRef } from 'react'
import { programSliderOptions } from './consts'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { Link } from 'react-router-dom'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { toast } from 'react-toastify'

export const ProgramSection = () => {
	const { data: programDays } = useGetEventProgramByIdQuery('1')
	const [activeDayId, setActiveDayId] = useState(1)
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const breakPoint = useBreakPoint()

	const navDays = programDays?.map((day) => ({ id: day.id, date: day.date }))

	const goToDay = (dayId: number) => {
		setActiveDayId(dayId)
		const index = programDays?.findIndex((day) => day.id === dayId) ?? 0
		swiperRef.current?.swiper.slideTo(index, 500)
	}

	const getGroupedProgram = () => {
		const list = programDays?.find((day) => day.id === activeDayId)?.programList ?? []
		const grouped = list.reduce<Record<string, typeof list>>((acc, programEl) => {
			const place = programEl.place || 'Место не указано'
			if (!acc[place]) {
				acc[place] = []
			}
			acc[place].push(programEl)
			return acc
		}, {})
		if (activeDayId === 1) {
			const CENTRAL_FIELD = 'Центральное поле'
			const orderedGroups: Record<string, typeof list> = {}
			if (grouped[CENTRAL_FIELD]) {
				orderedGroups[CENTRAL_FIELD] = grouped[CENTRAL_FIELD]
			}
			Object.keys(grouped).forEach((place) => {
				if (place !== CENTRAL_FIELD) {
					orderedGroups[place] = grouped[place]
				}
			})
			return orderedGroups
		}
		return grouped
	}

	const handleCopyDataProgram = () => {
		const currentDay = programDays?.find((day) => day.id === activeDayId)
		if (!currentDay) return
		let textToCopy = `Программа на ${currentDay.date}\n\n`

		const dayTitle =
			activeDayId === 1
				? 'Основной день игр'
				: activeDayId === 2
					? 'Последний день игр'
					: 'Первый день игр'
		textToCopy += `${dayTitle}\n\n`
		const groupedProgram = getGroupedProgram()
		for (const [place, items] of Object.entries(groupedProgram)) {
			textToCopy += `${place}:\n`
			for (const item of items) {
				textToCopy += `${item.time} - ${item.title}\n`
			}
			textToCopy += '\n'
		}
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				toast.success('Данные программы в буфере обмена', {
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			})
			.catch(() => {
				toast.error('Произошла ошибка при копировании', {
					position: 'bottom-right',
				})
			})
	}

	return (
		<Section id='program' className={cn(styles.program)}>
			<Container>
				<FlexRow className={styles.programWrapper}>
					<FlexRow className={styles.programHeadRow}>
						<h1>Программа</h1>
						<MainProgramNav
							days={navDays ?? [{ id: 1, date: new Date() }]}
							activeDayId={activeDayId}
							changeSlide={goToDay}
						/>
						<MainButton onClick={handleCopyDataProgram}>Копировать программу дня</MainButton>
					</FlexRow>
					<FlexRow className={styles.contentRow}>
						<div className={styles.imgWrapper}>
							<img src='src/assets/img/programImg.png' alt='' />
						</div>
						<Swiper
							{...programSliderOptions}
							ref={swiperRef}
							initialSlide={programDays?.findIndex((day) => day.id === activeDayId) ?? 1}
							className={styles.programSlider}
							onSlideChange={(swiper) => {
								const currentIndex = swiper.activeIndex
								const currentDayId = programDays?.[currentIndex]?.id
								if (currentDayId !== undefined) {
									setActiveDayId(currentDayId)
								}
							}}
						>
							{programDays?.map((day) => (
								<SwiperSlide key={day.id}>
									<FlexRow className={styles.programList}>
										<h2>
											{day.id === 1
												? 'Основной день игр'
												: day.id === 2
													? 'Последний день игр'
													: 'Первый день игр'}
										</h2>
										{Object.entries(getGroupedProgram()).map(([place, items]) => (
											<div key={place} className={styles.group}>
												<p className={styles.placeTitle}>{place}</p>
												{items.map((programEl) => (
													<FlexRow key={programEl.id} className={styles.elRow}>
														<p>{programEl.time}</p>
														{breakPoint === 'S' ? null : <DefisSVG />}
														{programEl?.use_real ? (
															<Link
																to={`https://этноспорт.рф/events/1/event-program/${programEl.id}`}
															>
																{programEl.title}
															</Link>
														) : (
															<p>{programEl.title}</p>
														)}
													</FlexRow>
												))}
											</div>
										))}
									</FlexRow>
								</SwiperSlide>
							))}
						</Swiper>
					</FlexRow>
				</FlexRow>
			</Container>
		</Section>
	)
}
