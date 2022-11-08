import React, {useEffect, useRef} from 'react';
import './AppButton.scss'
import {Link} from "react-router-dom";

const AppButton = (
{
    is,
    type = 'button',
    className = '',
    style,
    onClick,
    disabled = false,
    to,
    children,
}) => {
    const buttonRef = useRef(null)

    useEffect(() => {
        const btn = buttonRef.current
        const btnClickAnimation = (event) => {
            const size = Math.max(btn.offsetWidth, btn.offsetHeight)
            const x = event.offsetX - size / 2
            const y = event.offsetY - size / 2
            const wave = document.createElement('span')

            wave.className = 'wave'
            wave.style.cssText = `width:${size}px;height:${size}px;top:${y}px;left:${x}px`
            btn.appendChild(wave)
            setTimeout(() => wave.remove(), 500)
        }
        btn.addEventListener('mousedown', btnClickAnimation)
        return () => {
            btn.removeEventListener('mousedown', btnClickAnimation)
        }
    }, [])

    return (
        <>
            { is === 'button' &&
            <button ref={buttonRef}
                    type={type}
                    className={`app-button ${className}`}
                    onClick={onClick}
                    style={style}
                    disabled={disabled}
            >
                { children }
            </button> }

            { is === 'link' &&
                <Link ref={buttonRef} to={to} className="app-button" style={style}>
                    { children }
                </Link> }
        </>
    );
};

export default AppButton;