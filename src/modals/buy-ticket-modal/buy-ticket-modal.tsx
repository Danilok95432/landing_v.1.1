/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, FormProvider, type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type * as yup from 'yup'

import styles from './index.module.scss'
import { type FC, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { toast } from 'react-toastify'
import {
	useGetInfoRegistationQuery,
	useGetRegionsByValueQuery,
	useSendRegistrationFormMutation,
} from 'src/features/auth/api/auth.api'
import { useGetRegListQuery } from 'src/features/home/api/home.api'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useActions } from 'src/app/store/hooks/actions'
import { useLocation } from 'react-router-dom'
import { type RegInputs, regSchema } from './schema'
import { HeadSection } from './components/head-section/head-section'
import { RegSection } from './components/reg-section/reg-section'
import { type SelOption } from 'src/types/select'
import { PartSection } from './components/PartSection/PartSection'
import { booleanToNumberString } from 'src/shared/helpers/utils'
import { PhotoUploader } from 'src/widgets/photo-loader/photo-loader'

type RegEventPartModalProps = {
	id: string
}

export const BuyTicketModal: FC<RegEventPartModalProps> = ({ id }) => {
	const { closeModal } = useActions()
	const modalRef = useRef<HTMLDivElement>(null)
	const location = useLocation()

	const [saveRegForm] = useSendRegistrationFormMutation()
	const [isCodeAccepted, setIsCodeAccepted] = useState(false)
	const [errorForm, setErrorForm] = useState('')
	const [selectedRegion, setSelectedRegion] = useState<SelOption | null>(null)

	const { data: tickets } = useGetRegListQuery(id)
	const { data: selectOptions } = useGetInfoRegistationQuery(id)

	const { control } = useForm<RegInputs>({
		defaultValues: {
			photos: [],
		},
	})

	const methods = useForm<RegInputs>({
		mode: 'onBlur',
		resolver: yupResolver(regSchema as unknown as yup.ObjectSchema<RegInputs>),
	})

	const regionSearchValue =
		useWatch({
			control: methods.control,
			name: 'id_region',
		}) ?? ''

	const normalizedRegionSearchValue = regionSearchValue.trim()
	const shouldSearchRegions = normalizedRegionSearchValue.length >= 3

	const { currentData: regionsData } = useGetRegionsByValueQuery(normalizedRegionSearchValue, {
		skip: !shouldSearchRegions,
	})

	const regionOptions = shouldSearchRegions ? regionsData?.regions ?? [] : []

	const onSubmit: SubmitHandler<RegInputs> = async (data) => {
		const regionId =
			selectedRegion?.value ??
			regionOptions.find((region) => region.label === data.id_region)?.value ??
			''

		const formData = new FormData()
		formData.append('id_reg_type', '1')
		formData.append('id_event', id)
		formData.append('surname', data.surname)
		formData.append('firstname', data.firstname)
		formData.append('fathname', data.fathname ?? '')
		formData.append('birthdate', data.birthdate ?? '')
		formData.append('id_region', regionId)
		formData.append('phone', data.phone ?? '')
		formData.append('email', data.email ?? '')

		// Групповые данные
		formData.append('use_group', booleanToNumberString(data.use_group))
		formData.append('group_name', data.group_name ?? '')
		formData.append('id_event_role', data.id_event_role ?? '')
		formData.append('group_count', data.group_list?.length.toString() ?? '0')

		// Данные участников группы
		data.group_list?.forEach((group, index) => {
			formData.append(`group_list_age[${index}]`, group.age ?? '')
			formData.append(`group_list_surname[${index}]`, group.surname ?? '')
			formData.append(`group_list_firstname[${index}]`, group.firstname ?? '')
			formData.append(`group_list_fathname[${index}]`, group.fathname ?? '')
		})

		// Данные лагеря
		formData.append('use_lager', booleanToNumberString(data.use_lager))
		formData.append('id_lager_type', data.id_lager_type ?? '')
		formData.append('lager_count', data.lager_count?.toString() ?? '0')

		// Данные транспорта
		formData.append('use_car', booleanToNumberString(data.use_car))
		data.cars_list?.forEach((car, index) => {
			formData.append(`car_list_type[${index}]`, car.car_type ?? '')
			formData.append(`car_list_number[${index}]`, car.car_number ?? '')
		})

		try {
			const res = await saveRegForm(formData).unwrap()

			if (res.status !== 'ok') {
				toast.error('Произошла ошибка при регистрации', {
					position: 'bottom-right',
				})
				setErrorForm(res.errortext ?? 'Не удалось завершить регистрацию')
				return
			}

			toast.success('Регистрация прошла успешно!', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})

			if (location.pathname.includes('/terminal') && res.ticket_link?.startsWith('http')) {
				window.location.href = res.ticket_link
				return
			}

			closeModal()
		} catch (error) {
			console.error('Unexpected registration error:', error)
			toast.error('Не удалось завершить регистрацию', {
				position: 'bottom-right',
			})
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (window.innerWidth < 768) return

			const modalEl = modalRef.current
			const target = event.target as HTMLElement

			if (!modalEl || modalEl.contains(target)) return

			const { clientX, clientY } = event
			const windowWidth = window.innerWidth
			const windowHeight = window.innerHeight
			const scrollbarSize = 16
			const isClickOnScrollbar =
				clientX >= windowWidth - scrollbarSize || clientY >= windowHeight - scrollbarSize

			if (isClickOnScrollbar) return

			closeModal()
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [closeModal])

	return (
		<div className={styles.ticketModal} ref={modalRef}>
			<div className='modal-content'>
				<div className={styles.modalContent}>
					<FormProvider {...methods}>
						<form
							onSubmit={methods.handleSubmit(onSubmit)}
							noValidate
							className={styles.ticketForm}
						>
							{selectOptions?.use_sale && <HeadSection ticketTypeList={tickets?.ticket_types} />}
							<RegSection
								id={id}
								regions={regionOptions}
								onRegionSelect={setSelectedRegion}
								isCodeAccepted={isCodeAccepted}
								setIsCodeAccepted={setIsCodeAccepted}
								errorForm={errorForm}
								setErrorForm={setErrorForm}
								sale={selectOptions?.use_sale}
							/>
							<Controller
								name='photos'
								control={control}
								render={({ field }) => (
									<PhotoUploader
										value={field.value}
										onChange={field.onChange}
										multiple
										maxFiles={5}
										minWidth={400}
										minHeight={400}
									/>
								)}
							/>
							<PartSection
								selectOptionsCars={selectOptions?.car_types}
								selectOptionsLager={selectOptions?.lager_types}
								selectOptionsGroup={selectOptions?.event_roles}
								subEvents={selectOptions?.sub_events}
							/>
							{/* <DatesSection /> */}
							{selectOptions?.use_sale && (
								<p className={styles.specialDesc}>
									Электронный кассовый чек будет выслан Вам вместе с билетом на e-mail или телефон.
								</p>
							)}
							<FlexRow className={cn(styles.disclaimer, styles._last)}>
								<div className={styles.grayBox}>
									<p>
										Внимание! Завершение регистрации означает согласие с{' '}
										<a href='https://этноспорт.рф/events/1/docs'>
											Политикой защиты и обработки персональных данных
										</a>{' '}
										и <a href='https://этноспорт.рф/events/1/rules'>Правилами посещения игр</a>.
									</p>
								</div>
							</FlexRow>
							<MainButton type='submit' disabled={!isCodeAccepted}>
								{selectOptions?.use_sale
									? 'Перейти к оплате билетов'
									: 'Завершить регистрацию гостя'}
							</MainButton>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	)
}
