import React from "react";
import { Link } from "react-router-dom";

import { PaginationButtonsInterface } from "../../interfaces/components/public";

const PaginationButtons = (props: PaginationButtonsInterface): JSX.Element => {
    const { icon, target, page, pathName } = props;

    const currentPage = Number(page) || 1;

    return (
        <div className='text-smothDark dark:text-white flex flex-col items-center top-3 text-xl h-12 w-12 relative group cursor-pointer'>
            <Link
                to={`${pathName}?page=${
                    target.toLocaleLowerCase() === "next"
                        ? currentPage + 1
                        : currentPage - 1
                }`}
            >
                <p className='group-hover:text-smothDark/80 dark:group-hover:text-white/90 inline select-none duration-150'>
                    {icon}
                    <span className='absolute capitalize opacity-0 top-3 group-hover:translate-y-6 group-hover:opacity-100 duration-300'>
                        {target}
                    </span>
                </p>
            </Link>
        </div>
    );
};

export default PaginationButtons;
