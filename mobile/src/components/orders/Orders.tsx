import React, { useEffect } from "react";
import { useIsFocused, useRoute, RouteProp } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { myOrders } from "../../store/slices/ordersSlice";

// components
import Spinner from "../shared/Spinner";
import ErrorMessage from "../shared/ErrorMessage";
import OrdersTabelHeader from "./orders/OrdersTabelHeader";
import OrdersTabelBody from "./orders/OrdersTabelBody";
import Pagination from "../shared/pagination/Pagination";
import ScrollViewLayout from "../layout/ScrollViewLayout";
import Header from "../shared/Header";

const Orders = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isFocused = useIsFocused();
    const route = useRoute<RouteProp<any>>();
    const page = route.params && route.params.page ? route.params.page : 1;

    const { myOrdersData, myOrdersError, myOrdersLoading } = useSelector(
        (state: RootState) => state.orders
    );

    useEffect(() => {
        if (!isFocused) return;
        dispatch(myOrders({ page: +page }));
    }, [isFocused, page]);

    return (
        <>
            {myOrdersLoading ? (
                <Spinner />
            ) : myOrdersError ? (
                <ErrorMessage>{myOrdersError}</ErrorMessage>
            ) : myOrdersData?.orders.length === 0 ? (
                <ErrorMessage> You have not any orders yet</ErrorMessage>
            ) : (
                myOrdersData?.orders && (
                    <ScrollViewLayout>
                        <OrdersTabelHeader />
                        <OrdersTabelBody {...myOrdersData} />
                        <Pagination total_pages={myOrdersData.total_pages} />
                    </ScrollViewLayout>
                )
            )}
        </>
    );
};

export default Orders;
