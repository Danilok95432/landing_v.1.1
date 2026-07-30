import styles from './index.module.scss'
import { type FC } from 'react'
import { type SubEventOptions, type SelOption } from 'src/types/select'
import { useFormContext, useWatch } from 'react-hook-form'
import { ControlledCheckbox } from 'src/widgets/controlled-checkbox/controlled-checkbox'
import { FormInput } from 'src/widgets/FormInput/form-input'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { ControlledSelect } from 'src/widgets/controlled-select/controlled-select'
import { ControlledMultipleSelect } from 'src/widgets/controlled-multiple-select/controlled-multiple-select'
import { useLocation } from 'react-router-dom'
import { CarFields } from './components/CarFields/CarFields'
import { ParticipantsFields } from './components/ParticipantsFields/ParticiapantsFields'

type PartSectionProps = {
	selectOptionsGroup?: SelOption[]
	selectOptionsCars?: SelOption[]
	selectOptionsLager?: SelOption[]
	subEvents?: SubEventOptions[]
}

export const PartSection: FC<PartSectionProps> = ({
	selectOptionsGroup = [{ label: 'Не выбрано', value: '0' }],
	selectOptionsCars = [{ label: 'Не выбрано', value: '0' }],
	selectOptionsLager = [{ label: 'Не выбрано', value: '0' }],
	subEvents = [
		{ label: 'Не выбрано', value: '0', selected: false, use_group: false, id_event_role: '' },
	],
}) => {
	const { control } = useFormContext()
	const location = useLocation()

	const useGroup = useWatch({ control, name: 'use_group' })
	const groupType = useWatch({ control, name: 'id_event_role' })

	const useMaster = useWatch({ control, name: 'use_master' })
	const useTrader = useWatch({ control, name: 'use_trader' })
	const useJournalist = useWatch({ control, name: 'use_journalist' })
	const useCar = useWatch({ control, name: 'use_car' })
	const useLager = useWatch({ control, name: 'use_lager' })

	const groupDisabled = !useGroup
	const journalistDisabled = !useJournalist
	const carsDisabled = !useCar
	const lagerDisabled = !useLager

	const filteredGroupList = subEvents.filter(
		(el) =>
			el.use_group &&
			(groupType === '2'
				? el.id_event_role === '2'
				: groupType === '4'
					? el.id_event_role === '4'
					: el.id_event_role === '7'),
	)

	return (
		<div className={styles.formSection}>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_sportsmen' type='checkbox' />
					<span>Я — спортсмен</span>
				</div>
				<div className={styles.footerBox}>
					<p className={styles.desc}>
						Для того, чтобы подтвердить регистрацию в качестве спортсмена, потребуется{' '}
						<a className={styles.link}>связаться с организаторами события</a>. Возможно, понадобится
						официальная заявка на бланке спортивного клуба.
					</p>
				</div>
			</div>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_folk' type='checkbox' />
					<span>Я — участник фольклорной программы</span>
				</div>
				<div className={styles.footerBox}>
					<p className={styles.desc}>
						Для подтверждения регистрации фольклорных коллективов потребуется{' '}
						<a className={styles.link}>связаться с организаторами события</a>. Возможно, понадобится
						официальная заявка.
					</p>
				</div>
			</div>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBoxSpecial}>
					<ControlledCheckbox name='use_trader' type='checkbox' />
					<span>Я торгую на ярмарке</span>
				</div>
				<div className={styles.footerBox}>
					<p className={styles.desc}>
						Для того, чтобы подтвердить Ваше участие в ярмарке в качестве торговца, с Вами свяжется
						представитель организаторов.
					</p>
					<FormInput
						name='trader_name'
						label='Описание товаров'
						className={styles.noMargin}
						disabled={!useTrader}
					/>
				</div>
			</div>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBoxSpecial}>
					<ControlledCheckbox name='use_master' type='checkbox' />
					<span>Я — мастер народных промыслов и ремесел</span>
				</div>
				<div className={styles.footerBox}>
					<FormInput
						name='master_name'
						label='Название промысла'
						className={styles.noMargin}
						disabled={!useMaster}
					/>
				</div>
			</div>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_journalist' type='checkbox' />
					<span>Я — журналист</span>
				</div>
				<div className={styles.footerBox}>
					<FormInput
						name='journal_name'
						label='Название издания, студии или канала'
						className={styles.noMargin}
						disabled={journalistDisabled}
					/>
				</div>
			</div>
			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_group' type='checkbox' />
					<span>Мы — семья или компания друзей</span>
				</div>
				{!groupDisabled && (
					<div className={styles.footerBox}>
						<p>Ваши личные данные указаны выше. Не нужно повторять их в составе группы.</p>
						<FlexRow className={styles.guestWrapper}>
							<FlexRow className={styles.groupMultiSelectRow}>
								<FlexRow className={styles.groupGuestsInputsStart}>
									<FormInput
										name='group_name'
										label='Название группы'
										disabled={groupDisabled}
										className={styles.groupGuestInputMain}
									/>
									<FlexRow className={styles.groupGuestsInputsStartInner}>
										<ControlledSelect
											className={styles.selectForm}
											name='id_event_role'
											selectOptions={selectOptionsGroup.filter(
												(el) => el.label !== 'Торговцы' && el.label !== 'Мастера',
											)}
											disabled={groupDisabled}
											label='Тип группы'
										/>
									</FlexRow>
								</FlexRow>
								{groupType === '8' && (
									<FormInput
										name='trader_name_group'
										label='Описание товаров'
										className={styles.noMargin}
										disabled={groupDisabled}
									/>
								)}
								{groupType === '7' && (
									<FormInput
										name='master_name_group'
										label='Название промысла'
										className={styles.noMargin}
										disabled={groupDisabled}
									/>
								)}
								{groupType === '5' && (
									<FormInput
										name='journal_name_group'
										label='Название издания, студии или канала'
										className={styles.noMargin}
										disabled={groupDisabled}
									/>
								)}
								<ControlledMultipleSelect
									className={styles.groupMultiSelect}
									name='sub_events_group'
									label='Подсобытия'
									selectOptions={
										filteredGroupList ?? [
											{
												label: 'Не выбрано',
												value: '0',
												selected: false,
												use_group: false,
												id_event_role: '',
											},
										]
									}
									placeholder='Выберите подсобытия'
									disabled={
										!useGroup || (groupType !== '2' && groupType !== '4' && groupType !== '7')
									}
								/>
							</FlexRow>
							<div className={styles.guestsList}>
								<ParticipantsFields disabled={groupDisabled} />
							</div>
						</FlexRow>
					</div>
				)}
			</div>

			{!location.pathname.includes('/terminal') && (
				<>
					<div className={styles.checkBoxWrapper}>
						<div className={styles.headBox}>
							<ControlledCheckbox name='use_car' type='checkbox' />
							<span>Еду на машине, нужна парковка</span>
						</div>
						{!carsDisabled && (
							<div className={styles.footerBox}>
								<FlexRow className={styles.row}>
									<FormInput
										className={styles.count}
										name='cars_count'
										label='Всего'
										disabled={carsDisabled}
									/>
									<div className={styles.carsList}>
										<CarFields disabled={carsDisabled} />
									</div>
								</FlexRow>
							</div>
						)}
					</div>
					<div className={styles.checkBoxWrapper}>
						<div className={styles.headBox}>
							<ControlledCheckbox name='use_lager' type='checkbox' />
							<span>Нужно размещение</span>
						</div>
						{!lagerDisabled && (
							<div className={styles.footerBox}>
								<FlexRow className={styles.groupInputs}>
									<ControlledSelect
										className={styles.selectForm}
										name='id_lager_type'
										selectOptions={selectOptionsLager}
										disabled={lagerDisabled}
										label='Место размещения'
									/>
									<FormInput
										name='lager_count'
										label='Всего мест'
										className={styles.noMargin}
										disabled={lagerDisabled}
										isSmallLabel={true}
									/>
								</FlexRow>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}
