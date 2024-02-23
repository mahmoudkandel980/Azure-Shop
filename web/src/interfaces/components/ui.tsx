import { ProductStateInterface } from "../store/product/productInterface";
import { CartItems } from "../store/cart/cartInterface";

export interface SingleProductOfCartInterface {
    product: ProductStateInterface;
    cartItems: CartItems[];
    qty: number;
    index: number;
}
