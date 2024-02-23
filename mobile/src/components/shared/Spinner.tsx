import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

// color
import colors from "../../constants/Colors";

const Spinner = () => {
    return (
        <ActivityIndicator
            style={styles.spinner}
            color={colors.lightBlue}
            size='large'
        />
    );
};

export default Spinner;

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
    },
});
