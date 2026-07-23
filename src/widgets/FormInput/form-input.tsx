/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useRef, useState, type InputHTMLAttributes } from 'react'
import InputMask from 'react-input-mask'
import cn from 'classnames'
import styles from './index.module.scss'
import { Controller, type FieldError, useFormContext } from 'react-hook-form'
import { type SelOption } from 'src/types/select'
import { toast } from 'react-toastify'
import {
	useCheckRegistrationCodeEmailMutation,
	useCheckRegistrationCodeMutation,
	useGetRegistrationCodeEmailMutation,
	useGetRegistrationCodeMutation,
} from 'src/features/auth/api/auth.api'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'

type VerificationType = 'phone' | 'email'

interface CustomProps {
	label: string
	error?: string
	isPassword?: boolean
	isPhone?: boolean
	isSmallLabel?: boolean
	isPhoneWithCode?: boolean
	isEmailCode?: boolean
	maskChar?: string
	dynamicError?: FieldError
	name: string
	is_select?: boolean
	is_city_select?: boolean
	isCode?: boolean
	selectOptions?: SelOption[]
	errorForm?: string
	searchValue?: string
	setSearchValue?: (value: string) => void
	setErrorForm?: (value: string) => void
	disabled?: boolean
	disabledList?: boolean
	accept?: boolean
	isCodeAccepted?: boolean
	setIsCodeAccepted?: (value: boolean) => void
	setRegionValue?: (value: string) => void
	lockSearch?: boolean
	setLockSearch?: (value: boolean) => void
	sendCodeClass?: string
	setTicketUrl?: (value: string) => void
	idEvent?: string
	verificationType?: VerificationType
	onSelectOption?: (option: SelOption | null) => void
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & CustomProps

export const FormInput: React.FC<TextInputProps> = ({
	label,
	error,
	isPassword: _isPassword,
	isSmallLabel,
	isPhone = false,
	isCode = false,
	isCodeAccepted,
	disabledList,
	setIsCodeAccepted,
	setErrorForm,
	isPhoneWithCode = false,
	isEmailCode = false,
	setRegionValue,
	className,
	errorForm: _errorForm,
	onFocus,
	maskChar: _maskChar,
	dynamicError: _dynamicError,
	name,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	is_select,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	is_city_select,
	lockSearch,
	setLockSearch,
	selectOptions = [],
	searchValue: _searchValue,
	setSearchValue: _setSearchValue,
	disabled,
	accept,
	sendCodeClass,
	setTicketUrl,
	idEvent,
	verificationType = 'phone',
	onSelectOption,
	...restProps
}) => {
	const { register, control, watch, setValue } = useFormContext()
	const inputRef = useRef<HTMLInputElement | null>(null)
	const selectWrapperRef = useRef<HTMLDivElement>(null)

	const [isFocused, setIsFocused] = useState(false)
	const [isSended, setIsSended] = useState(false)
	const [showOptions, setShowOptions] = useState(false)
	const [forceShowAllOptions, setForceShowAllOptions] = useState(false)
	const [countdown, setCountdown] = useState(0)
	const [codeStatus, setCodeStatus] = useState<'idle' | 'ok' | 'error'>('idle')

	const fieldValue = watch(name)
	const shouldRaiseLabel = isFocused || String(fieldValue ?? '').length > 0

	const [getPhoneCode] = useGetRegistrationCodeMutation()
	const [getEmailCode] = useGetRegistrationCodeEmailMutation()
	const [checkPhoneCode] = useCheckRegistrationCodeMutation()
	const [checkEmailCode] = useCheckRegistrationCodeEmailMutation()

	useEffect(() => {
		if (!is_select) return

		const handleClickOutside = (event: MouseEvent) => {
			if (selectWrapperRef.current?.contains(event.target as Node)) return
			setShowOptions(false)
			setForceShowAllOptions(false)
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [is_select])

	useEffect(() => {
		if (countdown <= 0) {
			setIsSended(false)
			return
		}

		const timer = window.setTimeout(() => {
			setCountdown((currentValue) => currentValue - 1)
		}, 1000)

		return () => window.clearTimeout(timer)
	}, [countdown])

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(true)
		onFocus?.(event)
	}

	const handleBlur = () => setIsFocused(false)

	const resetVerification = () => {
		setIsCodeAccepted?.(false)
		setErrorForm?.('')
		setCodeStatus('idle')
		setValue('code', '')
	}

	const handleSendCode = async (value: string) => {
		const normalizedValue = value.trim()

		if (!normalizedValue) return

		if (isEmailCode && !idEvent) {
			toast.error('Не удалось определить мероприятие для отправки кода', {
				position: 'bottom-right',
			})
			return
		}

		try {
			const response = isEmailCode
				? await getEmailCode({ email: normalizedValue, idEvent: idEvent ?? '' })
				: await getPhoneCode(normalizedValue)

			if ('error' in response) {
				toast.error('Не удалось отправить код. Проверьте соединение.', {
					position: 'bottom-right',
					autoClose: 5000,
				})
				return
			}

			const { status, errortext, ticket } = response.data

			if (status !== 'ok') {
				toast.error(errortext ?? 'Ошибка при отправке кода. Повторите попытку позже', {
					position: 'bottom-right',
					autoClose: 5000,
				})
				return
			}

			setIsSended(true)
			setIsCodeAccepted?.(false)
			setTicketUrl?.(ticket ?? '')
			setErrorForm?.('')
			setCodeStatus('idle')
			setValue('code', '')
			setCountdown(120)
		} catch (requestError) {
			toast.error('Неизвестная ошибка', {
				position: 'bottom-right',
				autoClose: 5000,
			})
			console.error('handleSendCode error:', requestError)
		}
	}

	const handleCodeChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: string) => void,
	) => {
		const rawValue = event.target.value.replace(/\D/g, '').slice(0, 5)
		onChange(rawValue)
		setErrorForm?.('')

		if (rawValue.length !== 5) {
			setCodeStatus('idle')
			setIsCodeAccepted?.(false)
			return
		}

		try {
			const response =
				verificationType === 'email'
					? await checkEmailCode({
							email: watch('email') ?? '',
							code: rawValue,
							id_event: idEvent ?? '',
						})
					: await checkPhoneCode({
							phone: watch('phone') ?? '',
							code: rawValue,
						})

			if ('error' in response || response.data?.status !== 'ok') {
				const errorText =
					'data' in response
						? response.data?.errortext || 'Неверный код'
						: 'Не удалось проверить код'

				setCodeStatus('error')
				setIsCodeAccepted?.(false)
				setErrorForm?.(errorText)
				return
			}

			setCodeStatus('ok')
			setIsCodeAccepted?.(true)
			setErrorForm?.('')
			setTicketUrl?.(response.data.ticket_link ?? '')
		} catch (requestError) {
			console.error('handleCheckCode error:', requestError)
			setCodeStatus('error')
			setIsCodeAccepted?.(false)
			setErrorForm?.('Не удалось проверить код')
		}
	}

