import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getMyOrders as getMyOrdersFun } from "../../store/actions/orderActions";

import OrdersTabelHeader from "./tabel/OrdersTabelHeader";
import OrdersTabelBody from "./tabel/OrdersTabelBody";

import Spinner from "../ui/Spinner";
import Message from "../ui/Message";
import Pagination from "../utils/Pagination";

import {
    MyOrdersInterface,
    AllOrdersInterface,
} from "../../interfaces/store/order/orderInterface";

const OrdersTabel = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();

    const location = useLocation();
    const { pathname } = location;
    const page = new URLSearchParams(location.search).get("page") || 1;

    const { getMyOrders } = useSelector((state) => state as MyOrdersInterface);
    const { loading, orders, error, total_pages, ITEMS_PER_PAGE } = getMyOrders;

    const { dashboard_allOrders } = useSelector(
        (state) => state as AllOrdersInterface
    );
    const {
        loading: allOrdersLoading,
        orders: allOrdersOrders,
        error: allOrdersError,
        total_pages: allOrdersTotal_pages,
        ITEMS_PER_PAGE: allOrders_ITEMS_PER_PAGE,
    } = dashboard_allOrders;

    useEffect(() => {
        if (pathname !== "/dashboard/orders") {
            dispatch(getMyOrdersFun(+page));
        }
    }, [dispatch, pathname, page]);

    return (
        <div className='flex flex-col'>
            {pathname !== "/dashboard/orders" && (
                <h3 className='capitalize text-lg font-bold pb-10'>orders</h3>
            )}
            {pathname !== "/dashboard/orders" ? (
                <div className='px-0.5 sm:px-5'>
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <Message type='error'>{error}</Message>
                    ) : orders?.length === 0 ? (
                        <Message type='error'>
                            You have not any orders yet
                        </Message>
                    ) : (
                        <>
                            <table className='w-full border-l-[1px] border-r-[1px] dark:border-darkGray'>
                                <OrdersTabelHeader />
                                <OrdersTabelBody
                                    orders={orders!}
                                    page={+page!}
                                    ITEMS_PER_PAGE={ITEMS_PER_PAGE!}
                                />
                            </table>
                            <Pagination total_pages={total_pages} />
                        </>
                    )}
                </div>
            ) : (
                <div>
                    {allOrdersLoading ? (
                        <Spinner />
                    ) : allOrdersError ? (
                        <Message type='error'>{allOrdersError}</Message>
                    ) : allOrdersOrders?.length === 0 ? (
                        <Message type='error'>There are no orders yet</Message>
                    ) : (
                        <>
                            <table className='w-full border-l-[1px] border-r-[1px] dark:border-darkGray'>
                                <OrdersTabelHeader />
                                <OrdersTabelBody
                                    orders={allOrdersOrders!}
                                    page={+page!}
                                    ITEMS_PER_PAGE={allOrders_ITEMS_PER_PAGE!}
                                />
                            </table>
                            <Pagination total_pages={allOrdersTotal_pages} />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrdersTabel;
