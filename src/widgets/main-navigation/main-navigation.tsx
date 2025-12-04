import { Container } from 'src/shared/ui/Container/Container'
import { navigationElements } from './consts'
import styles from './index.module.scss'
import { BurgerMenu } from './components/burger-menu/burger-menu'
import { PersonIconSvg } from 'src/shared/ui/icons/personIconSVG'
// import { AuthModal } from 'src/modals/auth-modal/auth-modal'
// import { useActions } from 'src/app/store/hooks/actions'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const MainNavigation = () => {
	// const { openModal } = useActions()
	const location = useLocation()
	const navigate = useNavigate()

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId)
		if (element) {
			window.history.pushState(null, '', `#${sectionId}`)

			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	}

	const isPageReload = () => {
		return window.performance
			.getEntriesByType('navigation')
			.map((nav) => (nav as PerformanceNavigationTiming).type)
			.includes('reload')
	}

	useEffect(() => {
		const handleInitialScroll = () => {
			if (location.hash) {
				const sectionId = location.hash.substring(1)
				setTimeout(() => {
					scrollToSection(sectionId)

					if (!isPageReload()) {
						setTimeout(() => {
							navigate(location.pathname, { replace: true })
						}, 1000)
					}
				}, 100)
			}
		}

		handleInitialScroll()

		window.addEventListener('load', handleInitialScroll)
		return () => window.removeEventListener('load', handleInitialScroll)
	}, [location, navigate])

	return (
		<nav className={styles.navigation}>
			<Container className={styles.navigationCont}>
				<BurgerMenu />
				<ul className={styles.navWrapper}>
					{navigationElements.map((el, index) => (
						<button key={index} className={styles.navEl} onClick={() => scrollToSection(el.link)}>
							<li>{el.title}</li>
						</button>
					))}
				</ul>
				<Link to={'https://lk.этноспорт.рф'} className={styles.enterLK}>
					<div className={styles.vector}>
						<PersonIconSvg color='#CC1746' />
					</div>
				</Link>
				{/*
					<button className={styles.enterLK} onClick={() => openModal(<AuthModal />)}>
					<div className={styles.vector}>
						<PersonIconSvg color='#CC1746' />
					</div>
				</button>
					*/}
			</Container>
		</nav>
	)
}
