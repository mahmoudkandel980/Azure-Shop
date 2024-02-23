import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishListService from "../services/wishListService";

// interfaces
import {
    InitialWishListState,
    addProductToWishListParams,
    deleteProductFromWishListParams,
} from "../../interfaces/store/wishList";
import { Error } from "../../interfaces/public";

const initialState: InitialWishListState = {
    // wishList
    wishListLoading: false,
    wishListData: null,
    wishListError: null,
    // addProductToWishList
    addProductToWishListLoading: false,
    addProductToWishListData: null,
    addProductToWishListError: null,
    // deleteProductFromWishList
    deleteProductFromWishListLoading: false,
    deleteProductFromWishListData: null,
    deleteProductFromWishListError: null,
};

// wishList
export const wishList = createAsyncThunk("/wishlist", async (_, thunkAPI) => {
    try {
        return await wishListService.allProductsInWishList();
    } catch (err: Error) {
        return thunkAPI.rejectWithValue(
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        );
    }
});

// addProductToWishList
export const addProductToWishList = createAsyncThunk(
    "/wishlist/create",
    async (args: addProductToWishListParams, thunkAPI) => {
        try {
            return await wishListService.addProductToWishList(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// deleteProductFromWishList
export const deleteProductFromWishList = createAsyncThunk(
    "/wishlist/delete",
    async (args: deleteProductFromWishListParams, thunkAPI) => {
        try {
            return await wishListService.deleteProductFromWishList(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

export const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetWishListData: (state, action) => ({
            ...state,
            wishListData: action.payload,
        }),
        intailWishListItems: (state, action) => ({
            ...state,
            wishListData: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder
            // wishList
            .addCase(wishList.pending, (state) => {
                state.wishListLoading = true;
                state.wishListError = null;
            })
            .addCase(wishList.fulfilled, (state, action) => {
                state.wishListLoading = false;
                const { data } = action.payload;
                state.wishListData = data;
            })
            .addCase(wishList.rejected, (state, action) => {
                state.wishListLoading = false;
                state.wishListError = action.payload;
            })
            // addProductToWishList
            .addCase(addProductToWishList.pending, (state) => {
                state.addProductToWishListLoading = true;
                state.addProductToWishListError = null;
            })
            .addCase(addProductToWishList.fulfilled, (state, action) => {
                state.addProductToWishListLoading = false;
                const { data } = action.payload;

                // update wishList
                state.wishListData = data;

                state.addProductToWishListData = data;
            })
            .addCase(addProductToWishList.rejected, (state, action) => {
                state.addProductToWishListLoading = false;
                state.addProductToWishListError = action.payload;
            })
            // deleteProductFromWishList
            .addCase(deleteProductFromWishList.pending, (state) => {
                state.deleteProductFromWishListLoading = true;
                state.deleteProductFromWishListError = null;
            })
            .addCase(deleteProductFromWishList.fulfilled, (state, action) => {
                state.deleteProductFromWishListLoading = false;
                const { data } = action.payload;

                // // update wishList
                state.wishListData = data;

                state.deleteProductFromWishListData = data;
            })
            .addCase(deleteProductFromWishList.rejected, (state, action) => {
                state.deleteProductFromWishListLoading = false;
                state.deleteProductFromWishListError = action.payload;
            });
    },
});

export const { reset, resetWishListData, intailWishListItems } =
    wishListSlice.actions;
export default wishListSlice.reducer;
