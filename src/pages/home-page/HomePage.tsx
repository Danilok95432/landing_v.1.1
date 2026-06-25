import { MainInfoSection } from 'src/shared/sections-new/MainInfoSection/main-info-section'
import { MainSliderSection } from 'src/shared/sections/MainSliderSection/main-slider-section'
import { GallerySection } from 'src/shared/sections-new/GallerySection/gallery-section'
import { ProgramSection } from 'src/shared/sections/ProgramSection/program-section'
import { NewsSection } from 'src/shared/sections/NewsSection/news-section'
import { VideosSection } from 'src/shared/sections/VideosSection/videos-section'
import { OrgsSection } from 'src/shared/sections/OrgsSection/orgs-section'
import { FaqCategorySection } from 'src/shared/sections-new/FaqCategorySection/faq-category-section'
import { PartnersSection } from 'src/shared/sections/PartnersSection/partners-section'
import { SubEventsSection } from 'src/shared/sections/SubEventsSection/sub-events-section'

export const HomePage = () => {
	return (
		<>
			<MainInfoSection />
			<OrgsSection />
			<MainSliderSection />
			<GallerySection />
			<ProgramSection />
			<SubEventsSection />
			<NewsSection />
			<PartnersSection />
			<VideosSection />
			<FaqCategorySection />
		</>
	)
}
