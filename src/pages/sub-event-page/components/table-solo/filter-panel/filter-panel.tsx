import cn from 'classnames'

import styles from './index.module.scss'
import { type FC } from 'react'
import { FiltersIconSVG } from 'src/shared/ui/icons/filtersIconSVG'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { MainInput } from 'src/shared/ui/MainInput/MainInput'
import { MainSelect } from 'src/shared/ui/MainSelect/MainSelect'
import { SwitcherView } from 'src/widgets/switcherView/switcherView'

type FilterPanelProps = {
	options: {
		name?: string
		region?: string
		view?: string
		type?: string
		setSearchName: (arg0: string) => void
		setSearchRegion: (arg0: string) => void
		setSearchType: (arg0: string) => void
		setView: (arg0: string) => void
	}
}

export const FilterPanel: FC<FilterPanelProps> = ({ options }) => {
	return (
		<div className={styles.filterPanel}>
			<div className={styles.filters}>
				<div className={styles.searchWrapper}>
					<MainInput
						className={cn(styles.searchInput, { [styles._activeSearch]: options.name })}
						name='search'
						placeholder='поиск по имени участника...'
						value={options.name}
						onChange={(e) => options.setSearchName(e.target.value)}
						required
					/>
				</div>
				<div className={cn(styles.searchWrapper, styles.hiddenMobile)}>
					<MainInput
						className={cn(styles.searchInput, { [styles._activeSearch]: options.region })}
						name='searchRegion'
						placeholder='поиск по региону...'
						value={options.region}
						onChange={(e) => options.setSearchRegion(e.target.value)}
						required
					/>
				</div>
				<div className={cn(styles.searchWrapper, styles.hiddenMobile)}>
					<MainSelect
						wrapperClassName={cn(styles.searchSelect)}
						name='type'
						items={[{ label: 'Выбрать тип участия', value: '0' }]}
						value={options.type}
						onChange={(e) => options.setSearchType(e.target.value)}
						required
					/>
				</div>
				<MainButton className={styles.hiddenMobile}>Найти</MainButton>
				<MainButton className={styles.mobileFilters}>
					<FiltersIconSVG />
				</MainButton>
			</div>
			<SwitcherView
				view={options.view}
				switchView={options.setView}
				className={styles.hiddenMobile}
			/>
		</div>
	)
}
