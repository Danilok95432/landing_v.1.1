import { MainNavigation } from 'src/widgets/main-navigation/main-navigation'
import { AwardsSection } from 'src/shared/sections/AwardsSection/awards-section'
import { MainSliderSection } from 'src/shared/sections/MainSliderSection/main-slider-section'
import { NewsSection } from 'src/shared/sections/NewsSection/news-section'
import { PartnersSection } from 'src/shared/sections/PartnersSection/partners-section'
import { GeneralPartnersSection } from 'src/shared/sections/GeneralPartnersSection/general-partners-section'
import { OrgsSection } from 'src/shared/sections/OrgsSection/orgs-section'
import { PathwaysSection } from 'src/shared/sections/PathwaysSection/pathways-section'
import { PlacementsSection } from 'src/shared/sections/PlacementsSection/placements-section'
import { FaqSection } from 'src/shared/sections/FaqSection/faq-section'
import { OrgsEventsSection } from 'src/shared/sections/OrgsEventsSection/orgs-events-section'
import { VideosSection } from 'src/shared/sections/VideosSection/videos-section'
import { SubEventsSection } from 'src/shared/sections/SubEventsSection/sub-events-section'
import { ProgramSection } from 'src/shared/sections/ProgramSection/program-section'
import { EventsSection } from 'src/shared/sections/EventsSection/events-section'
import { FinancialPartnersSection } from 'src/shared/sections/FinancialPartners/financial-partners-section'
import { Header } from 'src/shared/ui/Header/Header'
import { Footer } from 'src/shared/ui/Footer/Footer'
import { InfoPartnersSection } from 'src/shared/sections/InfoPartnersSection/info-partners-section'

export const HomePage = () => {
	return (
		<>
			<Header />
			<MainNavigation />
			<AwardsSection />
			<MainSliderSection />
			<OrgsSection />
			<PartnersSection />
			<NewsSection />
			<GeneralPartnersSection />
			<ProgramSection />
			<FinancialPartnersSection />
			<EventsSection />
			<InfoPartnersSection />
			<SubEventsSection />
			<OrgsEventsSection />
			<VideosSection />
			<PathwaysSection />
			<PlacementsSection />
			<FaqSection />
			<Footer />
		</>
	)
}
