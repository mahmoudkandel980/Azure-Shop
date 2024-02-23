import React from "react";

import { NotificationDotInterface } from "../../interfaces/components/public";

const NotificationDot = (props: NotificationDotInterface): JSX.Element => {
    const { className, children } = props;
    return (
        // eslint-disable-next-line eqeqeq
        children != 0 ? (
            <span
                className={`${className} bg-darkRed text-white rounded-full w-5 h-5 absolute text-[10px] flex justify-center items-center border-[2px]`}
            >
                {children}
            </span>
        ) : (
            <></>
        )
    );
};

export default NotificationDot;
