import React from "react";
import { Text, StyleSheet, View } from "react-native";

// interfaces
import { ErrorMessageProps } from "../../interfaces/shared";

// colors
import colors from "../../constants/Colors";

const ErrorMessage = (props: ErrorMessageProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    );
};

export default ErrorMessage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: colors.darkRed,
        textAlign: "center",
        fontWeight: "bold",
    },
});
