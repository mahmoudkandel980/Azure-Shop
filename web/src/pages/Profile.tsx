import React from "react";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import ProfileNav from "../components/profile/navigation/ProfileNav";
import Settings from "../components/profile/sections/Settings";
import ChangePassword from "../components/profile/sections/ChangePassword";
import WishList from "../components/profile/sections/WishList";
import Products from "../components/profile/sections/Products";
import Orders from "../components/profile/sections/Orders";
import Cart from "../components/profile/sections/Cart";
import Reviews from "../components/profile/sections/Reviews";
import CreateProduct from "../components/utils/CreateProduct";

import { LoginInterface } from "../interfaces/store/user/authInterface";

const Profile = (): JSX.Element => {
    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const location = useLocation();
    const { pathname } = location;

    return (
        <section className='xl:container mx-auto flex-1 w-full'>
            <CreateProduct className='sm:mr-5 lg:mr-10' />
            <div className='flex flex-col justify-start items-stretch bg-grayWhite/80 dark:bg-smothDark overflow-hidden'>
                <div className='self-center rounded-md bg-white dark:bg-dark/30 border-[1px] border-lightDark/20 shadow-md mt-10 mb-5'>
                    <ProfileNav />
                </div>
                <div
                    className={`${
                        pathname.includes("/profile")
                            ? "p-0.5 pl-0.5"
                            : "p-3 pl-5"
                    } flex-1 sm:p-5 lg:p-10 sm:pl-5 lg:pl-5 relative min-h-[300px]`}
                >
                    {pathname.includes("settings") && (
                        <Settings userInfo={userInfo} />
                    )}
                    {pathname.includes("changePassword") && <ChangePassword />}
                    {pathname.includes("wishList") && <WishList />}
                    {pathname.includes("products") && <Products />}
                    {pathname.includes("orders") && <Orders />}
                    {pathname.includes("cart") && <Cart />}
                    {pathname.includes("reviews") && <Reviews />}
                </div>
            </div>
        </section>
    );
};

export default Profile;
