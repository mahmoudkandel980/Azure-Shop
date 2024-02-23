import React from "react";

import classes from "./spinner.module.css";

import { ClassNameInterface } from "../../interfaces/components/public";

const Spinner = (props: ClassNameInterface): JSX.Element => {
    const { className } = props;
    return (
        <div
            className={`${
                className && className.includes("top") ? className : "top-[50%]"
            } absolute top-[50%] left-[50%] -translate-x-[50%] flex justify-center items-center`}
        >
            <div className={classes.multi_ripple}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinner;
