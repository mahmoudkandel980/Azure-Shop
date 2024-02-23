import React from "react";
import { useLocation } from "react-router-dom";

import Nav from "../components/dashboard/nav/Nav";

import { useSelector } from "react-redux";

import Overview from "../components/dashboard/body/overview/Overview";
import Users from "../components/dashboard/body/users/Users";
import Products from "../components/dashboard/body/products/Products";
import Notifications from "../components/dashboard/body/notifications/Notifications";
import Orders from "../components/dashboard/body/orders/Orders";
import Message from "../components/ui/Message";

import { LoginInterface } from "../interfaces/store/user/authInterface";

const Dashboard = (): JSX.Element => {
    const { pathname } = useLocation();
    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    if (!"moderator subAdmin admin".includes(userInfo.role!)) {
        return (
            <section className='xl:container mx-auto flex-1 w-full relative'>
                <Message type='error'>
                    You are not allowed to use this page
                </Message>
            </section>
        );
    }

    return (
        <section className='xl:container mx-auto flex-1 w-full relative '>
            <h3 className='uppercase font-bold break-words tracking-widest text-lg pb-3 sm:pb-6 '>
                Dashboard
            </h3>
            <div className='flex flex-col justify-start items-center bg-grayWhite/80 dark:bg-smothDark xl:rounded-md overflow-hidden w-full'>
                <div className='rounded-md bg-white dark:bg-dark/30 border-[1px] border-lightDark/20 shadow-md'>
                    <Nav />
                </div>
                <div
                    className={`${
                        pathname.includes("orders")
                            ? "min-h-[600px]"
                            : "min-h-[500px]"
                    } p-0.5 px-0.5 sm:p-5 lg:p-10 sm:px-5 lg:px-5 w-full relative`}
                >
                    {pathname.includes("/overview") ? (
                        <Overview />
                    ) : pathname.includes("/users") ? (
                        <Users />
                    ) : pathname.includes("/products") ? (
                        <Products />
                    ) : pathname.includes("/orders") ? (
                        <Orders />
                    ) : (
                        pathname.includes("/notifications") && <Notifications />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
