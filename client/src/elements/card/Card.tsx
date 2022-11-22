import React, {ReactNode} from 'react';
import './Card.scss'

interface ICard {
    className?: string
    children?: ReactNode
}

const Card: React.FC<ICard> = ({ className, children }) => {
    return (
        <div className={`card ${className}`}>
            { children }
        </div>
    );
};

export default Card;