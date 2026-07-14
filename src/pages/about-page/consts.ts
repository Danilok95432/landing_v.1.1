/* eslint-disable @typescript-eslint/no-explicit-any */
import { type EventItem } from 'src/types/event'
import { type NavigationItem } from 'src/types/navigation'

const isNotEmpty = (value?: string | null) => Boolean(value?.trim())
const isNotArrayEmpty = (value?: any[]) => Boolean(value && value?.length > 0)

export const getAboutMenuItems = (data?: EventItem): NavigationItem[] => {
	if (!data) return []

	const items: NavigationItem[] = []

	if (isNotEmpty(data.conditions)) {
		items.push({
			title: 'Условия участия',
			link: '/about/rules',
		})
	}

	if (isNotArrayEmpty(data.pathways)) {
		items.push({
			title: 'Как проехать',
			link: '/about/route',
		})
	}
	if (isNotArrayEmpty(data.placements)) {
		items.push({
			title: 'Размещение',
			link: '/about/placement',
		})
	}
	if (isNotArrayEmpty(data.event_schema)) {
		items.push({
			title: 'Схема площадки',
			link: '/about/schema',
		})
	}
	if (isNotArrayEmpty(data.documents)) {
		items.push({
			title: 'Документы',
			link: '/about/docs',
		})
	}
	if (isNotArrayEmpty(data.tickets)) {
		items.push({
			title: 'Билеты',
			link: '/about/tickets',
		})
	}
	return items
}
