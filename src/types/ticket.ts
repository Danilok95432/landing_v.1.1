export type TicketOptions = {
	value: string
	label: string
	price: string
	desc: string
	tickets_limit: string
	use_limit: boolean
}

export type TicketTypes = {
	ticket_types: TicketOptions[]
}
