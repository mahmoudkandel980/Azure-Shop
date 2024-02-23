import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { addProductToCart } from "../../../../store/slices/cartSlice";

// componets
import ConvertedPrice from "../../../shared/ConvertedPrice";
import AddRemoveCartButton from "../../../shared/AddRemoveCartButton";
import Input from "../../../shared/inputs/Input";
import SingleRow from "./SingleRow";

// colors
import colors from "../../../../constants/Colors";

// context
import ThemeContext from "../../../../context/darkModeTheme";

// interface
import { ProductStateInterface } from "../../../../interfaces/screens/products";

const PriceBox = (props: ProductStateInterface) => {
    const { productId } = useRoute<any>().params;
    const { baseTextColor } = useContext(ThemeContext);
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch<AppDispatch>();
    const { cartData } = useSelector((state: RootState) => state.cart);

    // udpate the number of products in cart
    useEffect(() => {
        dispatch(addProductToCart({ product: props, qty: quantity }));
    }, [quantity]);

    // udpate quantity if the product in cart
    useEffect(() => {
        if (cartData) {
            const productInCart = cartData?.find(
                (one) => one.product.id === productId
            );
            if (productInCart) {
                setQuantity(productInCart.qty);
            }
        }
    }, [cartData, productId]);

    const changeQuantityHandler = (newQty: string) => {
        const convertedQty = +newQty;
        if (convertedQty > props.countInStock) {
            setQuantity(props.countInStock);
        } else if (convertedQty < 1) {
            setQuantity(1);
        } else {
            setQuantity(+newQty);
        }
    };

    return (
        <View style={styles.container}>
            {props.priceDiscount ? (
                <>
                    <SingleRow
                        title='Actual Price'
                        value={
                            <ConvertedPrice
                                price={props.price}
                                oldPrice
                                color={colors.darkRed}
                            />
                        }
                    />
                    <SingleRow
                        title='Price Discount'
                        value={
                            <ConvertedPrice
                                price={props.priceDiscount}
                                color={colors.success}
                            />
                        }
                    />
                </>
            ) : (
                <></>
            )}
            <SingleRow
                title='Final Price'
                value={
                    <ConvertedPrice price={props.price - props.priceDiscount} />
                }
            />
            <SingleRow
                title='Count In Stock'
                value={
                    <Text style={[styles.rowValue, { color: baseTextColor }]}>
                        {props.countInStock}
                    </Text>
                }
            />
            <SingleRow
                title='Sold Count'
                value={
                    <Text style={[styles.rowValue, { color: baseTextColor }]}>
                        {props.soldCount}
                    </Text>
                }
            />
            <SingleRow
                title='Qty'
                value={
                    <View style={{ paddingRight: 16 }}>
                        <Input
                            onChangeText={changeQuantityHandler}
                            value={quantity.toString()}
                            inputMode='numeric'
                            type='numeric'
                        />
                    </View>
                }
            />
            <View style={styles.btnContainer}>
                <AddRemoveCartButton product={props} quantity={quantity} />
            </View>
        </View>
    );
};

export default PriceBox;

const styles = StyleSheet.create({
    container: {
        borderColor: colors.inActiveText,
        borderWidth: 1,
        marginVertical: 20,
        borderRadius: 5,
        justifyContent: "flex-end",
        maxWidth: 450,
        flex: 1,
    },
    rowValue: {
        fontWeight: "bold",
        marginLeft: 3,
        fontSize: 16,
    },
    btnContainer: {
        paddingVertical: 20,
    },
});
