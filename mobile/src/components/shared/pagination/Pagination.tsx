import React from "react";
import { useRoute, RouteProp } from "@react-navigation/native";

import { View, StyleSheet } from "react-native";

// components
import PaginationBtn from "./PaginationBtn";

// interfaces
import { PaginationProps } from "../../../interfaces/shared";

const Pagination = (props: PaginationProps) => {
    const { total_pages = 1 } = props;

    const route = useRoute<RouteProp<any>>();

    const page = route.params && route.params.page ? route.params.page : 1;
    const currentPage = Number(page);
    const currentScreen = useRoute().name;
    const params = route.params;

    const pagesNumber = Math.ceil(total_pages);
    const pagesNumberMaping =
        pagesNumber <= 3
            ? Array.from({ length: pagesNumber }, (_, i) => i + 1)
            : Array.from({ length: pagesNumber }, (_, i) => i + 1).slice(
                  currentPage - 2 < 0 ? 0 : currentPage - 2,
                  currentPage + 1
              );

    return (
        <View style={[styles.container]}>
            {/* prev page */}
            <PaginationBtn
                navigationContent={{
                    name: currentScreen,
                    params: params,
                    page: currentPage - 1,
                }}
                display={currentPage === 1 ? "none" : "flex"}
            >
                prev
            </PaginationBtn>

            {/* first page */}
            {currentPage > 5 && (
                <PaginationBtn
                    currentPage={currentPage === 1}
                    navigationContent={{
                        name: currentScreen,
                        params: params,
                        page: 1,
                    }}
                >
                    1
                </PaginationBtn>
            )}

            {/* pages */}
            {pagesNumberMaping.map(
                (page, i) =>
                    page !== pagesNumber && (
                        <PaginationBtn
                            key={i}
                            currentPage={currentPage === page}
                            navigationContent={{
                                name: currentScreen,
                                params: params,
                                page: page,
                            }}
                        >
                            {page}
                        </PaginationBtn>
                    )
            )}

            {/* last page */}
            <PaginationBtn
                currentPage={currentPage === pagesNumber}
                navigationContent={{
                    name: currentScreen,
                    params: params,
                    page: pagesNumber,
                }}
            >
                {pagesNumber}
            </PaginationBtn>

            {/* next page */}
            <PaginationBtn
                navigationContent={{
                    name: currentScreen,
                    params: params,
                    page: currentPage + 1,
                }}
                display={pagesNumber > currentPage ? "flex" : "none"}
            >
                next
            </PaginationBtn>
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 50,
        columnGap: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});
