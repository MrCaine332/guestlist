import React from 'react';
import AppButton from "../../../elements/app-button/AppButton";
import AppLink from "../../../elements/app-link/AppLink";
import './HomeContent.scss'
// @ts-ignore
import logo from "../../../resources/images/logo-black.png"

const HomeContent = () => {
	return (
		<div className="home__content">
			<div className="home__header">
				{/*<h1>Guestlist</h1>*/}
				<div className="home__logo">
					<img src={logo} alt=""/>
				</div>
			</div>
			<div className="home__body">
				<AppButton to={'/reservation'}>
					Make a reservation
				</AppButton>
				<AppButton to={'/reservation/check'}>
					Check reservation
				</AppButton>
			</div>
			<div className="home__footer">
				<AppLink to={'/login'}>
					Login
				</AppLink>
			</div>
		</div>
	);
};

export default HomeContent;