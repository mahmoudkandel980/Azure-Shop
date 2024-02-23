import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// componets
import TabelHeader from "../../shared/tabel/TabelHeader";

const OrdersTabelHeader = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    // if navigatorName length bigger than 2 means that we have more than one sceen so we in dashboard navigator
    const navigatorName = navigation.getState().routeNames.length;

    return (
        <TabelHeader
            headerElements={
                navigatorName > 2
                    ? [
                          "no",
                          "total",
                          "paid",
                          "delivered",
                          "details",
                          "delivered",
                      ]
                    : ["no", "total", "paid", "delivered", "details"]
            }
        />
    );
};

export default OrdersTabelHeader;
