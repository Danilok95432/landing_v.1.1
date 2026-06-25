import { type FC } from 'react'

import styles from './index.module.scss'
import { RenderedArray } from 'src/widgets/rendered-array/rendered-array'

export const BlockquoteSection: FC = () => {
	const aboutPageData = {
		mainDescs: [''],
		caption: '',
	}
	if (!aboutPageData) return null

	return (
		<section className={styles.blockquoteSection}>
			<div className={styles.blockquoteBody}>
				<RenderedArray strArray={aboutPageData.mainDescs} asStr='p' as='blockquote' />
				<span className={styles.blockquoteCaption}>{aboutPageData.caption}</span>
			</div>
		</section>
	)
}
