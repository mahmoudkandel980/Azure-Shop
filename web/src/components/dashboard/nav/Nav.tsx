import React from "react";

import NavItem from "./NavItem";

import { HiOutlineUserGroup } from "react-icons/hi";
import { IoBookOutline, IoReorderFour } from "react-icons/io5";
import {
    MdOutlineProductionQuantityLimits,
    MdOutlineNotifications,
} from "react-icons/md";

export const DEFAULT_PAGE_TYPE = "overview";

const pageTypes = [
    {
        id: DEFAULT_PAGE_TYPE,
        JSXicon: <IoBookOutline />,
        content: "Overview",
        to: "/dashboard/overview",
    },
    {
        id: "users",
        JSXicon: <HiOutlineUserGroup />,
        content: "Users",
        to: "/dashboard/users",
    },
    {
        id: "products",
        JSXicon: <MdOutlineProductionQuantityLimits />,
        content: "Products",
        to: "/dashboard/products",
    },
    {
        id: "orders",
        JSXicon: <IoReorderFour />,
        content: "Orders",
        to: "/dashboard/orders",
    },
    {
        id: "notifications",
        JSXicon: <MdOutlineNotifications />,
        content: "Notifications",
        to: "/dashboard/notifications",
    },
];

const Nav = (): JSX.Element => {
    return (
        <nav className='px-5 sm:px-12 py-1.5 pb-2 rounded-lg'>
            <ul className='flex justify-start items-center gap-1 sm:gap-4 md:gap-6'>
                {pageTypes.map((page) => (
                    <NavItem
                        key={page.id}
                        id={page.id}
                        JSXicon={page.JSXicon}
                        to={page.to}
                    >
                        {page.content}
                    </NavItem>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
