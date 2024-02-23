import { CartItem } from "../screens/cart";

export interface InitialCartState {
    // cart
    cartLoading: boolean;
    cartData: null | CartItem[];
    cartError: null | any;
    // addProductToCart
    addProductToCartLoading: boolean;
    addProductToCartData: null | CartItem[];
    addProductToCartError: null | any;
    // deleteProductFromCart
    deleteProductFromCartLoading: boolean;
    deleteProductFromCartData: null | string;
    deleteProductFromCartError: null | any;
}

export interface addProductToCartParams extends CartItem {}

export interface deleteProductFromCartParams {
    id: string;
}
