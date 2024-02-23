import React from "react";
import { Link } from "react-router-dom";

import NavList from "./NavList";

const Nav = () => {
    return (
        <nav className='flex items-center justify-between px-3 sm:px-16 h-full w-full'>
            <Link
                className='text-sm sm:text-xl lg:text-2xl font-light'
                to={"/"}
            >
                <img
                    loading='lazy'
                    className=' object-cover h-8 sm:h-10 invert-[100%] dark:invert-0'
                    src={`/images/headerLogo_darkMode.png`}
                    alt={`logo_image`}
                />
            </Link>

            <div className='flex items-center'>
                <NavList />
            </div>
        </nav>
    );
};

export default Nav;
