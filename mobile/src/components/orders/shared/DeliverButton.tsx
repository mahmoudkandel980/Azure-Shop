import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { updateOrderToDelivered } from "../../../store/slices/ordersSlice";

// components
import Button from "../../shared/Button";

// interfaces
import { DeliverButtonProps } from "../../../interfaces/screens/order";

const DeliverButton = (props: DeliverButtonProps) => {
    const { buttonSize, orderId } = props;
    const dispatch = useDispatch<AppDispatch>();

    const { updateOrderToDeliveredLoading } = useSelector(
        (state: RootState) => state.orders
    );

    const updateOrderToDeliveredHandler = () => {
        dispatch(updateOrderToDelivered({ id: orderId }));
    };

    return (
        <Button
            navgationBtn
            small={buttonSize === "small" ? true : false}
            loading={updateOrderToDeliveredLoading}
            onPress={updateOrderToDeliveredHandler}
        >
            delivered
        </Button>
    );
};

export default DeliverButton;
