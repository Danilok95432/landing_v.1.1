/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react'
import { getAgeString, formatSingleDate, parseTimeFromDate } from 'src/shared/helpers/utils'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { type ParticipantItem } from 'src/types/tables'
import styles from './index.module.scss'

type ParticipantCardProps = {
	className?: string
} & ParticipantItem

export const ParticipantCard: FC<ParticipantCardProps> = ({
	id,
	group_name,
	age,
	user_roles,
	photo,
	firstname,
	events,
	surname,
	fathname,
	region_name,
	createdate,
	className,
}) => {
	return (
		<figure>
			<figcaption className={styles.participantItemContent}>
				<FlexRow className={styles.headCard}>
					<div className={styles.participantImgWrapper}>
						{photo ? (
							<img src={photo[0]?.original} width={286} height={160} loading='lazy' />
						) : (
							<img src='#' alt='' />
						)}
					</div>
					<div className={styles.infoBlock}>
						<p className={styles.name}>{surname + ' ' + firstname + ' ' + fathname}</p>
						<div className={styles.additionalInfo}>
							<p>{getAgeString(age)}</p>
							<p>{region_name}</p>
						</div>
					</div>
				</FlexRow>
				<FlexRow>
					<div className={styles.groups}>
						<p>Группы</p>
						<p>{group_name}</p>
					</div>
					{events && (
						<div className={styles.events}>
							<p>События</p>
							<p>{events}</p>
						</div>
					)}
					<div className={styles.types}>
						<p>Тип участия</p>
						<p>{user_roles?.map((role) => role.title).join(', ')}</p>
					</div>
				</FlexRow>
				<FlexRow className={styles.footerCard}>
					<p>
						Регистрация:{' '}
						{`${formatSingleDate(createdate ?? new Date())}, ${parseTimeFromDate(createdate)}`}
					</p>
					<p>ID: {id}</p>
				</FlexRow>
			</figcaption>
		</figure>
	)
}
