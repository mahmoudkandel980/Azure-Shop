import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../../hooks/use-auth";
import Spinner from "../ui/Spinner";

const AccessDashboard = (): JSX.Element => {
    const { userAllowedOpenDashboard, checkStatus } = useAuth();

    if (checkStatus) {
        return (
            <div className='w-full h-screen relative'>
                <Spinner />
            </div>
        );
    }

    return userAllowedOpenDashboard ? <Outlet /> : <Navigate to='/' />;
};

export default AccessDashboard;
