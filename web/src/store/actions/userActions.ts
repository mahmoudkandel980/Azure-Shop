import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_FORGET_PASSWORD_REQUEST,
    USER_FORGET_PASSWORD_SUCCESS,
    USER_FORGET_PASSWORD_FAIL,
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAIL,
    PROFILE_SUCCESS,
    PROFILE_REQUEST,
    PROFILE_FAIL,
    UPDATE_ME_REQUEST,
    UPDATE_ME_SUCCESS,
    UPDATE_ME_FAIL,
    DELETE_ME_REQUEST,
    DELETE_ME_SUCCESS,
    DELETE_ME_FAIL,
    CHANGE_USER_PASSWORD_REQUEST,
    CHANGE_USER_PASSWORD_SUCCESS,
    CHANGE_USER_PASSWORD_FAIL,
} from "../constants/userConstants";

import {
    RESET_WISHLIST,
    GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
} from "../constants/wishListConstants";
import {
    RESET_CART,
    GET_ALLPRODUCTS_IN_CART_SUCCESS,
} from "../constants/cartConstants";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { errorInterface } from "../../interfaces/components/public";
import { RootState, AppDispatch } from "../store";
import { ProductStateInterface } from "../../interfaces/store/product/productInterface";
import { CartItems } from "../../interfaces/store/cart/cartInterface";

import baseRoute from "../../api/baseRoute";

export const signup =
    (name: string, email: string, password: string, passwordConfirm: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: USER_SIGNUP_REQUEST });

            const wishListIds = localStorage.getItem("wishListItems")
                ? JSON.parse(
                      localStorage.getItem("wishListItems") as string
                  ).map((p: ProductStateInterface) => p.id)
                : [];

            const cartData = localStorage.getItem("cartItems")
                ? JSON.parse(localStorage.getItem("cartItems") as string).map(
                      (item: CartItems) => ({
                          id: item.product.id,
                          qty: item.qty,
                      })
                  )
                : [];

            const { data } = await baseRoute.post(`/users/signup`, {
                name,
                email,
                password,
                passwordConfirm,
                wishListIds,
                cartData,
            });
            dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });

            // userInfo (Dispatch Login)
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

            // WishList (Dispatch, update localStorage)
            dispatch({
                type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                payload: data.wishList,
            });
            localStorage.setItem(
                "wishListItems",
                JSON.stringify(data.wishList)
            );

            // Cart (Dispatch, update localStorage)
            dispatch({
                type: GET_ALLPRODUCTS_IN_CART_SUCCESS,
                payload: data.cart,
            });
            localStorage.setItem("cartItems", JSON.stringify(data.cart));

            // userInfo (update localStorage)
            let modifiedUserInfo = data;
            modifiedUserInfo.cart = undefined;
            modifiedUserInfo.wishList = undefined;
            localStorage.setItem(
                "userInfo",
                JSON.stringify({ ...modifiedUserInfo })
            );
        } catch (error: errorInterface) {
            dispatch({
                type: USER_SIGNUP_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const login =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: USER_LOGIN_REQUEST });

            const wishListIds = localStorage.getItem("wishListItems")
                ? JSON.parse(
                      localStorage.getItem("wishListItems") as string
                  ).map((p: ProductStateInterface) => p.id)
                : [];

            const cartData = localStorage.getItem("cartItems")
                ? JSON.parse(localStorage.getItem("cartItems") as string).map(
                      (item: CartItems) => ({
                          id: item.product.id,
                          qty: item.qty,
                      })
                  )
                : [];

            const { data } = await baseRoute.post(`/users/login`, {
                email,
                password,
                wishListIds,
                cartData,
            });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

            // WishList (Dispatch, update localStorage)
            dispatch({
                type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                payload: data.wishList,
            });
            localStorage.setItem(
                "wishListItems",
                JSON.stringify(data.wishList)
            );

            // Cart (Dispatch, update localStorage)
            dispatch({
                type: GET_ALLPRODUCTS_IN_CART_SUCCESS,
                payload: data.cart,
            });
            localStorage.setItem("cartItems", JSON.stringify(data.cart));

            // userInfo (update localStorage)
            let modifiedUserInfo = data;
            modifiedUserInfo.cart = undefined;
            modifiedUserInfo.wishList = undefined;
            localStorage.setItem(
                "userInfo",
                JSON.stringify({ ...modifiedUserInfo })
            );
        } catch (error: errorInterface) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const logout = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("wishListItems");
    localStorage.removeItem("cartItems");

    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });

    // Rest cart and wishList when logout
    dispatch({ type: RESET_WISHLIST });
    dispatch({ type: RESET_CART });
};

export const getUserDetailsById =
    (id: string, page: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: USER_DETAILS_REQUEST });
            const { data } = await baseRoute.get(`/users/${id}?page=${page}`);
            dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const forgetPassword =
    (email: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: USER_FORGET_PASSWORD_REQUEST });

            const { data } = await baseRoute.post(`/users/forgotPassword`, {
                email,
            });
            dispatch({
                type: USER_FORGET_PASSWORD_SUCCESS,
                payload: data.message,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: USER_FORGET_PASSWORD_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const resetPassword =
    (password: string, passwordConfirm: string, token: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: USER_RESET_PASSWORD_REQUEST });

            const { data } = await baseRoute.patch(
                `/users/resetPassword/${token}`,
                { password, passwordConfirm }
            );
            dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: USER_RESET_PASSWORD_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const profile =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: PROFILE_REQUEST });

            const { data } = await baseRoute.get(`/users/profile`);
            const newUserDate = { ...userLogin.userInfo, ...data.user };

            dispatch({ type: USER_LOGIN_SUCCESS, payload: newUserDate });
            localStorage.setItem("userInfo", JSON.stringify(newUserDate));
            dispatch({ type: PROFILE_SUCCESS, payload: data.user });
        } catch (error: errorInterface) {
            dispatch({
                type: PROFILE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const updateMe = (formData: object) => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: UPDATE_ME_REQUEST });

        const { data } = await baseRoute.patch(`/users/updateMe`, formData);
        dispatch({ type: UPDATE_ME_SUCCESS, payload: data.user });
    } catch (error: errorInterface) {
        dispatch({
            type: UPDATE_ME_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteMe = () => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: DELETE_ME_REQUEST });

        const { data } = await baseRoute.patch(`/users/deletetMe`, {});
        dispatch({ type: DELETE_ME_SUCCESS, payload: data.user });
    } catch (error: errorInterface) {
        dispatch({
            type: DELETE_ME_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const changePassword =
    (currentPassword: string, newPassword: string, passwordConfirm: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: CHANGE_USER_PASSWORD_REQUEST });

            const { data } = await baseRoute.patch(`/users/updatePassword`, {
                currentPassword,
                newPassword,
                passwordConfirm,
            });
            dispatch({ type: CHANGE_USER_PASSWORD_SUCCESS, payload: data });

            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error: errorInterface) {
            dispatch({
                type: CHANGE_USER_PASSWORD_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