	if (is_select) {
		return (
			<div className={cn(styles.inputContainer, className)}>
				<Controller
					name={name}
					control={control}
					render={({ field }) => {
						const filteredOptions = forceShowAllOptions
							? selectOptions
							: selectOptions.filter((option) =>
									option.label.toLowerCase().includes(String(field.value ?? '').toLowerCase()),
								)

						return (
							<div
								className={cn(styles.inputWrapper, {
									[styles.focused]: isFocused,
									[styles.error]: !!error,
									[styles.disabled]: disabled,
								})}
								ref={selectWrapperRef}
							>
								<input
									{...restProps}
									className={styles.input}
									value={field.value ?? ''}
									disabled={disabled}
									onChange={(event) => {
										field.onChange(event.target.value)
										setRegionValue?.(event.target.value)
										onSelectOption?.(null)
										setShowOptions(true)
										setForceShowAllOptions(false)

										if (is_city_select && lockSearch) {
											setLockSearch?.(false)
										}
									}}
									onFocus={(event) => {
										handleFocus(event)
										setShowOptions(true)
										setForceShowAllOptions(true)
									}}
									onBlur={handleBlur}
								/>
								<label
									className={cn(styles.label, {
										[styles.raised]: shouldRaiseLabel,
									})}
								>
									{label}
								</label>
								{showOptions && !disabledList && filteredOptions.length > 0 && (
									<ul className={styles.selectOptions}>
										{filteredOptions.map((option) => (
											<li
												key={option.value}
												className={styles.option}
												onMouseDown={(event) => event.preventDefault()}
												onClick={() => {
													field.onChange(option.label)
													onSelectOption?.(option)
													setShowOptions(false)
													setForceShowAllOptions(false)

													if (is_city_select) {
														setLockSearch?.(true)
													}
												}}
											>
												{option.label}
											</li>
										))}
									</ul>
								)}
							</div>
						)
					}}
				/>
			</div>
		)
	}

