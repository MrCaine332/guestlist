import React, {useEffect, useState} from 'react';
import AppLink from "../../elements/app-link/AppLink";
import Icon from "../../elements/icon/Icon";
import AppInput from "../../elements/app-input/AppInput";
import AppButton from "../../elements/app-button/AppButton";
import {useDispatch} from "react-redux";
import authThunks from "../../redux/thunks/auth-thunks";
import appThunks from "../../redux/thunks/app-thunks";
import './EditForm.scss'

const reservationInputs = [
        { valueField: 'reserveeName', type: 'text', placeholder: 'Name Surname', required: true },
        { valueField: 'numberOfPlaces', type: 'number', placeholder: 'Number of people', required: true },
        { valueField: 'instagramAccount', type: 'text', placeholder: 'Instagram account', required: true },
    ]

const Form = ({ title, setEdit }) => {
    const dispatch = useDispatch()


    const [credentials, setCredentials] = useState(
        { reserveeName: '', numberOfPlaces: '', instagramAccount: '', comment: '' })

    const [error, setError] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        const error = await dispatch(appThunks.updateReservation(credentials))
        if (error) {
            setError(error.response.data.message)
        } else {
            setError('')
        }
        setEdit(false)
    }

    const onGoBack = () => {
        setEdit(false)
    }

    return (
        <div className="form__wrap">
            <AppLink to={'/reservation/check'} onClick={onGoBack}>
                <Icon name="arrow-left" size={20} />
                <span>Back</span>
            </AppLink>
            <div className="form__content">
                <h1>
                    { title }
                </h1>
                <form onSubmit={onSubmit}>
                    { reservationInputs.map((input, index) =>
                        <AppInput key={index}
                                  type={input.type}
                                  placeholder={input.placeholder}
                                  required={input.required}
                                  value={credentials[input.valueField]}
                                  onChange={(e) => setCredentials(
                                      prevState => ({...prevState, [input.valueField]: e.target.value }) )}

                        />
                    )}
                    <textarea className="form__comment"
                              placeholder="Commentary (optional)"
                              rows={3}
                              value={credentials.comment}
                              onChange={(e) => setCredentials(
                                  prevState => ({...prevState, comment: e.target.value }) )} />
                    <p className="form__error">{ error }</p>
                    <AppButton is={'button'}
                               type={'submit'}>
                        Save
                    </AppButton>
                </form>
            </div>
        </div>
    );
};

export default Form;