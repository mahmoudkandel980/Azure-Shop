import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import RegisterComponent from "../components/auth/RegisterComponent";

import { LoginInterface } from "../interfaces/store/user/authInterface";

const Register = (): JSX.Element => {
    const navigate = useNavigate();

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo, error } = userLogin;

    // if user login or signup redirect to products page
    useEffect(() => {
        if (userInfo && userInfo.name && !error) {
            navigate("/");
        }
    }, [userInfo, error, navigate]);

    return (
        <div className='container mx-auto h-full flex items-center justify-center flex-1'>
            <RegisterComponent />
        </div>
    );
};

export default Register;
