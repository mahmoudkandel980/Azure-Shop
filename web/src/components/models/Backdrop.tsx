import React from "react";
import ReactDOM from "react-dom";

import { BackdropInterface } from "../../interfaces/components/models";

const Backdrop = (props: BackdropInterface): JSX.Element => {
    const { hideBackgroundColor } = props;

    return ReactDOM.createPortal(
        <div
            className={`${
                !hideBackgroundColor && "bg-dark/20 dark:bg-black/50 "
            } backdrop fixed top-0 left-0 w-screen h-screen z-10`}
            onClick={props.onClose}
        ></div>,
        document.getElementById("backdrop-hook") as HTMLDivElement
    );
};

export default Backdrop;
