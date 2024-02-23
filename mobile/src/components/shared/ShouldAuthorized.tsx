import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";

// componets
import Button from "./Button";

// colors
import colors from "../../constants/Colors";

// interfaces
import { ShouldAuthorizedProps } from "../../interfaces/shared";

const ShouldAuthorized = (props: ShouldAuthorizedProps) => {
    const navigation = useNavigation<NavigationProp<any>>();

    const navToRegisterPage = () => {
        navigation.navigate("Register", { screen: "Signup" });
    };
    return (
        <View>
            <Text style={styles.notAuthorizedText}>{props.children}</Text>
            <View>
                <Button onPress={navToRegisterPage}>sign up</Button>
            </View>
        </View>
    );
};

export default ShouldAuthorized;

const styles = StyleSheet.create({
    notAuthorizedText: {
        color: colors.stars,
        textTransform: "capitalize",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
        fontSize: 16,
    },
});
