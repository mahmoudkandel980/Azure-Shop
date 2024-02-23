import React, { useContext, useState } from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

// colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

// icons
import { Ionicons } from "@expo/vector-icons";

// interface
import { InputProps } from "../../../interfaces/shared";

const Input = (props: InputProps) => {
    const {
        label,
        secureTextEntry,
        type,
        hideErrorMessagePosition,
        error,
        icon,
        ...baseInputProps
    } = props;
    const { theme, baseTextColor } = useContext(ThemeContext);

    const [showPassword, setShowPassword] = useState(secureTextEntry);

    return (
        <View style={[label ? styles.container : {}, { flex: 1 }]}>
            {label ? (
                <Text
                    style={[
                        styles.label,
                        {
                            color: baseTextColor,
                        },
                    ]}
                >
                    {label}
                </Text>
            ) : (
                <></>
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    autoCapitalize='none'
                    style={[
                        styles.input,
                        {
                            color: baseTextColor,
                            borderColor:
                                theme === "dark"
                                    ? colors.inActiveText
                                    : colors.lightGray,

                            textAlign: type === "numeric" ? "center" : "left",
                            paddingVertical: type === "numeric" ? 0 : 5,
                            height: props.multiline ? 100 : "auto",
                            textAlignVertical: props.multiline ? "top" : "auto",
                        },
                    ]}
                    placeholderTextColor={
                        theme === "dark"
                            ? colors.inActiveText
                            : colors.lightGray
                    }
                    secureTextEntry={showPassword}
                    {...baseInputProps}
                />
                {icon ? <View style={styles.icon}>{icon}</View> : <></>}
                {type === "password" ? (
                    <TouchableOpacity
                        onPress={() =>
                            setShowPassword((prevState) => !prevState)
                        }
                        style={styles.icon}
                    >
                        <Ionicons
                            name={showPassword ? "eye" : "eye-off"}
                            size={20}
                            color={baseTextColor}
                        />
                    </TouchableOpacity>
                ) : (
                    <></>
                )}
            </View>
            {hideErrorMessagePosition ? (
                <></>
            ) : label ? (
                <Text style={styles.errorMessage}>{error}</Text>
            ) : (
                <></>
            )}
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
    },
    label: {
        fontWeight: "400",
        fontSize: 16,
        marginBottom: 5,
        textTransform: "capitalize",
    },
    inputContainer: {
        position: "relative",
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 10,
    },
    icon: {
        position: "absolute",
        right: 15,
        top: 10,
    },
    errorMessage: {
        fontSize: 14,
        marginTop: 1,
        marginLeft: 5,
        fontWeight: "500",
        color: colors.darkRed,
        opacity: 0.9,
        textTransform: "capitalize",
    },
});
