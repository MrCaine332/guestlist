import React, {useEffect, useRef} from 'react';
import './AppInput.scss'

const AppInput = ({ type = 'text', placeholder, required = false, value, onChange }) => {
    return (
        <label className="app-input">
            <input type={type}
                   value={value}
                   required={required}
                   onChange={onChange} />
            <div className={`placeholder ${value && 'placeholder_moved'}`}>{ placeholder }</div>
            <hr className="underline" />
        </label>
    );
};

export default AppInput;