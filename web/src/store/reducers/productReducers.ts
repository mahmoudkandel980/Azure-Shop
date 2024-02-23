import {
    ALL_PRODUCTS_REQUSET,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUSET,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    MY_PRODUCTS_REQUEST,
    MY_PRODUCTS_SUCCESS,
    MY_PRODUCTS_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    EDIT_MY_PRODUCTS_REQUEST,
    EDIT_MY_PRODUCTS_SUCCESS,
    EDIT_MY_PRODUCTS_FAIL,
    DELETE_MY_PRODUCTS_REQUEST,
    DELETE_MY_PRODUCTS_SUCCESS,
    DELETE_MY_PRODUCTS_FAIL,
    TOP_RATED_BEST_SALE_PRODUCTS_REQUEST,
    TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
    TOP_RATED_BEST_SALE_PRODUCTS_FAIL,
} from "../constants/productConstants";

import { AnyAction } from "redux";
import {
    GetAllProductsReducerInterface,
    EditProductReducerInterface,
    CreateProductReducerInterface,
    DeleteProductReducerInterface,
    ProductDetailsReducerInterface,
    MyProductsReducerInterface,
    TopRatedBestSaleProductsReducerInterface,
} from "../../interfaces/store/product/productInterface";

export const getAllProductsReducer = (
    state = { products: [] },
    action: AnyAction
): GetAllProductsReducerInterface => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUSET:
            return { ...state, loading: true, products: [] };
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                ITEMS_PER_PAGE: action.payload.ITEMS_PER_PAGE,
                total_pages: action.payload.total_pages || 1,
                pageType: action.payload.pageType,
            };
        case ALL_PRODUCTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productDetailsReducer = (
    state = { product: { reviews: [] } },
    action: AnyAction
): ProductDetailsReducerInterface => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUSET:
            return { ...state, loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const myProductsReducer = (
    state = { products: [] },
    action: AnyAction
): MyProductsReducerInterface => {
    switch (action.type) {
        case MY_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case MY_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                total_pages: action.payload.total_pages || 1,
            };
        case MY_PRODUCTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const createProductReducer = (
    state = { product: { reviews: [] } },
    action: AnyAction
): CreateProductReducerInterface => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case CREATE_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload };
        case CREATE_PRODUCT_FAIL:
            return { loading: false, error: action.payload.product };
        default:
            return state;
    }
};

export const editProductReducer = (
    state = { product: { reviews: [] } },
    action: AnyAction
): EditProductReducerInterface => {
    switch (action.type) {
        case EDIT_MY_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case EDIT_MY_PRODUCTS_SUCCESS:
            return { loading: false, product: action.payload };
        case EDIT_MY_PRODUCTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteProductReducer = (
    state = { loading: false },
    action: AnyAction
): DeleteProductReducerInterface => {
    switch (action.type) {
        case DELETE_MY_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case DELETE_MY_PRODUCTS_SUCCESS:
            return { loading: false, message: action.payload };
        case DELETE_MY_PRODUCTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getTopRatedBestSaleProductsReducer = (
    state = { topRatedProducts: [], bestSaleProducts: [] },
    action: AnyAction
): TopRatedBestSaleProductsReducerInterface => {
    switch (action.type) {
        case TOP_RATED_BEST_SALE_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS:
            return {
                loading: false,
                topRatedProducts: action.payload.topRatedProducts,
                bestSaleProducts: action.payload.bestSaleProducts,
            };
        case TOP_RATED_BEST_SALE_PRODUCTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
