import { Order, MyOrders } from "../screens/order";

export enum CheckoutProcess {
    succussed = "succussed",
    failed = "failed",
}

export interface InitialOrderState {
    // create order
    createOrderLoading: boolean;
    createOrderData: null | Order;
    createOrderError: null | any;
    // my orders
    myOrdersLoading: boolean;
    myOrdersData: null | MyOrders;
    myOrdersError: null | any;
    // order by order id
    orderByOrderIdLoading: boolean;
    orderByOrderIdData: null | Order;
    orderByOrderIdError: null | any;
    // create checkout sesstion
    createCheckoutSessionLoading: boolean;
    createCheckoutSessionData: null | any;
    createCheckoutSessionError: null | any;
    // update order to paid
    updateOrderToPaidLoading: boolean;
    updateOrderToPaidData: null | Order;
    updateOrderToPaidError: null | any;
    // update order to delivered
    updateOrderToDeliveredLoading: boolean;
    updateOrderToDeliveredData: null | Order;
    updateOrderToDeliveredError: null | any;
}

export interface MyordersParams {
    page: number;
}

export interface OrderByOrderIdParams {
    id: string;
}

export interface CreateCheckoutSessionParams {
    id: string;
}

export interface UpdateOrderToPaidParams {
    id: string;
    process: CheckoutProcess;
}

export interface UpdateOrderToDeliveredParams {
    id: string;
}
