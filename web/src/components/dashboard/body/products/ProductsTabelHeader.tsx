import React from "react";

import { ProductHeaderInterface } from "../../../../interfaces/components/dashboard";

const ProductsTabelHeader = (props: ProductHeaderInterface): JSX.Element => {
    const { loadingUserData, userInfo } = props;

    return (
        <thead className='border-b-[1px] dark:border-darkGray'>
            <tr className='text-[10px] font-semibold sm:font-normal sm:text-base'>
                <td className='capitalize pb-3 pl-1 sm:pl-3 border-r-[1px] dark:border-darkGray'>
                    no
                </td>
                <td className='capitalize pb-3 hidden xl:table-cell pl-1 sm:pl-3'>
                    id
                </td>
                <td className='capitalize pb-3'>name</td>
                <td className='capitalize pb-3 hidden lg:table-cell'>image</td>
                <td className='capitalize pb-3 hidden md:table-cell'>
                    category
                </td>
                <td className='capitalize pb-3'>price</td>
                <td className='capitalize pb-3 hidden sm:table-cell'>sale</td>
                <td className='capitalize pb-3 w-10 sm:w-16'>no.Rev</td>
                <td className='capitalize pb-3'>Rate</td>
                <td className='capitalize pb-3 hidden lg:table-cell'>
                    creator
                </td>
                <td className='capitalize pb-3 hidden md:table-cell'>role</td>
                <td className='w-10 sm:w-16 capitalize pb-3 hidden md:table-cell'>
                    Status
                </td>
                <td className='w-7 sm:w-16 capitalize pb-3 hidden sm:table-cell'>
                    edit
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
                    delete
                </td>
            </tr>
        </thead>
    );
};

export default ProductsTabelHeader;
