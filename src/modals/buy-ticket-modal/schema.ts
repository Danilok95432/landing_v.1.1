/* eslint-disable @typescript-eslint/naming-convention */
import { type GuestGroupList, type GuestCarsList } from 'src/types/registration'
import { type SubEventOptions } from 'src/types/select'
import * as yup from 'yup'

export type RegInputs = {
	surname: string
	firstname: string
	fathname?: string
	age?: string
	birthdate?: string
	id_region: string
	// id_city: string
	// city_name?: string
	email: string
	phone: string
	code: string
	id_reg_type?: string
	id_event?: string
	use_car?: boolean
	cars_count?: string
	cars_list?: GuestCarsList[]
	use_lager?: boolean
	id_lager_type?: string
	lager_count?: string
	use_group?: boolean
	group_name?: string
	id_group_type?: string
	id_event_role?: string
	group_count?: string
	group_list?: GuestGroupList[] | null
	sub_events_group?: SubEventOptions[] | string
	sub_events_etno?: SubEventOptions[] | string
	sub_events_fun?: SubEventOptions[] | string
	photos?: File[]
}

export const regSchema = yup.object().shape({
	surname: yup.string().required('Введите фамилию'),
	firstname: yup.string().required('Введите имя'),
	code: yup.string().required('Введите верный код'),
	id_region: yup
		.string()
		.required('Введите регион')
		.test('contains-comma', 'Выберите регион из списка', (value) => {
			return value === 'Иностранец' || value.includes(',')
		}),
	// id_city: yup.string().required('Введите название населенного пункта'),
	email: yup.string().required('Введите электронную почту').email('Введите верную почту'),
	phone: yup.string().required('Введите номер телефона').min(10, 'Недостаточно цифр в номере'),
})
