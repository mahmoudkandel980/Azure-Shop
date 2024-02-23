import { ProductStateInterface } from "./products";

export interface CartItem {
    product: ProductStateInterface;
    qty: number;
}

export interface SingleShippingRowProps {
    title: string;
    children: string | string[];
}

export interface SinglePriceProps {
    title: string;
    price: number;
    hideBorder?: boolean;
}
