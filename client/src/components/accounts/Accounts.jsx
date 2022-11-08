import React, {useEffect} from 'react';
import AppButton from "../../elements/app-button/AppButton";
import PanelCard from "../../elements/panel-card/PanelCard";
import './Accounts.scss'
import {useDispatch, useSelector} from "react-redux";
import appThunks from "../../app/redux/thunks/app-thunks";

const Accounts = () => {

    const dispatch = useDispatch()
    const accounts = useSelector(state => state.app.accounts)

    useEffect(() => {
        dispatch(appThunks.getAccounts())
    }, [])

    return (
        <div className="accounts">
            <div className="area accounts__total">
                <div className="accounts__total-number">
                    <h1>{ accounts.length }</h1>
                </div>
                <div className="accounts__total-info">
                    <h2>Accounts</h2>
                    {/*<h3>for last 30 days</h3>*/}
                </div>
            </div>
            <div className="area box-2">
                <AppButton is={'button'} className={'panel-button'}>
                    Create account
                </AppButton>
            </div>
            {/*<div className="area box-3">*/}
            {/*    <AppButton type={'button'} className={'panel-button delete-button'}>*/}
            {/*        Delete all accounts*/}
            {/*    </AppButton>*/}
            {/*</div>*/}
            <div className="area box-4">
                {/*<AppButton type={'button'} className={'panel-button delete-button'}>*/}
                {/*    Delete all accounts*/}
                {/*</AppButton>*/}
            </div>
            <div className="area box-5">
                { accounts.map((account) =>
                    <PanelCard type={'account'} key={account._id} account={account} />)}
                {/*<AppButton type={'button'} className={'panel-button delete-button'}>*/}
                {/*    Delete all accounts*/}
                {/*</AppButton>*/}
            </div>
        </div>
    );
};

export default Accounts;