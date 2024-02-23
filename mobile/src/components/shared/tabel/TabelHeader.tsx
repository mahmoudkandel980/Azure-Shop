import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// colors
import colors from "../../../constants/Colors";

// interfaces
import { TabelHeaderProps } from "../../../interfaces/shared";

// context
import ThemeContext from "../../../context/darkModeTheme";

const TabelHeader = (props: TabelHeaderProps) => {
    const { baseTextColor } = useContext(ThemeContext);

    return (
        <View style={styles.headerContainer}>
            {props.headerElements.map((header, i) => (
                <Text
                    style={[
                        styles.headerContent,
                        { color: baseTextColor, flex: header === "no" ? 1 : 2 },
                    ]}
                    key={i}
                >
                    {header}
                </Text>
            ))}
        </View>
    );
};

export default TabelHeader;

const styles = StyleSheet.create({
    headerContainer: {
        // flex: 1,
        flexDirection: "row",
        height: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.inActiveText,
        borderRightColor: colors.inActiveText,
        borderRightWidth: 0.5,
        marginTop: 20,
    },
    headerContent: {
        borderLeftWidth: 0.5,
        borderLeftColor: colors.inActiveText,
        textAlign: "center",
        fontWeight: "bold",
        textTransform: "capitalize",
    },
});
