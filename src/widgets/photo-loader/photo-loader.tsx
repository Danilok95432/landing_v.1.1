import { type ChangeEvent, type DragEvent, useEffect, useRef, useState } from 'react'

import styles from './index.module.scss'
import { createPortal } from 'react-dom'

type UploadStatus = 'loading' | 'ready'

type UploadItem = {
	id: string
	file: File
	preview: string
	status: UploadStatus
}

type PhotoUploaderProps = {
	value?: File[]
	onChange?: (files: File[]) => void

	multiple?: boolean
	maxFiles?: number

	minWidth?: number
	minHeight?: number

	maxFileSizeMb?: number

	disabled?: boolean
	className?: string

	/**
	 * Если когда-нибудь понадобится загружать файл на сервер
	 * сразу после выбора, можно передать этот метод.
	 *
	 * signal нужен для возможности отмены по крестику.
	 */
	uploadFile?: (file: File, signal: AbortSignal) => Promise<void>
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png']

const getFileId = (file: File) =>
	`${file.name}_${file.size}_${file.lastModified}_${crypto.randomUUID()}`

const formatFileSize = (size: number) => {
	if (size < 1024) {
		return `${size} Б`
	}

	if (size < 1024 * 1024) {
		return `${Math.round(size / 1024)} КБ`
	}

	const mb = size / 1024 / 1024

	return `${Number(mb.toFixed(1))} МБ`
}

const checkImageDimensions = async (
	file: File,
	minWidth: number,
	minHeight: number,
	signal?: AbortSignal,
) =>
	await new Promise<void>((resolve, reject) => {
		const objectUrl = URL.createObjectURL(file)
		const image = new Image()

		const clear = () => {
			URL.revokeObjectURL(objectUrl)
		}

		image.onload = () => {
			clear()

			if (signal?.aborted) {
				reject(new DOMException('Upload aborted', 'AbortError'))
				return
			}

			if (image.naturalWidth < minWidth || image.naturalHeight < minHeight) {
				reject(
					new Error(
						`Размер фото слишком маленький. Загрузите фото размером не меньше ${minWidth}x${minHeight} px, PNG, JPG`,
					),
				)
				return
			}

			resolve()
		}

		image.onerror = () => {
			clear()
			reject(new Error('Не удалось прочитать изображение'))
		}

		signal?.addEventListener(
			'abort',
			() => {
				image.src = ''
				clear()
				reject(new DOMException('Upload aborted', 'AbortError'))
			},
			{ once: true },
		)

		image.src = objectUrl
	})

const PlusIcon = () => (
	<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='M12 5V19M5 12H19' stroke='currentColor' strokeWidth='1.5' />
	</svg>
)

const CloseIcon = () => (
	<svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='M6 6L18 18M18 6L6 18' stroke='currentColor' strokeWidth='1.5' />
	</svg>
)

const TrashIcon = () => (
	<svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M4 7H20M9 7V4H15V7M6.5 7L7.5 20H16.5L17.5 7M10 11V17M14 11V17'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const PhotoUploader = ({
	value = [],
	onChange,
	multiple = false,
	maxFiles = 1,
	minWidth = 400,
	minHeight = 400,
	maxFileSizeMb,
	disabled = false,
	className,
	uploadFile,
}: PhotoUploaderProps) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const [items, setItems] = useState<UploadItem[]>([])
	const [error, setError] = useState<string>('')
	const [previewItem, setPreviewItem] = useState<UploadItem | null>(null)
	const [isDragging, setIsDragging] = useState(false)

	const controllersRef = useRef<Map<string, AbortController>>(new Map())

	const currentMaxFiles = multiple ? maxFiles : 1

	/*
	 * Поддержка внешнего reset формы.
	 *
	 * Например:
	 * methods.reset({ photos: [] })
	 */
	useEffect(() => {
		if (value.length !== 0 || items.length === 0) {
			return
		}

		items.forEach((item) => {
			URL.revokeObjectURL(item.preview)
		})

		setItems([])
		setPreviewItem(null)
	}, [value.length])

	useEffect(() => {
		return () => {
			items.forEach((item) => {
				URL.revokeObjectURL(item.preview)
			})

			controllersRef.current.forEach((controller) => {
				controller.abort()
			})
		}
	}, [])

	useEffect(() => {
		if (!previewItem) {
			return
		}

		const previousOverflow = document.body.style.overflow

		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = previousOverflow
		}
	}, [previewItem])

	const updateExternalValue = (nextItems: UploadItem[]) => {
		onChange?.(nextItems.map((item) => item.file))
	}

	const validateFile = async (file: File, signal?: AbortSignal): Promise<void> => {
		if (!ACCEPTED_TYPES.includes(file.type)) {
			throw new Error('Недопустимый формат файла. Загрузите фото в формате PNG или JPG')
		}

		if (maxFileSizeMb) {
			const maxBytes = maxFileSizeMb * 1024 * 1024

			if (file.size > maxBytes) {
				throw new Error(`Размер файла слишком большой. Максимальный размер — ${maxFileSizeMb} МБ`)
			}
		}

		await checkImageDimensions(file, minWidth, minHeight, signal)
	}

	const removeItem = (id: string) => {
		const controller = controllersRef.current.get(id)

		if (controller) {
			controller.abort()
			controllersRef.current.delete(id)
		}

		setItems((currentItems) => {
			const itemToDelete = currentItems.find((item) => item.id === id)

			if (itemToDelete) {
				URL.revokeObjectURL(itemToDelete.preview)
			}

			const nextItems = currentItems.filter((item) => item.id !== id)

			updateExternalValue(nextItems)

			return nextItems
		})

		setPreviewItem((current) => {
			if (current?.id === id) {
				return null
			}

			return current
		})
	}

	const processFile = async (file: File) => {
		const id = getFileId(file)
		const preview = URL.createObjectURL(file)
		const controller = new AbortController()

		controllersRef.current.set(id, controller)

		const newItem: UploadItem = {
			id,
			file,
			preview,
			status: 'loading',
		}

		setItems((currentItems) => [...currentItems, newItem])

		try {
			await validateFile(file, controller.signal)

			/*
			 * Если передан uploadFile, здесь действительно идёт
			 * загрузка картинки на сервер.
			 *
			 * Если uploadFile отсутствует, "loading" означает
			 * проверку/подготовку файла на клиенте.
			 */
			if (uploadFile) {
				await uploadFile(file, controller.signal)
			}

			if (controller.signal.aborted) {
				return
			}

			setItems((currentItems) => {
				const nextItems = currentItems.map((item) =>
					item.id === id
						? {
								...item,
								status: 'ready' as const,
							}
						: item,
				)

				updateExternalValue(nextItems)

				return nextItems
			})
		} catch (uploadError) {
			if (controller.signal.aborted) {
				return
			}

			const message =
				uploadError instanceof Error
					? uploadError.message
					: 'Произошла ошибка при загрузке фотографии'

			setError(message)

			setItems((currentItems) => {
				const nextItems = currentItems.filter((item) => item.id !== id)

				URL.revokeObjectURL(preview)

				updateExternalValue(nextItems)

				return nextItems
			})
		} finally {
			controllersRef.current.delete(id)
		}
	}

	const addFiles = async (newFiles: File[]) => {
		setError('')

		const availableCount = currentMaxFiles - items.length

		if (availableCount <= 0) {
			return
		}

		const filesToUpload = multiple ? newFiles.slice(0, availableCount) : newFiles.slice(0, 1)

		if (newFiles.length > availableCount) {
			setError(`Можно загрузить не больше ${currentMaxFiles} фото`)
		}

		for (const file of filesToUpload) {
			void processFile(file)
		}
	}

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(event.target.files ?? [])

		if (!selectedFiles.length) {
			return
		}

		void addFiles(selectedFiles)

		/*
		 * Нужен reset value, чтобы можно было повторно
		 * выбрать тот же самый файл.
		 */
		event.target.value = ''
	}

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()

		if (disabled) {
			return
		}

		setIsDragging(false)

		const files = Array.from(event.dataTransfer.files)

		if (!files.length) {
			return
		}

		void addFiles(files)
	}

	const handleOpenFileDialog = () => {
		if (disabled) {
			return
		}

		inputRef.current?.click()
	}

	const handleDeleteFromPreview = () => {
		if (!previewItem) {
			return
		}

		removeItem(previewItem.id)
	}

	const readyItems = items.filter((item) => item.status === 'ready')
	const loadingItems = items.filter((item) => item.status === 'loading')

	const canAddMore = items.length < currentMaxFiles

	const renderUploadButton = () => (
		<div
			className={`${styles.uploadArea} ${isDragging ? styles.dragging : ''}`}
			onClick={handleOpenFileDialog}
			onDragEnter={(event) => {
				event.preventDefault()
				setIsDragging(true)
			}}
			onDragOver={(event) => {
				event.preventDefault()
				setIsDragging(true)
			}}
			onDragLeave={() => setIsDragging(false)}
			onDrop={handleDrop}
		>
			<button type='button' className={styles.uploadButton} disabled={disabled}>
				Загрузить
			</button>
		</div>
	)

	return (
		<div className={`${styles.wrapper} ${className ?? ''}`}>
			<div className={styles.header}>
				<div className={styles.title}>
					Фото ({readyItems.length} из {currentMaxFiles})
				</div>

				<div className={styles.description}>
					Минимальный размер фото {minWidth}x{minHeight} px, PNG, JPG
				</div>
			</div>

			<input
				ref={inputRef}
				type='file'
				accept='.png,.jpg,.jpeg,image/png,image/jpeg'
				multiple={multiple}
				disabled={disabled}
				className={styles.hiddenInput}
				onChange={handleInputChange}
			/>

			{!multiple && items.length === 0 && renderUploadButton()}

			{!multiple &&
				loadingItems.map((item) => (
					<div className={styles.singleFile} key={item.id}>
						<div className={styles.loaderBox}>
							<div className={styles.loader} />
						</div>

						<div className={styles.fileInfo}>
							<span className={styles.fileName}>{item.file.name}</span>

							<span className={styles.fileSize}>{formatFileSize(item.file.size)}</span>
						</div>

						<button
							type='button'
							className={styles.iconButton}
							onClick={() => removeItem(item.id)}
							aria-label='Отменить загрузку'
						>
							<CloseIcon />
						</button>
					</div>
				))}

			{!multiple &&
				readyItems.map((item) => (
					<div className={styles.singleFile} key={item.id}>
						<button
							type='button'
							className={styles.previewButton}
							onClick={() => setPreviewItem(item)}
						>
							<img src={item.preview} alt={item.file.name} className={styles.singlePreview} />
						</button>

						<div className={styles.fileInfo}>
							<span className={styles.fileName}>{item.file.name}</span>

							<span className={styles.fileSize}>{formatFileSize(item.file.size)}</span>
						</div>

						<button
							type='button'
							className={styles.iconButton}
							onClick={() => removeItem(item.id)}
							aria-label='Удалить фотографию'
						>
							<TrashIcon />
						</button>
					</div>
				))}

			{multiple && (
				<div className={styles.multipleList}>
					{items.map((item) => (
						<div className={styles.multipleItem} key={item.id}>
							{item.status === 'loading' ? (
								<>
									<img
										src={item.preview}
										alt=''
										className={`${styles.multiplePreview} ${styles.loadingPreview}`}
									/>

									<div className={styles.multipleLoader}>
										<div className={styles.loader} />
									</div>

									<button
										type='button'
										className={styles.multipleRemove}
										onClick={() => removeItem(item.id)}
										aria-label='Отменить загрузку'
									>
										<CloseIcon />
									</button>
								</>
							) : (
								<>
									<button
										type='button'
										className={styles.multiplePreviewButton}
										onClick={() => setPreviewItem(item)}
									>
										<img
											src={item.preview}
											alt={item.file.name}
											className={styles.multiplePreview}
										/>
									</button>

									<button
										type='button'
										className={styles.multipleRemove}
										onClick={() => removeItem(item.id)}
										aria-label='Удалить фотографию'
									>
										<CloseIcon />
									</button>
								</>
							)}
						</div>
					))}

					{canAddMore && (
						<button
							type='button'
							className={styles.addPhoto}
							onClick={handleOpenFileDialog}
							disabled={disabled}
							aria-label='Добавить фотографию'
						>
							<PlusIcon />
						</button>
					)}
				</div>
			)}

			{error && <div className={styles.error}>{error}</div>}

			{previewItem &&
				createPortal(
					<div
						className={styles.fullscreen}
						onPointerDown={(event) => {
							event.stopPropagation()
						}}
						onMouseDown={(event) => {
							event.stopPropagation()
						}}
						onClick={(event) => {
							event.stopPropagation()

							if (event.target === event.currentTarget) {
								setPreviewItem(null)
							}
						}}
					>
						<button
							type='button'
							className={styles.fullscreenClose}
							onPointerDown={(event) => {
								event.stopPropagation()
							}}
							onMouseDown={(event) => {
								event.stopPropagation()
							}}
							onClick={(event) => {
								event.stopPropagation()
								setPreviewItem(null)
							}}
							aria-label='Закрыть'
						>
							<CloseIcon />
						</button>

						<div
							className={styles.fullscreenContent}
							onPointerDown={(event) => {
								event.stopPropagation()
							}}
							onMouseDown={(event) => {
								event.stopPropagation()
							}}
							onClick={(event) => {
								event.stopPropagation()
							}}
						>
							<img
								src={previewItem.preview}
								alt={previewItem.file.name}
								className={styles.fullscreenImage}
							/>

							<button
								type='button'
								className={styles.deletePhoto}
								onPointerDown={(event) => {
									event.stopPropagation()
								}}
								onMouseDown={(event) => {
									event.stopPropagation()
								}}
								onClick={(event) => {
									event.stopPropagation()
									handleDeleteFromPreview()
								}}
							>
								Удалить фото
							</button>
						</div>
					</div>,
					document.body,
				)}
		</div>
	)
}
