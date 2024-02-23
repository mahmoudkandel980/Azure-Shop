import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    useNavigation,
    NavigationProp,
    useRoute,
} from "@react-navigation/native";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// components
import Image from "../../shared/Image";
import Rating from "../../shared/Rating";
import ConvertedPrice from "../../shared/ConvertedPrice";
import DeleteProductBtn from "../../products/shared/DeleteProductBtn";
import EditProductBtn from "../../products/shared/EditProductBtn";

// colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
import { PageType } from "../../../interfaces/public";

const ProductsTabelBody = () => {
    const { baseTextColor } = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp<any>>();
    const params = useRoute<any>().params;
    const page = params ? +params?.page! : 1;

    const { productsData } = useSelector((state: RootState) => state.products);
    const { ITEMS_PER_PAGE, products } = productsData!;

    const navigationToSpecificProduct = (id: string) => {
        navigation.navigate("ProductsScreens", {
            screen: "Product",
            params: { productId: id },
        });
    };

    return products.map((product, i) => (
        <View key={i} style={styles.headerContainer}>
            <View style={[styles.headerContent, { flex: 1 }]}>
                <Text style={{ color: baseTextColor, fontSize: 12 }}>
                    {i + 1 + ITEMS_PER_PAGE * (page - 1)}
                </Text>
            </View>
            <View style={styles.headerContent}>
                <Image
                    uri={product.imageUrl}
                    width={28}
                    height={28}
                    borderRadius={3}
                />
            </View>
            <View style={styles.headerContent}>
                <TouchableOpacity
                    onPress={navigationToSpecificProduct.bind(null, product.id)}
                >
                    <Text style={[styles.name, { color: baseTextColor }]}>
                        {product.name!.length > 8
                            ? product.name!.slice(0, 5) + "..."
                            : product.name}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerContent}>
                <Rating rating={product.rating} size={8} />
            </View>
            <View style={styles.headerContent}>
                <ConvertedPrice size={10} price={product.price} />
            </View>
            <View style={styles.headerContent}>
                <EditProductBtn
                    screenType={PageType.dashboard}
                    product={product}
                />
            </View>
            <View style={styles.headerContent}>
                <DeleteProductBtn
                    screenType={PageType.dashboard}
                    product={product}
                />
            </View>
        </View>
    ));
};

export default ProductsTabelBody;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        height: 35,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.inActiveText,
        borderRightColor: colors.inActiveText,
        borderRightWidth: 0.5,
    },
    headerContent: {
        borderLeftWidth: 0.5,
        borderLeftColor: colors.inActiveText,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        textTransform: "capitalize",
        flex: 2,
    },
    name: {
        borderBottomColor: colors.inActiveText,
        borderBottomWidth: 1,
        fontSize: 10,
    },
});
