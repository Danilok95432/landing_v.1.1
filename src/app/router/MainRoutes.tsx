import { Route, Routes } from 'react-router-dom'
import { HomePage } from 'src/pages/home-page/HomePage'

export const MainRoutes = () => {
	return (
		<Routes>
			{/*
				<Route path={'terminal'} element={<TerminalPage />} />
			<Route path={'terminal/print'} element={<PrintPage />} />
				*/}
			<Route path={'/'} element={<HomePage />} />
		</Routes>
	)
}
