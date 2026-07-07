import cn from 'classnames'

import styles from './index.module.scss'
import { type FC } from 'react'
import { ListPropgramSVG } from 'src/shared/ui/icons/listProgramSVG'
import { TabProgramSVG } from 'src/shared/ui/icons/tabProgramSVG'

type SwitcherViewProps = {
	view?: string
	switchView: (arg0: string) => void
	className?: string
}

export const SwitcherView: FC<SwitcherViewProps> = ({ view, switchView, className }) => {
	return (
		<div className={cn(styles.switcher, className)}>
			<button
				className={cn(styles.switchButton, styles.listView, { [styles.active]: view === 'tab' })}
				onClick={() => switchView('tab')}
			>
				<ListPropgramSVG color={view === 'tab' ? '#000' : '#B0AEB9'} />
			</button>
			<button
				className={cn(styles.switchButton, styles.tabView, { [styles.active]: view === 'list' })}
				onClick={() => switchView('list')}
			>
				<TabProgramSVG color={view === 'list' ? '#000' : '#B0AEB9'} />
			</button>
		</div>
	)
}
