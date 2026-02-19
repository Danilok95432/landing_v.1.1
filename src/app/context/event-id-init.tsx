// src/components/EventIdInitializer.tsx
import { useGetCurrentEventIdQuery } from 'src/features/home/api/home.api'
import { useEffect } from 'react'
import { useEvent } from './event-context'

export const EventIdInitializer = () => {
	const { data } = useGetCurrentEventIdQuery(null)
	const { setEventId } = useEvent()

	useEffect(() => {
		if (data?.id_event) {
			setEventId(data.id_event)
		}
	}, [data, setEventId])

	return ''
}
