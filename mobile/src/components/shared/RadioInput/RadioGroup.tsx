import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

// components
import RadioButton from "./RadioButton";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
import { RadioGroupProps } from "../../../interfaces/shared";

export default function RadioGroup({
    accessibilityLabel,
    containerStyle,
    layout = "column",
    onPress,
    radioButtons,
    selectedValue,
    label,
}: RadioGroupProps) {
    const { baseTextColor } = useContext(ThemeContext);

    function handlePress(value: string) {
        if (value !== selectedValue && onPress) {
            onPress(value);
        }
    }

    return (
        <>
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
            <View
                accessibilityLabel={accessibilityLabel}
                accessibilityRole='radiogroup'
                style={[
                    styles.container,
                    { flexDirection: layout },
                    containerStyle,
                ]}
            >
                {radioButtons.map((button) => (
                    <RadioButton
                        {...button}
                        key={button.value}
                        selected={button.value === selectedValue}
                        onPress={() => handlePress(button.value!)}
                    />
                ))}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexWrap: "wrap",
        paddingBottom: 10,
    },
    label: {
        fontWeight: "400",
        fontSize: 16,
        marginBottom: 5,
        textTransform: "capitalize",
    },
});
