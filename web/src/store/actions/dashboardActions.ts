import {
    DASHBOARD_ALL_USERS_REQUSET,
    DASHBOARD_ALL_USERS_SUCCESS,
    DASHBOARD_ALL_USERS_FAIL,
    DASHBOARD_USERS_OVERVIEW_REQUSET,
    DASHBOARD_USERS_OVERVIEW_SUCCESS,
    DASHBOARD_USERS_OVERVIEW_FAIL,
    DASHBOARD_PODUCTS_OVERVIEW_REQUSET,
    DASHBOARD_PODUCTS_OVERVIEW_SUCCESS,
    DASHBOARD_PODUCTS_OVERVIEW_FAIL,
    DASHBOARD_DELETE_USER_USERS_PAGE_REQUSET,
    DASHBOARD_DELETE_USER_USERS_PAGE_SUCCESS,
    DASHBOARD_DELETE_USER_USERS_PAGE_FAIL,
    DASHBOARD_EDIT_USER_USERS_PAGE_REQUSET,
    DASHBOARD_EDIT_USER_USERS_PAGE_SUCCESS,
    DASHBOARD_EDIT_USER_USERS_PAGE_FAIL,
    DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_REQUSET,
    DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_SUCCESS,
    DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_FAIL,
    DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_REQUSET,
    DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_SUCCESS,
    DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_FAIL,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_REQUSET,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_SUCCESS,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_FAIL,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_REQUSET,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_SUCCESS,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_FAIL,
    DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_REQUSET,
    DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_SUCCESS,
    DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_FAIL,
    DASHBOARD_ALL_ORDERS_REQUSET,
    DASHBOARD_ALL_ORDERS_SUCCESS,
    DASHBOARD_ALL_ORDERS_FAIL,
} from "../constants/dashboardConstants";

import {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorInterface,
    FilterDateInterface,
} from "../../interfaces/components/public";
import { AppDispatch } from "../store";

import baseRoute from "../../api/baseRoute";

// OVERVIEW
export const dashboard_usersOverView = () => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: DASHBOARD_USERS_OVERVIEW_REQUSET });
        const { data } = await baseRoute.get(`/users/dashboard/overview`);
        dispatch({ type: DASHBOARD_USERS_OVERVIEW_SUCCESS, payload: data });
    } catch (error: errorInterface) {
        dispatch({
            type: DASHBOARD_USERS_OVERVIEW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const dashboard_productsOverView =
    () => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: DASHBOARD_PODUCTS_OVERVIEW_REQUSET });
            const { data } = await baseRoute.get(
                `/products/dashboard/overview`
            );
            dispatch({
                type: DASHBOARD_PODUCTS_OVERVIEW_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_PODUCTS_OVERVIEW_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

// USERS
export const dashboard_allUsers =
    (filterData: FilterDateInterface | null, page: number) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: DASHBOARD_ALL_USERS_REQUSET });

            const { data } = await baseRoute.get(
                `/users/dashboard/users?${
                    filterData
                        ? `filterData=${JSON.stringify(filterData)}&`
                        : ""
                }page=${page}`
            );
            dispatch({ type: DASHBOARD_ALL_USERS_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_ALL_USERS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_deleteUser =
    (userId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: DASHBOARD_DELETE_USER_USERS_PAGE_REQUSET });
            const { data } = await baseRoute.delete(
                `/users/dashboard/users/${userId}`
            );
            dispatch({
                type: DASHBOARD_DELETE_USER_USERS_PAGE_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_DELETE_USER_USERS_PAGE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_editUser =
    (userId: string, formData: object) => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: DASHBOARD_EDIT_USER_USERS_PAGE_REQUSET });

            const { data } = await baseRoute.patch(
                `/users/dashboard/users/${userId}`,
                formData
            );
            dispatch({
                type: DASHBOARD_EDIT_USER_USERS_PAGE_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_EDIT_USER_USERS_PAGE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

// PRODUCTS
export const dashboard_deleteProduct =
    (productId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_REQUSET });
            const { data } = await baseRoute.delete(
                `/products/dashboard/products/${productId}`
            );
            dispatch({
                type: DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_editProduct =
    (productId: string, formData: object) => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_REQUSET });

            const { data } = await baseRoute.patch(
                `/products/dashboard/products/${productId}`,
                formData
            );
            dispatch({
                type: DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_usersWantToBeSellers =
    (page: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_REQUSET });
            const { data } = await baseRoute.get(
                `/users/dashboard/usersWantToBeSellers?page=${page}`
            );
            dispatch({
                type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_usersWantToBeSellersNumbers =
    () => async (dispatch: AppDispatch) => {
        try {
            dispatch({
                type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_REQUSET,
            });

            const { data } = await baseRoute.get(
                `/users/dashboard/usersWantToBeSellersNumbers`
            );
            dispatch({
                type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_updateuserWantToBeSeller =
    (userId: string, role: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_REQUSET });
            const { data } = await baseRoute.patch(
                `/users/dashboard/usersWantToBeSellers/${userId}`,
                { role }
            );
            dispatch({
                type: DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

// ORDERS
export const dashboard_allOrders =
    (filterData: FilterDateInterface | null, page: number) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: DASHBOARD_ALL_ORDERS_REQUSET });

            const { data } = await baseRoute.get(
                `/orders/dashboard?${
                    filterData
                        ? `filterData=${JSON.stringify(filterData)}&`
                        : ""
                }page=${page}`
            );
            dispatch({ type: DASHBOARD_ALL_ORDERS_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_ALL_ORDERS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
