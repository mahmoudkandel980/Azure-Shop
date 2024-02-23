import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// components
import ConvertedPrice from "../../../shared/ConvertedPrice";

// colors
import colors from "../../../../constants/Colors";

// context
import ThemeContext from "../../../../context/darkModeTheme";

// interface
import { SinglePriceProps } from "../../../../interfaces/screens/cart";

const SinglePriceRow = (props: SinglePriceProps) => {
    const { price, title, hideBorder } = props;
    const { baseTextColor } = useContext(ThemeContext);

    return (
        <View
            style={[
                styles.container,
                { borderBottomWidth: hideBorder ? 0 : 1 },
            ]}
        >
            <Text style={[styles.boldText, { color: baseTextColor }]}>
                {title}
            </Text>
            <View style={styles.price}>
                <ConvertedPrice price={price} />
            </View>
        </View>
    );
};

export default SinglePriceRow;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        borderBottomColor: colors.inActiveText,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 16,
        flex: 1,
        marginLeft: 40,
    },
    price: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: 40,
    },
});
