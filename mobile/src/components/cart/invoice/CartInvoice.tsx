import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// components
import ConvertedPrice from "../../shared/ConvertedPrice";
import SingleCartItem from "./SingleCartItem";
import Button from "../../shared/Button";
import ShouldAuthorized from "../../shared/ShouldAuthorized";

// colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

const CartInvoice = () => {
    const [itemsLength, setItemsLength] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const { baseTextColor } = useContext(ThemeContext);

    const navigation = useNavigation<NavigationProp<any>>();

    const { cartData } = useSelector((state: RootState) => state.cart);
    const { loginData } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        setItemsLength(0);
        setTotalPrice(0);
        cartData &&
            cartData.forEach((element) => {
                setItemsLength((prevState) => prevState + element.qty);
                setTotalPrice(
                    (prevState) =>
                        prevState +
                        element.qty *
                            (element.product.price -
                                element.product.priceDiscount)
                );
            });
    }, [cartData]);

    const navToCheckoutHandler = () => {
        navigation.navigate("Cart", { screen: "Shipping" });
    };

    return (
        <View style={styles.container}>
            <View style={styles.totalItemsTextContainer}>
                <Text style={[styles.boldText, { color: baseTextColor }]}>
                    Total Items ({itemsLength})
                </Text>
            </View>
            <View style={styles.totalItems}>
                <FlatList
                    data={cartData}
                    keyExtractor={(cart, i) => `${cart.product.id}${i}`}
                    renderItem={({ item }) => <SingleCartItem {...item} />}
                />
            </View>
            <View style={styles.totalPriceContainer}>
                <Text
                    style={[
                        styles.boldText,
                        { color: baseTextColor, marginRight: 10 },
                    ]}
                >
                    Total Price:
                </Text>
                <ConvertedPrice price={totalPrice} />
            </View>
            <View style={styles.checkoutContainer}>
                {loginData?.token ? (
                    <View style={{ paddingVertical: 8 }}>
                        <Button onPress={navToCheckoutHandler}>checkout</Button>
                    </View>
                ) : (
                    <ShouldAuthorized>
                        please signup to checkout
                    </ShouldAuthorized>
                )}
            </View>
        </View>
    );
};

export default CartInvoice;

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        // flex: 1,
        borderWidth: 1,
        borderColor: colors.inActiveText,
        borderRadius: 5,
    },
    totalItemsTextContainer: {
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
    totalItems: {
        paddingVertical: 8,
        borderBottomColor: colors.inActiveText,
        borderBottomWidth: 1,
        maxHeight: 200,
    },
    totalPriceContainer: {
        paddingVertical: 8,
        borderBottomColor: colors.inActiveText,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 20,
    },
    checkoutContainer: {
        paddingVertical: 8,
        alignItems: "center",
    },
});
