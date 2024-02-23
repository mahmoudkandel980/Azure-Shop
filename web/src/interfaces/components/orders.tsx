import { Order, MyOrder } from "../store/order/orderInterface";

export interface OrdersTabelBodyInterface {
    orders: Order[] | MyOrder[];
    page: number;
    ITEMS_PER_PAGE: number;
}
