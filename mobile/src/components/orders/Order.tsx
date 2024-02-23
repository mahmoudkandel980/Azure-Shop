import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { orderByOrderId } from "../../store/slices/ordersSlice";

// components
import Spinner from "../shared/Spinner";
import ErrorMessage from "../shared/ErrorMessage";
import SpecificOrder from "./specificOrder/SpecificOrder";

const Order = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { orderId } = useRoute<any>().params;
    const isFocused = useIsFocused();

    const {
        orderByOrderIdData,
        orderByOrderIdLoading,
        orderByOrderIdError,
        updateOrderToDeliveredData,
    } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        if (!isFocused) return;
        if (
            !orderByOrderIdData ||
            (orderByOrderIdData && orderByOrderIdData.id !== orderId)
        ) {
            dispatch(orderByOrderId({ id: orderId }));
        }
    }, [orderId, isFocused]);

    return orderByOrderIdLoading ? (
        <Spinner />
    ) : orderByOrderIdError ? (
        <ErrorMessage>{orderByOrderIdError}</ErrorMessage>
    ) : !orderByOrderIdData?.id ? (
        <ErrorMessage>Order Not Found</ErrorMessage>
    ) : (
        <SpecificOrder {...orderByOrderIdData} />
    );
};

export default Order;
