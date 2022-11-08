import React, {useEffect, useState} from 'react';
import AppLink from "../../elements/app-link/AppLink";
import Icon from "../../elements/icon/Icon";
import AppInput from "../../elements/app-input/AppInput";
import AppButton from "../../elements/app-button/AppButton";
import {useDispatch} from "react-redux";
import './Form.scss'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import authThunks from "../../app/redux/thunks/auth-thunks";
import appThunks from "../../app/redux/thunks/app-thunks";



const inputs = {
    loginInputs: [
        { valueField: 'username', type: 'text', placeholder: 'Username', required: true },
        { valueField: 'password', type: 'password', placeholder: 'Password', required: true },
    ],
    reservationInputs: [
        { valueField: 'reserveeName', type: 'text', placeholder: 'Name Surname', required: true },
        { valueField: 'numberOfPlaces', type: 'number', placeholder: 'Number of people', required: true },
        { valueField: 'instagramAccount', type: 'text', placeholder: 'Instagram account', required: true },
    ]
}



const Form = ({ type, title, submitBtnText }) => {
    const dispatch = useDispatch()

    const location = useLocation()
    const { id } = useParams()

    const [credentials, setCredentials] = useState(() => {
        if (type === 'login')
            return { username: '', password: '' }
        if (type === 'reservation')
            return { reserveeName: '', numberOfPlaces: '', instagramAccount: '', comment: '' }
    })

    const [error, setError] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        let error = null
        if (type === 'login')
            error = await dispatch(authThunks.login(credentials))
        if (type === 'reservation')
            if (location.pathname.includes('/ref') && id) {
                error = await dispatch(appThunks.createReservation({...credentials, prAgentId: id}))
            } else {
                error = await dispatch(appThunks.createReservation(credentials))
            }
        if (error) {
            setError(error.response.data.message)
        } else {
            setError('')
        }
    }

    return (
        <div className="form__wrap">
            <AppLink to={'/'}>
                <Icon name="arrow-left" size={20} />
                <span>Back</span>
            </AppLink>
            <div className="form__content">
                <h1>
                    { title }
                </h1>
                <form onSubmit={onSubmit}>
                    { inputs[`${type}Inputs`].map((input, index) =>
                        <AppInput key={index}
                                  type={input.type}
                                  placeholder={input.placeholder}
                                  required={input.required}
                                  value={credentials[input.valueField]}
                                  onChange={(e) => setCredentials(
                                      prevState => ({...prevState, [input.valueField]: e.target.value }) )}

                        />
                    )}
                    { type === 'reservation' &&
                        <textarea className="form__comment"
                                  placeholder="Commentary (optional)"
                                  rows={3}
                                  value={credentials.comment}
                                  onChange={(e) => setCredentials(
                                      prevState => ({...prevState, comment: e.target.value }) )} />
                    }
                    <p className="form__error">{ error }</p>
                    <AppButton is={'button'}
                               type={'submit'}>
                        { submitBtnText }
                    </AppButton>
                </form>
            </div>
        </div>
    );
};

export default Form;