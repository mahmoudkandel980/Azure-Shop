import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { logout } from "../../store/actions/userActions";

import ThemeContext from "../../context/darkModeTheme";

import NotificationDot from "../ui/NotificationDot";

import { CgProfile } from "react-icons/cg";
import { BsMoon, BsSun, BsCart4 } from "react-icons/bs";
import { TbLayoutDashboard } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { MdLogout, MdLogin } from "react-icons/md";
import { VscSignIn } from "react-icons/vsc";

import { HeaderPropsInterface } from "../../interfaces/components/layout";
import { LoginInterface } from "../../interfaces/store/user/authInterface";

const Dropdown = (props: HeaderPropsInterface): JSX.Element => {
    const { cartItemsNumber, usersWantToBeSellersNumber } = props;
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleMode } = useContext(ThemeContext);

    const userLogin = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin.userLogin;

    const toggleModeHadler = () => {
        if (theme === "dark") {
            toggleMode("light");
        } else {
            toggleMode("dark");
        }

        props.closeModel();
    };

    const logoutHandler = () => {
        // logout handler
        navigate("register/login");
        dispatch(logout());
        props.closeModel();
    };

    return (
        <div className='flex z-50 flex-col dark:bg-lightDark bg-white absolute top-11 -left-36 sm:-left-24 w-44 p-2 px-0 gap-1.5 select-none rounded-md border-lightDark/20 border-[1px]'>
            <span
                className='dark:bg-lightDark bg-lightDark/20 rotate-180 sm:rotate-0 absolute -top-2 sm:-top-3 right-2 sm:right-14 w-3 h-3'
                style={{
                    clipPath: "polygon(51% 49%, 0% 100%, 100% 100%)",
                }}
            ></span>
            <Link
                onClick={props.closeModel}
                to={
                    userInfo && userInfo.name
                        ? "/profile/settings"
                        : "/register/login"
                }
                className='profile-model'
            >
                {userInfo && userInfo.name ? <CgProfile /> : <MdLogin />}
                <span>{userInfo && userInfo.name ? "Profile" : "Log in"}</span>
            </Link>

            {userInfo &&
                userInfo.name &&
                (userInfo.role === "admin" ||
                    userInfo.role === "subAdmin" ||
                    userInfo.role === "moderator") && (
                    <Link
                        to={
                            location.pathname.includes("/dashboard")
                                ? location.pathname
                                : "/dashboard/overview"
                        }
                        className='profile-model relative'
                        onClick={props.closeModel}
                    >
                        <TbLayoutDashboard />
                        <span>Dashboard</span>
                        <NotificationDot
                            className='-top-2 left-3 scale-90 border-white dark:border-lightDark'
                            children={
                                usersWantToBeSellersNumber > 9
                                    ? "9+"
                                    : usersWantToBeSellersNumber
                            }
                        />
                    </Link>
                )}
            <Link
                to='/wishlist'
                className='profile-model'
                onClick={props.closeModel}
            >
                <AiOutlineHeart /> <span>Wish List</span>
            </Link>
            <span className='profile-model' onClick={toggleModeHadler}>
                {theme === "dark" ? <BsSun /> : <BsMoon />}
                <span>
                    {theme === "dark" ? (
                        <span>Light Mode</span>
                    ) : (
                        <span>Dark Mode</span>
                    )}
                </span>
            </span>
            <Link
                to='/cart'
                className='profile-model flex items-baseline relative'
                onClick={props.closeModel}
            >
                <BsCart4 />
                <span>Cart</span>
                <NotificationDot
                    className='-top-2 left-3 scale-90 border-white dark:border-lightDark'
                    children={cartItemsNumber > 9 ? "9+" : cartItemsNumber}
                />
            </Link>
            {userInfo && userInfo.name && (
                <span
                    onClick={logoutHandler}
                    className='profile-model dark:border-gray-600/40 border-gray-400/25 pt-1 border-t-[1px] '
                >
                    <MdLogout />
                    <span>Logout</span>
                </span>
            )}

            {userInfo && userInfo.name ? (
                <></>
            ) : (
                <Link
                    onClick={props.closeModel}
                    to='/register/signup'
                    className='profile-model dark:border-gray-600/40 border-gray-400/25 pt-1 border-t-[1px]'
                >
                    <VscSignIn />
                    <span>Sign up</span>
                </Link>
            )}
        </div>
    );
};

export default Dropdown;
