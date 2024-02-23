import React, { useState } from "react";

import { BiHide, BiShow } from "react-icons/bi";

import { InputInterface } from "../../interfaces/components/public";

const Input = (props: InputInterface): JSX.Element => {
    const {
        htmlFor,
        label,
        type,
        id,
        name,
        placeholder,
        value,
        onChange,
        minLength,
        min,
        max,
        step,
        readOnly,
        error,
        onBlur,
        checked,
        required,
        textStart,
    } = props;
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPasswordHandler = () => {
        setShowPassword((prevstate) => !prevstate);
    };

    if (type === "radio") {
        return (
            <div className='flex justify-start items-center gap-2 select-none '>
                <label
                    htmlFor={htmlFor}
                    className='border-[1px] border-smothDark dark:border-white w-4 h-4 rounded-full relative cursor-pointer'
                >
                    {checked && (
                        <label className='absolute top-[50%] left-[50%] -translate-x-1 -translate-y-1 w-2 h-2 bg-smothDark dark:bg-white rounded-full cursor-pointer' />
                    )}
                </label>
                <input
                    className='cursor-pointer hidden'
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={checked}
                />
                <label className='cursor-pointer' htmlFor={htmlFor}>
                    {label}
                </label>
            </div>
        );
    }

    return (
        <div className='relative flex flex-col justify-center items-start gap-1 w-full'>
            <label htmlFor={htmlFor}>{label}</label>
            {type === "textarea" ? (
                <textarea
                    className='register-input'
                    rows={3}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={onChange}
                    minLength={minLength}
                    readOnly={readOnly}
                    onBlur={onBlur}
                ></textarea>
            ) : (
                <input
                    className={`${
                        type === "number" && !textStart && "text-center"
                    } register-input`}
                    type={
                        id === "password" ||
                        id === "confirmPassword" ||
                        id === "currentPassword" ||
                        id === "newPassword" ||
                        id === "confirmPassword"
                            ? showPassword
                                ? "text"
                                : "password"
                            : type
                    }
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={onChange}
                    minLength={minLength}
                    min={min}
                    max={max}
                    step={step}
                    readOnly={readOnly}
                    onBlur={onBlur}
                />
            )}
            <span className='absolute -bottom-6 text-sm text-darkRed'>
                {error}
            </span>
            {type === "password" && (
                <span
                    onClick={toggleShowPasswordHandler}
                    className='absolute bottom-2 right-2 hover:scale-110 cursor-pointer'
                >
                    {showPassword ? <BiHide /> : <BiShow />}
                </span>
            )}
        </div>
    );
};

export default Input;
