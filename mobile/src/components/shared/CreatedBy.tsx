import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

// components
import Image from "./Image";

// colors
import colors from "../../constants/Colors";

// Context
import ThemeContext from "../../context/darkModeTheme";

// interfaces
import { ProductStateInterface } from "../../interfaces/screens/products";

const CreatedBy = (props: ProductStateInterface) => {
    const { baseTextColor, baseBgColor } = useContext(ThemeContext);

    return (
        <View>
            <Text
                style={[
                    styles.title,
                    {
                        color: baseTextColor,
                    },
                ]}
            >
                Created By
            </Text>
            <View style={styles.creatorImageContainer}>
                <View style={styles.imageContainer}>
                    <View
                        style={[
                            styles.creatorActivation,
                            {
                                borderColor: baseBgColor,
                                backgroundColor: props.creatorActiveStatus
                                    ? colors.success
                                    : colors.darkRed,
                            },
                        ]}
                    />
                    <Image
                        width={40}
                        height={40}
                        borderRadius={40}
                        uri={props.creator.imageUrl!}
                    />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text
                        style={[
                            {
                                color: baseTextColor,
                            },
                        ]}
                    >
                        {props.creator.name}
                    </Text>
                    <Text
                        style={[
                            {
                                color: baseTextColor,
                            },
                        ]}
                    >
                        {props.creator.email}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CreatedBy;

const styles = StyleSheet.create({
    creatorImageContainer: {
        flexDirection: "row",
        marginTop: 8,
        marginLeft: 8,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
    },
    imageContainer: {
        position: "relative",
    },
    creatorActivation: {
        width: 12,
        height: 12,
        borderRadius: 10,
        position: "absolute",
        bottom: 2,
        right: 2,
        borderWidth: 2,
        zIndex: 1,
    },
});
