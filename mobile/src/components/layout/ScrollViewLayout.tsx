import React, { useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

// context
import ThemeContext from "../../context/darkModeTheme";

// interfaces
import { ScrollViewLayoutProps } from "../../interfaces/public";

const ScrollViewLayout = (props: ScrollViewLayoutProps) => {
    const { baseBgColor } = useContext(ThemeContext);
    return (
        <View style={[styles.container, { backgroundColor: baseBgColor }]}>
            <ScrollView style={styles.scrollViewContainer}>
                <View style={{ paddingVertical: 20 }}>{props.children}</View>
            </ScrollView>
        </View>
    );
};

export default ScrollViewLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    scrollViewContainer: {
        flex: 1,
    },
});
