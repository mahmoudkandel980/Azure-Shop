import React from "react";

const OrdersTabelHeader = (): JSX.Element => {
    return (
        <thead className='border-b-[1px] dark:border-darkGray'>
            <tr className='text-[9px] font-semibold sm:font-normal sm:text-base'>
                <td className='capitalize pb-3 pl-1 sm:pl-3 border-r-[1px] dark:border-darkGray'>
                    no
                </td>
                <td className='capitalize pb-3 hidden sm:table-cell  pl-1 sm:pl-3'>
                    id
                </td>
                <td className='capitalize pb-3 hidden lg:table-cell'>
                    created at
                </td>
                <td className='capitalize pb-3 hidden sm:table-cell'>
                    shipping <span className='hidden lg:inline'>price</span>
                </td>
                <td className='capitalize pb-3 hidden sm:table-cell'>
                    tax <span className='hidden lg:inline'>price</span>
                </td>
                <td className='capitalize pb-3'>
                    total <span className='hidden lg:inline'>price</span>
                </td>

                <td className='capitalize pb-3'>paid</td>
                <td className='capitalize pb-3'>delivered</td>
                <td className='capitalize pb-3'>Details</td>
            </tr>
        </thead>
    );
};

export default OrdersTabelHeader;
