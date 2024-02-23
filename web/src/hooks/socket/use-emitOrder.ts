import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";

// utilities functions
import { findIndex, isExist } from "../../helpers/utilitiesFunForSocketIo";

// consts
import { PRODUCT_DETAILS_SUCCESS } from "../../store/constants/productConstants";
import {
    GET_MY_ORDERS_SUCCESS,
    GET_ORDER_BY_ORDER_ID_SUCCESS,
} from "../../store/constants/orderConstants";
import { DASHBOARD_ALL_ORDERS_SUCCESS } from "../../store/constants/dashboardConstants";

import { ProductDetailsInterface } from "../../interfaces/store/product/productInterface";
import {
    MyOrdersInterface,
    OrderByOrderIdInterface,
    AllOrdersInterface,
} from "../../interfaces/store/order/orderInterface";

const useEmitOrder = (socket: any) => {
    const dispatch = useDispatch<AppDispatch>();

    // productDetails
    const { productDetails: productDetailState } = useSelector(
        (state) => state as ProductDetailsInterface
    );
    const { product: productDetails } = productDetailState;
    // getMyOrders
    const { getMyOrders } = useSelector((state) => state as MyOrdersInterface);
    const {
        orders: myOrders,
        ITEMS_PER_PAGE: myOrdersITEMS_PER_PAGE,
        total_pages: myOrdersTotal_pages,
    } = getMyOrders;
    // getOrderByOrderId
    const { getOrderByOrderId } = useSelector(
        (state) => state as OrderByOrderIdInterface
    );
    const { order: getOrderByOrderIdOrder } = getOrderByOrderId;
    // dashboard_allOrders
    const { dashboard_allOrders } = useSelector(
        (state) => state as AllOrdersInterface
    );
    const {
        orders: allOrders,
        ITEMS_PER_PAGE: allOrdersITEMS_PER_PAGE,
        total_pages: allOrdersTotal_pages,
    } = dashboard_allOrders;

    useEffect(() => {
        const handler = (data: any) => {
            // ----------------------------------
            // WHEN ORDER IS CREATED
            // ----------------------------------
            if (data.action === "create") {
                const order = data.order;
                // dashboard_allOrders
                allOrders?.splice(0, 0, order);
                dispatch({
                    type: DASHBOARD_ALL_ORDERS_SUCCESS,
                    payload: {
                        orders: allOrders,
                        ITEMS_PER_PAGE: allOrdersITEMS_PER_PAGE,
                        total_pages: allOrdersTotal_pages,
                    },
                });
            }

            // ----------------------------------
            // WHEN ORDER IS PAID
            // ----------------------------------
            if (data.action === "paid") {
                const product = data.data.product;
                // productDetails
                const isCurrentProductDetailsIsProductEdited = isExist(
                    productDetails,
                    product.id
                );
                if (isCurrentProductDetailsIsProductEdited) {
                    dispatch({
                        type: PRODUCT_DETAILS_SUCCESS,
                        payload: { ...product },
                    });
                }
            }

            // ----------------------------------
            // WHEN ORDER IS DELIVERD
            // ----------------------------------
            if (data.action === "paid" || data.action === "delivered") {
                let order;
                if (data.action === "paid") {
                    order = data.data.order;
                } else {
                    order = data.order;
                }
                // getMyOrders
                const indexOfOrderInMyOrders =
                    myOrders && myOrders.length > 0
                        ? findIndex(myOrders, order.id)
                        : -1;
                if (indexOfOrderInMyOrders !== -1) {
                    myOrders![indexOfOrderInMyOrders] = order;
                    dispatch({
                        type: GET_MY_ORDERS_SUCCESS,
                        payload: {
                            orders: myOrders,
                            ITEMS_PER_PAGE: myOrdersITEMS_PER_PAGE,
                            total_pages: myOrdersTotal_pages,
                        },
                    });
                }
                // getOrderByOrderId
                if (
                    getOrderByOrderIdOrder &&
                    getOrderByOrderIdOrder.id &&
                    getOrderByOrderIdOrder.id === order.id
                ) {
                    dispatch({
                        type: GET_ORDER_BY_ORDER_ID_SUCCESS,
                        payload: { order: order },
                    });
                }
                // dashboard_allOrders
                const indexOfOrderInAllOrders =
                    allOrders && allOrders.length > 0
                        ? findIndex(allOrders, order.id)
                        : -1;
                if (indexOfOrderInAllOrders !== -1) {
                    allOrders![indexOfOrderInAllOrders] = order;
                    dispatch({
                        type: DASHBOARD_ALL_ORDERS_SUCCESS,
                        payload: {
                            orders: allOrders,
                            ITEMS_PER_PAGE: allOrdersITEMS_PER_PAGE,
                            total_pages: allOrdersTotal_pages,
                        },
                    });
                }
            }
        };

        socket.on("order", handler);
        return () => socket.off("order", handler);
    }, [
        socket,
        dispatch,
        productDetails,
        myOrders,
        myOrdersITEMS_PER_PAGE,
        myOrdersTotal_pages,
        getOrderByOrderIdOrder,
        allOrders,
        allOrdersITEMS_PER_PAGE,
        allOrdersTotal_pages,
    ]);
};

export default useEmitOrder;
