import React, { useEffect, useContext, useState } from "react";
import { useIsFocused, useRoute, RouteProp } from "@react-navigation/native";
import { View } from "react-native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { orders } from "../../../store/slices/dashboard/productOrderSlice";

// components
import Spinner from "../../shared/Spinner";
import ErrorMessage from "../../shared/ErrorMessage";
import ScrollViewLayout from "../../layout/ScrollViewLayout";
import OrdersTabelHeader from "../../orders/orders/OrdersTabelHeader";
import OrdersTabelBody from "../../orders/orders/OrdersTabelBody";
import Pagination from "../../shared/pagination/Pagination";
import FilterBox from "../FilterBox";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
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

    const { ordersData, ordersError, ordersLoading } = useSelector(
        (state: RootState) => state.dashbordProductsOrders
    );

    useEffect(() => {
        if (!isFocused) return;
        dispatch(
            orders({
                page: +page,
                filterData: filterData,
            })
        );
    }, [isFocused, page, filterData]);

    return (
        <View style={{ flex: 1, backgroundColor: baseBgColor }}>
            {ordersLoading ? (
                <Spinner />
            ) : ordersError ? (
                <ErrorMessage>{ordersError}</ErrorMessage>
            ) : ordersData?.orders.length === 0 ? (
                <ErrorMessage>not find any Orders</ErrorMessage>
            ) : (
                ordersData && (
                    <ScrollViewLayout>
                        <FilterBox
                            {...filterData}
                            filterDataBearor={(data: FilterDate) =>
                                setFilterData(data)
                            }
                        />
                        <OrdersTabelHeader />
                        <OrdersTabelBody {...ordersData} />
                        <Pagination total_pages={ordersData.total_pages} />
                    </ScrollViewLayout>
                )
            )}
        </View>
    );
};

export default Products;
