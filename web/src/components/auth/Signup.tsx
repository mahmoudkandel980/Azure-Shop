import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { signup } from "../../store/actions/userActions";

import Input from "../ui/Input";
import Button from "../ui/Button";
import ButtonSpinner from "../ui/ButtonSpinner";

import { SignupInterface } from "../../interfaces/store/user/authInterface";

const Signup = (): JSX.Element => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        backendError: "",
    });

    const { name, email, password, confirmPassword } = formData;

    const dispatch = useDispatch<AppDispatch>();

    const { userSignup } = useSelector((state) => state as SignupInterface);
    const { loading, error } = userSignup;

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
            if (!name || name.trim().length === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    name: "please fill name field",
                }));
                return;
            }
            if (!email || email.trim().length === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    email: "please fill email field",
                }));
                return;
            }
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

            dispatch(signup(name, email, password, confirmPassword));
        } catch (err: any) {
            setFormError((prevState) => ({
                ...prevState,
                backendError: err.message,
            }));
            return;
        }
    };

    return (
        <form
            onSubmit={submitFormHandler}
            className='flex flex-col gap-8 items-center w-[80%]'
        >
            <Input
                htmlFor='name'
                label='Name'
                type='text'
                id='name'
                placeholder='Enter Name'
                value={name}
                onChange={onChange}
                error={formError.name}
            />
            <Input
                htmlFor='email'
                label='E-Mail'
                type='email'
                id='email'
                placeholder='Enter E-Mail'
                value={email}
                onChange={onChange}
                error={formError.email}
            />
            <Input
                htmlFor='password'
                label='Password'
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
                    "sign up"
                )}
            </Button>
            <span className='text-darkRed text-sm'>{error}</span>
        </form>
    );
};

export default Signup;
