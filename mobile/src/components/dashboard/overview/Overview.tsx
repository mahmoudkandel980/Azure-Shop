import React, { useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

// components
import Spinner from "../../shared/Spinner";
import ErrorMessage from "../../shared/ErrorMessage";
import ScrollViewLayout from "../../layout/ScrollViewLayout";
import UsersGraph from "./charts/users/UsersGraph";
import UsersStateCharts from "./charts/users/UsersStateCharts";
import UsersIsActiveAnInactiveChart from "./charts/users/UsersIsActiveAnInactiveChart";
import ProductGraph from "./charts/products/ProductGraph";
import ProductsRating from "./charts/products/ProductsRating";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { usersOverview } from "../../../store/slices/dashboard/userSlice";
import { productsOverview } from "../../../store/slices/dashboard/productOrderSlice";

// colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

const Overview = () => {
    const { baseBgColor, baseTextColor } = useContext(ThemeContext);
    const isFocused = useIsFocused();
    const dispatch = useDispatch<AppDispatch>();

    const { usersOverviewLoading, usersOverviewData, usersOverviewError } =
        useSelector((state: RootState) => state.dashbordUsers);
    const {
        productsOverviewData,
        productsOverviewLoading,
        productsOverviewError,
    } = useSelector((state: RootState) => state.dashbordProductsOrders);

    useEffect(() => {
        if (!isFocused) return;
        dispatch(usersOverview());
        dispatch(productsOverview());
    }, [isFocused]);

    return usersOverviewLoading &&
        productsOverviewLoading &&
        !usersOverviewData &&
        !productsOverviewData ? (
        <View style={{ flex: 1, backgroundColor: baseBgColor }}>
            <Spinner />
        </View>
    ) : usersOverviewError && productsOverviewError ? (
        <View style={{ flex: 1, backgroundColor: baseBgColor }}>
            <ErrorMessage>
                {usersOverviewError
                    ? usersOverviewError
                    : productsOverviewError}
            </ErrorMessage>
        </View>
    ) : usersOverviewData && productsOverviewData ? (
        <ScrollViewLayout>
            <Text style={[styles.header, { color: baseTextColor }]}>
                users data
            </Text>
            <UsersGraph {...usersOverviewData} />
            <UsersStateCharts {...usersOverviewData} />
            <UsersIsActiveAnInactiveChart {...usersOverviewData} />

            <Text
                style={[
                    styles.header,
                    styles.productHeader,
                    { color: baseTextColor },
                ]}
            >
                products data
            </Text>
            <ProductGraph {...productsOverviewData} />
            <ProductsRating {...productsOverviewData} />
        </ScrollViewLayout>
    ) : (
        <></>
    );
};

export default Overview;

const styles = StyleSheet.create({
    header: {
        fontWeight: "bold",
        fontSize: 18,
        textTransform: "capitalize",
    },
    productHeader: {
        borderTopColor: colors.inActiveText,
        borderTopWidth: 1,
        marginTop: 30,
        paddingTop: 30,
    },
});
