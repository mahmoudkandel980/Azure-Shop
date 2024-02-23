import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "../services/cartService";

// interfaces
import {
    InitialCartState,
    addProductToCartParams,
    deleteProductFromCartParams,
} from "../../interfaces/store/cart";
import { Error } from "../../interfaces/public";

const initialState: InitialCartState = {
    // cart
    cartLoading: false,
    cartData: null,
    cartError: null,
    // addProductToCart
    addProductToCartLoading: false,
    addProductToCartData: null,
    addProductToCartError: null,
    // deleteProductFromCart
    deleteProductFromCartLoading: false,
    deleteProductFromCartData: null,
    deleteProductFromCartError: null,
};

// cart
export const cart = createAsyncThunk("/cart", async (_, thunkAPI) => {
    try {
        return await cartService.allProductsInCart();
    } catch (err: Error) {
        return thunkAPI.rejectWithValue(
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        );
    }
});

// addProductToCart
export const addProductToCart = createAsyncThunk(
    "/cart/create",
    async (args: addProductToCartParams, thunkAPI) => {
        try {
            return await cartService.addProductToCart(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// deleteProductFromCart
export const deleteProductFromCart = createAsyncThunk(
    "/cart/delete",
    async (args: deleteProductFromCartParams, thunkAPI) => {
        try {
            return await cartService.deleteProductFromCart(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetCartData: (state, action) => ({
            ...state,
            cartData: action.payload,
        }),
        intailCartItems: (state, action) => ({
            ...state,
            cartData: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder
            // cart
            .addCase(cart.pending, (state) => {
                state.cartLoading = true;
                state.cartError = null;
            })
            .addCase(cart.fulfilled, (state, action) => {
                state.cartLoading = false;
                const { data } = action.payload;
                state.cartData = data;
            })
            .addCase(cart.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = action.payload;
            })
            // addProductToCart
            .addCase(addProductToCart.pending, (state) => {
                state.addProductToCartLoading = true;
                state.addProductToCartError = null;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.addProductToCartLoading = false;
                const { data } = action.payload;

                // // update cart
                state.cartData = data;

                state.addProductToCartData = data;
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.addProductToCartLoading = false;
                state.addProductToCartError = action.payload;
            })
            // deleteProductFromCart
            .addCase(deleteProductFromCart.pending, (state) => {
                state.deleteProductFromCartLoading = true;
                state.deleteProductFromCartError = null;
            })
            .addCase(deleteProductFromCart.fulfilled, (state, action) => {
                state.deleteProductFromCartLoading = false;
                const { data } = action.payload;

                // // update cart
                state.cartData = data;

                state.deleteProductFromCartData = data;
            })
            .addCase(deleteProductFromCart.rejected, (state, action) => {
                state.deleteProductFromCartLoading = false;
                state.deleteProductFromCartError = action.payload;
            });
    },
});

export const { reset, resetCartData, intailCartItems } = cartSlice.actions;
export default cartSlice.reducer;
