import React, { useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { wishList } from "../store/slices/wishListSlice";

// components
import Spinner from "../components/shared/Spinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import SingleProduct from "../components/products/singleProduct/SingleProduct";
import ScrollViewLayout from "../components/layout/ScrollViewLayout";

const WishList = () => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch<AppDispatch>();
    const { wishListLoading, wishListData, wishListError } = useSelector(
        (state: RootState) => state.wishList
    );

    useEffect(() => {
        if (!isFocused) return;
        dispatch(wishList());
    }, [isFocused]);

    return wishListLoading ? (
        <Spinner />
    ) : wishListError ? (
        <ErrorMessage>{wishListError}</ErrorMessage>
    ) : wishListData && wishListData.length === 0 ? (
        <ErrorMessage>
            Your wish list is Empty try to add product to your wish list
        </ErrorMessage>
    ) : (
        wishListData && (
            <ScrollViewLayout>
                <View style={styles.container}>
                    {wishListData.map((one, i) => (
                        <SingleProduct key={i} {...one} />
                    ))}
                </View>
            </ScrollViewLayout>
        )
    );
};

export default WishList;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: 30,
        rowGap: 20,
    },
});
