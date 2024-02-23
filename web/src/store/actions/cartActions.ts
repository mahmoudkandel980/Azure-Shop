import {
    ADD_PRODUCT_TO_CART_REQUSET,
    ADD_PRODUCT_TO_CART_SUCCESS,
    ADD_PRODUCT_TO_CART_FAIL,
    DELETE_PRODUCT_FROM_CART_REQUSET,
    DELETE_PRODUCT_FROM_CART_SUCCESS,
    DELETE_PRODUCT_FROM_CART_FAIL,
    GET_ALLPRODUCTS_IN_CART_REQUSET,
    GET_ALLPRODUCTS_IN_CART_SUCCESS,
    GET_ALLPRODUCTS_IN_CART_FAIL,
} from "../constants/cartConstants";

import { RootState, AppDispatch } from "../store";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { errorInterface } from "../../interfaces/components/public";
import { ProductStateInterface } from "../../interfaces/store/product/productInterface";
import { CartItems } from "../../interfaces/store/cart/cartInterface";

import baseRoute from "../../api/baseRoute";

export const getAllProductsInCart =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({
                type: GET_ALLPRODUCTS_IN_CART_REQUSET,
            });

            if (userLogin.userInfo && userLogin.userInfo.token) {
                // Authenticated
                const { data } = await baseRoute.get(`/cart`);
                dispatch({
                    type: GET_ALLPRODUCTS_IN_CART_SUCCESS,
                    payload: data.cart,
                });

                // store wishList data in local storage
                localStorage.setItem("cartItems", JSON.stringify(data.cart));
            } else {
                // Not Authenticated
                dispatch({
                    type: GET_ALLPRODUCTS_IN_CART_SUCCESS,
                    payload:
                        JSON.parse(
                            localStorage.getItem("cartItems") as string
                        ) || [],
                });
            }
        } catch (error: errorInterface) {
            dispatch({
                type: GET_ALLPRODUCTS_IN_CART_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const addProductToCart =
    (product: ProductStateInterface, qty: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin, cart } = getState();
        try {
            dispatch({
                type: ADD_PRODUCT_TO_CART_REQUSET,
                payload: product.id,
            });
            if (userLogin.userInfo && userLogin.userInfo.token) {
                // Authenticated
                const { data } = await baseRoute.post(`/cart`, {
                    id: product.id,
                    qty: qty,
                });

                dispatch({
                    type: ADD_PRODUCT_TO_CART_SUCCESS,
                    payload: data.cart,
                });

                let cartItems: CartItems[] = [...cart?.cartItems!];
                let productIndexInCart = cart.cartItems!.findIndex(
                    (p) => p.product.id === product.id
                );
                if (productIndexInCart !== -1) {
                    cartItems.splice(productIndexInCart, 1, data.cart);
                } else {
                    cartItems = [...cartItems, data.cart];
                }

                // store wishList data to allProducts and local storage
                dispatch({
                    type: GET_ALLPRODUCTS_IN_CART_SUCCESS,
                    payload: cartItems,
                });
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            } else {
                // Not Authenticated
                const oldCart = localStorage.getItem("cartItems")
                    ? JSON.parse(localStorage.getItem("cartItems") as string)
                    : [];

                if (oldCart.length === 0) {
                    localStorage.setItem(
                        "cartItems",
                        JSON.stringify([{ product, qty: qty }])
                    );
                } else {
                    const productIndexInCart = oldCart.findIndex(
                        (item: CartItems) => item.product.id === product.id
                    );
                    if (productIndexInCart !== -1) {
                        oldCart[productIndexInCart] = { product, qty };
                        localStorage.setItem(
                            "cartItems",
                            JSON.stringify(oldCart)
                        );
                    } else {
                        localStorage.setItem(
                            "cartItems",
                            JSON.stringify([...oldCart, { product, qty }])
                        );
                    }
                }

                dispatch({
                    type: ADD_PRODUCT_TO_CART_SUCCESS,
                    payload: JSON.parse(
                        localStorage.getItem("cartItems") as string
                    ),
                });

                // store wishList data to allProducts and local storage
                dispatch({
                    type: GET_ALLPRODUCTS_IN_CART_SUCCESS,
                    payload: JSON.parse(
                        localStorage.getItem("cartItems") as string
                    ),
                });
            }
        } catch (error: errorInterface) {
            dispatch({
                type: ADD_PRODUCT_TO_CART_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const deleteProductFromCart =
    (id: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin, cart } = getState();
        try {
            dispatch({ type: DELETE_PRODUCT_FROM_CART_REQUSET, payload: id });

            if (userLogin.userInfo && userLogin.userInfo.token) {
                // Authenticated
                const { data } = await baseRoute.patch(`/cart`, { id: id });
                dispatch({
                    type: DELETE_PRODUCT_FROM_CART_SUCCESS,
                    payload: data.message,
                });

                const indexOfDeletedProduct = cart.cartItems!.findIndex(
                    (p) => p.product.id === id
                );
                let newCart = [...cart.cartItems!];
                newCart.splice(indexOfDeletedProduct, 1);

                // store wishList data to Redux and local storage
                dispatch({
                    type: GET_ALLPRODUCTS_IN_CART_SUCCESS,
                    payload: newCart,
                });
                localStorage.setItem("cartItems", JSON.stringify(newCart));
            } else {
                // Not Authenticated
                const oldCart = JSON.parse(
                    localStorage.getItem("cartItems") as string
                );
                const indexOfProduct = oldCart.findIndex(
                    (p: CartItems) => p.product.id === id
                );
                oldCart.splice(indexOfProduct, 1);
                localStorage.setItem("cartItems", JSON.stringify(oldCart));

                dispatch({
                    type: DELETE_PRODUCT_FROM_CART_SUCCESS,
                    payload: "product has deleted",
                });
                dispatch({
                    type: GET_ALLPRODUCTS_IN_CART_SUCCESS,
                    payload: JSON.parse(
                        localStorage.getItem("cartItems") as string
                    ),
                });
            }
        } catch (error: errorInterface) {
            dispatch({
                type: DELETE_PRODUCT_FROM_CART_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
