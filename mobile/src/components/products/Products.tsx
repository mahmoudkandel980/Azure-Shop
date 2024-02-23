import React, { useEffect, useState } from "react";
import { useRoute, RouteProp, useIsFocused } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    products as getProducts,
    topRatedBestSaleProducts,
} from "../../store/slices/productsSlice";
import { PageType } from "../../interfaces/public";

// components
import Spinner from "../shared/Spinner";
import ErrorMessage from "../shared/ErrorMessage";
import SingleProduct from "./singleProduct/SingleProduct";
import Pagination from "../shared/pagination/Pagination";
import CreateProductBtn from "./shared/CreateProductBtn";
import FilterProducts from "./FilterProducts";
import ScrollViewLayout from "../layout/ScrollViewLayout";

// interfaces
import { FilterDateInterface } from "../../interfaces/public";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Products = () => {
    const [filterData, setFilterData] = useState<FilterDateInterface>({
        name: "",
        category: "all",
        priceFrom: "",
        priceTo: "",
        rate: "all",
    });

    const dispatch = useDispatch<AppDispatch>();
    const isFocused = useIsFocused();
    const route = useRoute<RouteProp<any>>();
    const page = route.params && route.params.page ? route.params.page : 1;

    const { productsData, productsError, productsLoading } = useSelector(
        (state: RootState) => state.products
    );

    // when change page
    useEffect(() => {
        if (!isFocused) return;

        dispatch(
            getProducts({
                page: +page,
                pageType: PageType.home,
                filterData,
            })
        );

        // (async () => {
        //     await AsyncStorage.removeItem("token");
        //     await AsyncStorage.removeItem("userInfo");
        // })();

        dispatch(topRatedBestSaleProducts());
    }, [isFocused, page, filterData]);

    return (
        <>
            {productsLoading ? (
                <Spinner />
            ) : productsError ? (
                <ErrorMessage>{productsError}</ErrorMessage>
            ) : productsData &&
              productsData.products &&
              productsData.products.length === 0 ? (
                <ErrorMessage>
                    Not found any products with those Specifications
                </ErrorMessage>
            ) : (
                <ScrollViewLayout>
                    <>
                        <CreateProductBtn />
                        <FilterProducts
                            name={filterData.name!}
                            category={filterData.category!}
                            priceFrom={filterData.priceFrom!}
                            priceTo={filterData.priceTo!}
                            rate={filterData.rate!}
                            filterDataBearor={(data: FilterDateInterface) =>
                                setFilterData(data)
                            }
                        />
                    </>
                    {productsData?.products && (
                        <>
                            <View style={styles.container}>
                                {productsData.products.map((one, i) => (
                                    <SingleProduct {...one} key={i} />
                                ))}
                            </View>
                            <Pagination
                                total_pages={productsData.total_pages!}
                            />
                        </>
                    )}
                </ScrollViewLayout>
            )}
        </>
    );
};

export default Products;

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
