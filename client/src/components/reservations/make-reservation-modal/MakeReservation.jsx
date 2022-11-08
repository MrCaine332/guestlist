import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import './MakeReservations.scss'
import AppLink from "../../../elements/app-link/AppLink";
import Icon from "../../../elements/icon/Icon";
import AppInput from "../../../elements/app-input/AppInput";
import AppButton from "../../../elements/app-button/AppButton";



const reservationInputs = [
    { valueField: 'reserveeName', type: 'text', placeholder: 'Name Surname', required: true },
    { valueField: 'numberOfPlaces', type: 'number', placeholder: 'Number of people', required: true },
    { valueField: 'instagramAccount', type: 'text', placeholder: 'Instagram account', required: true },
]




const MakeReservation = ({ onBackClick }) => {
    const dispatch = useDispatch()

    const location = useLocation()
    const { id } = useParams()

    const [credentials, setCredentials] = useState(
        { reserveeName: '', numberOfPlaces: '', instagramAccount: '', comment: '' }
)

    const [error, setError] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        // let error = null
        // if (type === 'login')
        //     error = await dispatch(authThunks.login(credentials))
        // if (type === 'reservation')
        //     if (location.pathname.includes('/ref') && id) {
        //         error = await dispatch(appThunks.createReservation({...credentials, prAgentId: id}))
        //     } else {
        //         error = await dispatch(appThunks.createReservation(credentials))
        //     }
        // if (error) {
        //     setError(error.response.data.message)
        // } else {
        //     setError('')
        // }
    }

    const test = () => {
        console.log('test')
    }

    return (
        <div className="new__reservation">
            <AppLink onClick={onBackClick}>
                <Icon name="arrow-left" size={20} />
                <span>Back</span>
            </AppLink>
            <div className="new__reservation-content">
                <h1>
                    Make a reservation
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
                    <textarea className="new__reservation-comment"
                              placeholder="Commentary (optional)"
                              rows={3}
                              value={credentials.comment}
                              onChange={(e) => setCredentials(
                                  prevState => ({...prevState, comment: e.target.value }) )} />
                    <p className="new__reservation-error">{ error }</p>
                    <AppButton is={'button'}
                               type={'submit'}>
                        Submit
                    </AppButton>
                </form>
            </div>
        </div>
    );
};

export default MakeReservation;