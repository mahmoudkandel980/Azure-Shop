import React from "react";
import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

const PageNotFound = (): JSX.Element => {
    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate(-1);
    };

    return (
        <div className='flex-1 container mx-auto flex flex-col'>
            <div
                className='ml-2 sm:ml-0 resister-button cursor-pointer w-fit flex justify-start items-center gap-0.5 p-6 rounded-md py-1'
                onClick={goBackHandler}
            >
                <IoIosArrowBack />
                <span>Back</span>
            </div>
            <div className='flex justify-center items-center flex-1 py-16'>
                <span className='text-darkRed font-semibold tracking-widest'>
                    404 | Page Not Found.
                </span>
            </div>
        </div>
    );
};

export default PageNotFound;
