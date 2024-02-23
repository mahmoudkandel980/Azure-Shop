import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import SocialLink from "./SocialLink";
import FooterLink from "./FooterLink";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaLinkedinIn,
} from "react-icons/fa";

import { ImLocation } from "react-icons/im";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMailSharp } from "react-icons/io5";

import { LoginInterface } from "../../interfaces/store/user/authInterface";

const socialLinks = [
    {
        href: "https://web.facebook.com/profile.php?id=100008326722554",
        icon: <FaFacebookF className='social-icon  text-facebook' />,
    },
    {
        href: "https://www.instagram.com/mahmud_kandel/",
        icon: <FaInstagram className='social-icon instagram-icon rounded-lg' />,
    },
    {
        href: "https://twitter.com/",
        icon: <FaTwitter className='social-icon  text-twitter' />,
    },
    {
        href: "https://www.youtube.com/channel/UC_mM3_HiulDW4Spaw1eM8cw",
        icon: <FaYoutube className='social-icon  text-youtube' />,
    },
    {
        href: "https://www.linkedin.com/in/mahmoud-kandel/",
        icon: <FaLinkedinIn className='social-icon text-lightBlue' />,
    },
];

const productsLinks = [
    {
        href: "/",
        children: "all products",
    },
    {
        href: "/orders",
        children: "orders",
    },
    {
        href: "/cart",
        children: "cart",
    },
];

const Footer = (): JSX.Element => {
    const userLogin = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin.userLogin;

    const customerCareLinks = [
        {
            href:
                userInfo && userInfo.name
                    ? "/profile/settings"
                    : "/register/login",
            children: "my account",
        },
        {
            href: "/wishlist",
            children: "wishlist",
        },
        {
            href: "/checkout/shipping",
            children: "Checkout",
        },
    ];

    const accountLinks = [
        {
            href:
                userInfo && userInfo.name
                    ? "/profile/settings"
                    : "/register/signup",
            children: userInfo && userInfo.name ? "settings" : "signup",
        },
        {
            href:
                userInfo && userInfo.name
                    ? "/profile/changePassword"
                    : "/register/login",
            children: userInfo && userInfo.name ? "change password" : "login",
        },
        userInfo &&
            userInfo.name && {
                href: "/profile/products",
                children: "my products",
            },
        {
            href:
                userInfo && userInfo.name
                    ? "/profile/reviews"
                    : "/register/forgetPassword",
            children:
                userInfo && userInfo.name ? "my reviews" : "forget password",
        },
    ];

    return (
        <footer className='dark:bg-black bg-smothDark py-16 text-white w-full text-center pt-10 sm:pt-20 pb-5 mt-10 sm:mt-32'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-5 gap-y-10 px-5'>
                    <div className='sm:col-span-2 flex flex-col justify-center space-y-2 sm:space-y-5 items-center w-full'>
                        <Link rel='noreferrer' to={`/`}>
                            <img
                                loading='lazy'
                                className='hover:cursor-pointer w-28'
                                src='/images/footerLogo.png'
                                alt='azure shop logo'
                            />
                        </Link>
                        <p className='text-xs sm:text-sm opacity-70 w-full sm:w-[90%]'>
                            Azure Store where you can find the products you
                            want. In addition, you can be a seller and sell your
                            products And create a store profile with all your
                            products.
                        </p>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <h2 className='font-mono font-bold text-xl capitalize mb-3'>
                            products
                        </h2>
                        <div className='flex flex-col space-y-1'>
                            {productsLinks.map((link) => (
                                <FooterLink
                                    key={link.children}
                                    href={link.href}
                                >
                                    {link.children}
                                </FooterLink>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <h2 className='font-mono font-bold text-xl capitalize mb-3'>
                            customer care
                        </h2>
                        <div className='flex flex-col space-y-1'>
                            {customerCareLinks.map((link) => (
                                <FooterLink
                                    key={link.children}
                                    href={link.href}
                                >
                                    {link.children}
                                </FooterLink>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <h2 className='font-mono font-bold text-xl capitalize mb-3'>
                            account
                        </h2>
                        <div className='flex flex-col space-y-1'>
                            {accountLinks.map(
                                (link) =>
                                    link && (
                                        <FooterLink
                                            key={link.children}
                                            href={link.href}
                                        >
                                            {link.children}
                                        </FooterLink>
                                    )
                            )}
                        </div>
                    </div>
                    <div className='sm:col-span-2 lg:col-span-1 flex flex-col justify-start items-start'>
                        <h2 className='font-mono font-bold text-xl capitalize mb-3 '>
                            store information
                        </h2>
                        <div className='flex flex-col space-y-1'>
                            <Link
                                target='_blank'
                                rel='noreferrer'
                                to='https://documenter.getpostman.com/view/20256803/2s93sW9Fnz'
                                className='capitalize text-sm text-start hover:scale-105 hover:translate-x-1.5 hover:font-semibold w-fit pl-1 rounded-sm duration-300'
                            >
                                API
                            </Link>
                            <Link
                                rel='noreferrer'
                                className='flex justify-start items-center gap-1 pl-1'
                                to='mailto:www.mahmoudkandel980@gmail.com'
                            >
                                <span className='w-5 flex justify-start'>
                                    <IoMailSharp className='text-lighertBlue' />
                                </span>
                                <span className='text-sm'>
                                    mahmoudkandel980
                                </span>
                            </Link>
                            <Link
                                rel='noreferrer'
                                className='flex justify-start items-center gap-1 pl-1'
                                to='tel:+201122442622'
                            >
                                <span className='w-5 flex justify-start'>
                                    <BsFillTelephoneFill className='text-success' />
                                </span>
                                <span className='text-sm'>+20 0000000000</span>
                            </Link>
                            <Link
                                className='flex justify-start items-start gap-1 pl-1'
                                to='https://www.google.com/maps/search/21+Talaat+Harb+Street.,+Branched+from+Abbas+++++++++++++++++++++++++++++++++++++Kamel,+Cairo/@30.0486149,31.2416249,17z/data=!3m1!4b1'
                                target='_blank'
                                rel='noreferrer'
                            >
                                <span className='w-5 flex justify-start'>
                                    <ImLocation className=' text-darkRed' />
                                </span>
                                <span className='text-sm text-start'>
                                    21 Talaat Harb Street., Branched from Abbas
                                    Kamel, Cairo
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='mt-10 border-t-[1px] border-lightDark py-3 flex flex-col items-center gap-3'>
                    <p className='text-xs opacity-70 w-[95%] sm:w-[90%] text-center'>
                        Copyright &copy; 2023 by Mahmoud Kandel. Please do not
                        attribute this work to yourself or an any organization.
                    </p>
                    <div className='flex justify-center items-center gap-5'>
                        {socialLinks.map((link, i) => (
                            <SocialLink
                                key={i}
                                href={link.href}
                                icon={link.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
