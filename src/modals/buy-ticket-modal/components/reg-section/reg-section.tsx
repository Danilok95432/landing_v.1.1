import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from '../../index.module.scss'
import { type FC, useEffect, useRef } from 'react'
import { FormInput } from 'src/widgets/FormInput/form-input'
import { MaskedDateInput } from 'src/widgets/masked-date-input/masked-date-input'
import classNames from 'classnames'
import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { type SelOption } from 'src/types/select'
import { useGetRegSettingsQuery } from 'src/features/home/api/home.api'

type RegSectionProps = {
	errorForm?: string
	setErrorForm?: (value: string) => void
	isCodeAccepted?: boolean
	setIsCodeAccepted?: (value: boolean) => void
	regions?: SelOption[]
	onRegionSelect?: (region: SelOption | null) => void
	id: string
}

export const RegSection: FC<RegSectionProps> = ({
	isCodeAccepted,
	setIsCodeAccepted,
	errorForm,
	setErrorForm,
	regions = [],
	onRegionSelect,
	id,
}) => {
	const verificationSourceRef = useRef<HTMLDivElement>(null)
	const codeInputRef = useRef<HTMLDivElement>(null)
	const { data: regSettings } = useGetRegSettingsQuery(id)

	const {
		formState: { errors },
	} = useFormContext()

	useEffect(() => {
		if (!errorForm) return

		const targetRef = isCodeAccepted ? verificationSourceRef : codeInputRef
		targetRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		})
	}, [errorForm, isCodeAccepted])

	return (
		<div className={classNames(styles.formSection, styles.formSectionReg)}>
			<FlexRow className={styles.regHead}>
				<span className={styles.titleSmall}>Регистрация гостя</span>
				<FlexRow className={styles.disclaimer}>
					<div className={styles.grayBox}>
						<p>Регистрация гостя обязательна, без нее мы не сможем продать Вам билеты.</p>
					</div>
				</FlexRow>
			</FlexRow>

			<FlexRow className={styles.groupInputs}>
				{regSettings?.regFields.surname.active && (
					<FormInput
						name='surname'
						label='Фамилия *'
						className={classNames(styles.first, styles.noMargin)}
						required={regSettings.regFields.surname.req}
					/>
				)}
				{regSettings?.regFields.birthday.active && (
					<MaskedDateInput
						name='birthdate'
						placeholder='дд.мм.гггг'
						className={styles.adminDateInput}
						label='Дата рождения *'
					/>
				)}
			</FlexRow>

			<FlexRow className={styles.groupInputs}>
				{regSettings?.regFields.name.active && (
					<FormInput
						name='firstname'
						label='Имя *'
						className={styles.noMargin}
						required={regSettings.regFields.name.req}
					/>
				)}
				{regSettings?.regFields.patronymic.active && (
					<FormInput
						name='fathname'
						label='Отчество *'
						className={classNames(styles.inputWrapperContainer, styles.noMargin)}
						required={regSettings.regFields.patronymic.req}
					/>
				)}
			</FlexRow>

			{regSettings?.regFields.region.active && (
				<div className={styles.inputwithLabel}>
					<FormInput
						name='id_region'
						label='Регион РФ'
						className={styles.noMargin}
						is_select
						selectOptions={regions}
						onSelectOption={onRegionSelect}
					/>
					{errors.id_region && (
						<p className={styles.warningMessage}>
							<ErrorMessage errors={errors} name='id_region' />
						</p>
					)}
					<span>
						Начните ввод названия региона и выберите из предложенных вариантов. Если Вы не из
						России, наберите «ино» и выберите вариант «Иностранец».
					</span>
				</div>
			)}

			{regSettings?.regFields.email.use_email && (
				<FlexRow className={styles.groupInputsStart}>
					<div className={styles.inputwithLabel} ref={verificationSourceRef}>
						<FormInput
							name='email'
							label='Адрес e-mail *'
							isEmailCode
							idEvent={id}
							className={classNames(styles.noMargin, styles.first)}
							isCodeAccepted={isCodeAccepted}
							setIsCodeAccepted={setIsCodeAccepted}
							setErrorForm={setErrorForm}
							required={regSettings.regFields.email.req}
						/>
						<span className={styles.phoneSpan}>
							На этот адрес поступят письма с проверочным кодом и ссылкой на билет
						</span>
					</div>
					<div className={styles.inputwithLabel} ref={codeInputRef}>
						<FormInput
							name='code'
							label='Проверочный код *'
							isCode
							verificationType='email'
							idEvent={id}
							isCodeAccepted={isCodeAccepted}
							errorForm={errorForm}
							setErrorForm={setErrorForm}
							setIsCodeAccepted={setIsCodeAccepted}
							className={styles.noMargin}
							required
						/>
						{!isCodeAccepted && errorForm && <p className={styles.warningMessage}>{errorForm}</p>}
						<span>Введите код для проверки</span>
					</div>
				</FlexRow>
			)}

			{regSettings?.regFields.phone.use_sms && (
				<FlexRow className={styles.groupInputsStart}>
					<div className={styles.inputwithLabel} ref={verificationSourceRef}>
						<FormInput
							name='phone'
							label='Номер телефона *'
							isPhoneWithCode
							className={classNames(styles.noMargin, styles.first)}
							isCodeAccepted={isCodeAccepted}
							setIsCodeAccepted={setIsCodeAccepted}
							setErrorForm={setErrorForm}
						/>
						<span className={styles.phoneSpan}>На этот номер поступит СМС со ссылкой на билет</span>
					</div>
					<div className={styles.inputwithLabel} ref={codeInputRef}>
						<FormInput
							name='code'
							label='Проверочный код *'
							isCode
							verificationType='phone'
							isCodeAccepted={isCodeAccepted}
							errorForm={errorForm}
							setErrorForm={setErrorForm}
							setIsCodeAccepted={setIsCodeAccepted}
							className={styles.noMargin}
						/>
						{!isCodeAccepted && errorForm && <p className={styles.warningMessage}>{errorForm}</p>}
						<span>Введите код для проверки</span>
					</div>
				</FlexRow>
			)}

			{regSettings?.regFields.phone.use_sms && (
				<div className={styles.inputwithLabel}>
					<FormInput
						name='email'
						label='Адрес e-mail *'
						className={classNames(styles.noMargin, styles.first)}
					/>
					<span className={styles.phoneSpan}>
						На этот адрес поступят письма со ссылкой на билет
					</span>
				</div>
			)}

			{regSettings?.regFields.email.use_email && (
				<div className={styles.inputwithLabel}>
					<FormInput
						name='phone'
						label='Номер телефона *'
						isPhone
						className={classNames(styles.noMargin, styles.first)}
					/>
					<span className={styles.phoneSpan}>
						Этот номер будет использован только для контакта
						<br /> с Вами
					</span>
				</div>
			)}

			<p className={styles.desc}>
				Электронный кассовый чек будет выслан Вам вместе с билетом на e-mail или телефон.
			</p>
		</div>
	)
}
