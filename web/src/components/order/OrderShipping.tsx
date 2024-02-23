import React from "react";

import { OrderInterface } from "../../interfaces/components/order";
import imageUrlConverter from "../../helpers/imageUrlConverter";

const OrderShipping = (props: OrderInterface): JSX.Element => {
    const { order } = props;
    return (
        <div className='flex flex-col flex-1 gap-2 w-full border-b-2 border-lightDark/30 dark:border-lightDark pb-10'>
            <h4 className='capitalize font-semibold break-words tracking-wide pb-2'>
                shipping
            </h4>
            {order.shipping && order.shipping.address && (
                <div className='text-sm font-light  tracking-widest'>
                    <div className='flex justify-start gap-2 sm:gap-5 items-center pl-5 mb-5'>
                        <div className=''>
                            <img
                                loading='lazy'
                                className='h-10 sm:h-14 w-10 sm:w-14 rounded-full object-cover'
                                src={imageUrlConverter(
                                    "users",
                                    order.creator.imageUrl!
                                )}
                                alt={order.creator.name}
                            />
                        </div>
                        <div className='text-xs'>
                            <div>
                                <span className='capitalize'>name: </span>
                                <span>{order.creator.name}.</span>
                            </div>
                            <div>
                                <span className='capitalize'>email: </span>
                                <span>{order.creator.email}.</span>
                            </div>
                            <div>
                                <span className='capitalize'>role: </span>
                                <span>{order.creator.role}.</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <span className='capitalize'>address: </span>
                        <span>
                            {order.shipping.address}, {order.shipping.city},{" "}
                            {order.shipping.postalCode},{" "}
                            {order.shipping.country}.
                        </span>
                    </div>
                    <div>
                        <span className='capitalize'>phone: </span>
                        <span>{order.shipping.phone}</span>
                    </div>
                    <div className='mt-2'>
                        <span className='capitalize'>created at: </span>
                        <span>
                            {new Date(order.createdAt).toLocaleString()}.
                        </span>
                    </div>
                    <div>
                        <span className='capitalize'>last update at: </span>
                        <span>
                            {new Date(order.updatedAt).toLocaleString()}.
                        </span>
                    </div>
                    <div className='mt-2 capitalize flex flex-col justify-center items-start'>
                        <div>
                            <span>paid: </span>
                            {order.isPaid ? (
                                <span className='text-success tracking-widest'>
                                    is paid.
                                </span>
                            ) : (
                                <span className='text-darkRed tracking-widest'>
                                    not paid yet.
                                </span>
                            )}
                        </div>
                        <div>
                            {order.paidAt && (
                                <>
                                    <span>paid at: </span>
                                    <span>
                                        {new Date(
                                            order.paidAt
                                        ).toLocaleString()}
                                        .
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='mt-2 capitalize  flex flex-col justify-center items-start'>
                        <div>
                            <span>delivered: </span>
                            {order.isDelivered ? (
                                <span className='text-success tracking-widest'>
                                    is delivered.
                                </span>
                            ) : (
                                <span className='text-darkRed tracking-widest'>
                                    not delivered yet.
                                </span>
                            )}
                        </div>
                        <div>
                            {order.deliverAt && (
                                <>
                                    <span>delivered at: </span>
                                    <span>
                                        {new Date(
                                            order.deliverAt
                                        ).toLocaleString()}
                                        .
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderShipping;
