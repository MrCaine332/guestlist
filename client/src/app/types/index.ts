export type Account = {
	username: string
	password: string
	name: string
	surname: string
	role: string
	lastLogin: string
	createdAt: string
	updatedAt: string
}

export type Reservation = {
	reservationCode: string
	prAgentId: string
	reserveeName: string
	numberOfPlaces: number
	instagramAccount: string
	comment: string
	createdAt: string
}

export type AppSlice = {
	accounts: Account[]
	reservations: Reservation[]
	newReservation: Reservation
	checkedReservation: Reservation
	isFetching: boolean
}

export type AuthSlice = {
	isAuthenticated: boolean,
	user: Account,
	isChecked: boolean,
	error: string | null,
	isFetching: boolean
}


