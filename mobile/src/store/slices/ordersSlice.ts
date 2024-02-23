import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import ordersService from "../services/ordersService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// interfaces
import {
    CreateCheckoutSessionParams,
    InitialOrderState,
    MyordersParams,
    OrderByOrderIdParams,
    UpdateOrderToDeliveredParams,
    UpdateOrderToPaidParams,
} from "../../interfaces/store/orders";
import { Error } from "../../interfaces/public";

const initialState: InitialOrderState = {
    // create order
    createOrderLoading: false,
    createOrderData: null,
    createOrderError: null,
    // my orders
    myOrdersLoading: false,
    myOrdersData: null,
    myOrdersError: null,
    // order by order id
    orderByOrderIdLoading: false,
    orderByOrderIdData: null,
    orderByOrderIdError: null,
    // create checkout sesstion
    createCheckoutSessionLoading: false,
    createCheckoutSessionData: null,
    createCheckoutSessionError: null,
    // update order to paid
    updateOrderToPaidLoading: false,
    updateOrderToPaidData: null,
    updateOrderToPaidError: null,
    // update order to delivered
    updateOrderToDeliveredLoading: false,
    updateOrderToDeliveredData: null,
    updateOrderToDeliveredError: null,
};

// create order
export const createOrder = createAsyncThunk("/orders", async (_, thunkAPI) => {
    try {
        const data = await ordersService.createOrder();
        await AsyncStorage.removeItem("cartItems");
        return data;
    } catch (err: Error) {
        return thunkAPI.rejectWithValue(
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        );
    }
});

// my orders
export const myOrders = createAsyncThunk(
    "/orders/myorders",
    async (args: MyordersParams, thunkAPI) => {
        try {
            return await ordersService.myOrders(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// order by order id
export const orderByOrderId = createAsyncThunk(
    "/orders/orderByOrderId",
    async (args: OrderByOrderIdParams, thunkAPI) => {
        try {
            return await ordersService.orderByOrderId(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// create checkout session
export const createCheckoutSession = createAsyncThunk(
    "/orders/createCheckoutSession",
    async (args: CreateCheckoutSessionParams, thunkAPI) => {
        try {
            return await ordersService.createCheckoutSession(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// update order to paid
export const updateOrderToPaid = createAsyncThunk(
    "/orders/updateOrderToPaid",
    async (args: UpdateOrderToPaidParams, thunkAPI) => {
        try {
            return await ordersService.updateOrderToPaid(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// update order to delivered
export const updateOrderToDelivered = createAsyncThunk(
    "/orders/updateOrderToDelivered",
    async (args: UpdateOrderToDeliveredParams, thunkAPI) => {
        try {
            return await ordersService.updateOrderToDelivered(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetCreateOrderDataError: (state) => ({
            ...state,
            createOrderData: null,
            createOrderError: null,
        }),
        resetOrderByOrderId: (state, action) => ({
            ...state,
            orderByOrderIdData: action.payload,
        }),
        resetMyOrdersData: (state, action) => ({
            ...state,
            myOrdersData: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder
            // create order
            .addCase(createOrder.pending, (state) => {
                state.createOrderLoading = true;
                state.createOrderError = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.createOrderLoading = false;
                const { data } = action.payload;
                state.createOrderData = data.order;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.createOrderLoading = false;
                state.createOrderError = action.payload;
            })
            // my orders
            .addCase(myOrders.pending, (state) => {
                state.myOrdersLoading = true;
                state.myOrdersError = null;
            })
            .addCase(myOrders.fulfilled, (state, action) => {
                state.myOrdersLoading = false;
                const { data } = action.payload;
                state.myOrdersData = data;
            })
            .addCase(myOrders.rejected, (state, action) => {
                state.myOrdersLoading = false;
                state.myOrdersError = action.payload;
            })
            // order by order id
            .addCase(orderByOrderId.pending, (state) => {
                state.orderByOrderIdLoading = true;
                state.orderByOrderIdError = null;
            })
            .addCase(orderByOrderId.fulfilled, (state, action) => {
                state.orderByOrderIdLoading = false;
                const { data } = action.payload;
                state.orderByOrderIdData = data.order;
            })
            .addCase(orderByOrderId.rejected, (state, action) => {
                state.orderByOrderIdLoading = false;
                state.orderByOrderIdError = action.payload;
            })
            // create checkout session
            .addCase(createCheckoutSession.pending, (state) => {
                state.createCheckoutSessionLoading = true;
                state.createCheckoutSessionError = null;
            })
            .addCase(createCheckoutSession.fulfilled, (state, action) => {
                state.createCheckoutSessionLoading = false;
                const { data } = action.payload;
                state.createCheckoutSessionData = data;
            })
            .addCase(createCheckoutSession.rejected, (state, action) => {
                state.createCheckoutSessionLoading = false;
                state.createCheckoutSessionError = action.payload;
            })
            // update order to paid
            .addCase(updateOrderToPaid.pending, (state) => {
                state.updateOrderToPaidLoading = true;
                state.updateOrderToPaidError = null;
            })
            .addCase(updateOrderToPaid.fulfilled, (state, action) => {
                state.updateOrderToPaidLoading = false;
                const { data } = action.payload;

                // udpate get order by id
                state.orderByOrderIdData = data.order;

                state.updateOrderToPaidData = data;
            })
            .addCase(updateOrderToPaid.rejected, (state, action) => {
                state.updateOrderToPaidLoading = false;
                state.updateOrderToPaidError = action.payload;
            })
            // update order to delivered
            .addCase(updateOrderToDelivered.pending, (state) => {
                state.updateOrderToDeliveredLoading = true;
                state.updateOrderToDeliveredError = null;
            })
            .addCase(updateOrderToDelivered.fulfilled, (state, action) => {
                state.updateOrderToDeliveredLoading = false;
                const { data } = action.payload;

                // udpate get order by id
                const currentState: InitialOrderState = current(state);
                const newOrderByOrderIdData = {
                    ...currentState.orderByOrderIdData,
                    isDelivered: data.order.isDelivered,
                    deliverAt: data.order.deliverAt,
                };
                //@ts-ignore
                state.orderByOrderIdData = newOrderByOrderIdData;

                state.updateOrderToDeliveredData = data;
            })
            .addCase(updateOrderToDelivered.rejected, (state, action) => {
                state.updateOrderToDeliveredLoading = false;
                state.updateOrderToDeliveredError = action.payload;
            });
    },
});

export const {
    reset,
    resetCreateOrderDataError,
    resetOrderByOrderId,
    resetMyOrdersData,
} = ordersSlice.actions;
export default ordersSlice.reducer;
