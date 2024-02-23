import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { cart } from "../../store/slices/cartSlice";

// components
import Spinner from "../shared/Spinner";
import ErrorMessage from "../shared/ErrorMessage";
import SingleCart from "./SingleCart";
import CartInvoice from "./invoice/CartInvoice";

const Cart = () => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch<AppDispatch>();
    const { cartLoading, cartData, cartError } = useSelector(
        (state: RootState) => state.cart
    );

    useEffect(() => {
        if (!isFocused) return;
        dispatch(cart());
    }, [isFocused]);

    return cartLoading && !cartData ? (
        <Spinner />
    ) : cartError ? (
        <ErrorMessage>{cartError}</ErrorMessage>
    ) : cartData?.length === 0 ? (
        <ErrorMessage>
            Your cart is Empty try to add product to your cart
        </ErrorMessage>
    ) : (
        cartData &&
        cartData.length > 0 && (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={cartData}
                        keyExtractor={(cart, i) => `${cart.product.id}${i}`}
                        initialNumToRender={4}
                        refreshing={cartLoading}
                        renderItem={({ item }) => <SingleCart {...item} />}
                    />
                </View>
                <CartInvoice />
            </View>
        )
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
});
