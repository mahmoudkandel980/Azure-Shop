import { configureStore } from "@reduxjs/toolkit";

import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "react";

// Slices
import authSlice from "./slices/authSlice";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";
import wishListSlice from "./slices/wishListSlice";
import reviewsSlice from "./slices/reviewsSlice";
import userSlice from "./slices/userSlice";
import ordersSlice from "./slices/ordersSlice";
import dashbordUsersSlice from "./slices/dashboard/userSlice";
import dashbordProductsOrdersSlice from "./slices/dashboard/productOrderSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        products: productsSlice,
        cart: cartSlice,
        wishList: wishListSlice,
        reviews: reviewsSlice,
        orders: ordersSlice,
        // dashboard
        dashbordUsers: dashbordUsersSlice,
        dashbordProductsOrders: dashbordProductsOrdersSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    // devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Dispatch<AnyAction> &
    ThunkDispatch<RootState, null, AnyAction>;

export default store;
