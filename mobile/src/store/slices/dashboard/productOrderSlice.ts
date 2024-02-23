import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardProductOrderService from "../../services/dashboard/productOrderService";

// interfaces
import {
    DeleteProductParams,
    EditProductParams,
    InitialDashboardProductsOrdersState,
    OrdersParams,
} from "../../../interfaces/store/dashboard/productsOrders";
import { Error } from "../../../interfaces/public";

const initialState: InitialDashboardProductsOrdersState = {
    // productsOverview
    productsOverviewLoading: false,
    productsOverviewData: null,
    productsOverviewError: null,
    // editProduct
    editProductLoading: false,
    editProductData: null,
    editProductError: null,
    // deleteProduct
    deleteProductLoading: false,
    deleteProductData: null,
    deleteProductError: null,
    // orders
    ordersLoading: false,
    ordersData: null,
    ordersError: null,
};

// productsOverview
export const productsOverview = createAsyncThunk(
    "/dashboard/productsOverview",
    async (_, thunkAPI) => {
        try {
            return await dashboardProductOrderService.productsOverview();
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// editProduct
export const editProduct = createAsyncThunk(
    "/dashboard/editProduct",
    async (args: EditProductParams, thunkAPI) => {
        try {
            return await dashboardProductOrderService.editProduct(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// deleteProduct
export const deleteProduct = createAsyncThunk(
    "/dashboard/deleteProduct",
    async (args: DeleteProductParams, thunkAPI) => {
        try {
            return await dashboardProductOrderService.deleteProduct(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// orders
export const orders = createAsyncThunk(
    "/dashboard/orders",
    async (args: OrdersParams, thunkAPI) => {
        try {
            return await dashboardProductOrderService.orders(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

export const dashbordProductsOrdersSlice = createSlice({
    name: "dashbordProductsOrders",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetOrdersData: (state, action) => ({
            ...state,
            ordersData: action.payload,
        }),
        resetDeleteProductDataError: (state) => ({
            ...state,
            deleteProductData: null,
            deleteProductError: null,
        }),
        resetEditProductDataError: (state) => ({
            ...state,
            editProductData: null,
            editProductError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // productsOverview
            .addCase(productsOverview.pending, (state) => {
                state.productsOverviewLoading = true;
            })
            .addCase(productsOverview.fulfilled, (state, action) => {
                state.productsOverviewLoading = false;
                const { data } = action.payload;
                state.productsOverviewData = data;
            })
            .addCase(productsOverview.rejected, (state, action) => {
                state.productsOverviewLoading = false;
                state.productsOverviewError = action.payload;
            })
            // editProduct
            .addCase(editProduct.pending, (state) => {
                state.editProductLoading = true;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.editProductLoading = false;
                const { data } = action.payload;

                // udpate all products

                state.editProductData = data.product;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.editProductLoading = false;
                state.editProductError = action.payload;
            })
            // deleteProduct
            .addCase(deleteProduct.pending, (state) => {
                state.deleteProductLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteProductLoading = false;
                const { data } = action.payload;

                // udpate all products

                state.deleteProductData = data.message;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deleteProductLoading = false;
                state.deleteProductError = action.payload;
            })
            // orders
            .addCase(orders.pending, (state) => {
                state.ordersLoading = true;
            })
            .addCase(orders.fulfilled, (state, action) => {
                state.ordersLoading = false;
                const { data } = action.payload;
                state.ordersData = data;
            })
            .addCase(orders.rejected, (state, action) => {
                state.ordersLoading = false;
                state.ordersError = action.payload;
            });
    },
});

export const {
    reset,
    resetOrdersData,
    resetDeleteProductDataError,
    resetEditProductDataError,
} = dashbordProductsOrdersSlice.actions;
export default dashbordProductsOrdersSlice.reducer;
