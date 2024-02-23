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
import { ProductStateInterface } from "../../../interfaces/screens/products";

// colors
import colors from "../../../constants/Colors";

// components
import Rating from "../../shared/Rating";
import ConvertedPrice from "../../shared/ConvertedPrice";
import AddRemoveCartButton from "../../shared/AddRemoveCartButton";
import ProductImage from "./ProductImage";

// context
import ThemeContext from "../../../context/darkModeTheme";
const windowWidth = Dimensions.get("window").width;

const SingleProduct = (props: ProductStateInterface) => {
    const { theme, baseBgColor } = useContext(ThemeContext);
    const { id, name, numReviews, price, priceDiscount, rating, creator } =
        props;

    const navigation = useNavigation<StackNavigationProp<any>>();

    const navToCurrentProduct = () => {
        navigation.navigate("Product", { productId: id });
    };

    return (
        <TouchableOpacity
            onPress={navToCurrentProduct}
            style={[
                styles.container,
                {
                    backgroundColor: baseBgColor,
                    shadowColor:
                        theme === "dark" ? colors.lightGray : colors.lightDark,
                },
            ]}
        >
            {/* image */}
            <ProductImage {...props} />
            <View style={styles.contentContainer}>
                <Text
                    style={[
                        styles.name,
                        styles.contentItem,
                        {
                            color:
                                theme === "dark"
                                    ? colors.whiteMilk
                                    : colors.smothDark,
                        },
                    ]}
                >
                    {name.length > 20 ? name.slice(0, 20) + "..." : name}
                </Text>
                <Text style={styles.creator}>{creator.name}</Text>
            </View>
            <View style={styles.contentContainer}>
                <Rating showReviewsNo rating={rating} numReviews={numReviews} />
            </View>
            <View style={styles.contentContainer}>
                <ConvertedPrice price={price - priceDiscount} />
            </View>
            {/* discount */}
            {priceDiscount > 0 && (
                <View style={styles.contentContainer}>
                    <View style={styles.discountContaienr}>
                        <ConvertedPrice price={price} oldPrice />
                        <Text style={styles.discountText}>
                            save {((priceDiscount / price) * 100).toFixed(0)}%
                        </Text>
                    </View>
                </View>
            )}
            <View style={[styles.contentContainer, styles.cartButton]}>
                <AddRemoveCartButton product={props} />
            </View>
        </TouchableOpacity>
    );
};

export default SingleProduct;

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
    contentContainer: {
        paddingHorizontal: 5,
        paddingTop: 8,
    },
    contentItem: {
        marginTop: 3,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    creator: {
        fontSize: 12,
        color: colors.inActiveText,
    },
    discountContaienr: {
        flexDirection: "row",
        alignItems: "center",
    },
    discountText: {
        padding: 10,
        paddingVertical: 3,
        color: colors.whiteMilk,
        backgroundColor: colors.success,
        fontWeight: "bold",
        marginLeft: 10,
        borderRadius: 5,
    },
    cartButton: {
        marginTop: 15,
        marginBottom: 10,
    },
});
