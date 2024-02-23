import React, { useEffect, useContext, useState } from "react";
import { useIsFocused, useRoute, RouteProp } from "@react-navigation/native";
import { View } from "react-native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { products } from "../../../store/slices/productsSlice";

// components
import Spinner from "../../shared/Spinner";
import ErrorMessage from "../../shared/ErrorMessage";
import ScrollViewLayout from "../../layout/ScrollViewLayout";
import TabelHeader from "../../shared/tabel/TabelHeader";
import ProductsTabelBody from "./ProductsTabelBody";
import Pagination from "../../shared/pagination/Pagination";
import FilterBox from "../FilterBox";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
import { PageType } from "../../../interfaces/public";
import { FilterDate } from "../../../interfaces/screens/dashboard";

const Products = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { baseBgColor } = useContext(ThemeContext);

    const [filterData, setFilterData] = useState<FilterDate>({
        id: "",
        createdFrom: "",
        createdTo: "",
        category: "all",
        priceFrom: "",
        priceTo: "",
        rate: "all",
        email: "",
        role: "all",
        active: "all",
        isPaid: "all",
        isDelivered: "all",
        name: "",
    });

    const isFocused = useIsFocused();
    const route = useRoute<RouteProp<any>>();
    const page = route.params && route.params.page ? route.params.page : 1;

    const { productsData, productsError, productsLoading } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        if (!isFocused) return;
        dispatch(
            products({
                page: +page,
                pageType: PageType.dashboard,
                filterData: filterData,
            })
        );
    }, [isFocused, page, filterData]);

    return (
        <View style={{ flex: 1, backgroundColor: baseBgColor }}>
            {productsLoading ? (
                <Spinner />
            ) : productsError ? (
                <ErrorMessage>{productsError}</ErrorMessage>
            ) : productsData?.products.length === 0 ? (
                <ErrorMessage>not find any Products</ErrorMessage>
            ) : (
                productsData && (
                    <ScrollViewLayout>
                        <FilterBox
                            {...filterData}
                            filterDataBearor={(data: FilterDate) =>
                                setFilterData(data)
                            }
                        />
                        <TabelHeader
                            headerElements={[
                                "no",
                                "image",
                                "name",
                                "rate",
                                "price",
                                "edit",
                                "delete",
                            ]}
                        />
                        <ProductsTabelBody />
                        <Pagination total_pages={productsData.total_pages!} />
                    </ScrollViewLayout>
                )
            )}
        </View>
    );
};

export default Products;
