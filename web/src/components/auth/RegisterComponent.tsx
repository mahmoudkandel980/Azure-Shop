import React from "react";
import { useParams } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import Button from "../ui/Button";

const RegisterComponent = (): JSX.Element => {
    const { registerType } = useParams();

    return (
        <div className='flex flex-col items-center border-[1px] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] py-[4%] pb-[10%] md:pb-[2%] rounded-lg border-lightDark/10 dark:border-lightDark mt-10'>
            <h1 className='text-center text-2xl font-bold pb-10'>
                {registerType === "login"
                    ? "Log in"
                    : registerType === "signup"
                    ? "Sign up"
                    : registerType === "forgetPassword"
                    ? "Forget Password"
                    : "Reset Password"}
            </h1>

            {registerType === "forgetPassword" && (
                <p className='px-10 pb-5'>
                    Please enter your email and we will send you an E-mail with
                    a token to check if you are the user of this account.
                </p>
            )}

            {registerType === "signup" && <Signup />}
            {registerType === "login" && <Login />}
            {registerType === "forgetPassword" && <ForgetPassword />}
            {registerType === "resetPassword" && <ResetPassword />}

            <hr className='mt-10 w-full border-lightDark/10 dark:border-lightDark' />
            <div className='flex flex-col gap-2 items-center w-[80%]'>
                <span className='mt-8 font-bold'>Switch to</span>
                <Button
                    className='w-[70%]'
                    type='link'
                    to={
                        registerType === "login"
                            ? "/register/signup"
                            : "/register/login"
                    }
                >
                    {registerType === "login" ? "Sign up" : "Log in"}
                </Button>
            </div>
        </div>
    );
};

export default RegisterComponent;
