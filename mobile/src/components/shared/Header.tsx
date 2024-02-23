import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";

// colors
import colors from "../../constants/Colors";

// Context
import ThemeContext from "../../context/darkModeTheme";

// Interface
import { HeaderProps } from "../../interfaces/shared";

const Header = (props: HeaderProps) => {
    const { children, small, alignSelf } = props;
    const { theme } = useContext(ThemeContext);

    return (
        <Text
            style={[
                styles.text,
                {
                    color:
                        theme === "dark" ? colors.whiteMilk : colors.smothDark,
                    alignSelf: alignSelf === "center" ? "center" : "flex-start",
                    fontSize: small ? 20 : 24,
                },
            ]}
        >
            {children}
        </Text>
    );
};

export default Header;

const styles = StyleSheet.create({
    text: {
        borderBottomWidth: 1,
        alignSelf: "center",
        fontWeight: "bold",
        marginTop: 10,
        textTransform: "capitalize",
    },
});
