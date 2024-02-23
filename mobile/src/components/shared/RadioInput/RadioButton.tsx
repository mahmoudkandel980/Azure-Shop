import React, { useContext } from "react";
import { PixelRatio, Pressable, StyleSheet, Text, View } from "react-native";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
import { RadioButtonProps } from "../../../interfaces/shared";

export default function RadioButton(props: RadioButtonProps) {
    const { baseTextColor } = useContext(ThemeContext);
    const {
        accessibilityLabel,
        borderColor,
        borderSize = 2,
        color = baseTextColor,
        containerStyle,
        description,
        descriptionStyle,
        disabled = false,
        label,
        labelStyle,
        layout = "row",
        onPress,
        selected = false,
        size = 24,
        value,
    } = props;
    const borderWidth = PixelRatio.roundToNearestPixel(borderSize);
    const sizeHalf = PixelRatio.roundToNearestPixel(size * 0.5);
    const sizeFull = PixelRatio.roundToNearestPixel(size);

    let orientation: any = { flexDirection: "row" };
    let margin: any = { marginLeft: 10 };

    if (layout === "column") {
        orientation = { alignItems: "center" };
        margin = { marginTop: 10 };
    }

    function handlePress() {
        if (onPress) {
            onPress(value!);
        }
    }

    return (
        <>
            <Pressable
                accessibilityHint={description}
                accessibilityLabel={accessibilityLabel || label}
                accessibilityRole='radio'
                accessibilityState={{ checked: selected, disabled }}
                disabled={disabled}
                onPress={handlePress}
                style={[
                    styles.container,
                    orientation,
                    { opacity: disabled ? 0.2 : 1 },
                    containerStyle,
                ]}
            >
                <View
                    style={[
                        styles.border,
                        {
                            borderColor: borderColor || color,
                            borderWidth,
                            width: sizeFull,
                            height: sizeFull,
                            borderRadius: sizeHalf,
                        },
                    ]}
                >
                    {selected && (
                        <View
                            style={{
                                backgroundColor: color,
                                width: sizeHalf,
                                height: sizeHalf,
                                borderRadius: sizeHalf,
                            }}
                        />
                    )}
                </View>
                {Boolean(label) && (
                    <Text
                        style={[margin, labelStyle, { color: baseTextColor }]}
                    >
                        {label}
                    </Text>
                )}
            </Pressable>
            {Boolean(description) && (
                <Text style={[margin, descriptionStyle]}>{description}</Text>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginHorizontal: 16,
        marginVertical: 8,
    },
    border: {
        justifyContent: "center",
        alignItems: "center",
    },
});
