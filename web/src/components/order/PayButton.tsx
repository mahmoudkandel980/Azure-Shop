import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";

import Button from "../ui/Button";
import ButtonSpinner from "../ui/ButtonSpinner";
import { createCheckoutSession as createCheckoutSessionFun } from "../../store/actions/orderActions";

import { SessionInterface } from "../../interfaces/store/order/orderInterface";
import { OrderIdInterface } from "../../interfaces/components/order";

const PayButton = (props: OrderIdInterface): JSX.Element => {
    const { orderId } = props;
    const dispatch = useDispatch<AppDispatch>();

    const { createCheckoutSession } = useSelector(
        (state) => state as SessionInterface
    );
    const { session, loading } = createCheckoutSession;

    useEffect(() => {
        if (session && session.url) {
            window.location.href = session.url;
        }
    }, [session]);

    const payHander = () => {
        if (!loading) {
            dispatch(createCheckoutSessionFun(orderId));
        }
    };

    return (
        <Button
            createBtn
            onClick={payHander}
            className='capitalize mb-4 w-fit px-10'
        >
            {!loading ? (
                "pay"
            ) : (
                <ButtonSpinner className='scale-[0.25] -mt-1 mb-0.5 w-5 h-5 px-3.5 py-4' />
            )}
        </Button>
    );
};

export default PayButton;
