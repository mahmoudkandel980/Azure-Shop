import {
    ADD_PRODUCT_TO_WISHLIST_REQUSET,
    ADD_PRODUCT_TO_WISHLIST_SUCCESS,
    ADD_PRODUCT_TO_WISHLIST_FAIL,
    RESET_WISHLIST,
    DELETE_PRODUCT_TO_WISHLIST_REQUSET,
    DELETE_PRODUCT_TO_WISHLIST_SUCCESS,
    DELETE_PRODUCT_TO_WISHLIST_FAIL,
    GET_ALL_PRODUCTS_IN_WISHLIST_REQUSET,
    GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
    GET_ALL_PRODUCTS_IN_WISHLIST_FAIL,
} from "../constants/wishListConstants";

import { AnyAction } from "redux";
import { ProductStateInterface } from "../../interfaces/store/product/productInterface";
import {
    WishListReducerInterface,
    AddProductToWishListReducerInterface,
    DeleteProductFromWishListReducerInterface,
} from "../../interfaces/store/wishList/wishList";

export const getAllProductsInWishListReducer = (
    state = {},
    action: AnyAction
): WishListReducerInterface => {
    switch (action.type) {
        case GET_ALL_PRODUCTS_IN_WISHLIST_REQUSET:
            return { ...state, loading: true };
        case GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS:
            return {
                loading: false,
                wishListItems: action.payload,
                wishListItemsIds: [
                    ...action.payload.map((p: ProductStateInterface) => p.id),
                ],
            };
        case GET_ALL_PRODUCTS_IN_WISHLIST_FAIL:
            return { loading: false, error: action.payload };
        case RESET_WISHLIST:
            return {};
        default:
            return state;
    }
};
export const addProductToWishListReducer = (
    state = { loading: false },
    action: AnyAction
): AddProductToWishListReducerInterface => {
    switch (action.type) {
        case ADD_PRODUCT_TO_WISHLIST_REQUSET:
            return { ...state, loading: true, productId: action.payload };
        case ADD_PRODUCT_TO_WISHLIST_SUCCESS:
            return { loading: false, wishListItems: action.payload };
        case ADD_PRODUCT_TO_WISHLIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteProductFromWishListReducer = (
    state = { loading: false },
    action: AnyAction
): DeleteProductFromWishListReducerInterface => {
    switch (action.type) {
        case DELETE_PRODUCT_TO_WISHLIST_REQUSET:
            return { ...state, loading: true, productId: action.payload };
        case DELETE_PRODUCT_TO_WISHLIST_SUCCESS:
            return { loading: false, message: action.payload };
        case DELETE_PRODUCT_TO_WISHLIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
