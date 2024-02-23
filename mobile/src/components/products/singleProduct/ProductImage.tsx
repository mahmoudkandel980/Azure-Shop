import React from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet } from "react-native";

// components
import WishListHeartBtn from "./WishListHeartBtn";

// colors
import colors from "../../../constants/Colors";
import { CLOUDINARY_URL } from "../../../api/baseRoute";
import DeleteProductBtn from "../shared/DeleteProductBtn";
import EditProductBtn from "../shared/EditProductBtn";

// interface
import { ProductStateInterface } from "../../../interfaces/screens/products";
import { PageType } from "../../../interfaces/public";

const ProductImage = (props: ProductStateInterface) => {
    const { imageUrl, priceDiscount, creator } = props;
    const route = useRoute();

    return (
        <View style={styles.imageContainer}>
            {/* Sale */}
            {priceDiscount && priceDiscount > 0 ? (
                <View style={styles.saleContaier}>
                    <Text style={styles.saleText}>Sale</Text>
                </View>
            ) : (
                <></>
            )}
            {/* add to wishlist, edit and delete the product */}
            <View style={styles.iconsContainer}>
                <WishListHeartBtn {...props} />
                <View style={styles.doubleIconContainer}>
                    <EditProductBtn
                        screenType={PageType.home}
                        product={props}
                    />
                    <DeleteProductBtn
                        screenType={PageType.home}
                        product={props}
                    />
                </View>
            </View>
            <Image
                style={
                    route.name === "Product"
                        ? styles.imageInProductScreen
                        : styles.image
                }
                source={{ uri: `${CLOUDINARY_URL}/${imageUrl}` }}
            />
        </View>
    );
};

export default ProductImage;

const styles = StyleSheet.create({
    imageContainer: {
        position: "relative",
        overflow: "hidden",
    },
    saleContaier: {
        position: "absolute",
        top: 10,
        left: -20,
        zIndex: 2,
        backgroundColor: colors.iconRed,
        padding: 3,
        paddingHorizontal: 30,
        transform: [{ rotate: "-45deg" }],
    },
    saleText: {
        color: colors.white,
        fontWeight: "bold",
    },
    image: {
        flex: 1,
        height: 300,
        objectFit: "cover",
    },
    imageInProductScreen: {
        height: 350,
        objectFit: "scale-down",
        borderRadius: 8,
    },
    iconsContainer: {
        position: "absolute",
        top: 10,
        bottom: 10,
        right: 10,
        zIndex: 10,
        // height: 250,
        justifyContent: "space-between",
    },
    doubleIconContainer: {
        height: 55,
        justifyContent: "space-between",
    },
});
