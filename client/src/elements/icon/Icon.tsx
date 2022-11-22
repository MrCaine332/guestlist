import React from "react";
// @ts-ignore
import Icons from "../../resources/icons/icons.svg"; // Path to your icons.svg

interface IIcon {
    name: string
    color?: string
    size?: number | string
}

const Icon: React.FC<IIcon> = ({ name, color, size }) => (
    <svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
        <use xlinkHref={`${Icons}#icon-${name}`} />
    </svg>
);


export default Icon;