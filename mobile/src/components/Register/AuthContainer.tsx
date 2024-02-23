import React, { useContext, ReactNode } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// components
import Header from "../shared/Header";
import Button from "../shared/Button";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// interface
import { AuthContainerI } from "../../interfaces/screens/regester";

const AuthContainer = (props: AuthContainerI) => {
    const { header, children } = props;

    const { theme } = useContext(ThemeContext);

    const navigation = useNavigation<StackNavigationProp<any>>();
    const { name } = useRoute();

    const navToSignUpHandler = () => {
        navigation.navigate(name === "Login" ? "Signup" : "Login");
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewContainer}>
                <Header>{header}</Header>
                <View style={styles.formContainer}>
                    {children}
                    <View
                        style={[
                            styles.switchContainer,
                            {
                                borderColor:
                                    theme === "dark"
                                        ? colors.inActiveText
                                        : colors.lightGray,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.switchText,
                                {
                                    color:
                                        theme === "dark"
                                            ? colors.whiteMilk
                                            : colors.smothDark,
                                },
                            ]}
                        >
                            Switch To
                        </Text>
                        <TouchableOpacity style={styles.itemsContainer}>
                            <Button navgationBtn onPress={navToSignUpHandler}>
                                {name === "Login" ? "Sign Up" : "Log In"}
                            </Button>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default AuthContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    scrollViewContainer: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: colors.inActiveText,
        maxWidth: 500,
    },
    formContainer: {
        marginTop: 50,
        paddingHorizontal: 25,
    },
    itemsContainer: {
        marginTop: 30,
        alignItems: "center",
        marginBottom: 50,
    },
    switchContainer: {
        marginTop: 30,
        borderTopWidth: 1,
    },
    switchText: {
        fontSize: 18,
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
        fontWeight: "bold",
    },
});
