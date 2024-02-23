import React, { useContext } from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View,
} from "react-native";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// Interface
import { ButtonProps } from "../../interfaces/shared";

const Button = (props: ButtonProps) => {
    const {
        icon,
        children,
        onPress,
        deleteBtn,
        editBtn,
        createBtn,
        navgationBtn,
        loading,
        imgBtn,
        navigation,
        small,
    } = props;

    const { theme } = useContext(ThemeContext);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                {
                    backgroundColor: createBtn
                        ? colors.success
                        : editBtn
                        ? colors.stars
                        : deleteBtn
                        ? colors.darkRed
                        : navgationBtn
                        ? colors.lightBlue
                        : imgBtn
                        ? colors.lightDark
                        : theme === "dark"
                        ? colors.whiteMilk
                        : colors.smothDark,
                    opacity: loading ? 0.5 : 1,
                    borderRadius: small ? 3 : 5,
                    paddingHorizontal: small ? 4 : imgBtn ? 5 : 30,
                    paddingVertical: small ? 2 : 5,
                },
            ]}
        >
            {icon && (
                <View
                    style={{
                        marginRight: children ? 5 : 0,
                        opacity: loading ? 0 : 1,
                    }}
                >
                    {icon}
                </View>
            )}
            {children ? (
                <Text
                    style={[
                        styles.buttonText,
                        {
                            color:
                                deleteBtn ||
                                editBtn ||
                                createBtn ||
                                navgationBtn
                                    ? colors.whiteMilk
                                    : theme === "dark"
                                    ? colors.smothDark
                                    : colors.whiteMilk,
                            opacity: loading ? 0 : 1,
                            fontSize: small ? 12 : 18,
                        },
                    ]}
                >
                    {children}
                </Text>
            ) : (
                <></>
            )}
            <ActivityIndicator
                style={[
                    styles.activityIndicator,
                    { opacity: !loading ? 0 : 1 },
                ]}
                color={
                    deleteBtn || editBtn || createBtn
                        ? colors.whiteMilk
                        : theme === "dark"
                        ? colors.smothDark
                        : colors.whiteMilk
                }
            />
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    buttonText: {
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    activityIndicator: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
});
