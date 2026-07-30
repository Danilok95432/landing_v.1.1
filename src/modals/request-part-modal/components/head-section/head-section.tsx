import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from '../../index.module.scss'
import { type FC } from 'react'
import { ControlledSelect } from 'src/widgets/controlled-select/controlled-select'
import { FormInput } from 'src/widgets/FormInput/form-input'

import { useFormContext, useWatch } from 'react-hook-form'
import { type TicketOptions } from 'src/types/ticket'

type InfoSectionProps = {
	ticketTypeList?: TicketOptions[]
}

export const HeadSection: FC<InfoSectionProps> = ({
	ticketTypeList = [
		{ label: 'Не выбрано', value: '0', price: '0', use_limit: false, tickets_limit: '0', desc: '' },
	],
}) => {
	const { control } = useFormContext()

	// Отслеживаем изменение значения селекта
	const selectedTicketType = useWatch({
		control,
		name: 'ticketTypeList',
		defaultValue: ticketTypeList[0]?.value || '0',
	})

	return (
		<div className={styles.formSection}>
			<span className={styles.title}>Купить билеты</span>
			<FlexRow className={styles.groupInputs}>
				<ControlledSelect
					className={styles.selectForm}
					name={`ticketTypeList`}
					selectOptions={ticketTypeList}
					label='Выбор вида билета'
				/>
				<FormInput
					name='count'
					label='Количество'
					className={styles.inputCont}
					defaultValue={'1'}
				/>
			</FlexRow>
			<p className={styles.billTotal}>
				{`1 билет на сумму`}
				<strong>
					{ticketTypeList?.find((el) => el.value === selectedTicketType)?.price ?? '0'}
				</strong>
			</p>
			<FlexRow className={styles.infoBlock}>
				<p>
					Осталось{' '}
					<span>
						{ticketTypeList?.find((el) => el.value === selectedTicketType)?.tickets_limit ?? '0'}
					</span>{' '}
					билетов
				</p>
				<p>
					<strong>Внимание! </strong> За то время, пока Вы заполняете форму, количество доступных
					билетов может измениться!
				</p>
			</FlexRow>
			<p className={styles.desc}>
				{ticketTypeList?.find((el) => el.value === selectedTicketType)?.desc}
			</p>
		</div>
	)
}
