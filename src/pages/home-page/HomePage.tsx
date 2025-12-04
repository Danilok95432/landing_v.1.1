import { MainNavigation } from 'src/widgets/main-navigation/main-navigation'
import { FaqSection } from 'src/shared/sections/FaqSection/faq-section'
import { Footer } from 'src/shared/ui/Footer/Footer'
import { MainInfoSection } from 'src/shared/sections-new/MainInfoSection/main-info-section'
import { MainSliderSection } from 'src/shared/sections/MainSliderSection/main-slider-section'

export const HomePage = () => {
	return (
		<>
			<MainNavigation />
			<MainInfoSection />
			<MainSliderSection />
			<FaqSection />
			<Footer />
		</>
	)
}
