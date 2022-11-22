import React, {ChangeEvent, FormEvent} from 'react';
import AppLink from "../../elements/app-link/AppLink";
import Icon from "../icon/Icon";
import AppInput from "../app-input/AppInput";
import AppButton from "../../elements/app-button/AppButton";
import './Form.scss'
import {FormInput} from "../../app/types";

interface IForm {
    inputs: FormInput[]
    inputsState: any
    onInputChange: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement>) => any,
    onSelectChange?: (e: ChangeEvent<HTMLSelectElement>) => any
    onSubmit: (e: FormEvent<HTMLFormElement>) => any
    title?: string
    submitBtnText?: string
    error?: string
    withBackBtn?: boolean,
    backLink?: string
    backCallback?: () => any
}

const Form: React.FC<IForm> = (
{
    inputs,
    inputsState,
    onInputChange,
    onSubmit,
    title,
    submitBtnText,
    error,
    withBackBtn= true,
    backLink= '',
    backCallback,
    onSelectChange,
}) => {
    return (
        <div className="form__wrap">
            { withBackBtn &&
                <AppLink to={backLink} onClick={backCallback} >
                    <Icon name="arrow-left" size={20} />
                    <span>Back</span>
                </AppLink>
            }
            <div className="form__content">
                <h1>
                    { title }
                </h1>
                <form onSubmit={onSubmit}>
                    { inputs.map((input, index) => {
                        if (input.type === 'textarea')
                            return <textarea className="form__comment"
                                             key={index}
                                             value={inputsState[input.field]}
                                             placeholder={input.placeholder}
                                             name={input.field}
                                             required={input.required}
                                             rows={3}
                                             onChange={onInputChange} />
                        if (input.type === 'select')
                            return <select className="form__comment"
                                           key={index}
                                           defaultValue={input.options?.at(0)?.value || ''}
                                           placeholder={input.placeholder}
                                           name={input.field}
                                           required={input.required}
                                           onChange={onSelectChange}>
                                { input.options?.map((option, index) =>
                                        <option value={option.value} key={index}>{option.text}</option>) }
                            </select>

                        return <AppInput type={input.type}
                                         key={index}
                                         value={inputsState[input.field]}
                                         placeholder={input.placeholder}
                                         name={input.field}
                                         required={input.required}
                                         onChange={onInputChange} />
                    })}
                    <p className="form__error">{ error }</p>
                    <AppButton type={'submit'} onClick={() => {}}>
                        { submitBtnText }
                    </AppButton>
                </form>
            </div>
        </div>
    );
};

export default Form;