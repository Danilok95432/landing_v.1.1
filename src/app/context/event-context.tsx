// src/context/EventContext.tsx
import React, { createContext, useContext, type ReactNode } from 'react'

interface EventContextType {
	eventId: string
	setEventId: (id: string) => void
}

const EventContext = createContext<EventContextType | undefined>(undefined)

export const useEvent = () => {
	const context = useContext(EventContext)
	if (!context) {
		throw new Error('useEvent must be used within EventProvider')
	}
	return context
}

interface EventProviderProps {
	children: ReactNode
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
	const [eventId, setEventId] = React.useState<string>('')

	return <EventContext.Provider value={{ eventId, setEventId }}>{children}</EventContext.Provider>
}
