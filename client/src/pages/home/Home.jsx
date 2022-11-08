import React from 'react';
import './Home.scss'
import AppButton from "../../elements/app-button/AppButton";
import Card from "../../elements/card/Card";
import AppLink from "../../elements/app-link/AppLink";

const Home = () => {
    return (
        <div className="home">
            <Card>
                <div className="home__wrap">
                    <div className="top">
                        <h1>Guestlist</h1>
                        <AppButton is={'link'} to={'/reservation'}>
                            Make a reservation
                        </AppButton>
                        <AppButton is={'link'} to={'/reservation/check'}>
                            Check reservation
                        </AppButton>
                    </div>
                    <div className="bottom">
                        <AppLink to={'/login'}>
                            Click here if you are PR Agent
                        </AppLink>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Home;