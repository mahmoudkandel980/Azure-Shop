import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    addProductToCart,
    deleteProductFromCart,
} from "../../store/slices/cartSlice";

// components
import ConvertedPrice from "../shared/ConvertedPrice";
import Input from "../shared/inputs/Input";
import Button from "../shared/Button";
import Image from "../shared/Image";

// icons
import { AntDesign } from "@expo/vector-icons";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// interfaces
import { CartItem } from "../../interfaces/screens/cart";

const SingleCart = (props: CartItem) => {
    const { product, qty } = props;
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState(qty || 1);
    const { baseTextColor, baseBgColor } = useContext(ThemeContext);

    const navigation = useNavigation<NavigationProp<any>>();
    const { deleteProductFromCartLoading } = useSelector(
        (state: RootState) => state.cart
    );
    const dispatch = useDispatch<AppDispatch>();

    // udpate the number of products in cart
    useEffect(() => {
        dispatch(addProductToCart({ product: product, qty: quantity }));
    }, [quantity]);

    const changeQuantityHandler = (newQty: string) => {
        const convertedQty = +newQty;
        if (convertedQty > product.countInStock) {
            setQuantity(product.countInStock);
        } else if (convertedQty < 1) {
            setQuantity(1);
        } else {
            setQuantity(+newQty);
        }
    };

    const navToProductPage = () => {
        navigation.navigate("Product", { productId: product.id });
    };

    const deleteProductFromCartHandler = () => {
        setProductId(product.id);
        dispatch(deleteProductFromCart({ id: product.id }));
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: props.product.creatorActiveStatus
                        ? baseBgColor
                        : colors.lighterRed,
                },
            ]}
        >
            <Image
                width={40}
                height={40}
                borderRadius={5}
                uri={product.imageUrl}
            />
            <TouchableOpacity
                style={[styles.sameWidth, { flex: 3 }]}
                onPress={navToProductPage}
            >
                <Text
                    style={[
                        styles.name,
                        {
                            color: baseTextColor,
                            borderBottomColor: baseTextColor,
                        },
                    ]}
                >
                    {product.name.length > 15
                        ? product.name.slice(0, 15) + "..."
                        : product.name}
                </Text>
            </TouchableOpacity>
            <View style={styles.sameWidth}>
                <ConvertedPrice
                    size={13}
                    price={product.price - product.priceDiscount}
                />
            </View>
            <View style={styles.sameWidth}>
                <Input
                    onChangeText={changeQuantityHandler}
                    value={quantity.toString()}
                    inputMode='numeric'
                    type='numeric'
                />
            </View>
            <View style={styles.sameWidth}>
                <Button
                    onPress={deleteProductFromCartHandler}
                    imgBtn
                    loading={
                        deleteProductFromCartLoading && productId === product.id
                    }
                    deleteBtn
                    icon={
                        <AntDesign
                            name='delete'
                            size={16}
                            color={colors.white}
                        />
                    }
                />
            </View>
        </View>
    );
};

export default SingleCart;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBlockColor: colors.inActiveText,
        flexDirection: "row",
        flex: 1,
        width: "100%",
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    name: {
        fontSize: 13,
        borderBottomWidth: 1,
    },
    sameWidth: {
        justifyContent: "center",
        alignItems: "flex-start",
        flex: 1,
        paddingLeft: 20,
        paddingVertical: 5,
    },
});
