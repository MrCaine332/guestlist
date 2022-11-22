import React, {ChangeEvent} from 'react';
import './AppInput.scss'

interface IAppInput {
    type?: string
    name?: string
    placeholder?: string
    required?: boolean
    value: any
    onChange: (e: ChangeEvent<HTMLInputElement>) => any
}


const AppInput: React.FC<IAppInput> = ({
    type = 'text',
    name,
    placeholder,
    required = false,
    value,
    onChange
}) => {
    return (
        <label className="app-input">
            <input type={type}
                   name={name}
                   value={value}
                   required={required}
                   onChange={onChange} />
            <div className={`placeholder ${value && 'placeholder_moved'}`}>{ placeholder }</div>
            <hr className="underline" />
        </label>
    );
};

export default AppInput;