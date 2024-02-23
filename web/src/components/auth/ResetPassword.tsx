import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { resetPassword as resetPasswordFun } from "../../store/actions/userActions";

import Input from "../ui/Input";
import Button from "../ui/Button";
import ButtonSpinner from "../ui/ButtonSpinner";

import { ResetPasswordInterface } from "../../interfaces/store/user/authInterface";

const ResetPassword = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState({
        password: "",
        confirmPassword: "",
        backendError: "",
    });

    const { password, confirmPassword } = formData;
    const token = useLocation().search.split("=")[1];
    const { resetPassword } = useSelector(
        (state) => state as ResetPasswordInterface
    );
    const { userInfo, loading, error } = resetPassword;

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));

        setFormError((prevState) => ({
            ...prevState,
            [e.target.id]: "",
            backendError: "",
        }));
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) {
            return;
        }

        try {
            if (!password || password.trim().length === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    password: "please fill password field",
                }));
                return;
            }
            if (password !== confirmPassword) {
                setFormError((prevState) => ({
                    ...prevState,
                    confirmPassword: "password not equal confirm password",
                }));
                return;
            }
            dispatch(resetPasswordFun(password, confirmPassword, token));
        } catch (err: any) {
            setFormError((prevState) => ({
                ...prevState,
                backendError: err.message,
            }));
            return;
        }
        setFormData({ password: "", confirmPassword: "" });
    };
    return (
        <form
            onSubmit={submitFormHandler}
            className='flex flex-col gap-8 items-center w-[80%]'
        >
            <Input
                htmlFor='password'
                label='New Password'
                type='password'
                id='password'
                placeholder='Enter Password'
                value={password}
                onChange={onChange}
                error={formError.password}
            />
            <Input
                htmlFor='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                placeholder='Enter Confirm Password'
                value={confirmPassword}
                onChange={onChange}
                error={formError.confirmPassword}
            />
            <Button className='w-[70%]'>
                {loading ? (
                    <ButtonSpinner className='scale-[0.25] -mt-1 mb-1 ml-2 w-5 h-5 py-3' />
                ) : (
                    "Change Password"
                )}
            </Button>

            <span className='text-darkRed text-sm'>{error}</span>
            {!loading && userInfo && (
                <span className='text-success text-sm'>
                    Password has been changed
                </span>
            )}
        </form>
    );
};

export default ResetPassword;
