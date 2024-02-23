import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import {
    getOrderByOrderId as getOrderByOrderIdFun,
    updateOrderToPaid,
} from "../store/actions/orderActions";

import OrderShipping from "../components/order/OrderShipping";

import PayButton from "../components/order/PayButton";
import DeliverButton from "../components/order/DeliverButton";

import SingleProductOfOrder from "../components/utils/SingleProductOfOrder";
import PriceSummary from "../components/utils/PriceSummary";

import Spinner from "../components/ui/Spinner";
import Message from "../components/ui/Message";

import { LoginInterface } from "../interfaces/store/user/authInterface";
import { OrderByOrderIdInterface } from "../interfaces/store/order/orderInterface";

const Order = () => {
    const { orderId, process } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const { getOrderByOrderId } = useSelector(
        (state) => state as OrderByOrderIdInterface
    );
    const { order, loading, error } = getOrderByOrderId;

    // get order data by it's id
    useEffect(() => {
        dispatch(getOrderByOrderIdFun(orderId!));
    }, [dispatch, orderId]);

    useEffect(() => {
        if (process === "succussed") {
            dispatch(updateOrderToPaid(orderId!, process));
        }
    }, [process, dispatch, orderId]);

    return (
        <div className='flex-1 container mx-auto relative'>
            <div className='flex flex-col'>
                <h3 className='capitalize text-lg font-bold pb-10'>
                    order {order && order.id && order.id}
                </h3>
                <div className='px-0.5 sm:px-5'>
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <Message type='error'>{error}</Message>
                    ) : !userInfo || !order || !order.id ? (
                        <Message type='error'>Order Not Found</Message>
                    ) : (
                        <section className='flex-col lg:flex-row flex justify-start items-center sm:items-start gap-10 select-none px-1 sm:px-0'>
                            <div className='w-full flex flex-col gap-16'>
                                <OrderShipping order={order} />
                                <div className='flex flex-col flex-1 gap-2 w-full'>
                                    <h4 className='capitalize font-semibold break-words tracking-wide pb-2'>
                                        order items
                                    </h4>
                                    {order.orderItems &&
                                        order.orderItems.map((item, index) => (
                                            <SingleProductOfOrder
                                                key={index}
                                                product={item.product!}
                                                cartItems={order.orderItems!}
                                                qty={item.qty}
                                                index={index}
                                            />
                                        ))}
                                </div>
                            </div>

                            <PriceSummary
                                itemsPrice={
                                    order.totalPrice -
                                    (order.shippingPrice + order.taxPrice)
                                }
                                shippingPrice={order.shippingPrice}
                                taxPrice={order.taxPrice}
                                totalPrice={order.totalPrice}
                                isPaid={order.isPaid}
                                isDelivered={order.isDelivered}
                            >
                                <div
                                    className={`${
                                        order.isPaid &&
                                        order.isDelivered &&
                                        "hidden"
                                    } ${
                                        !order.isPaid &&
                                        order.creator &&
                                        userInfo.id !== order.creator.id &&
                                        "hidden"
                                    } flex flex-col justify-start items-center gap-2 w-full`}
                                >
                                    {!order.isPaid &&
                                        userInfo &&
                                        userInfo.id &&
                                        order.creator &&
                                        order.creator.id &&
                                        userInfo.id === order.creator.id && (
                                            <PayButton orderId={orderId!} />
                                        )}

                                    {!order.isDelivered &&
                                        order.isPaid &&
                                        (userInfo.role === "admin" ||
                                            userInfo.role === "subAdmin" ||
                                            userInfo.role === "moderator") && (
                                            <DeliverButton
                                                orderId={orderId!}
                                                order={order}
                                                editOrder={() => {}}
                                            />
                                        )}
                                </div>
                            </PriceSummary>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Order;
