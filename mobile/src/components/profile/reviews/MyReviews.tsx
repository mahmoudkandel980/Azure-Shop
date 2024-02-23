import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { useIsFocused, useRoute, RouteProp } from "@react-navigation/native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { myReviews } from "../../../store/slices/reviewsSlice";

// components
import Spinner from "../../shared/Spinner";
import ErrorMessage from "../../shared/ErrorMessage";
import SingleReview from "./SingleReview";
import Pagination from "../../shared/pagination/Pagination";
import ScrollViewLayout from "../../layout/ScrollViewLayout";

// context
import ThemeContext from "../../../context/darkModeTheme";

const MyReviews = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { baseBgColor } = useContext(ThemeContext);
    const isFocused = useIsFocused();
    const route = useRoute<RouteProp<any>>();
    const page = route.params && route.params.page ? route.params.page : 1;

    const { myReviewsData, myReviewsError, myReviewsLoading } = useSelector(
        (state: RootState) => state.reviews
    );

    useEffect(() => {
        if (!isFocused) return;
        dispatch(myReviews({ page: +page }));
    }, [isFocused, page]);

    return (
        <View style={{ flex: 1, backgroundColor: baseBgColor }}>
            {myReviewsLoading ? (
                <Spinner />
            ) : myReviewsError ? (
                <ErrorMessage>{myReviewsError}</ErrorMessage>
            ) : myReviewsData?.reviews.length === 0 ? (
                <ErrorMessage>Your Have not any products yet</ErrorMessage>
            ) : (
                <ScrollViewLayout>
                    {myReviewsData?.reviews && (
                        <>
                            <View style={styles.container}>
                                {myReviewsData.reviews.map((one, i) => (
                                    <SingleReview {...one} key={i} />
                                ))}
                            </View>
                            <Pagination
                                total_pages={myReviewsData.total_pages!}
                            />
                        </>
                    )}
                </ScrollViewLayout>
            )}
        </View>
    );
};

export default MyReviews;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: 30,
        rowGap: 20,
    },
});
