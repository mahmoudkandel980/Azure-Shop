import React from "react";
import { useLocation } from "react-router-dom";

import { UsersHeaderInterface } from "../../../../interfaces/components/dashboard";

const UsersTabelHeader = (props: UsersHeaderInterface): JSX.Element => {
    const { loadingUserData, userInfo } = props;
    const { pathname } = useLocation();

    return (
        <thead className='border-b-[1px] dark:border-darkGray'>
            <tr className='text-[10px] font-semibold sm:font-normal sm:text-base'>
                <td className='capitalize pb-3 pl-1 sm:pl-3 border-r-[1px] dark:border-darkGray'>
                    no
                </td>
                <td className='capitalize pb-3 hidden lg:table-cell pl-1 sm:pl-3'>
                    id
                </td>
                <td className='capitalize pb-3 hidden lg:table-cell'>
                    created at
                </td>
                <td className='capitalize pb-3 hidden lg:table-cell'>image</td>
                <td className='capitalize pb-3 hidden md:table-cell'>name</td>
                <td className='capitalize pb-3 pl-1 sm:pl-0'>email</td>
                <td className='capitalize pb-3 pl-1 sm:pl-0'>role</td>
                <td className='w-10 sm:w-16 capitalize pb-3'>Status</td>
                {!pathname.includes("notification") && (
                    <td className='capitalize pb-3'>prods</td>
                )}
                <td className='w-7 sm:w-16 capitalize pb-3 hidden sm:table-cell'>
                    {!pathname.includes("notification") ? "edit" : "Accept"}
                </td>
                <td
                    className={`${
                        !loadingUserData &&
                        userInfo &&
                        userInfo.role !== "admin" &&
                        userInfo.role !== "subAdmin" &&
                        "hidden"
                    } w-7 sm:w-16 capitalize pb-3 pr-1 sm:pr-3 hidden sm:table-cell`}
                >
                    {!pathname.includes("notification") ? "delete" : "Reject"}
                </td>
            </tr>
        </thead>
    );
};

export default UsersTabelHeader;
