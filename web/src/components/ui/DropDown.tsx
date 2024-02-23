import React from "react";

import { RiArrowDownSLine } from "react-icons/ri";

import { DropDownInterface } from "../../interfaces/components/public";

const DropDown = (props: DropDownInterface): JSX.Element => {
    const {
        htmlFor,
        label,
        id,
        value,
        onChange,
        error,
        options,
        openDropDown,
    } = props;

    const toggleDropdownHandler = () => {
        if (openDropDown) {
            props.openHandler(false);
        } else {
            props.openHandler(true);
        }
    };

    return (
        <div className='z-[5] relative flex flex-col justify-center items-start gap-1'>
            <div className='flex items-center justify-start gap-5'>
                <label htmlFor={htmlFor}>{label}</label>
            </div>
            <div
                className='register-input flex justify-between items-center cursor-pointer'
                onClick={toggleDropdownHandler}
            >
                <span>{value}</span>
                <RiArrowDownSLine />
                {openDropDown && (
                    <ul className='absolute flex flex-col left-0  gap-1.5 z-10 border-[1px] p-1 py-1.5 rounded-md border-lightDark/20 dark:border-lightDark bg-grayWhite dark:bg-smothDark -bottom-1 translate-y-[100%] h-32 overflow-y-scroll w-full'>
                        {options.map((option, i) => (
                            <li
                                onClick={onChange}
                                className={`cursor-pointer rounded-sm pl-1 ${
                                    option === value &&
                                    "bg-lightBlue text-white"
                                } ${
                                    option !== value && "hover:bg-lightBlue/80"
                                }`}
                                key={i}
                                id={id}
                                title={option}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <span className='absolute -bottom-6 text-sm text-darkRed'>
                {error}
            </span>
        </div>
    );
};

export default DropDown;
