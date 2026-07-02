type NavigationElement = {
	title: string
	link: string
}

type SettingsData = {
	isShowPromo?: boolean
	isShowNews?: boolean
	isShowVideos?: boolean
	isShowFaq?: boolean
}

export const getNavigationElements = (settingsData?: SettingsData): NavigationElement[] =>
	[
		{
			title: 'О cобытии',
			link: '/about',
		},
		settingsData?.isShowPromo
			? {
					title: 'Фото',
					link: 'photo',
				}
			: null,
		{
			title: 'Программа',
			link: 'program',
		},
		settingsData?.isShowNews
			? {
					title: 'Новости',
					link: 'news',
				}
			: null,
		settingsData?.isShowVideos
			? {
					title: 'Видео',
					link: 'video',
				}
			: null,
		settingsData?.isShowFaq
			? {
					title: 'Вопросы',
					link: 'faq',
				}
			: null,
	].filter((item): item is NavigationElement => item !== null)
