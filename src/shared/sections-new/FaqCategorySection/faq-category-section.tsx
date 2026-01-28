import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { HomeFaqArrow } from 'src/shared/ui/icons/homeFaqArrow'
import { AccordionItem } from 'src/widgets/accordion-item/accordion-item'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useState } from 'react'

export const FaqCategorySection = () => {
	const { data: faqEvent } = useGetEventByIdQuery('1')
	const [activeIdx, setActiveIdx] = useState<number>(0)
	const categories = [
		{ id: '1', title: 'О событии' },
		{ id: '2', title: 'Маршруты' },
		{ id: '3', title: 'Условия участия' },
		{ id: '4', title: 'Оплата' },
		{ id: '5', title: 'Отмена и возврат билетов' },
	]
	return (
		<Section id='faq' className={cn(styles.faq)}>
			<Container>
				<h2>Часто задаваемые вопросы</h2>
				<FlexRow className={styles.categories}>
					{categories.map((el) => {
						return (
							<button
								className={cn(styles.faqNavBtn, {
									[styles._active]: activeIdx === Number(el.id) - 1,
								})}
								key={el.id}
								onClick={() => {
									setActiveIdx(Number(el.id) - 1)
								}}
							>
								{el.title}
							</button>
						)
					})}
				</FlexRow>
				<FlexRow className={styles.faqCont}>
					<p className={styles.title}>{categories[Number(activeIdx)].title}</p>
					<p className={styles.desc}>
						{faqEvent?.description && (
							<div dangerouslySetInnerHTML={{ __html: faqEvent?.description[0] }} />
						)}
					</p>
					<div className={styles.homeFaqList}>
						{faqEvent &&
							[...(faqEvent?.faq || [])]
								.sort((a, b) => Number(a?.id || 0) - Number(b?.id || 0))
								.filter((faqEl) => faqEl?.title)
								.map((faqEl, index) => (
									<AccordionItem
										className={styles.faqItem}
										trigger={faqEl.title}
										customArrow={<HomeFaqArrow />}
										content={faqEl.content}
										key={index}
									/>
								))}
					</div>
				</FlexRow>
			</Container>
		</Section>
	)
}
