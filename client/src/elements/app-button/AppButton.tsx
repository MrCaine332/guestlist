import React, {ReactNode, useEffect, useRef} from 'react';
import './AppButton.scss'
import {Link} from "react-router-dom";

interface IAppBtn_Button {
    to?: null | undefined
    onClick: () => any
}

interface IAppBtn_Link {
    to: string
    onClick?: () => any
}

type AppButton = {
    className?: string
    children?: ReactNode
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset' | undefined
} & (IAppBtn_Button | IAppBtn_Link)

const AppButton: React.FC<AppButton> = ({
    to,
    type = 'button',
    className = '',
    onClick,
    disabled = false,
    children,
}) => {
    const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null)

    useEffect(() => {
        const btn = buttonRef.current
        if (btn) {
            const btnClickAnimation = (event: MouseEvent) => {
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
        }
    }, [])

    return (
        <>
            { !to &&
                <button ref={buttonRef}
                        type={type}
                        className={`app-button ${className} ${disabled && 'app-button_disabled'}`}
                        onClick={onClick}
                        disabled={disabled}
                >
                    { children }
                </button>
            }

            { to &&
                <Link ref={buttonRef}
                      to={to}
                      className={`app-button ${className} ${disabled && 'app-button_disabled'}`}
                      onClick={onClick}
                >
                    { children }
                </Link>
            }
        </>
    );
};

export default AppButton;