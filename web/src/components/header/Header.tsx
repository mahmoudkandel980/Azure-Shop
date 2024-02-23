import React from "react";
import { useLocation } from "react-router-dom";

import Nav from "./nav/Nav";

const Header = () => {
    const location = useLocation();

    return (
        <header
            className={`w-full py-2 h-14 bg-grayWhite dark:bg-dark border-b-[1px] border-lightDark/20 shadow-md ${
                location.pathname !== "/" && "mb-8"
            }`}
        >
            <Nav />
        </header>
    );
};

export default Header;
