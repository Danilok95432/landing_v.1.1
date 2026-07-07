import { type ImageItemWithText } from './photos'

export type TeamItem = {
	id: string
	logo: ImageItemWithText[]
	name: string
	region: string
	participants: string
	type: string
	registration: string
	events?: string
}

export type ParticipantResponse = {
	reg_users: ParticipantItem[]
}

export type ParticipantItem = {
	id: string
	photo: ImageItemWithText[]
	fathname: string
	firstname: string
	surname: string
	region_name: string
	age: string
	group_name: string
	user_roles: Array<{
		id: string
		title: string
	}>
	birthdate: string
	createdate: string
	events?: string
}

export type HeroItem = {
	id: string
	photo: ImageItemWithText[]
	fathname: string
	firstname: string
	surname: string
	region_name: string
	age: string
	nickname: string
	reward: string
	rewardIcon: string
	createdate: string
}

export type ParticipantGroup = {
	id: string
	name: string
	role: string
	category: string
	participants: string
	subgroup: string
	rating: string
}
