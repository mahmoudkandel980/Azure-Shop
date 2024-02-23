import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// colors
import colors from "../../../../constants/Colors";

// context
import ThemeContext from "../../../../context/darkModeTheme";

// interface
import { SingleRowProps } from "../../../../interfaces/screens/products";

const SingleRow = (props: SingleRowProps) => {
    const { baseTextColor } = useContext(ThemeContext);

    return (
        <View style={styles.row}>
            <View style={styles.sameWidth}>
                <Text style={[styles.rowTitle, { color: baseTextColor }]}>
                    {props.title}
                </Text>
            </View>
            <View style={styles.border} />
            <View style={styles.sameWidth}>{props.value}</View>
        </View>
    );
};

export default SingleRow;

const styles = StyleSheet.create({
    row: {
        borderBottomColor: colors.inActiveText,
        borderBottomWidth: 1,
        flexDirection: "row",
        flex: 1,
    },
    border: {
        width: 1,
        backgroundColor: colors.inActiveText,
    },
    rowTitle: {
        fontWeight: "bold",
    },
    sameWidth: {
        justifyContent: "center",
        flex: 1,
        paddingLeft: 20,
        paddingVertical: 5,
    },
});
