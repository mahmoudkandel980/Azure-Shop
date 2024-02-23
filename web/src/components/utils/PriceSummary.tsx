import React from "react";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import DollarSymbol from "../ui/DollarSymbol";

import { PriceSummaryInterface } from "../../interfaces/components/public";
import { LoginInterface } from "../../interfaces/store/user/authInterface";
import { OrderByOrderIdInterface } from "../../interfaces/store/order/orderInterface";

const PriceSummary = (props: PriceSummaryInterface): JSX.Element => {
    const {
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        children,
        isPaid,
        isDelivered,
    } = props;

    const { pathname } = useLocation();

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const { getOrderByOrderId } = useSelector(
        (state) => state as OrderByOrderIdInterface
    );
    const { order } = getOrderByOrderId;

    return (
        <div className='self-center w-[90%] sm:w-[50%] lg:w-[45%] xl:w-[35%] 2xl:w-[25%] rounded-sm flex flex-col justify-center items-center gap-3 border-[1px] border-lightDark/20 dark:border-lightDark pt-5'>
            <h3 className='text-lg font-semibold capitalize mb-5'>
                price summary
            </h3>
            <div
                className={`${
                    pathname === "/checkout/order"
                        ? "border-b-[1px]"
                        : ((!isPaid && userInfo.id !== order?.creator.id) ||
                              (!isDelivered &&
                                  order?.creator.role !== "user" &&
                                  order?.creator.role !== "seller")) &&
                          "border-b-[1px]"
                } text-xs sm:text-base flex flex-col justify-center items-start gap-3 w-full px-3 pb-3 border-lightDark/20 dark:border-lightDark`}
            >
                <table className='w-full'>
                    <tbody className='font-light capitalize w-full'>
                        <tr className='border-b-[1px] border-lightDark/20 dark:border-lightDark'>
                            <td className='py-2'>items price</td>
                            <td>
                                <DollarSymbol />
                                {itemsPrice}
                            </td>
                        </tr>
                        <tr className='border-b-[1px] border-lightDark/20 dark:border-lightDark '>
                            <td className='py-2'>shipping price</td>
                            <td>
                                <DollarSymbol />
                                {shippingPrice}
                            </td>
                        </tr>
                        <tr className='border-b-[1px] border-lightDark/20 dark:border-lightDark '>
                            <td className='py-2'>tax price</td>
                            <td>
                                <DollarSymbol />
                                {taxPrice}
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2'>total price</td>
                            <td>
                                <DollarSymbol />
                                {totalPrice}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* children */}
            {children}
        </div>
    );
};

export default PriceSummary;
