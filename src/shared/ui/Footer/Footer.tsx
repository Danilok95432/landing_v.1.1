import { Link } from 'react-router-dom'
import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import { TgEventIconSVG } from '../icons/tgEventIconSVG'
import { VkSocialSvg } from '../icons/vkSocialSVG'
import styles from './index.module.scss'

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<FlexRow className={styles.footerRow}>
					<p>Разработано и построено в НПО ТАУ</p>
					<FlexRow className={styles.socialsRow}>
						<Link to={`https://vk.com/rustradgames`}>
							<button>
								<VkSocialSvg />
							</button>
						</Link>
						<button>
							<TgEventIconSVG />
						</button>
					</FlexRow>
				</FlexRow>
			</Container>
		</footer>
	)
}
