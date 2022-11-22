import React, {useEffect} from 'react';
import './Dashboard.scss'
import AppButton from "../../../elements/app-button/AppButton";

const Dashboard = () => {

	useEffect(() => {
		/**
		 * TODO: Собираем данные по аккаунтам, резервациям и настройкам системы
		 * */
	}, [])

	return (
		<div className="dashboard">
			<div className="dashboard__content">
				<div className="a">
					<div className="b">
						<h2>76</h2>
						<p>Reservations</p>
					</div>
					<div className="b">
						<h2>116</h2>
						<p>Places reserved</p>
					</div>
					<div className="c">
						<div>
							<p>Next event:</p>
							<h2>19/03/22&nbsp;&nbsp;&nbsp;19:30</h2>
						</div>
					</div>
					<div className="c test_c">
							<p>Reservation is OPENED</p>
							<AppButton onClick={() => {}} className={'test'}>
								Close reservation
							</AppButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;