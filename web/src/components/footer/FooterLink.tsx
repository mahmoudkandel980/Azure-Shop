import React from "react";
import { Link } from "react-router-dom";

import { FooterLinkInterface } from "../../interfaces/components/layout";

const FooterLink = (props: FooterLinkInterface): JSX.Element => {
    const { children, href } = props;

    return (
        <Link
            rel='noreferrer'
            to={href}
            className='capitalize text-sm text-start hover:scale-105 hover:translate-x-1.5 hover:font-semibold w-fit pl-1 rounded-sm duration-300'
        >
            {children}
        </Link>
    );
};

export default FooterLink;
