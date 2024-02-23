import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
import { PaginationBtnProps } from "../../../interfaces/store/dashboard/users";

const PaginationBtn = (props: PaginationBtnProps) => {
    const {
        children,
        navigationContent: { name, page, params },
        display,
        currentPage,
    } = props;
    const { baseTextColor, theme } = useContext(ThemeContext);

    const navigation = useNavigation<NavigationProp<any>>();

    const navToTargetPage = () => {
        navigation.navigate(name, { params, page: page });
    };

    return (
        <TouchableOpacity
            onPress={navToTargetPage}
            style={[
                styles.buttonContainer,
                {
                    display: display ? display : "flex",
                    backgroundColor: currentPage
                        ? theme === "dark"
                            ? colors.smothDark
                            : colors.white
                        : theme === "dark"
                        ? colors.darkBody
                        : colors.whiteMilk,
                },
            ]}
        >
            <Text style={[styles.button, { color: baseTextColor }]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

export default PaginationBtn;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 50,
        columnGap: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        padding: 8,
        paddingHorizontal: 12,
        borderColor: colors.inActiveText,
        borderWidth: 0.25,
        borderRadius: 5,
    },
    button: {
        fontWeight: "500",
        fontSize: 12,
        textTransform: "capitalize",
    },
});
