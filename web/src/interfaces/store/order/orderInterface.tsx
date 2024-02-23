import { UserInfo } from "../user/userInterface";
import { ProductStateInterface } from "../product/productInterface";
import { ShippingDataInterface } from "../../components/checkout";

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

export interface MyOrder {
    _id: string;
    id: string;
    creator: string;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
}

export interface CreateOrderInterface {
    createOrder: {
        loading?: boolean;
        error?: string;
        order?: Order;
    };
}

export interface AllOrdersInterface {
    dashboard_allOrders: {
        loading?: boolean;
        error?: string;
        orders?: Order[]; //
        ITEMS_PER_PAGE?: number;
        total_pages?: number;
    };
}

export interface SessionInterface {
    createCheckoutSession: {
        loading?: boolean;
        error?: string;
        session?: any;
    };
}

export interface OrderByOrderIdInterface {
    getOrderByOrderId: {
        loading?: boolean;
        error?: string;
        order?: Order;
    };
}

export interface OrderIsDeliveredInterface {
    updateOrderToDelivered: {
        loading?: boolean;
        error?: string;
        order?: Order;
    };
}

export interface MyOrdersInterface {
    getMyOrders: {
        loading?: boolean;
        error?: string;
        orders?: MyOrder[];
        ITEMS_PER_PAGE?: number;
        total_pages?: number;
    };
}

// REDUCERS
export interface CreateOrderReducerInterface {
    loading?: boolean;
    error?: string;
    order?: Order;
}

export interface AllOrdersReducerInterface {
    loading?: boolean;
    error?: string;
    orders?: Order[]; //
    ITEMS_PER_PAGE?: number;
    total_pages?: number;
}

export interface SessionReducerInterface {
    loading?: boolean;
    error?: string;
    session?: any;
}

export interface OrderByOrderIdReducerInterface {
    loading?: boolean;
    error?: string;
    order?: Order | {};
}

export interface OrderIsDeliveredReducerInterface {
    loading?: boolean;
    error?: string;
    order?: Order | {};
}

export interface OrderIsPaidReducerInterface {
    loading?: boolean;
    error?: string;
    order?: Order | {};
}

export interface MyOrdersReducerInterface {
    loading?: boolean;
    error?: string;
    orders?: MyOrder[];
    ITEMS_PER_PAGE?: number;
    total_pages?: number;
}
