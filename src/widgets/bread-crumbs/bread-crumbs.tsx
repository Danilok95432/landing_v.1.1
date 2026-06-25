import { type FC, useEffect, useState } from 'react'
import { type NavigationItem } from 'src/types/navigation'

import { Link, useLocation } from 'react-router-dom'

import styles from './index.module.scss'
import { useAppSelector } from 'src/app/store/hooks/store'
import { getAdditionalCrumbs } from './store/bread-crumbs.selectors'
import { AppRoute } from 'src/app/router/consts'
import { SeparatorIconNavigationSVG } from 'src/shared/ui/icons/SeparatorIconNavigationSVG'

type BreadCrumbsProps = {
	crumbsLinksMap: NavigationItem[]
}

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ crumbsLinksMap }) => {
	const { pathname } = useLocation()
	const [pathNames, setPathNames] = useState<string[]>([''])

	const additionalCrumbs = useAppSelector(getAdditionalCrumbs)
	const crumbsLinksArr = crumbsLinksMap.map((el) => el.link)

	const defineLinkTitle = (link: string) => {
		const searchEl = crumbsLinksMap.find((el) => el.link === link)
		if (searchEl?.title) {
			return searchEl?.title
		}
	}

	useEffect(() => {
		const filteredPathnames = pathname.split('/').filter((el) => crumbsLinksArr.includes(el))
		setPathNames(() => {
			if (additionalCrumbs) {
				return [...filteredPathnames, additionalCrumbs]
			}
			return [...filteredPathnames]
		})
	}, [pathname, additionalCrumbs])

	return (
		<ul className={styles.breadCrumbsList}>
			<li>
				<Link to={AppRoute.Home}> Главная </Link> <SeparatorIconNavigationSVG color='3D4BC2' />
			</li>

			{pathNames?.map((pathEl, idx) => {
				if (pathNames.length - 1 === idx) {
					return (
						<li key={pathEl}>
							<span>{additionalCrumbs ?? defineLinkTitle(pathEl)}</span>
						</li>
					)
				}

				if (pathEl === 'laureates') {
					return (
						<li key={pathEl}>
							<Link to={`${pathEl}`}>{defineLinkTitle(pathEl)}</Link>
							<SeparatorIconNavigationSVG color='3D4BC2' />
						</li>
					)
				}

				return (
					<li key={pathEl} id={pathEl}>
						<Link to={`/${pathEl}`}>{defineLinkTitle(pathEl)}</Link>
						<SeparatorIconNavigationSVG color='3D4BC2' />
					</li>
				)
			})}
		</ul>
	)
}
