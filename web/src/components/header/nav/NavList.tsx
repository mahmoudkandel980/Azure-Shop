import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { profile } from "../../../store/actions/userActions";
import { dashboard_usersWantToBeSellersNumbers } from "../../../store/actions/dashboardActions";

import Backdrop from "../../models/Backdrop";
import Dropdown from "../Dropdown";

import NotificationDot from "../../ui/NotificationDot";

import { BsThreeDots } from "react-icons/bs";
import {
    ProfileInterface,
    UsersWantToBeSellerNumberInterface,
} from "../../../interfaces/store/user/userInterface";
import { LoginInterface } from "../../../interfaces/store/user/authInterface";
import { CartStateInterface } from "../../../interfaces/store/cart/cartInterface";
import imageUrlConverter from "../../../helpers/imageUrlConverter";

const NavList = () => {
    const [showModel, setShowModel] = useState<Boolean>(false);
    const [cartItemsNumber, setCartItemsNumber] = useState<number>(0);

    const dispatch = useDispatch<AppDispatch>();

    const userLogin = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin.userLogin;

    const cart = useSelector((state) => state as CartStateInterface);
    const { cartItems } = cart.cart;

    const usersWantToBeSellersNumbers = useSelector(
        (state) => state as UsersWantToBeSellerNumberInterface
    );
    const { usersWantToBeSellersNumber, loading } =
        usersWantToBeSellersNumbers.dashboard_usersWantToBeSellersNumbers;

    const { profile: profileDate } = useSelector(
        (state) => state as ProfileInterface
    );

    useEffect(() => {
        if (cartItems.length === 0) {
            setCartItemsNumber(0);
        } else {
            const itemsqty = cartItems.reduce((acc, item) => acc + item.qty, 0);
            setCartItemsNumber(itemsqty);
        }
    }, [cartItems]);

    const toggleModeHandler = () => {
        setShowModel((prevState) => !prevState);
    };

    useEffect(() => {
        if (userInfo.role) {
            dispatch(profile());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (
            (userInfo.role === "admin" ||
                userInfo.role === "subAdmin" ||
                userInfo.role === "moderator") &&
            !usersWantToBeSellersNumber
        ) {
            dispatch(dashboard_usersWantToBeSellersNumbers());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ul className='rounded-full flex items-center text-xs sm:text-sm sm:font-semibold justify-end gap-3 sm:gap-5 md:gap-10 lg:gap-32 select-none'>
            <li>
                <NavLink
                    className='header_nav opacity-50 hover:opacity-100'
                    to='/'
                >
                    Products
                </NavLink>
            </li>
            {userInfo && userInfo.name && (
                <li>
                    <NavLink
                        className='header_nav opacity-50 hover:opacity-100'
                        to='/orders'
                    >
                        Orders
                    </NavLink>
                </li>
            )}
            <li className='relative '>
                <div className='relative'>
                    {userInfo && userInfo.name && userInfo.email ? (
                        <div
                            onClick={toggleModeHandler}
                            className='flex justify-start items-center gap-2 h-full cursor-pointer relative'
                        >
                            <img
                                loading='lazy'
                                className='rounded-full w-7 object-cover sm:w-8 h-7 sm:h-8'
                                src={imageUrlConverter(
                                    "users",
                                    userInfo.imageUrl!
                                )}
                                alt={`${userInfo.name}_image`}
                            />
                            <NotificationDot
                                className='-top-2 left-5 border-grayWhite dark:border-dark'
                                children={
                                    !usersWantToBeSellersNumber
                                        ? cartItemsNumber > 9
                                            ? "9+"
                                            : cartItemsNumber
                                        : Number(
                                              cartItemsNumber +
                                                  usersWantToBeSellersNumber
                                          ) > 9
                                        ? "9+"
                                        : +cartItemsNumber +
                                          usersWantToBeSellersNumber
                                }
                            />
                            <div className='hidden sm:flex flex-col justify-start leading-3 text-xs font-inter'>
                                <span>
                                    {userInfo.name.includes(" ")
                                        ? userInfo.name.split(" ")[0]
                                        : userInfo.name}
                                </span>
                                <span className='opacity-70'>
                                    {userInfo.email.length > 10
                                        ? userInfo.email.slice(0, 10) + "..."
                                        : userInfo.email}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div
                            className='cursor-pointer'
                            onClick={toggleModeHandler}
                        >
                            <BsThreeDots className='w-7 h-full' />
                        </div>
                    )}
                </div>
                {showModel && (
                    <Dropdown
                        closeModel={toggleModeHandler}
                        cartItemsNumber={cartItemsNumber}
                        usersWantToBeSellersNumber={
                            loading
                                ? 0
                                : usersWantToBeSellersNumber
                                ? usersWantToBeSellersNumber
                                : 0
                        }
                    />
                )}
            </li>
            {showModel && (
                <Backdrop hideBackgroundColor onClose={toggleModeHandler} />
            )}
        </ul>
    );
};

export default NavList;
