import {
    ADD_PRODUCT_TO_CART_REQUSET,
    ADD_PRODUCT_TO_CART_SUCCESS,
    ADD_PRODUCT_TO_CART_FAIL,
    RESET_CART,
    DELETE_PRODUCT_FROM_CART_REQUSET,
    DELETE_PRODUCT_FROM_CART_SUCCESS,
    DELETE_PRODUCT_FROM_CART_FAIL,
    GET_ALLPRODUCTS_IN_CART_REQUSET,
    GET_ALLPRODUCTS_IN_CART_SUCCESS,
    GET_ALLPRODUCTS_IN_CART_FAIL,
} from "../constants/cartConstants";

import { AnyAction } from "redux";
import {
    CartReducerInterface,
    AddToCartReducerInterface,
    DeleteFromCartReducerInterface,
} from "../../interfaces/store/cart/cartInterface";

export const getAllProductsInCartReducer = (
    state = {},
    action: AnyAction
): CartReducerInterface => {
    switch (action.type) {
        case GET_ALLPRODUCTS_IN_CART_REQUSET:
            return { ...state, loading: true };
        case GET_ALLPRODUCTS_IN_CART_SUCCESS:
            return { loading: false, cartItems: action.payload };
        case GET_ALLPRODUCTS_IN_CART_FAIL:
            return { loading: false, error: action.payload };
        case RESET_CART:
            return { cartItems: [] };
        default:
            return state;
    }
};

export const addProductToCartReducer = (
    state = { cartItems: [] },
    action: AnyAction
): AddToCartReducerInterface => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART_REQUSET:
            return { ...state, loading: true, productId: action.payload };
        case ADD_PRODUCT_TO_CART_SUCCESS:
            return { loading: false, cartItems: action.payload };
        case ADD_PRODUCT_TO_CART_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteProductFromCartReducer = (
    state = {},
    action: AnyAction
): DeleteFromCartReducerInterface => {
    switch (action.type) {
        case DELETE_PRODUCT_FROM_CART_REQUSET:
            return { ...state, loading: true, productId: action.payload };
        case DELETE_PRODUCT_FROM_CART_SUCCESS:
            return { loading: false, message: action.payload };
        case DELETE_PRODUCT_FROM_CART_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
