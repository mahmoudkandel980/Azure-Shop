import React from "react";
import { Link } from "react-router-dom";

import { FooterLinkInterface } from "../../interfaces/components/layout";

const SocialLink = (props: FooterLinkInterface): JSX.Element => {
    const { href, icon } = props;
    return (
        <Link rel='noreferrer' target='_blank' to={href}>
            {icon}
        </Link>
    );
};

export default SocialLink;
