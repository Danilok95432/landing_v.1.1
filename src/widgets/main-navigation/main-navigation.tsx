import { Container } from 'src/shared/ui/Container/Container'
import { navigationElements } from './consts'
import styles from './index.module.scss'
import { BurgerMenu } from './components/burger-menu/burger-menu'
import { useActions } from 'src/app/store/hooks/actions'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LogoSVG } from 'src/shared/ui/icons/logoSVG'
import { BuyTicketModal } from 'src/modals/buy-ticket-modal/buy-ticket-modal'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

export const MainNavigation = () => {
	const { openModal } = useActions()
	const location = useLocation()
	const navigate = useNavigate()

	const navRef = useRef<HTMLElement | null>(null)
	const [navHeight, setNavHeight] = useState(0)

	const rafRef = useRef<number | null>(null)
	const timeoutRef = useRef<number | null>(null)
	const activeTargetRef = useRef<string | null>(null)

	const cancelPending = () => {
		if (rafRef.current !== null) {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = null
		}
		if (timeoutRef.current !== null) {
			window.clearTimeout(timeoutRef.current)
			timeoutRef.current = null
		}
	}

	useLayoutEffect(() => {
		const navEl = navRef.current
		if (!navEl) return

		const measure = () => {
			const navEl = navRef.current
			if (!navEl) return

			const h = Math.ceil(navEl.offsetHeight || navEl.getBoundingClientRect().height)

			// важное: не даём спейсеру схлопнуться из-за промежуточного кадра layout
			if (h <= 0) return

			setNavHeight(h)
		}
		measure()

		let ro: ResizeObserver | null = null
		if ('ResizeObserver' in window) {
			ro = new ResizeObserver(measure)
			ro.observe(navEl)
		}

		window.addEventListener('resize', measure)
		window.addEventListener('load', measure)

		return () => {
			ro?.disconnect()
			window.removeEventListener('resize', measure)
			window.removeEventListener('load', measure)
		}
	}, [])

	const getHeaderOffset = () => navRef.current?.getBoundingClientRect().height ?? 0

	const scrollToElWithOffset = (el: HTMLElement, behavior: ScrollBehavior) => {
		const offset = getHeaderOffset()
		const y = el.getBoundingClientRect().top + window.scrollY - offset
		window.scrollTo({ top: Math.max(0, y), behavior })
	}

	const startSmoothScrollToId = (id: string) => {
		cancelPending()
		activeTargetRef.current = id

		let tries = 0
		const tick = () => {
			if (activeTargetRef.current !== id) return

			const el = document.getElementById(id)
			if (!el) {
				if (tries++ < 120) rafRef.current = requestAnimationFrame(tick)
				return
			}

			scrollToElWithOffset(el, 'smooth')

			timeoutRef.current = window.setTimeout(() => {
				if (activeTargetRef.current !== id) return
				const el2 = document.getElementById(id)
				if (!el2) return

				const offset = getHeaderOffset()
				const desiredY = el2.getBoundingClientRect().top + window.scrollY - offset
				const delta = desiredY - window.scrollY

				if (Math.abs(delta) > 8) {
					window.scrollTo({ top: Math.max(0, desiredY), behavior: 'smooth' })
				}
			}, 400)
		}

		rafRef.current = requestAnimationFrame(tick)
	}

	useEffect(() => {
		if (location.pathname !== '/') return

		const state = location.state as { scrollTo?: string } | null
		const stateId = state?.scrollTo
		const hashId = location.hash ? location.hash.slice(1) : undefined

		const id = stateId ?? hashId
		if (!id) return
		window.history.replaceState(null, '', `/#${id}`)

		startSmoothScrollToId(id)

		return () => cancelPending()
	}, [location.key, location.pathname])

	const scrollToSection = (sectionId: string) => {
		cancelPending()
		activeTargetRef.current = sectionId

		if (location.pathname !== '/') {
			navigate('/', { state: { scrollTo: sectionId } })
			return
		}
		window.history.replaceState(null, '', `/#${sectionId}`)
		startSmoothScrollToId(sectionId)
	}

	const scrollToTop = () => {
		cancelPending()
		activeTargetRef.current = null

		if (location.pathname === '/') {
			window.history.replaceState(null, '', '/')
			window.scrollTo({ top: 0, behavior: 'smooth' })
			return
		}
		navigate('/', { replace: true })
	}

	return (
		<>
			<div
				style={{
					height: navHeight,
					minHeight: navHeight,
					maxHeight: navHeight,
					flexBasis: navHeight,
					flexShrink: 0,
				}}
				aria-hidden
			/>

			<nav ref={navRef} className={styles.navigation}>
				<Container className={styles.navigationCont}>
					<div className={styles.logoCont} onClick={scrollToTop}>
						<LogoSVG />
					</div>
					<FlexRow className={styles.mobileRow}>
						<BurgerMenu />
						<button
							className={styles.buyBtnMobile}
							onClick={() => openModal(<BuyTicketModal id='1' />)}
						>
							<div className={styles.text}>
								<p>Купить билет</p>
								<p>от 8 000 ₽</p>
							</div>
						</button>
					</FlexRow>

					<ul className={styles.navWrapper}>
						{navigationElements.map((el, index) => (
							<button key={index} className={styles.navEl} onClick={() => scrollToSection(el.link)}>
								<li>{el.title}</li>
							</button>
						))}
					</ul>

					<button className={styles.buyBtn} onClick={() => openModal(<BuyTicketModal id='1' />)}>
						<div className={styles.text}>
							<p>Купить билет</p>
							<p>от 8 000 ₽</p>
						</div>
					</button>
				</Container>
			</nav>
		</>
	)
}
