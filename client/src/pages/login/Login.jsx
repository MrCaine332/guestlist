import React, {useEffect, useState} from 'react';
import Card from "../../elements/card/Card";
import './Login.scss'
import {useSelector} from "react-redux";
import Loader from "../../elements/loader/Loader";
import Form from "../../components/form/Form";



const Login = () => {
    const isFetching = useSelector(state => state.auth.isFetching)

    return (
        <div className="login">
            <Card>
                <Form type={'login'}
                      title={'Login'}
                      submitBtnText={'Login'}
                />
                { isFetching && <Loader /> }
            </Card>
        </div>
    );
};

export default Login;