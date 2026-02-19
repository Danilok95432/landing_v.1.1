import { EventProvider } from '../context/event-context'
import { EventIdInitializer } from '../context/event-id-init'
import { MainRoutes } from '../router/MainRoutes'
import './App.css'
import { Route, Routes } from 'react-router-dom'

export const App = () => {
	return (
		<EventProvider>
			<EventIdInitializer />
			<Routes>
				<Route path='/*' element={<MainRoutes />} />
			</Routes>
		</EventProvider>
	)
}
