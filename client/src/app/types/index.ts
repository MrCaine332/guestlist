export type Account = {
	_id: string
	username: string
	name: string
	surname: string
	role: string
	lastLogin: string
	createdAt: string
	updatedAt: string
}

export type Reservation = {
	_id: string
	reservationCode: string
	prAgentId: string
	reserveeName: string
	numberOfPlaces: number
	instagramAccount: string
	comment: string
	createdAt: string
	reservationUsed: boolean
	peopleAttended?: number
	qrCode?: string
}

export type AppSlice = {
	accounts: Account[]
	reservations: Reservation[]
	newReservation: Reservation
	checkedReservation: Reservation
	dashboardData: {
		reservationsNum: number
		totalPlaces: number
		nextEvent: string
	},
	isReservationOpened: boolean
	isFetching: boolean
}

export type AuthSlice = {
	isAuthenticated: boolean,
	user: Account,
	isChecked: boolean,
	error: string | null,
	isFetching: boolean
}

export type FormInput = {
	field: string
	type: string
	placeholder: string
	required: boolean
	options?: {value: string, text: string}[]
}

