import {
    GET_PRODUCT_REVIEWS_REQUSET,
    GET_PRODUCT_REVIEWS_SUCCESS,
    GET_PRODUCT_REVIEWS_FAIL,
    ADD_PRODUCT_REVIEW_REQUSET,
    ADD_PRODUCT_REVIEW_SUCCESS,
    ADD_PRODUCT_REVIEW_FAIL,
    EDIT_PRODUCT_REVIEW_REQUSET,
    EDIT_PRODUCT_REVIEW_SUCCESS,
    EDIT_PRODUCT_REVIEW_FAIL,
    DELETE_PRODUCT_REVIEW_REQUSET,
    DELETE_PRODUCT_REVIEW_SUCCESS,
    DELETE_PRODUCT_REVIEW_FAIL,
    GET_MY_REVIEWS_REQUSET,
    GET_MY_REVIEWS_SUCCESS,
    GET_MY_REVIEWS_FAIL,
} from "../constants/reviewConstants";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { errorInterface } from "../../interfaces/components/public";
import { AppDispatch } from "../store";

import baseRoute from "../../api/baseRoute";

export const getProductReviews =
    (productId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: GET_PRODUCT_REVIEWS_REQUSET });
            const { data } = await baseRoute.get(
                `/product/${productId}/reviews/all`
            );
            dispatch({ type: GET_PRODUCT_REVIEWS_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: GET_PRODUCT_REVIEWS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const addProductReview =
    (productId: string, comment: string, rating: number) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: ADD_PRODUCT_REVIEW_REQUSET });

            const { data } = await baseRoute.post(
                `/product/${productId}/reviews`,
                { comment, rating }
            );
            dispatch({
                type: ADD_PRODUCT_REVIEW_SUCCESS,
                payload: data.review,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: ADD_PRODUCT_REVIEW_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const editProductReview =
    (productId: string, reviewId: string, comment: string, rating: number) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: EDIT_PRODUCT_REVIEW_REQUSET });

            const { data } = await baseRoute.patch(
                `/product/${productId}/review/${reviewId}`,
                { comment, rating }
            );
            dispatch({
                type: EDIT_PRODUCT_REVIEW_SUCCESS,
                payload: data.review,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: EDIT_PRODUCT_REVIEW_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const deleteProductReview =
    (productId: string, reviewId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: DELETE_PRODUCT_REVIEW_REQUSET });

            const { data } = await baseRoute.delete(
                `/product/${productId}/review/${reviewId}`
            );
            dispatch({ type: DELETE_PRODUCT_REVIEW_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: DELETE_PRODUCT_REVIEW_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const getMyReviews = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: GET_MY_REVIEWS_REQUSET });
        const { data } = await baseRoute.get(`/product/myReviews?page=${page}`);
        dispatch({ type: GET_MY_REVIEWS_SUCCESS, payload: data });
    } catch (error: errorInterface) {
        dispatch({
            type: GET_MY_REVIEWS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
