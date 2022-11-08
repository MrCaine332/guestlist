import React from 'react';
import './Card.scss'

const Card = ({ children }) => {
    return (
        <div className="card" id="card">
            <div className="card__content">
                { children }
            </div>
        </div>
    );
};

export default Card;