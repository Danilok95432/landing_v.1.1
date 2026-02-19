import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from '../../index.module.scss'
import { type FC } from 'react'
import { ControlledSelect } from 'src/widgets/controlled-select/controlled-select'
import { FormInput } from 'src/widgets/FormInput/form-input'
import { type TicketOptions } from 'src/types/ticket'
import { useFormContext, useWatch } from 'react-hook-form'

type InfoSectionProps = {
	ticketTypeList?: TicketOptions[]
}

export const HeadSection: FC<InfoSectionProps> = ({
	ticketTypeList = [{ label: 'Не выбрано', value: '0', price: '0' }],
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
					Осталось <span>899</span> билетов
				</p>
				<p>
					<strong>Внимание! </strong> За то время, пока Вы заполняете форму, количество доступных
					билетов может измениться!
				</p>
			</FlexRow>
			<p className={styles.desc}>
				Описание билета на две-три строки. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</p>
		</div>
	)
}
