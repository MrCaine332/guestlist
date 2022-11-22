import React from 'react';
import './SignOut.scss'
import authThunks from "../../../../app/redux/thunks/auth-thunks";
import {useAppDispatch} from "../../../../app/hooks";
import Icon from "../../../../elements/icon/Icon";

const SignOut = () => {
    const dispatch = useAppDispatch()

    const onLogout = () => {
        dispatch(authThunks.logout())
    }

    return (
        <div role={'button'} className="signout__button" onClick={onLogout}>
            <Icon name={'sign-out'} size={25} />
            <h1>Sign Out</h1>
        </div>
    );
};

export default SignOut;