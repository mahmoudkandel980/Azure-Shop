import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import NotificationDot from "../../ui/NotificationDot";

import ThemeContext from "../../../context/darkModeTheme";

import { CartStateInterface } from "../../../interfaces/store/cart/cartInterface";
import { NavItemInterface } from "../../../interfaces/components/public";

const SingleNav = (props: NavItemInterface): JSX.Element => {
    const { id, JSXicon, to } = props;
    const { pathname } = useLocation();
    const { theme } = useContext(ThemeContext);

    const [cartItemsNumber, setCartItemsNumber] = useState("0");

    const { cart } = useSelector((state) => state as CartStateInterface);
    const { cartItems } = cart;

    useEffect(() => {
        if (cartItems.length === 0) {
            setCartItemsNumber("0");
        } else {
            const itemsqty = cartItems.reduce((acc, item) => acc + item.qty, 0);
            setCartItemsNumber(+itemsqty > 9 ? "9+" : itemsqty.toString());
        }
    }, [cartItems]);

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
                }  border-[1px] border-transparent relative flex gap-1 p-1.5 lg:p-2 py-1 sm:py-1 rounded-md items-center cursor-pointer sm:hover:scale-95 duration-300`}
            >
                {JSXicon}
                <span className='hidden sm:block text-xs lg:text-base'>
                    {props.children}
                </span>
                {id === "cart" && (
                    <NotificationDot
                        className='-top-1.5 lg:top-0.5 left-2.5 lg:left-3 border-grayWhite dark:border-dark scale-75'
                        children={cartItemsNumber}
                    />
                )}
            </div>
        </Link>
    );
};

export default SingleNav;
