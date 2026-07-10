import { type ImageItemWithText } from './photos'

export type ProgramListItem = {
	id: string
	time: string
	place: string
	title: string
	use_reg: number
	use_real: number
	photo: ImageItemWithText[]
	date: Date
}

export type ProgramDay = {
	id: number
	date: Date
	programList: ProgramListItem[]
}

export type RequestItem = {
	id: string
	group_name: string
	surname: string
	firstname: string
	nickname: string
	region_name: string
	createdate: string
}

export type ListRegSubEventReponse = {
	requests: RequestItem[]
}

export type SubEventResponse = {
	id: string
	title: string
	full: string
	itemdate: string
	begin_time: string
	use_end_time: boolean
	is_group: boolean
	is_etnosport: boolean
	end_time: string
	place: string
	vid: string
	use_reg: boolean
	address: string
	organizator: string
	url: string
	phone: string
	telegram: string
	email: string
	short: string
	rules: string
	ageRating: string
	reglament: string
	trebovania: string
	mainphoto: ImageItemWithText[]
}
