import React, { type FC } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import styles from './index.module.scss'
import { type NavigationItem } from 'src/types/navigation'

type HeadMenuProps = {
	sideItems: NavigationItem[]
	className?: string
	position?: string
}

export const HeadMenu: FC<HeadMenuProps> = ({ sideItems, className, position }) => {
	const setActive = ({ isActive }: { isActive: boolean }) => (isActive ? styles.activeLink : '') // Возвращаем только имя класса

	return (
		<ul className={cn(styles.headMenu, className)}>
			{sideItems?.map((menuItem) => (
				<li
					className={cn(styles.menuItem, {
						[styles.menuBottomItem]: position === 'bottom',
					})}
					key={menuItem.link}
				>
					<NavLink
						to={menuItem.link}
						end={menuItem.exact ?? true}
						className={({ isActive }) => cn(styles.menuLink, setActive({ isActive }))}
					>
						{menuItem.title}
					</NavLink>
				</li>
			))}
		</ul>
	)
}
