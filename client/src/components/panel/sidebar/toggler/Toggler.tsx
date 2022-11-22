import React, {useRef} from 'react';
import './Toggler.scss'

const Toggler = () => {
	const checkboxRef = useRef<HTMLInputElement>(null)

	return (
		<>
			<input ref={checkboxRef} type="checkbox" id="sidebar-checkbox" hidden />
			<label className="hamburger__wrap" htmlFor="sidebar-checkbox">
				<div className="hamburger">
					<div className="lines"></div>
				</div>
			</label>
		</>
	);
};

export default Toggler;