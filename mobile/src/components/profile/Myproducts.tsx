import React, { useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useIsFocused, useRoute, RouteProp } from "@react-navigation/native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { myProducts } from "../../store/slices/productsSlice";

// components
import Spinner from "../shared/Spinner";
import ErrorMessage from "../shared/ErrorMessage";
import SingleProduct from "../products/singleProduct/SingleProduct";
import Pagination from "../shared/pagination/Pagination";
import ScrollViewLayout from "../layout/ScrollViewLayout";

// context
import ThemeContext from "../../context/darkModeTheme";

const Myproducts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { baseBgColor } = useContext(ThemeContext);
    const isFocused = useIsFocused();
    const route = useRoute<RouteProp<any>>();
    const page = route.params && route.params.page ? route.params.page : 1;

    const { myProductsData, myProductsError, myProductsLoading } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        if (!isFocused) return;
        dispatch(myProducts({ page: +page }));
    }, [isFocused, page]);

    return (
        <View style={{ flex: 1, backgroundColor: baseBgColor }}>
            {myProductsLoading ? (
                <Spinner />
            ) : myProductsError ? (
                <ErrorMessage>{myProductsError}</ErrorMessage>
            ) : myProductsData?.products.length === 0 ? (
                <ErrorMessage>Your Have not any products yet</ErrorMessage>
            ) : (
                <ScrollViewLayout>
                    {myProductsData?.products && (
                        <>
                            <View style={styles.container}>
                                {myProductsData.products.map((one, i) => (
                                    <SingleProduct {...one} key={i} />
                                ))}
                            </View>
                            <Pagination
                                total_pages={myProductsData.total_pages!}
                            />
                        </>
                    )}
                </ScrollViewLayout>
            )}
        </View>
    );
};

export default Myproducts;

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
