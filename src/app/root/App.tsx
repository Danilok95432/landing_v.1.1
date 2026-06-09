import { useEffect } from 'react'
import { useGetSettingsSiteQuery } from 'src/features/home/api/home.api'
import { initYandexMetrika } from 'src/services/metric'
import { getYandexMetrikaId } from 'src/shared/helpers/utils'
import { EventProvider } from '../context/event-context'
import { EventIdInitializer } from '../context/event-id-init'
import { MainRoutes } from '../router/MainRoutes'
import './App.css'
import { Route, Routes } from 'react-router-dom'

export const App = () => {
	const { data } = useGetSettingsSiteQuery(null)
	useEffect(() => {
		const metricId = getYandexMetrikaId(String(data?.metric))

		if (!metricId) return

		initYandexMetrika({
			id: metricId,
		})
	}, [data?.metric])
	return (
		<EventProvider>
			<EventIdInitializer />
			<Routes>
				<Route path='/*' element={<MainRoutes />} />
			</Routes>
		</EventProvider>
	)
}
