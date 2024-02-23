import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// components
import SingleShippingRow from "./SingleShippingRow";
import PriceSummary from "./priceSummary/PriceSummary";
import ScrollViewLayout from "../../layout/ScrollViewLayout";

// context
import ThemeContext from "../../../context/darkModeTheme";
import SingleCart from "../../cart/SingleCart";

const Order = () => {
    const [shippingData, setShippingData] = useState({
        address: "",
        city: "",
        country: "",
        phone: "",
        postalCode: "",
    });

    const { baseTextColor } = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp<any>>();
    const { cartData, cartLoading } = useSelector(
        (state: RootState) => state.cart
    );

    // render inital shippingData if it exist on storage
    useEffect(() => {
        if (cartData && cartData.length === 0) {
            // navigation.navigate("Cart", { screen: "CartScreen" });
        }

        (async () => {
            const shippingData = await AsyncStorage.getItem("shippingData");
            if (shippingData) {
                const convertedShippingData = JSON.parse(shippingData);
                setShippingData({
                    address: convertedShippingData.address,
                    city: convertedShippingData.city,
                    country: convertedShippingData.country,
                    phone: convertedShippingData.phone,
                    postalCode: convertedShippingData.postalCode,
                });
            } else {
                // navigation.navigate("Cart", { screen: "Shipping" });
            }
        })();
    }, [cartData]);

    return (
        <ScrollViewLayout>
            <View>
                <Text style={[styles.title, { color: baseTextColor }]}>
                    shipping
                </Text>
                <SingleShippingRow title='address'>
                    {shippingData.address}, {shippingData.city},{" "}
                    {shippingData.postalCode}, {shippingData.country}
                </SingleShippingRow>
                <SingleShippingRow title='phone'>
                    {shippingData.phone}
                </SingleShippingRow>
            </View>
            <View style={styles.orderItemsContainer}>
                <Text style={[styles.title, { color: baseTextColor }]}>
                    order items
                </Text>
                {cartData && cartData.length > 0 ? (
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <FlatList
                            nestedScrollEnabled
                            data={cartData}
                            initialNumToRender={4}
                            refreshing={cartLoading}
                            renderItem={({ item, index }) => (
                                <SingleCart key={index} {...item} />
                            )}
                        />
                    </ScrollView>
                ) : (
                    <></>
                )}
            </View>
            <View style={styles.orderItemsContainer}>
                <PriceSummary />
            </View>
        </ScrollViewLayout>
    );
};

export default Order;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        textTransform: "capitalize",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    orderItemsContainer: {
        marginTop: 50,
        flex: 1,
    },
});
