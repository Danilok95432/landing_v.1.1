import React, { type FC, type ReactNode, useState } from 'react'
import cn from 'classnames'
import styles from './index.module.scss'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'

export type RowData = {
	rowId: string
	cells: Array<string | ReactNode>
}

type CustomTableProps = {
	colTitles?: ReactNode[]
	rowData: RowData[]
	rowClickHandler?: (id: string) => void
	initialVisibleRows?: number
}

export const CustomTable: FC<CustomTableProps & React.HTMLAttributes<HTMLTableElement>> = ({
	colTitles,
	rowData,
	className,
	rowClickHandler,
	initialVisibleRows,
	...props
}) => {
	const [showAll, setShowAll] = useState(false)

	const visibleRows =
		initialVisibleRows && !showAll ? rowData.slice(0, initialVisibleRows) : rowData

	const shouldShowMoreButton = initialVisibleRows && rowData.length > initialVisibleRows && !showAll

	const handleShowMore = () => {
		setShowAll(true)
	}

	return (
		<div className={styles.tableContainer}>
			<table
				{...props}
				className={cn(styles.customTable, className, {
					[styles._short]: rowData?.length < 3,
				})}
			>
				{!!colTitles && (
					<thead>
						<tr>
							{colTitles.map((title, idx) => (
								<th key={idx}>{title}</th>
							))}
						</tr>
					</thead>
				)}

				<tbody>
					{visibleRows?.map((rowEl, rowIdx) => (
						<tr
							key={rowEl.rowId}
							data-idx={rowIdx + 1}
							onClick={() => rowClickHandler?.(rowEl.rowId)}
						>
							{rowEl.cells.map((cell, cellIdx) => (
								<td key={cellIdx}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			{shouldShowMoreButton && (
				<MainButton $variant='show' className={styles.showMoreBtn} onClick={handleShowMore}>
					{showAll ? 'Скрыть' : 'Показать ещё'}
				</MainButton>
			)}
		</div>
	)
}
