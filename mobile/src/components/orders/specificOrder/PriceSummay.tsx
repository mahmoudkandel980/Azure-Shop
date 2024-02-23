import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// components
import SinglePriceRow from "../../checkout/order/priceSummary/SinglePriceRow";
import DeliverButton from "../shared/DeliverButton";
import PayButton from "./PayButton";

// colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

const PriceSummary = () => {
    const { baseTextColor } = useContext(ThemeContext);

    const { orderId } = useRoute<any>().params;

    const { loginData } = useSelector((state: RootState) => state.auth);
    const { orderByOrderIdData } = useSelector(
        (state: RootState) => state.orders
    );

    const {
        creator,
        isDelivered,
        isPaid,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = orderByOrderIdData!;

    return (
        <View style={styles.container}>
            <View style={styles.priceSummary}>
                <Text style={[styles.boldText, { color: baseTextColor }]}>
                    Price Summary
                </Text>
            </View>

            <SinglePriceRow
                title='items price'
                price={totalPrice! - (shippingPrice! + taxPrice!)}
            />
            <SinglePriceRow title='shipping price' price={shippingPrice!} />
            <SinglePriceRow title='tax price' price={taxPrice!} />
            <SinglePriceRow
                title='total price'
                price={totalPrice!}
                hideBorder={
                    (isDelivered && isPaid) ||
                    (!isPaid && creator && loginData?.id !== creator.id) ||
                    (isPaid &&
                        (loginData?.role === "user" ||
                            loginData?.role === "seller"))
                }
            />
            {(isDelivered && isPaid) ||
            (!isPaid && creator && loginData?.id !== creator.id) ||
            (isPaid &&
                (loginData?.role === "user" ||
                    loginData?.role === "seller")) ? (
                <></>
            ) : (
                <View style={styles.checkoutContainer}>
                    <View style={{ paddingVertical: 8 }}>
                        {!isPaid &&
                        loginData &&
                        loginData.id &&
                        creator &&
                        creator.id &&
                        loginData.id === creator.id ? (
                            <PayButton />
                        ) : (
                            <></>
                        )}
                        {!isDelivered &&
                        isPaid &&
                        (loginData?.role === "admin" ||
                            loginData?.role === "subAdmin" ||
                            loginData?.role === "moderator") ? (
                            <DeliverButton orderId={orderId} buttonSize='big' />
                        ) : (
                            <></>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};

export default PriceSummary;

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        borderWidth: 1,
        borderColor: colors.inActiveText,
        borderRadius: 5,
        maxWidth: 450,
        flex: 1,
    },
    priceSummary: {
        paddingVertical: 8,
        alignItems: "center",
        borderBottomColor: colors.inActiveText,
        borderBottomWidth: 1,
        marginHorizontal: 10,
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    checkoutContainer: {
        paddingVertical: 8,
        alignItems: "center",
    },
});
