import React, { useContext } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// interfaces
import { ReviewStateInterface } from "../../../interfaces/screens/reviews";

// colors
import colors from "../../../constants/Colors";

// components
import Rating from "../../shared/Rating";
import ProductImage from "../../products/singleProduct/ProductImage";
import Img from "../../shared/Image";

// context
import ThemeContext from "../../../context/darkModeTheme";
import convertTimestampFun from "../../../helpers/convertTimestampFun";
const windowWidth = Dimensions.get("window").width;

const SingleReview = (props: ReviewStateInterface) => {
    const { theme, baseBgColor, baseTextColor } = useContext(ThemeContext);
    const {
        creator: { name, imageUrl },
        product: { id },
        review,
        rating,
        createdAt,
    } = props;

    const navigation = useNavigation<StackNavigationProp<any>>();

    const navToProductReview = () => {
        navigation.navigate("Product", { productId: id });
    };

    return (
        <TouchableOpacity
            onPress={navToProductReview}
            style={[
                styles.container,
                {
                    backgroundColor: baseBgColor,
                    shadowColor:
                        theme === "dark" ? colors.lightGray : colors.lightDark,
                },
            ]}
        >
            <View style={styles.productImageContainer}>
                {/* image */}
                <ProductImage {...props.product} />
                <View
                    style={[
                        styles.userImageContainer,
                        { backgroundColor: baseBgColor },
                    ]}
                >
                    <Img
                        width={60}
                        height={60}
                        borderRadius={60}
                        uri={imageUrl!}
                    />
                </View>
            </View>
            <View>
                <View style={styles.ratingContainer}>
                    <Rating rating={rating} />
                </View>
                <View style={styles.content}>
                    <Text style={[styles.name, { color: baseTextColor }]}>
                        {name}
                    </Text>
                    <Text style={[styles.review, { color: baseTextColor }]}>
                        {review}
                    </Text>
                    <Text
                        style={[
                            styles.createdAt,
                            { color: colors.inActiveText },
                        ]}
                    >
                        {convertTimestampFun(createdAt!)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SingleReview;

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        overflow: "hidden",
        maxWidth: 350,
        width: windowWidth - 30,
        paddingBottom: 10,
        // shadow
        elevation: 4,
        // shadowColor: colors.darkBody,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    productImageContainer: {
        position: "relative",
    },
    userImageContainer: {
        position: "absolute",
        bottom: -30,
        width: 65,
        left: "50%",
        marginLeft: -32.5,
        height: 65,
        borderRadius: 65,
        justifyContent: "center",
        alignItems: "center",
    },

    ratingContainer: {
        alignSelf: "center",
        paddingTop: 30,
        paddingBottom: 20,
    },
    content: {
        marginHorizontal: 10,
    },
    name: {
        fontWeight: "bold",
        marginRight: 10,
    },
    review: {
        fontSize: 13,
        marginTop: 5,
    },
    createdAt: {
        fontSize: 10,
    },
});
