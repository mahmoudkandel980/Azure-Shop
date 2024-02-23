import { Order, MyOrder } from "../store/order/orderInterface";

export interface OrderIdInterface {
    orderId: string;
}

export interface OrderInterface {
    order: Order;
}

export interface DeliveredButtonInterface {
    orderId: string;
    order: Order | MyOrder;
    editOrder: (order: Order | MyOrder | null) => void;
}
