import { ProductStateInterface } from "../product/productInterface";

export interface CartItems {
    product: ProductStateInterface; //
    qty: number;
}

export interface CartStateInterface {
    cart: {
        loading?: boolean;
        error?: string;
        cartItems: CartItems[];
    };
}

export interface AddToCartInterface {
    addProductToCard: {
        loading?: boolean;
        productId: string;
        cartItems: {
            product: ProductStateInterface; //
            qty: number;
        }[];
        error?: string;
    };
}

export interface DeleteFromCartInterface {
    deleteProductFromCard: {
        loading?: boolean;
        productId: string;
        message?: string;
        error?: string;
    };
}

// REDUCERS
export interface CartReducerInterface {
    loading?: boolean;
    error?: string;
    cartItems?: CartItems[] | [];
}

export interface AddToCartReducerInterface {
    loading?: boolean;
    productId?: string;
    cartItems?:
        | {
              product: ProductStateInterface; //
              qty: number;
          }[]
        | [];
    error?: string;
}

export interface DeleteFromCartReducerInterface {
    loading?: boolean;
    productId?: string;
    message?: string;
    error?: string;
}
