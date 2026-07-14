import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { DocFileIconSVG } from 'src/shared/ui/icons/DOCFileIconSVG'
import { PDFFileIconSVG } from 'src/shared/ui/icons/PDFFileIconSVG'
import { useEvent } from 'src/app/context/event-context'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'

export const AboutDocs: FC = () => {
	const { eventId } = useEvent()
	const { data: eventData } = useGetEventByIdQuery(eventId ?? '1', { skip: !eventId })
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>О событии</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>Документы</h2>
				<FlexRow className={styles.docsList}>
					{eventData?.documents?.map((doc) => {
						return (
							<a key={doc.id} className={styles.doc} href={doc.url} download>
								<div className={styles.file}>
									{doc.name.split('.')[doc.name.split('.').length - 1] === 'pdf' ? (
										<PDFFileIconSVG />
									) : (
										<DocFileIconSVG />
									)}
								</div>
								<FlexRow className={styles.info}>
									<p className={styles.title}>{doc.name.split('.')[0]}</p>
									{/* <p>{`${(Number(doc.size) / 1024).toFixed(1)} КВ`}</p> */}
								</FlexRow>
							</a>
						)
					})}
				</FlexRow>
			</div>
		</div>
	)
}
