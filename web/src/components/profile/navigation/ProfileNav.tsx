import React from "react";

import { useSelector } from "react-redux";

import { FiSettings } from "react-icons/fi";
import { TfiLock } from "react-icons/tfi";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import {
    MdOutlineProductionQuantityLimits,
    MdOutlineBorderColor,
} from "react-icons/md";
import { BsCart4 } from "react-icons/bs";

import SingleNav from "./SingleNav";

import { LoginInterface } from "../../../interfaces/store/user/authInterface";

const pageTypes = [
    {
        id: "settings",
        JSXicon: <FiSettings />,
        content: "Settings",
        to: "/profile/settings",
    },
    {
        id: "changePassword",
        JSXicon: <TfiLock />,
        content: "Change Password",
        to: "/profile/changePassword",
    },
    {
        id: "wishList",
        JSXicon: <AiOutlineHeart />,
        content: "Wish List",
        to: "/profile/wishList",
    },
    {
        id: "products",
        JSXicon: <MdOutlineProductionQuantityLimits />,
        content: "My Products",
        to: "/profile/products",
    },
    {
        id: "orders",
        JSXicon: <MdOutlineBorderColor />,
        content: "Orders",
        to: "/profile/orders",
    },
    {
        id: "cart",
        JSXicon: <BsCart4 />,
        content: "Cart",
        to: "/profile/cart",
    },
    {
        id: "reviews",
        JSXicon: <AiOutlineStar />,
        content: "Reviews",
        to: "/profile/reviews",
    },
];

const ProfileNav = (): JSX.Element => {
    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    return (
        <nav className='px-3 xl:px-12 py-1.5 pb-2 rounded-lg'>
            <ul className='flex justify-start items-center gap-1 lg:gap-3'>
                {pageTypes.map((page) =>
                    page.id === "products" && userInfo.role === "user" ? (
                        <span key={page.id} className='hidden'></span>
                    ) : (
                        <SingleNav
                            key={page.id}
                            id={page.id}
                            JSXicon={page.JSXicon}
                            to={page.to}
                        >
                            {page.content}
                        </SingleNav>
                    )
                )}
            </ul>
        </nav>
    );
};

export default ProfileNav;
