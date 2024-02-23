import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// components
import ProductImage from "../singleProduct/ProductImage";

// colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

// components
import CreatedBy from "../../shared/CreatedBy";
import Rating from "../../shared/Rating";
import SingledataRow from "./SingledataRow";
import PriceBox from "./priceBox/PriceBox";
import Reviews from "./reviews/Reviews";

// interfaces
import { ProductStateInterface } from "../../../interfaces/screens/products";

const ProductDetails = (props: ProductStateInterface) => {
    const { baseTextColor } = useContext(ThemeContext);

    return (
        <ScrollView style={styles.container}>
            <ProductImage {...props} />
            <Text
                style={[
                    styles.name,
                    {
                        color: baseTextColor,
                        borderBottomColor: baseTextColor,
                    },
                ]}
            >
                {props.name}
            </Text>
            <View style={styles.contentContainer}>
                <CreatedBy {...props} />
            </View>
            <View style={styles.contentContainer}>
                <Rating
                    showReviewsNo
                    numReviews={props.numReviews}
                    rating={props.rating}
                />
            </View>
            <SingledataRow title='Category' description={props.category} />
            <SingledataRow
                title='Created At'
                description={new Date(props.createdAt!).toLocaleString()}
            />
            <SingledataRow
                title='Last Updated At'
                description={new Date(props.updatedAt!).toLocaleString()}
            />
            <SingledataRow
                title='Description'
                description={props.description}
            />
            {/* box price */}
            <View style={styles.PriceBoxContainer}>
                <PriceBox {...props} />
            </View>
            {/* Reviews Section */}
            <Reviews />
        </ScrollView>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingBottom: 10,
    },
    contentContainer: {
        paddingVertical: 10,
        borderBottomColor: colors.inActiveText,
        borderBottomWidth: 1,
        flexDirection: "row",
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
        borderBottomWidth: 1,
        marginVertical: 10,
        marginBottom: 15,
        alignSelf: "flex-start",
    },
    PriceBoxContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
});
