import {
    CREATE_ORDER_REQUSET,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    GET_MY_ORDERS_REQUSET,
    GET_MY_ORDERS_SUCCESS,
    GET_MY_ORDERS_FAIL,
    GET_ORDER_BY_ORDER_ID_REQUSET,
    GET_ORDER_BY_ORDER_ID_SUCCESS,
    GET_ORDER_BY_ORDER_ID_FAIL,
    CREATE_CHECKOUT_SESSION_REQUSET,
    CREATE_CHECKOUT_SESSION_SUCCESS,
    CREATE_CHECKOUT_SESSION_FAIL,
    UPDATE_ORDER_TO_PAID_REQUSET,
    UPDATE_ORDER_TO_PAID_SUCCESS,
    UPDATE_ORDER_TO_PAID_FAIL,
    UPDATE_ORDER_TO_DELIVERED_REQUSET,
    UPDATE_ORDER_TO_DELIVERED_SUCCESS,
    UPDATE_ORDER_TO_DELIVERED_FAIL,
} from "../constants/orderConstants";

import { AnyAction } from "redux";
import {
    CreateOrderReducerInterface,
    OrderIsPaidReducerInterface,
    SessionReducerInterface,
    OrderByOrderIdReducerInterface,
    OrderIsDeliveredReducerInterface,
    MyOrdersReducerInterface,
} from "../../interfaces/store/order/orderInterface";

export const createOrderReducer = (
    state = { loading: false },
    action: AnyAction
): CreateOrderReducerInterface => {
    switch (action.type) {
        case CREATE_ORDER_REQUSET:
            return { loading: true };
        case CREATE_ORDER_SUCCESS:
            return { loading: false, order: action.payload.order };
        case CREATE_ORDER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getMyOrdersReducer = (
    state = { orders: [] },
    action: AnyAction
): MyOrdersReducerInterface => {
    switch (action.type) {
        case GET_MY_ORDERS_REQUSET:
            return { loading: true };
        case GET_MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                ITEMS_PER_PAGE: action.payload.ITEMS_PER_PAGE,
                total_pages: action.payload.total_pages || 1,
            };
        case GET_MY_ORDERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getOrderByOrderIdReducer = (
    state = { order: {} },
    action: AnyAction
): OrderByOrderIdReducerInterface => {
    switch (action.type) {
        case GET_ORDER_BY_ORDER_ID_REQUSET:
            return { loading: true };
        case GET_ORDER_BY_ORDER_ID_SUCCESS:
            return { loading: false, order: action.payload.order };
        case GET_ORDER_BY_ORDER_ID_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const createCheckoutSessionReducer = (
    state = { session: {} },
    action: AnyAction
): SessionReducerInterface => {
    switch (action.type) {
        case CREATE_CHECKOUT_SESSION_REQUSET:
            return { loading: true };
        case CREATE_CHECKOUT_SESSION_SUCCESS:
            return { loading: false, session: action.payload.session };
        case CREATE_CHECKOUT_SESSION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateOrderToPaidReducer = (
    state = { order: {} },
    action: AnyAction
): OrderIsPaidReducerInterface => {
    switch (action.type) {
        case UPDATE_ORDER_TO_PAID_REQUSET:
            return { loading: true };
        case UPDATE_ORDER_TO_PAID_SUCCESS:
            return { loading: false, order: action.payload.order };
        case UPDATE_ORDER_TO_PAID_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateOrderToDeliveredReducer = (
    state = { order: {} },
    action: AnyAction
): OrderIsDeliveredReducerInterface => {
    switch (action.type) {
        case UPDATE_ORDER_TO_DELIVERED_REQUSET:
            return { loading: true };
        case UPDATE_ORDER_TO_DELIVERED_SUCCESS:
            return { loading: false, order: action.payload.order };
        case UPDATE_ORDER_TO_DELIVERED_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
