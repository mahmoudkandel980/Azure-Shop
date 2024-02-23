import React from "react";

import Button from "../ui/Button";

import { MdOutlineAdd } from "react-icons/md";

import { OnClickInterface } from "../../interfaces/components/public";

const CreateProductButton = (props: OnClickInterface): JSX.Element => {
    const createProductHandler = () => {
        props.onClick();
    };

    return (
        <Button
            onClick={createProductHandler}
            createBtn={true}
            className={`mb-10 ml-auto w-fit hover:scale-105 duration-300 flex justify-center items-center gap-1 text-sm sm:text-base font-bold px-3 sm:px-5`}
        >
            <>
                <MdOutlineAdd /> Create Product
            </>
        </Button>
    );
};

export default CreateProductButton;
