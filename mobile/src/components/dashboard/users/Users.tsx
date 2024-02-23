import React, { useEffect, useContext, useState } from "react";
import { useIsFocused, useRoute, RouteProp } from "@react-navigation/native";
import { View } from "react-native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { users } from "../../../store/slices/dashboard/userSlice";

// components
import Spinner from "../../shared/Spinner";
import ErrorMessage from "../../shared/ErrorMessage";
import ScrollViewLayout from "../../layout/ScrollViewLayout";
import TabelHeader from "../../shared/tabel/TabelHeader";
import UsersTabelBody from "./UsersTabelBody";
import Pagination from "../../shared/pagination/Pagination";
import FilterBox from "../FilterBox";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
import { FilterDate } from "../../../interfaces/screens/dashboard";

const Users = () => {
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

    const { usersData, usersError, usersLoading } = useSelector(
        (state: RootState) => state.dashbordUsers
    );

    useEffect(() => {
        if (!isFocused) return;
        dispatch(users({ page: +page, filterData: filterData }));
    }, [isFocused, page, filterData]);

    return (
        <View style={{ flex: 1, backgroundColor: baseBgColor }}>
            {usersLoading ? (
                <Spinner />
            ) : usersError ? (
                <ErrorMessage>{usersError}</ErrorMessage>
            ) : usersData?.users.length === 0 ? (
                <ErrorMessage>not find any users</ErrorMessage>
            ) : (
                usersData && (
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
                                "role",
                                "status",
                                "edit",
                                "delete",
                            ]}
                        />
                        <UsersTabelBody />
                        <Pagination total_pages={usersData.total_pages} />
                    </ScrollViewLayout>
                )
            )}
        </View>
    );
};

export default Users;
