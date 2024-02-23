import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import Button from "../../ui/Button";
import DollarSymbol from "../../ui/DollarSymbol";

import DeliverButton from "../../order/DeliverButton";

import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import CreatedAt from "../../utils/CreatedAt";

import { OrdersTabelBodyInterface } from "../../../interfaces/components/orders";
import { Order, MyOrder } from "../../../interfaces/store/order/orderInterface";
import { LoginInterface } from "../../../interfaces/store/user/authInterface";

const OrdersTabelBody = (props: OrdersTabelBodyInterface): JSX.Element => {
    const { orders, page, ITEMS_PER_PAGE } = props;
    const [orderWantToEdit, setOrderWantToEdit] = useState("");

    const { pathname } = useLocation();

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const editOrderHandler = (order: Order | MyOrder | null) => {
        setOrderWantToEdit(order && order.id ? order.id : "");
    };

    return (
        <tbody className='font-light text-sm'>
            {orders.map((order, i) => (
                <tr
                    key={i}
                    className={`${
                        orderWantToEdit === order.id
                            ? "bg-lightBlue/20"
                            : order.creator &&
                              typeof order.creator === "object" &&
                              order.creator.id &&
                              pathname === "/dashboard/orders" &&
                              userInfo.id === order.creator.id &&
                              "bg-whiteElphent dark:bg-dark/30"
                    } border-b-[1px] dark:border-darkGray hover:bg-whiteMilk dark:hover:bg-dark/50`}
                >
                    <td className='capitalize py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] dark:border-darkGray'>
                        {i + 1 + ITEMS_PER_PAGE * (page - 1)}
                    </td>
                    <td className='capitalize pl-1 sm:pl-3 text-sm hidden sm:table-cell'>
                        {order.id.length > 15
                            ? order.id.slice(0, 15) + "..."
                            : order.id}
                    </td>

                    <td className='capitalize hidden lg:table-cell'>
                        <CreatedAt createdAt={order.createdAt!} />
                    </td>

                    <td className='text-[10px] sm:text-sm hidden sm:table-cell'>
                        <DollarSymbol />
                        {order.shippingPrice}
                    </td>

                    <td className='text-[10px] sm:text-sm hidden sm:table-cell'>
                        <DollarSymbol />
                        {order.taxPrice}
                    </td>
                    <td className='text-[10px] sm:text-sm'>
                        <DollarSymbol />
                        {order.totalPrice}
                    </td>
                    <td
                        className={`${
                            order.isPaid ? "text-success" : "text-darkRed"
                        }`}
                    >
                        {order.isPaid ? <AiOutlineCheck /> : <RxCross2 />}
                    </td>
                    <td
                        className={`${
                            order.isDelivered ? "text-success" : "text-darkRed"
                        }`}
                    >
                        {order.isDelivered ? <AiOutlineCheck /> : <RxCross2 />}
                    </td>
                    <td>
                        <Button
                            to={`/order/${order.id}`}
                            type='link'
                            className='w-fit py-0 pt-0.5 text-[10px] sm:text-sm'
                        >
                            Details
                        </Button>
                    </td>
                    {pathname === "/dashboard/orders" &&
                    !order.isDelivered &&
                    order.isPaid ? (
                        <td className='capitalize w-14 sm:w-20 md:w-24'>
                            <DeliverButton
                                orderId={order.id}
                                order={order}
                                editOrder={editOrderHandler}
                            />
                        </td>
                    ) : (
                        <td />
                    )}
                </tr>
            ))}
        </tbody>
    );
};

export default OrdersTabelBody;
