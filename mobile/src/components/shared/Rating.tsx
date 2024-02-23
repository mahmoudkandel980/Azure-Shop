import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

// icons
import { Ionicons } from "@expo/vector-icons";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// interfaces
import { RatingProps } from "../../interfaces/shared";

const Rating = (porps: RatingProps) => {
    const { rating, numReviews, showReviewsNo, size } = porps;
    const { theme } = useContext(ThemeContext);

    const fiveEl = Array.from(Array(5).keys());

    return (
        <View style={styles.container}>
            <View style={styles.starIconscontainer}>
                {fiveEl.map((_, index) => {
                    return (
                        <View key={index}>
                            {rating >= index + 1 ? (
                                <Ionicons
                                    name='star'
                                    style={[
                                        styles.starIcon,
                                        { paddingRight: size ? 0.5 : 2 },
                                    ]}
                                    size={size || 16}
                                />
                            ) : rating >= index + 0.5 ? (
                                <Ionicons
                                    name='star-half'
                                    style={[
                                        styles.starIcon,
                                        { paddingRight: size ? 0.5 : 2 },
                                    ]}
                                    size={size || 16}
                                />
                            ) : (
                                <Ionicons
                                    name='star-outline'
                                    style={[
                                        styles.starIcon,
                                        { paddingRight: size ? 0.5 : 2 },
                                    ]}
                                    size={size || 16}
                                />
                            )}
                        </View>
                    );
                })}
            </View>
            {showReviewsNo ? (
                <Text
                    style={[
                        styles.numReviewsText,
                        {
                            color:
                                numReviews! > 0
                                    ? theme === "dark"
                                        ? colors.whiteMilk
                                        : colors.smothDark
                                    : colors.lightRed,
                        },
                    ]}
                >
                    {numReviews! > 0
                        ? numReviews === 1
                            ? `${numReviews} Review`
                            : `${numReviews} Reviews`
                        : "No Reviews Yet"}
                </Text>
            ) : (
                <></>
            )}
        </View>
    );
};

export default Rating;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    starIconscontainer: {
        flexDirection: "row",
    },
    starIcon: {
        color: colors.stars,
    },
    numReviewsText: {
        fontWeight: "bold",
        marginLeft: 5,
    },
});
