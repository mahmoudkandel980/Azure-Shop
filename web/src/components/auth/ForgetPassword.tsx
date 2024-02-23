import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { forgetPassword as forgetPasswordFun } from "../../store/actions/userActions";

import Input from "../ui/Input";
import Button from "../ui/Button";
import ButtonSpinner from "../ui/ButtonSpinner";

import { ForgetPasswordInterface } from "../../interfaces/store/user/authInterface";

const ForgetPassword = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("");

    const { forgetPassword } = useSelector(
        (state) => state as ForgetPasswordInterface
    );
    const { message, error, loading } = forgetPassword;

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEmail(e.target.value);
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) {
            return;
        }
        dispatch(forgetPasswordFun(email));
        setEmail("");
    };

    return (
        <form
            onSubmit={submitFormHandler}
            className='flex flex-col gap-8 items-center w-[80%]'
        >
            <Input
                htmlFor='email'
                label='E-Mail'
                type='email'
                id='email'
                placeholder='Enter E-Mail'
                value={email}
                onChange={onChange}
            />
            <Button className='w-[70%]'>
                {loading ? (
                    <ButtonSpinner className='scale-[0.25] -mt-1 mb-1 ml-2 w-5 h-5 py-3' />
                ) : (
                    "send E-Mail"
                )}
            </Button>

            <span className='text-darkRed text-sm font-bold'>{error}</span>
            <span className='text-success text-sm font-bold'>{message}</span>
        </form>
    );
};

export default ForgetPassword;
