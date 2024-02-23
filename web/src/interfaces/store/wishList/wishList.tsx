import { ProductStateInterface } from "../product/productInterface";

export interface WishListInterface {
    wishList: {
        loading?: boolean;
        wishListItems?: ProductStateInterface[];
        wishListItemsIds?: string[];
        error?: string;
    };
}

export interface AddProductToWishListInterface {
    addProductToWishList: {
        loading?: boolean;
        wishListItems?: ProductStateInterface[];
        productId?: string;
        error?: string;
    };
}

export interface DeleteProductFromWishListInterface {
    deleteProductFromWishList: {
        loading?: boolean;
        message?: string;
        productId?: string;
        error?: string;
    };
}

// REDUCERS
export interface WishListReducerInterface {
    loading?: boolean;
    wishListItems?: ProductStateInterface[];
    wishListItemsIds?: string[];
    error?: string;
}

export interface AddProductToWishListReducerInterface {
    loading?: boolean;
    wishListItems?: ProductStateInterface[];
    productId?: string;
    error?: string;
}

export interface DeleteProductFromWishListReducerInterface {
    loading?: boolean;
    message?: string;
    productId?: string;
    error?: string;
}
