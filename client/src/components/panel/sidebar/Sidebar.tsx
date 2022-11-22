import React from 'react';
import './Sidebar.scss'
import Toggler from "./toggler/Toggler";
import SidebarUserInfo from "./user-info/SidebarUserInfo";
import Navbar from "./navbar/Navbar";
import SignOut from "./signout/SignOut";

const Sidebar = () => {
	return (
		<div className="sidebar__wrap">
			<Toggler />
			<div className="sidebar">
				<SidebarUserInfo />
				<Navbar />
				<SignOut />
			</div>
		</div>
	);
};

export default Sidebar;