import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewsScrevice from "../services/reviewsScrevice";

// interfaces
import {
    AddReviewParams,
    DeleteReviewParams,
    EditReviewParams,
    InitialWishListState,
    MyReviewsParams,
    ProductReviewsParams,
} from "../../interfaces/store/reviews";
import { Error } from "../../interfaces/public";

const initialState: InitialWishListState = {
    // productReviews
    productReviewsLoading: false,
    productReviewsData: null,
    productReviewsError: null,
    // myReviews
    myReviewsLoading: false,
    myReviewsData: null,
    myReviewsError: null,
    // addReview
    addReviewLoading: false,
    addReviewData: null,
    addReviewError: null,
    // editReview
    editReviewLoading: false,
    editReviewData: null,
    editReviewError: null,
    // deleteReview
    deleteReviewLoading: false,
    deleteReviewData: null,
    deleteReviewError: null,
};

// productReviews
export const productReviews = createAsyncThunk(
    "/reviews/all",
    async (args: ProductReviewsParams, thunkAPI) => {
        try {
            return await reviewsScrevice.productReviews(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// myReviews
export const myReviews = createAsyncThunk(
    "/reviews/myReviews",
    async (args: MyReviewsParams, thunkAPI) => {
        try {
            return await reviewsScrevice.myReviews(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// addReview
export const addReview = createAsyncThunk(
    "/reviews/addReview",
    async (args: AddReviewParams, thunkAPI) => {
        try {
            return await reviewsScrevice.addReview(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// editReview
export const editReview = createAsyncThunk(
    "/reviews/editReview",
    async (args: EditReviewParams, thunkAPI) => {
        try {
            return await reviewsScrevice.editReview(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// deleteReview
export const deleteReview = createAsyncThunk(
    "/reviews/deleteReview",
    async (args: DeleteReviewParams, thunkAPI) => {
        try {
            return await reviewsScrevice.deleteReview(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

export const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetAddEditDeleteDataError: (state) => ({
            ...state,
            addReviewData: null,
            editReviewData: null,
            deleteReviewData: null,
            addReviewError: null,
            editReviewError: null,
            deleteReviewError: null,
        }),
        resetProductReviews: (state, dispatch) => ({
            ...state,
            productReviewsData: dispatch.payload,
        }),
    },
    extraReducers: (builder) => {
        builder
            // productReviews
            .addCase(productReviews.pending, (state) => {
                state.productReviewsLoading = true;
                state.productReviewsError = null;
            })
            .addCase(productReviews.fulfilled, (state, action) => {
                state.productReviewsLoading = false;
                const { data } = action.payload;
                state.productReviewsData = data;
            })
            .addCase(productReviews.rejected, (state, action) => {
                state.productReviewsLoading = false;
                state.productReviewsError = action.payload;
            })
            // myReviews
            .addCase(myReviews.pending, (state) => {
                state.myReviewsLoading = true;
                state.myReviewsError = null;
            })
            .addCase(myReviews.fulfilled, (state, action) => {
                state.myReviewsLoading = false;
                const { data } = action.payload;
                state.myReviewsData = data;
            })
            .addCase(myReviews.rejected, (state, action) => {
                state.myReviewsLoading = false;
                state.myReviewsError = action.payload;
            })
            // addReview
            .addCase(addReview.pending, (state) => {
                state.addReviewLoading = true;
                state.addReviewError = null;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.addReviewLoading = false;
                const { data } = action.payload;
                state.addReviewData = data;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.addReviewLoading = false;
                state.addReviewError = action.payload;
            })
            // editReview
            .addCase(editReview.pending, (state) => {
                state.editReviewLoading = true;
                state.editReviewError = null;
            })
            .addCase(editReview.fulfilled, (state, action) => {
                state.editReviewLoading = false;
                const { data } = action.payload;
                state.editReviewData = data;
            })
            .addCase(editReview.rejected, (state, action) => {
                state.editReviewLoading = false;
                state.editReviewError = action.payload;
            })
            // deleteReview
            .addCase(deleteReview.pending, (state) => {
                state.deleteReviewLoading = true;
                state.deleteReviewError = null;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.deleteReviewLoading = false;
                const { data } = action.payload;
                state.deleteReviewData = data;
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.deleteReviewLoading = false;
                state.deleteReviewError = action.payload;
            });
    },
});

export const { reset, resetAddEditDeleteDataError, resetProductReviews } =
    reviewsSlice.actions;
export default reviewsSlice.reducer;
