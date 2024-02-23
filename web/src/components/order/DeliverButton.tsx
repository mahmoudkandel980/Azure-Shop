import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { updateOrderToDelivered as updateOrderToDeliveredFun } from "../../store/actions/orderActions";

import ConfirmAccept from "../models/ConfirmAccept";
import Backdrop from "../models/Backdrop";

import Button from "../ui/Button";
import ButtonSpinner from "../ui/ButtonSpinner";

import { DeliveredButtonInterface } from "../../interfaces/components/order";
import { OrderIsDeliveredInterface } from "../../interfaces/store/order/orderInterface";

const DeliverButton = (props: DeliveredButtonInterface): JSX.Element => {
    const { orderId, order } = props;
    const dispatch = useDispatch<AppDispatch>();
    const { pathname } = useLocation();

    const [acceptToBeDelivered, setAcceptToBeDelivered] = useState({
        order: {},
        showAcceptModel: false,
    });

    const { updateOrderToDelivered } = useSelector(
        (state) => state as OrderIsDeliveredInterface
    );
    const { loading } = updateOrderToDelivered;

    const hideUserModelHandler = () => {
        setAcceptToBeDelivered({ order: {}, showAcceptModel: false });
        props.editOrder(null);
    };

    const deliverHander = () => {
        if (!loading) {
            props.editOrder(order);
            setAcceptToBeDelivered({ order: order, showAcceptModel: true });
        }
    };

    const confirmAcceptHandler = (confirmAcception: boolean) => {
        if (confirmAcception) {
            dispatch(updateOrderToDeliveredFun(orderId));
        } else {
            // if false close the model only
            hideUserModelHandler();
        }
    };

    return (
        <>
            <Button
                editBtn
                onClick={deliverHander}
                className={`${
                    pathname === "/dashboard/orders"
                        ? "w-fit py-0 pt-0.5 text-[10px] sm:text-sm font-normal"
                        : "px-5 mt-1 mb-4"
                } w-fit`}
            >
                {!loading ? (
                    "delivered"
                ) : (
                    <ButtonSpinner className='scale-[0.2] -mt-2 mb-0.5  w-5 h-5 px-4 sm:px-7 py-3' />
                )}
            </Button>

            {acceptToBeDelivered.showAcceptModel && (
                <Backdrop onClose={hideUserModelHandler} />
            )}

            <ConfirmAccept
                loading={loading}
                showAcceptModel={acceptToBeDelivered.showAcceptModel}
                confirmAcceptHandler={confirmAcceptHandler}
                header={`Confirm acceptance for order has delivered`}
                element={order.id}
                text={`Be sure to hand over the order to the customer, please note that you do not have return authorization if you confirm.`}
            />
        </>
    );
};

export default DeliverButton;
