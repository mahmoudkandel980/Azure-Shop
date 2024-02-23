import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// context
import ThemeContext from "../../../context/darkModeTheme";

// components
import ConvertedPrice from "../../shared/ConvertedPrice";
import Image from "../../shared/Image";

// interfaces
import { CartItem } from "../../../interfaces/screens/cart";

const SingleCartItem = (props: CartItem) => {
    const {
        product: { imageUrl, price, priceDiscount },
        qty,
    } = props;

    const { theme, baseTextColor } = useContext(ThemeContext);

    return (
        <View style={style.container}>
            <View style={[style.mathematicContainer, style.sameWidh]}>
                <Text style={[style.sameWidh, { color: baseTextColor }]}>
                    {qty}
                </Text>
                <Text style={[style.sameWidh, { color: baseTextColor }]}>
                    X
                </Text>
            </View>
            <View style={style.sameWidh}>
                <Image width={30} height={30} borderRadius={5} uri={imageUrl} />
            </View>
            <View style={style.sameWidh}>
                <ConvertedPrice price={price - priceDiscount} size={14} />
            </View>
            <View style={[style.mathematicContainer, style.sameWidh]}>
                <Text style={[style.sameWidh, { color: baseTextColor }]}>
                    =
                </Text>
                <Text style={[style.sameWidh, { color: baseTextColor }]}>
                    <ConvertedPrice
                        price={qty * (price - priceDiscount)}
                        size={14}
                    />
                </Text>
            </View>
        </View>
    );
};

export default SingleCartItem;

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 5,
        alignItems: "center",
        paddingHorizontal: 10,
    },
    sameWidh: {
        flex: 1,
        textAlign: "center",
    },
    mathematicContainer: {
        flexDirection: "row",
    },
});
