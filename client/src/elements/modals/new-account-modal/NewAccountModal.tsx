import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Form from "../../form/Form";
import Loader from "../../loader/Loader";
import {FormInput} from "../../../app/types";
import accountThunks from "../../../app/redux/thunks/account-thunks";

const inputs: FormInput[] = [
	{ field: 'username', type: 'text', placeholder: 'Username', required: true },
	{ field: 'password', type: 'password', placeholder: 'Password', required: true },
	{ field: 'name', type: 'text', placeholder: 'Name', required: true },
	{ field: 'surname', type: 'text', placeholder: 'Surname', required: false },
	{ field: 'role', type: 'select', placeholder: 'Role', required: true,
		options: [{value: 'PR_AGENT', text: 'PR_AGENT'}, {value: 'CHECKER', text: 'CHECKER'}]},
]

const NewAccountModal = () => {
	const dispatch = useAppDispatch()

	const isFetching = useAppSelector(state => state.app.isFetching)

	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
		name: '',
		surname: '',
		role: 'PR_AGENT',
	})

	const [error, setError] = useState('')

	const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const err: any = await dispatch(accountThunks.createAccount(credentials))
		if (err) {
			setError(err.response.data.message)
		} else {
			setError('')
		}
	}

	const onFormInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCredentials(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
	}

	const onFormSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCredentials(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
	}

	return (
		<>
            <Form inputs={inputs}
                  inputsState={credentials}
                  onSubmit={onFormSubmit}
                  onInputChange={onFormInputChange}
                  title={'New account'}
                  submitBtnText={'Create'}
                  withBackBtn={false}
                  onSelectChange={onFormSelectChange}
                  error={error}
            />
			{ isFetching && <Loader /> }
		</>
	);
};

export default NewAccountModal;