import mainImg from 'src/assets/img/main-img.png'
import styles from './index.module.scss'
import { Section } from 'src/shared/ui/Section/section'
import { Container } from 'src/shared/ui/Container/Container'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainInfoTypeSVG } from 'src/shared/ui/icons/mainInfoTypeSVG'
import { MainInfoKindSVG } from 'src/shared/ui/icons/mainInfoKindSVG'
import { MainInfoFreqSVG } from 'src/shared/ui/icons/mainInfoFreqSVG'
import { MainInfoPlaceSVG } from 'src/shared/ui/icons/mainInfoPlaceSVG'
import icon1 from 'src/assets/img/icons/Frame 7133.png'
import icon2 from 'src/assets/img/icons/Frame 7133 (1).png'
import icon3 from 'src/assets/img/icons/Frame 7133 (2).png'
import { useState } from 'react'

export const MainInfoSection = () => {
	const [activeCont, setActiveCont] = useState<boolean>(false)

	return (
		<Section className={cn(styles.mainInfo)}>
			<Container>
				<FlexRow className={styles.mainRow}>
					<img src={mainImg} alt='main' />
					<h1>{'Этнофестиваль «Атмановские кулачки-2025»'}</h1>
					<FlexRow className={styles.additionalInfoRow}>
						<FlexRow className={styles.rowEl}>
							<MainInfoTypeSVG />
							<p>{'Фестиваль'}</p>
						</FlexRow>
						<FlexRow className={styles.rowEl}>
							<MainInfoKindSVG />
							<p>{'Культура, развлечения'}</p>
						</FlexRow>
						<FlexRow className={styles.rowEl}>
							<MainInfoFreqSVG />
							<p>{'Раз в год'}</p>
						</FlexRow>
						<FlexRow className={cn(styles.rowEl, styles.noMargin)}>
							<MainInfoPlaceSVG />
							<a href='#'>С. Атманов Угол, Сосновский округ, Тамбовская область, Россия</a>
						</FlexRow>
						<FlexRow className={styles.rowEl}>
							<p>{'0+'}</p>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.blocksRow}>
						<FlexRow className={styles.blockEl}>
							<FlexRow className={styles.infoBlock}>
								<p className={styles.title}>{'24 авг 2025, 09:00 — 27 авг 2025, 22:30'}</p>
								<p>{'Всего 3 дня 20 часов Через 27 дней'}</p>
							</FlexRow>
							<img src={icon1} alt='' />
						</FlexRow>
						<FlexRow className={styles.blockEl}>
							<FlexRow className={styles.infoBlock}>
								<p className={styles.title}>{'ТРК «Сельский клуб»'}</p>
								<p>{'С. Атманов Угол, пр. Первых Пятилеток, 22'}</p>
								<a href='#'>На карте</a>
							</FlexRow>
							<img src={icon2} alt='' />
						</FlexRow>
						<FlexRow className={styles.blockEl}>
							<FlexRow className={styles.infoBlock}>
								<p className={styles.title}>{'Правительство Тамбовской области'}</p>
							</FlexRow>
							<img src={icon3} alt='' />
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.infoRow}>
						<div className={styles.textCont}>
							<p className={cn(styles.text, { [styles.activeText]: activeCont })}>
								«Атмановские кулачки» — народное название праздничных кулачных боёв, которые
								проходят в Атмановом Углу со дня основания села в 1648 году. Также на фестивале
								проводятся состязания по лапте, стрельбе из лука, борьбе за вороток, силовой игре в
								мяч и в других дисциплинах. <br />
								«Атмановские кулачки» — народное название праздничных кулачных боёв, которые
								проходят в Атмановом Углу со дня основания села в 1648 году. Также на фестивале
								проводятся состязания по лапте, стрельбе из лука, борьбе за вороток, силовой игре в
								мяч и в других дисциплинах. <br /> «Атмановские кулачки» — народное название
								праздничных кулачных боёв, которые проходят в Атмановом Углу со дня основания села в
								1648 году. Также на фестивале проводятся состязания по лапте, стрельбе из лука,
								борьбе за вороток, силовой игре в мяч и в других дисциплинах.
							</p>
							<button
								className={cn(styles.openContBtn, { [styles.active]: activeCont })}
								onClick={() => setActiveCont(!activeCont)}
							>
								{activeCont ? 'Свернуть' : 'Развернуть'}
							</button>
						</div>
						<button className={styles.buyBtn}>
							<div className={styles.text}>
								<p>Купить билет</p>
								<p>от 8 000 ₽</p>
							</div>
						</button>
					</FlexRow>
				</FlexRow>
			</Container>
		</Section>
	)
}
