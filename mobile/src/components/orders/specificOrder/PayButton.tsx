import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    createCheckoutSession,
    updateOrderToPaid,
} from "../../../store/slices/ordersSlice";

// components
import Button from "../../shared/Button";

// colors
import colors from "../../../constants/Colors";

// icons
import { Entypo } from "@expo/vector-icons";

// Toast
import Toast from "react-native-toast-message";

// stripe
import { useStripe } from "@stripe/stripe-react-native";

// interfaces
import { CheckoutProcess } from "../../../interfaces/store/orders";

const PayButton = () => {
    const [loading, setLoading] = useState(false);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const dispatch = useDispatch<AppDispatch>();
    const { orderId } = useRoute<any>().params;

    const {
        createCheckoutSessionData,
        orderByOrderIdData,
        updateOrderToPaidLoading,
    } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        if (orderByOrderIdData && orderByOrderIdData.isPaid) return;
        dispatch(createCheckoutSession({ id: orderId }));
    }, [orderByOrderIdData]);

    useEffect(() => {
        if (!createCheckoutSession) return;
        initializePaymentSheet();
    }, [createCheckoutSessionData]);

    const initializePaymentSheet = async () => {
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            paymentIntentClientSecret:
                createCheckoutSessionData?.paymentIntent?.client_secret,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: "Jane Doe",
            },
        });
        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Toast.show({
                type: "error",
                text1: "Something went wrong",
            });
        } else {
            dispatch(
                updateOrderToPaid({
                    id: orderId,
                    process: CheckoutProcess.succussed,
                })
            );
        }
    };

    return (
        loading && (
            <Button
                createBtn
                loading={updateOrderToPaidLoading}
                onPress={openPaymentSheet}
                icon={
                    <Entypo name='credit-card' color={colors.white} size={16} />
                }
            >
                pay
            </Button>
        )
    );
};

export default PayButton;
