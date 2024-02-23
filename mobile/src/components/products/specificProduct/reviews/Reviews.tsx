import React, { useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { productReviews } from "../../../../store/slices/reviewsSlice";

// components
import Header from "../../../shared/Header";
import Spinner from "../../../shared/Spinner";
import ErrorMessage from "../../../shared/ErrorMessage";
import ReviewsList from "./ReviewsList";

// colors
import colors from "../../../../constants/Colors";

const Reviews = () => {
    const isFocused = useIsFocused();
    const { productId } = useRoute<any>().params;

    const dispatch = useDispatch<AppDispatch>();
    const { productReviewsData, productReviewsError, productReviewsLoading } =
        useSelector((state: RootState) => state.reviews);

    useEffect(() => {
        if (!isFocused) return;
        dispatch(productReviews({ productId: productId }));
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Header>reviews</Header>
            <View style={styles.contentContainer}>
                {productReviewsLoading ? (
                    <Spinner />
                ) : productReviewsError ? (
                    <ErrorMessage>{productReviewsError}</ErrorMessage>
                ) : productReviewsData && productReviewsData?.reviews ? (
                    <ReviewsList {...productReviewsData} />
                ) : (
                    <ErrorMessage>Something went wrong</ErrorMessage>
                )}
            </View>
        </View>
    );
};

export default Reviews;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        borderTopColor: colors.inActiveText,
        borderTopWidth: 1,
    },
    contentContainer: {
        paddingVertical: 30,
    },
});
