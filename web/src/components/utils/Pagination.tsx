import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";

import PaginationButtons from "./PaginationButtons";

import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { PaginationInterface } from "../../interfaces/components/public";

const Pagination = (props: PaginationInterface): JSX.Element => {
    const { total_pages = 1 } = props;
    const location = useLocation();
    const page = new URLSearchParams(location.search).get("page") || 1;

    const currentPage = Number(page);
    const pathName = location.pathname;

    const paginationNumbers = [
        currentPage === 1 ? null : currentPage - 1,
        currentPage,
        currentPage + 1,
    ];

    return (
        <>
            <div className='flex w-full items-center justify-center text-lg font-mono mt-10'>
                <div className='flex justify-between items-center my-10 mb-0 w-56 '>
                    {currentPage > 1 && (
                        // Prev
                        <PaginationButtons
                            icon={
                                <MdOutlineKeyboardArrowLeft className='h-7 w-7' />
                            }
                            target={"prev"}
                            page={+page}
                            pathName={pathName}
                        />
                    )}

                    {/* Pages */}
                    {paginationNumbers.map((page) => (
                        <div
                            className={`w-10 sm:w-12 cursor-pointer`}
                            key={page}
                        >
                            {page !== null && page <= total_pages && (
                                <Link to={`${pathName}?page=${page}`}>
                                    <p className='h-10 sm:h-12 flex justify-center items-center select-none'>
                                        <span
                                            className={`m-0 flex items-center justify-center w-full h-full rounded-md text-lg sm:text-2xl shadow-2xl scale-75 border-[1px] text-white ${
                                                currentPage === page
                                                    ? "bg-smothDark dark:bg-dark/50 border-success/40 hover:border-success/50 hover:bg-smothDark/90 dark:hover:bg-dark/80"
                                                    : "text-opacity-70 bg-smothDark/75 dark:bg-darkBody/50 border-transparent hover:bg-smothDark/60 dark:hover:bg-dark/30"
                                            }  dark:hover:text-white duration-300`}
                                        >
                                            {page}
                                        </span>
                                    </p>
                                </Link>
                            )}
                        </div>
                    ))}
                    {currentPage !== total_pages && (
                        // Next
                        <PaginationButtons
                            icon={
                                <MdOutlineKeyboardArrowRight className='h-7 w-7' />
                            }
                            target={"next"}
                            page={+page}
                            pathName={pathName}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default memo(Pagination);
