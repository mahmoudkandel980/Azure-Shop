import React, { useEffect, useContext } from "react";
import { useIsFocused, useRoute, RouteProp } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { usersWantToBeSellers } from "../../../store/slices/dashboard/userSlice";

// components
import Spinner from "../../shared/Spinner";
import ErrorMessage from "../../shared/ErrorMessage";
import ScrollViewLayout from "../../layout/ScrollViewLayout";
import TabelHeader from "../../shared/tabel/TabelHeader";
import NotficationsTabelBody from "./NotficationsTabelBody";
import Pagination from "../../shared/pagination/Pagination";

// context
import ThemeContext from "../../../context/darkModeTheme";

const Notifications = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { baseBgColor, baseTextColor } = useContext(ThemeContext);

    const isFocused = useIsFocused();
    const route = useRoute<RouteProp<any>>();
    const page = route.params && route.params.page ? route.params.page : 1;

    const {
        usersWantToBeSellersData,
        usersWantToBeSellersError,
        usersWantToBeSellersLoading,
    } = useSelector((state: RootState) => state.dashbordUsers);

    useEffect(() => {
        if (!isFocused) return;
        dispatch(usersWantToBeSellers({ page: +page }));
    }, [isFocused, page]);

    return (
        <View style={[styles.container, { backgroundColor: baseBgColor }]}>
            <Text style={[styles.header, { color: baseTextColor }]}>
                users want to be sellers
            </Text>
            {usersWantToBeSellersLoading ? (
                <Spinner />
            ) : usersWantToBeSellersError ? (
                <ErrorMessage>{usersWantToBeSellersError}</ErrorMessage>
            ) : usersWantToBeSellersData?.users.length === 0 ? (
                <ErrorMessage>
                    not find any user want to be a seller
                </ErrorMessage>
            ) : (
                usersWantToBeSellersData && (
                    <ScrollViewLayout>
                        <TabelHeader
                            headerElements={[
                                "no",
                                "image",
                                "name",
                                "role",
                                "status",
                                "accept",
                                "reject",
                            ]}
                        />
                        <NotficationsTabelBody />
                        <Pagination
                            total_pages={usersWantToBeSellersData.total_pages}
                        />
                    </ScrollViewLayout>
                )
            )}
        </View>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        textTransform: "capitalize",
        fontWeight: "bold",
        marginVertical: 20,
        fontSize: 18,
    },
});
