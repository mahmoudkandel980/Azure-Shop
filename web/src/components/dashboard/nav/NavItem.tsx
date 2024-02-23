import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import ThemeContext from "../../../context/darkModeTheme";

import NotificationDot from "../../ui/NotificationDot";

import { NavItemInterface } from "../../../interfaces/components/public";
import { UsersWantToBeSellerNumberInterface } from "../../../interfaces/store/user/userInterface";

const NavItem = (props: NavItemInterface): JSX.Element => {
    const { id, JSXicon, to } = props;
    const { pathname } = useLocation();
    const { theme } = useContext(ThemeContext);

    const usersWantToBeSellersNumbers = useSelector(
        (state) => state as UsersWantToBeSellerNumberInterface
    );
    const { usersWantToBeSellersNumber, loading } =
        usersWantToBeSellersNumbers.dashboard_usersWantToBeSellersNumbers;

    return (
        <Link to={to} className='relative' id={id}>
            <div
                id={id}
                className={`${
                    pathname.includes(to) &&
                    `font-bold dark:border-darkGray border-darkGray/10 bg-grayWhite dark:bg-smothDark ${
                        theme === "dark"
                            ? "button-shadow-up-dark"
                            : "button-shadow-up"
                    }`
                }  border-[1px] border-transparent relative flex gap-1 p-1.5 sm:p-2 py-1 sm:py-1 rounded-md items-center cursor-pointer sm:hover:scale-95 duration-300`}
            >
                {JSXicon}
                <span className='hidden sm:block text-xs lg:text-base'>
                    {props.children}
                </span>
                {id === "notifications" && (
                    <NotificationDot
                        className='-top-1.5 lg:-top-0.5 left-2.5 sm:left-3 lg:left-3 border-grayWhite dark:border-dark scale-75'
                        children={
                            loading
                                ? 0
                                : usersWantToBeSellersNumber! > 9
                                ? "9+"
                                : usersWantToBeSellersNumber!
                        }
                    />
                )}
            </div>
        </Link>
    );
};

export default NavItem;
