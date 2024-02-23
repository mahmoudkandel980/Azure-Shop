import {
    GET_PRODUCT_REVIEWS_REQUSET,
    GET_PRODUCT_REVIEWS_SUCCESS,
    GET_PRODUCT_REVIEWS_FAIL,
    ADD_PRODUCT_REVIEW_REQUSET,
    ADD_PRODUCT_REVIEW_SUCCESS,
    ADD_PRODUCT_REVIEW_FAIL,
    ADD_PRODUCT_REVIEW_RESET,
    EDIT_PRODUCT_REVIEW_REQUSET,
    EDIT_PRODUCT_REVIEW_SUCCESS,
    EDIT_PRODUCT_REVIEW_FAIL,
    EDIT_PRODUCT_REVIEW_RESET,
    DELETE_PRODUCT_REVIEW_REQUSET,
    DELETE_PRODUCT_REVIEW_SUCCESS,
    DELETE_PRODUCT_REVIEW_FAIL,
    DELETE_PRODUCT_REVIEW_RESET,
    GET_MY_REVIEWS_REQUSET,
    GET_MY_REVIEWS_SUCCESS,
    GET_MY_REVIEWS_FAIL,
} from "../constants/reviewConstants";

import { AnyAction } from "redux";
import {
    ProductReviewsReducerInterface,
    AddProductReviewsReducerInterface,
    EditProductReviewsReducerInterface,
    DeleteProductReviewsReducerInterface,
    MyReviewsReducerInterface,
} from "../../interfaces/store/reviews/reviewInterface";

export const productReviewsReducer = (
    state = { productId: null, reviews: [] },
    action: AnyAction
): ProductReviewsReducerInterface => {
    switch (action.type) {
        case GET_PRODUCT_REVIEWS_REQUSET:
            return { ...state, loading: true };
        case GET_PRODUCT_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload.reviews,
                productId: action.payload.productId,
            };
        case GET_PRODUCT_REVIEWS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const addProductReviewReducer = (
    state = {},
    action: AnyAction
): AddProductReviewsReducerInterface => {
    switch (action.type) {
        case ADD_PRODUCT_REVIEW_REQUSET:
            return { ...state, loading: true };
        case ADD_PRODUCT_REVIEW_SUCCESS:
            return { loading: false, review: action.payload };
        case ADD_PRODUCT_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case ADD_PRODUCT_REVIEW_RESET:
            return { loading: false };
        default:
            return state;
    }
};

export const editProductReviewReducer = (
    state = {},
    action: AnyAction
): EditProductReviewsReducerInterface => {
    switch (action.type) {
        case EDIT_PRODUCT_REVIEW_REQUSET:
            return { ...state, loading: true };
        case EDIT_PRODUCT_REVIEW_SUCCESS:
            return { loading: false, review: action.payload };
        case EDIT_PRODUCT_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case EDIT_PRODUCT_REVIEW_RESET:
            return { loading: false };
        default:
            return state;
    }
};

export const deleteProductReviewReducer = (
    state = {},
    action: AnyAction
): DeleteProductReviewsReducerInterface => {
    switch (action.type) {
        case DELETE_PRODUCT_REVIEW_REQUSET:
            return { ...state, loading: true };
        case DELETE_PRODUCT_REVIEW_SUCCESS:
            return { loading: false, message: action.payload };
        case DELETE_PRODUCT_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case DELETE_PRODUCT_REVIEW_RESET:
            return { loading: false };
        default:
            return state;
    }
};

export const getMyReviewsReducer = (
    state = { reviews: [] },
    action: AnyAction
): MyReviewsReducerInterface => {
    switch (action.type) {
        case GET_MY_REVIEWS_REQUSET:
            return { ...state, loading: true };
        case GET_MY_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload.reviews,
                total_pages: action.payload.total_pages || 1,
            };
        case GET_MY_REVIEWS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
