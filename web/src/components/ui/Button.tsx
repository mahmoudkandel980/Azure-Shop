import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ThemeContext from "../../context/darkModeTheme";

import { ButtonInterface } from "../../interfaces/components/public";

const Button = (props: ButtonInterface): JSX.Element => {
    const {
        className,
        type,
        children,
        to,
        onClick,
        deleteBtn,
        editBtn,
        createBtn,
        style,
        imgBtn,
    } = props;
    const { theme } = useContext(ThemeContext);

    if (type === "link") {
        return (
            <Link
                to={to!}
                className={`${
                    theme === "dark"
                        ? "button-shadow-up-dark"
                        : "button-shadow-up"
                } ${
                    className &&
                    !className.includes("text") &&
                    "text-base sm:text-lg "
                } ${className} relative resister-button hover:scale-105 duration-300 flex justify-center items-center gap-1  text-center `}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`${
                !imgBtn &&
                (theme === "dark"
                    ? "button-shadow-up-dark"
                    : "button-shadow-up")
            } ${
                deleteBtn
                    ? "bg-darkRed hover:border-transparent delete-button"
                    : editBtn
                    ? "bg-lightBlue hover:border-transparent edit-button"
                    : createBtn
                    ? "bg-success hover:border-transparent create-button"
                    : !imgBtn && "resister-button"
            } ${className} ${
                className &&
                !className.includes("text") &&
                "text-base sm:text-lg "
            } capitalize relative hover:scale-105 duration-300 flex justify-center items-center gap-1 font-bold`}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;