	if (isCode) {
		return (
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<div
						className={cn(styles.inputWrapper, className, {
							[styles.focused]: isFocused,
							[styles.error]: codeStatus === 'error',
							[styles.accept]: codeStatus === 'ok',
							[styles.disabled]: disabled ?? isCodeAccepted,
						})}
					>
						<input
							{...restProps}
							type='text'
							inputMode='numeric'
							pattern='[0-9]*'
							maxLength={5}
							className={styles.input}
							value={field.value ?? ''}
							disabled={disabled ?? isCodeAccepted}
							// eslint-disable-next-line no-void
							onChange={(event) => void handleCodeChange(event, field.onChange)}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
						<label
							className={cn(styles.label, {
								[styles.raised]: isFocused || !!field.value,
							})}
						>
							{label}
						</label>
					</div>
				)}
			/>
		)
	}

	if (isEmailCode) {
		return (
			<div className={cn(styles.inputContainer, className)}>
				<div
					className={cn(styles.inputWrapper, {
						[styles.focused]: isFocused,
						[styles.error]: !!error,
						[styles.disabled]: disabled,
						[styles.accept]: accept,
					})}
				>
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<>
								<input
									{...restProps}
									className={styles.input}
									value={field.value ?? ''}
									disabled={disabled}
									ref={(element) => {
										field.ref(element)
										inputRef.current = element
									}}
									onChange={(event) => {
										field.onChange(event.target.value)
										resetVerification()
									}}
									onFocus={handleFocus}
									onBlur={handleBlur}
								/>
								<MainButton
									type='button'
									className={cn(sendCodeClass, styles.sendCodeBtn, styles.sendCodeBtnEmail, {
										[styles.resend]: countdown > 0 && !isCodeAccepted,
										[styles.codeAccepted]: isCodeAccepted,
									})}
									// eslint-disable-next-line no-void
									onClick={() => void handleSendCode(String(field.value ?? ''))}
									disabled={
										!String(field.value ?? '').trim() || isSended || countdown > 0 || isCodeAccepted
									}
								>
									{isCodeAccepted
										? 'Код верный'
										: countdown > 0
											? `Повторная отправка: ${countdown}`
											: 'Отправить код'}
								</MainButton>
							</>
						)}
					/>
					<label
						className={cn(styles.label, {
							[styles.raised]: shouldRaiseLabel,
							[styles.smallLable]: isSmallLabel,
						})}
					>
						{label}
					</label>
				</div>
			</div>
		)
	}

	return (
		<div className={cn(styles.inputContainer, className)}>
			<div
				className={cn(styles.inputWrapper, {
					[styles.focused]: isFocused,
					[styles.error]: !!error,
					[styles.disabled]: disabled,
					[styles.accept]: accept,
				})}
			>
				{isPhone || isPhoneWithCode ? (
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<>
								<InputMask
									mask='+7 (999) 999-99-99'
									inputRef={(element) => {
										field.ref(element)
										inputRef.current = element
									}}
									value={field.value ?? ''}
									onChange={(event) => {
										field.onChange(event.target.value)
										if (isPhoneWithCode) resetVerification()
									}}
									onBlur={(event) => {
										field.onBlur()
										handleBlur()
									}}
									onFocus={handleFocus}
								>
									<input className={styles.input} type='tel' {...restProps} />
								</InputMask>
								{isPhoneWithCode && (
									<MainButton
										type='button'
										className={cn(sendCodeClass, styles.sendCodeBtn, {
											[styles.resend]: countdown > 0 && !isCodeAccepted,
											[styles.codeAccepted]: isCodeAccepted,
										})}
										// eslint-disable-next-line no-void
										onClick={() => void handleSendCode(String(field.value ?? ''))}
										disabled={
											!field.value ||
											String(field.value).includes('_') ||
											isSended ||
											countdown > 0 ||
											isCodeAccepted
										}
									>
										{isCodeAccepted
											? 'Код верный'
											: countdown > 0
												? `Повторная отправка: ${countdown}`
												: 'Отправить код'}
									</MainButton>
								)}
							</>
						)}
					/>
				) : (
					<input
						{...register(name)}
						{...restProps}
						className={styles.input}
						disabled={disabled}
						ref={(element) => {
							register(name).ref(element)
							inputRef.current = element
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
				)}
				<label
					className={cn(styles.label, {
						[styles.raised]: shouldRaiseLabel,
						[styles.smallLable]: isSmallLabel,
					})}
				>
					{label}
				</label>
			</div>
		</div>
	)
}
