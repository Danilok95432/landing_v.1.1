import { Route, Routes } from 'react-router-dom'
import { AboutLayout } from 'src/pages/about-page/about-layout'
import { AboutDocs } from 'src/pages/about-page/layout/docs/docs'
import { AboutHistory } from 'src/pages/about-page/layout/history/history'
import { AppLayout } from 'src/pages/app-layout/app-layout'
import { ContentPageLayout } from 'src/pages/content-page/content-page-layout'
import { NewsDetailsNew } from 'src/pages/content-page/news-details/news-details'
import { HomePage } from 'src/pages/home-page/HomePage'
import { VideosPage } from 'src/pages/videos-page/videos-page'
import { AppRoute } from './consts'
import { AboutTickets } from 'src/pages/about-page/layout/tickets/tickets'
import { AboutPlacement } from 'src/pages/about-page/layout/placement/placement'
import { AboutRoute } from 'src/pages/about-page/layout/route/route'
import { AboutRules } from 'src/pages/about-page/layout/rules/rules'
import { AboutSchema } from 'src/pages/about-page/layout/schema/schema'
import { SubEventPage } from 'src/pages/sub-event-page/sub-event-page'
import { VideoDetails } from 'src/pages/videos-page/video-details/video-details'

export const MainRoutes = () => {
	return (
		<Routes>
			{/*
				<Route path={'terminal'} element={<TerminalPage />} />
			<Route path={'terminal/print'} element={<PrintPage />} />
				*/}
			<Route path='/' element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path={'/content'} element={<ContentPageLayout />} />
				<Route path={'/content/news/:id'} element={<NewsDetailsNew />} />
				<Route path={'/videos'} element={<VideosPage />} />
				<Route path={'/videos/:id'} element={<VideoDetails />} />
				<Route path={AppRoute.About} element={<AboutLayout />}>
					<Route index element={<AboutHistory />} />
					<Route path={AppRoute.AboutDocs} element={<AboutDocs />} />
					<Route path={AppRoute.AboutRules} element={<AboutRules />} />
					<Route path={AppRoute.AboutSchema} element={<AboutSchema />} />
					<Route path={AppRoute.AboutRoute} element={<AboutRoute />} />
					<Route path={AppRoute.AboutPlacement} element={<AboutPlacement />} />
					<Route path={AppRoute.AboutTickets} element={<AboutTickets />} />
				</Route>
				<Route path='/sub-event/:id' element={<SubEventPage />} />
			</Route>
		</Routes>
	)
}
