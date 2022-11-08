import React from 'react';
import styles from './DeleteButton.scss'
import Icon from "../icon/Icon";

const DeleteButton = () => {
    return (
        <button className="delete__btn">
            <Icon name="delete" size={30} color="#F34542" />
        </button>
    );
};

export default DeleteButton;