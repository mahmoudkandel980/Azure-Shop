import React, { useContext } from "react";
import { ScrollView, Text, StyleSheet, FlatList, View } from "react-native";

// components
import ScrollViewLayout from "../../layout/ScrollViewLayout";
import Shipping from "./shipping/Shipping";
import SingleCartItem from "../../cart/invoice/SingleCartItem";
import PriceSummary from "./PriceSummay";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfce
import { Order } from "../../../interfaces/screens/order";

const SpecificOrder = (props: Order) => {
    const { orderItems } = props;

    const { baseTextColor } = useContext(ThemeContext);

    return (
        <ScrollViewLayout>
            <Text style={[styles.title, { color: baseTextColor }]}>
                order {props.id}
            </Text>
            {/* shipping */}
            <Shipping {...props} />
            <Text style={[styles.orderItems, { color: baseTextColor }]}>
                order items
            </Text>
            <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
                <FlatList
                    data={orderItems}
                    initialNumToRender={4}
                    renderItem={({ item, index }) => (
                        <SingleCartItem key={index} {...item} />
                    )}
                />
            </ScrollView>
            <View style={styles.PriceBoxContainer}>
                <PriceSummary />
            </View>
        </ScrollViewLayout>
    );
};

export default SpecificOrder;

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        marginBottom: 20,
        fontSize: 16,
        textTransform: "capitalize",
    },
    orderItems: {
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 10,
        fontSize: 16,
        textTransform: "capitalize",
    },
    PriceBoxContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
});
