import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";

// icons
import { Feather } from "@expo/vector-icons";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// interface
import { ConvertedPriceProps } from "../../interfaces/shared";

const ConvertedPrice = (props: ConvertedPriceProps) => {
    const { price, oldPrice, color, size } = props;
    const { baseTextColor } = useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Feather
                name='dollar-sign'
                size={size ? size : 16}
                color={
                    color
                        ? color
                        : oldPrice
                        ? colors.inActiveText
                        : baseTextColor
                }
            />
            <Text
                style={[
                    styles.priceText,
                    {
                        color: color
                            ? color
                            : oldPrice
                            ? colors.inActiveText
                            : baseTextColor,
                        fontSize: size ? size : 16,
                        textDecorationLine: oldPrice ? "line-through" : "none",
                        textDecorationColor: colors.inActiveText,
                    },
                ]}
            >
                {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
        </View>
    );
};

export default ConvertedPrice;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    priceText: {
        fontWeight: "bold",
        marginLeft: 1,
        textDecorationLine: "line-through",
    },
});
