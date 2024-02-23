import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
import { SingleShippingRowProps } from "../../../interfaces/screens/cart";

const SingleShippingRow = (props: SingleShippingRowProps) => {
    const { children, title } = props;
    const { baseTextColor } = useContext(ThemeContext);

    return (
        <View style={styles.shippingDatacontainer}>
            <Text
                style={[styles.shippingContentTitle, { color: baseTextColor }]}
            >
                {title}:
            </Text>
            <Text
                style={{
                    color: baseTextColor,
                    opacity: 0.8,
                    fontSize: 13,
                }}
            >
                {children}.
            </Text>
        </View>
    );
};

export default SingleShippingRow;

const styles = StyleSheet.create({
    shippingDatacontainer: {
        flexDirection: "row",
        columnGap: 5,
        marginBottom: 3,
    },
    shippingContentTitle: {
        textTransform: "capitalize",
    },
});
