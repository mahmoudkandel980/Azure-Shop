import React from "react";

import { MessageInterface } from "../../interfaces/components/public";

const Message = (props: MessageInterface): JSX.Element => {
    const { type, className } = props;
    return (
        <div
            className={`${
                className && className.includes("top") ? className : "top-[50%]"
            } absolute left-[50%] -translate-x-[50%] w-full  flex justify-center items-center`}
        >
            <div
                className={`${
                    type === "error" ? "text-darkRed" : ""
                } text-xs sm:text-sm rounded-md text-center w-full p-5 py-0.5 `}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Message;
