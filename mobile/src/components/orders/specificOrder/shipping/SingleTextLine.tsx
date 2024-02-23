import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// context
import ThemeContext from "../../../../context/darkModeTheme";

// interfaces
import { SingleTextLineProps } from "../../../../interfaces/screens/order";

const SingleTextLine = (props: SingleTextLineProps) => {
    const { content, title, color, small, notCapitalize } = props;
    const { baseTextColor } = useContext(ThemeContext);

    return (
        <View
            style={[
                styles.descriptionContainer,
                { alignItems: small ? "center" : "flex-start" },
            ]}
        >
            <Text
                style={[
                    styles.title,
                    { color: baseTextColor, fontSize: small ? 14 : 15 },
                ]}
            >
                {title}:
            </Text>
            <Text
                style={[
                    styles.content,
                    {
                        color: color ? color : baseTextColor,
                        fontSize: small ? 12 : 14,
                        textTransform: notCapitalize ? "none" : "capitalize",
                    },
                ]}
            >
                {content}.
            </Text>
        </View>
    );
};

export default SingleTextLine;

const styles = StyleSheet.create({
    descriptionContainer: {
        flexDirection: "row",
        columnGap: 3,
    },
    title: {
        fontWeight: "500",
        textTransform: "capitalize",
    },
    content: {
        fontSize: 12,
        flexShrink: 1,
    },
});
