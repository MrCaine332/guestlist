import React, {ReactNode} from 'react';
import {Link} from "react-router-dom";
import './AppLink.scss'

interface IAppLink_Button {
    to?: null | undefined
    onClick: () => any
}

interface IAppLink_Link {
    to: string
    onClick?: () => any
}

type AppLink = {
    className?: string
    children?: ReactNode
    disabled?: boolean
    withUnderline?: boolean
} & (IAppLink_Button | IAppLink_Link)

const AppLink: React.FC<AppLink> = ({
    to,
    onClick,
    className,
    children,
    withUnderline = false,
}) => {
    return (
        <>
            { to &&
                <Link to={to}
                      className={`app-link ${className} ${withUnderline && 'underlined'}`}
                      onClick={onClick}>
                    { children }
                </Link>
            }
            { !to &&
                <div className={`app-link ${withUnderline && 'underlined'}`}
                     onClick={onClick}>
                    { children }
                </div>
            }
        </>
    );
};

export default AppLink;