import {
    ADD_PRODUCT_TO_WISHLIST_REQUSET,
    ADD_PRODUCT_TO_WISHLIST_SUCCESS,
    ADD_PRODUCT_TO_WISHLIST_FAIL,
    DELETE_PRODUCT_TO_WISHLIST_REQUSET,
    DELETE_PRODUCT_TO_WISHLIST_SUCCESS,
    DELETE_PRODUCT_TO_WISHLIST_FAIL,
    GET_ALL_PRODUCTS_IN_WISHLIST_REQUSET,
    GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
    GET_ALL_PRODUCTS_IN_WISHLIST_FAIL,
} from "../constants/wishListConstants";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { errorInterface } from "../../interfaces/components/public";
import { RootState, AppDispatch } from "../store";
import { ProductStateInterface } from "../../interfaces/store/product/productInterface";

import baseRoute from "../../api/baseRoute";

export const getAllProductsInWishList =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: GET_ALL_PRODUCTS_IN_WISHLIST_REQUSET });

            if (userLogin.userInfo && userLogin.userInfo.token) {
                // Authenticated
                const { data } = await baseRoute.get(`/wishList`);
                dispatch({
                    type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                    payload: data.wishList,
                });

                // store wishList in local storage
                localStorage.setItem(
                    "wishListItems",
                    JSON.stringify(data.wishList)
                );
            } else {
                // Not Authenticated
                dispatch({
                    type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                    payload:
                        JSON.parse(
                            localStorage.getItem("wishListItems") as string
                        ) || [],
                });
            }
        } catch (error: errorInterface) {
            dispatch({
                type: GET_ALL_PRODUCTS_IN_WISHLIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const addProductToWishList =
    (product: ProductStateInterface) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin, wishList } = getState();

        try {
            dispatch({
                type: ADD_PRODUCT_TO_WISHLIST_REQUSET,
                payload: product.id,
            });
            if (userLogin.userInfo && userLogin.userInfo.token) {
                // Authenticated

                const { data } = await baseRoute.post(`/wishList`, {
                    id: product.id,
                });
                dispatch({
                    type: ADD_PRODUCT_TO_WISHLIST_SUCCESS,
                    payload: data.wishList,
                });

                const newWishList = [
                    ...wishList?.wishListItems!,
                    data.wishList,
                ];
                // store wishList data to allProducts and local storage
                dispatch({
                    type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                    payload: newWishList,
                });
                localStorage.setItem(
                    "wishListItems",
                    JSON.stringify(newWishList)
                );
            } else {
                // Not Authenticated
                const oldWishList = localStorage.getItem("wishListItems")
                    ? JSON.parse(
                          localStorage.getItem("wishListItems") as string
                      )
                    : [];

                if (oldWishList.length === 0) {
                    localStorage.setItem(
                        "wishListItems",
                        JSON.stringify([product])
                    );
                } else {
                    const productIndexInWishList = oldWishList.findIndex(
                        (p: ProductStateInterface) => p.id === product.id
                    );
                    if (productIndexInWishList === -1) {
                        localStorage.setItem(
                            "wishListItems",
                            JSON.stringify([...oldWishList, product])
                        );
                    }
                }

                dispatch({
                    type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                    payload: JSON.parse(
                        localStorage.getItem("wishListItems") as string
                    ),
                });
            }
        } catch (error: errorInterface) {
            dispatch({
                type: ADD_PRODUCT_TO_WISHLIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const deleteProductFromWishList =
    (id: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin, wishList } = getState();

        try {
            dispatch({ type: DELETE_PRODUCT_TO_WISHLIST_REQUSET, payload: id });
            if (userLogin.userInfo && userLogin.userInfo.token) {
                // Authenticated

                const { data } = await baseRoute.patch(`/wishList`, { id: id });
                dispatch({
                    type: DELETE_PRODUCT_TO_WISHLIST_SUCCESS,
                    payload: data.message,
                });

                // store wishList data to Redux and local storage
                const indexOfDeletedProduct =
                    wishList?.wishListItems!.findIndex((p) => p.id === id);
                let newWishListItems = [...wishList?.wishListItems!];
                newWishListItems.splice(indexOfDeletedProduct, 1);

                dispatch({
                    type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                    payload: newWishListItems,
                });
                localStorage.setItem(
                    "wishListItems",
                    JSON.stringify(newWishListItems)
                );
            } else {
                // Not Authenticated
                const oldWishList = JSON.parse(
                    localStorage.getItem("wishListItems") as string
                );
                const indexOfProduct = oldWishList.findIndex(
                    (p: ProductStateInterface) => p.id === id
                );
                oldWishList.splice(indexOfProduct, 1);
                localStorage.setItem(
                    "wishListItems",
                    JSON.stringify(oldWishList)
                );

                dispatch({
                    type: DELETE_PRODUCT_TO_WISHLIST_SUCCESS,
                    payload: JSON.parse(
                        localStorage.getItem("wishListItems") as string
                    ),
                });
                dispatch({
                    type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                    payload: JSON.parse(
                        localStorage.getItem("wishListItems") as string
                    ),
                });
            }
        } catch (error: errorInterface) {
            dispatch({
                type: DELETE_PRODUCT_TO_WISHLIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
