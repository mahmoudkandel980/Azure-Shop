import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
    createOrder,
    resetCreateOrderDataError,
} from "../../../../store/slices/ordersSlice";
import { reset } from "../../../../store/slices/cartSlice";

// components
import SinglePriceRow from "./SinglePriceRow";

// colors
import colors from "../../../../constants/Colors";

// context
import ThemeContext from "../../../../context/darkModeTheme";
import Button from "../../../shared/Button";

const PriceSummary = () => {
    const { baseTextColor } = useContext(ThemeContext);

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<any>>();

    const { cartData } = useSelector((state: RootState) => state.cart);
    const { createOrderData, createOrderLoading } = useSelector(
        (state: RootState) => state.orders
    );

    // Effect to navigaion to order id screen
    useEffect(() => {
        if (createOrderData) {
            navigation.navigate("OrdersScreens", {
                screen: "Order",
                params: { orderId: createOrderData.id },
            });
            dispatch(resetCreateOrderDataError());
            dispatch(reset());
        }
    }, [createOrderData]);

    // Calcualte prices
    const addDecimals = (num: number) => {
        return +(Math.round(+num * 100) / 100).toFixed(2);
    };
    const itemsPrice = addDecimals(
        cartData
            ? cartData.reduce(
                  (acc: number, item) =>
                      acc +
                      item.qty *
                          (+item.product.price - +item.product.priceDiscount),
                  0
              )
            : 0
    );
    const shippingPrice = addDecimals(
        itemsPrice > 100 ? itemsPrice * (0.5 / 100) : 20
    );
    const taxPrice = addDecimals(Number((0.03 * itemsPrice).toFixed(2)));
    const totalPrice = addDecimals(+itemsPrice + +taxPrice + +shippingPrice);

    // create order
    const createOrderHandler = () => {
        dispatch(createOrder());
    };

    return (
        <View style={styles.PriceBoxContainer}>
            <View style={styles.container}>
                <View style={styles.priceSummary}>
                    <Text style={[styles.boldText, { color: baseTextColor }]}>
                        Price Summary
                    </Text>
                </View>

                <SinglePriceRow title='items price' price={itemsPrice} />
                <SinglePriceRow title='shipping price' price={shippingPrice} />
                <SinglePriceRow title='tax price' price={taxPrice} />
                <SinglePriceRow title='total price' price={totalPrice} />
                <View style={styles.checkoutContainer}>
                    <View style={{ paddingVertical: 8 }}>
                        <Button
                            onPress={createOrderHandler}
                            loading={createOrderLoading}
                        >
                            order
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PriceSummary;

const styles = StyleSheet.create({
    PriceBoxContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    container: {
        marginVertical: 30,
        borderWidth: 1,
        borderColor: colors.inActiveText,
        borderRadius: 5,
        maxWidth: 500,
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
