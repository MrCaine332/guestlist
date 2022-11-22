import React from 'react';
import './Modal.scss'

interface IModal {
	children: React.ReactNode
	onClose: () => any
}

const Modal: React.FC<IModal> = ({ children, onClose }) => {
	return (
		<div className="modal">
			<div className="modal__bg" onClick={onClose}></div>
			<div className="modal__content">
				<div className="modal__close-btn" onClick={onClose}>X</div>
				{ children }
			</div>
		</div>
	);
};

export default Modal;