import { type FC } from 'react'

import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { type TeamItem } from 'src/types/tables'

type TeamCardProps = {
	className?: string
} & TeamItem

export const TeamCard: FC<TeamCardProps> = ({
	id,
	type,
	logo,
	name,
	region,
	events,
	registration,
	participants,
	className,
}) => {
	return (
		<figure>
			<figcaption className={styles.teamItemContent}>
				<FlexRow className={styles.headTeamCard}>
					<div className={styles.teamImgWrapper}>
						<img src={logo[0]?.original} width={286} height={160} loading='lazy' />
					</div>
					<div className={styles.infoBlock}>
						<p className={styles.name}>{name}</p>
						<p>{region}</p>
					</div>
				</FlexRow>
				<FlexRow className={styles.groupInfo}>
					<div className={styles.groups}>
						<p>Участников</p>
						<a href='#'>{participants.length + ' участников'}</a>
					</div>
					{events && (
						<div className={styles.events}>
							<p>События</p>
							<p>{events}</p>
						</div>
					)}
					<div className={styles.types}>
						<p>Роль группы</p>
						<a href='#'>{type}</a>
					</div>
				</FlexRow>
				<FlexRow className={styles.footerCard}>
					{/* <p>
							Регистрация:{' '}
							{`${formatSingleDate(registration ?? new Date())}, ${parseTimeFromDate(registration)}`}
						</p> */}
					<p>ID: {id}</p>
				</FlexRow>
			</figcaption>
		</figure>
	)
}
