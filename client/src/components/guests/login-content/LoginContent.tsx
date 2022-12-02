import React, {ChangeEvent, FormEvent, useState} from 'react';
import {FormInput} from "../../../app/types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Loader from "../../../elements/loader/Loader";
import Form from "../../../elements/form/Form";
import authThunks from "../../../app/redux/thunks/auth-thunks";


const inputs: FormInput[] = [
	{ field: 'username', type: 'text', placeholder: 'Username', required: true },
	{ field: 'password', type: 'password', placeholder: 'Password', required: true },
]

const Login: React.FC = () => {
	const dispatch = useAppDispatch()

	const isFetching = useAppSelector(state => state.auth.isFetching)
	const [credentials, setCredentials] =
		useState<{ username: string, password: string }>({username: '', password: ''})

	const [error, setError] = useState('')

	const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const err: any = await dispatch(authThunks.login(credentials))
		if (err) {
			setError(err.response.data.message)
		} else {
			setError('')
		}
	}

	const onFormInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCredentials(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
	}

	return (
		<>
			<Form inputs={inputs}
			      inputsState={credentials}
			      onSubmit={onFormSubmit}
			      onInputChange={onFormInputChange}
			      title={'Login'}
			      submitBtnText={'Login'}
			      backLink={'/home'}
			      error={error}
			/>
			{ isFetching && <Loader /> }
		</>
	);
};

export default Login;