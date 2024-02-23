import { ProductStateInterface } from "./products";
import { UserInfo } from "./regester";

export interface ShippingDataInterface {
    address: string;
    city: string;
    country: string;
    phone: string;
    postalCode: string;
}

export interface DeliverButtonProps {
    buttonSize: "big" | "small";
    orderId: string;
}

export interface Order {
    id: string;
    _id: string;
    creator: UserInfo; //
    orderItems: {
        name: string;
        qty: number;
        imageUrl: string;
        price: String;
        product: ProductStateInterface; //
    }[];
    shipping: ShippingDataInterface;
    // paymentResult;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt: string;
    isDelivered: boolean;
    deliverAt: string;
    createdAt: string;
    updatedAt: string;
}

interface MyOrder {
    _id: string;
    createdAt: string;
    creator: string;
    id: string;
    isDelivered: boolean;
    isPaid: boolean;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}

export interface MyOrders {
    orders: MyOrder[];
    ITEMS_PER_PAGE: number;
    total_pages: number;
}

export interface SingleTextLineProps {
    title: string;
    content: string | number | string[];
    color?: string;
    small?: boolean;
    notCapitalize?: boolean;
}

export interface Orders {
    orders: Order[];
    ITEMS_PER_PAGE: number;
    total_pages: number;
}

export interface OrderTabelBodyProps {
    orders: Order[] | MyOrder[];
    ITEMS_PER_PAGE: number;
    total_pages: number;
}
