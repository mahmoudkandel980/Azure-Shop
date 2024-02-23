import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { login } from "../../store/actions/userActions";

import Input from "../ui/Input";
import Button from "../ui/Button";
import ButtonSpinner from "../ui/ButtonSpinner";

import { LoginInterface } from "../../interfaces/store/user/authInterface";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formError, setFormError] = useState({
        email: "",
        password: "",
        backendError: "",
    });
    const { email, password } = formData;

    const dipatch = useDispatch<AppDispatch>();

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { loading, error } = userLogin;

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

            dipatch(login(email, password));
        } catch (err: any) {
            setFormError((prevState) => ({
                ...prevState,
                backendError: err.message || "",
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
            <Button className='w-[70%]'>
                {loading ? (
                    <ButtonSpinner className='scale-[0.25] -mt-1 mb-1 ml-2 w-5 h-5 py-3' />
                ) : (
                    "log in"
                )}
            </Button>

            <div className='w-full flex flex-col justify-end gap-2 items-end'>
                <Link to={"/register/forgetPassword"} className='text-darkRed'>
                    Forget Password
                </Link>
            </div>
            <span className='text-darkRed text-sm'>{error}</span>
        </form>
    );
};

export default Login;
