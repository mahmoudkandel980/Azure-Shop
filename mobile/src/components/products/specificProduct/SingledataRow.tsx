import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
import { SingledataRowProps } from "../../../interfaces/screens/products";

const SingledataRow = (props: SingledataRowProps) => {
    const { description, title } = props;
    const { baseTextColor } = useContext(ThemeContext);

    return (
        <View style={styles.contentContainer}>
            <Text style={[styles.title, { color: baseTextColor }]}>
                {title}
            </Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

export default SingledataRow;

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 10,
        borderBottomColor: colors.inActiveText,
        borderBottomWidth: 1,
        flexDirection: "row",
    },
    title: {
        fontWeight: "bold",
        paddingRight: 10,
    },
    description: {
        color: colors.inActiveText,
        fontWeight: "bold",
        flex: 1,
        flexWrap: "wrap",
    },
});
