import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
    useRoute,
    useNavigation,
    NavigationProp,
} from "@react-navigation/native";

// components
import ConvertedPrice from "../../shared/ConvertedPrice";
import Button from "../../shared/Button";
import DeliverButton from "../shared/DeliverButton";

// icons
import { Entypo } from "@expo/vector-icons";

// colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
import { OrderTabelBodyProps } from "../../../interfaces/screens/order";

const OrdersTabelBody = (props: OrderTabelBodyProps) => {
    const { ITEMS_PER_PAGE, orders } = props;
    const navigation = useNavigation<NavigationProp<any>>();
    const params = useRoute<any>().params;
    const page = params ? +params?.page! : 1;
    // if navigatorName length bigger than 2 means that we have more than one sceen so we in dashboard navigator
    const navigatorName = navigation.getState().routeNames.length;

    const { baseTextColor } = useContext(ThemeContext);

    const navigationToSpecificOrder = (id: string) => {
        navigation.navigate("OrdersScreens", {
            screen: "Order",
            params: { orderId: id },
        });
    };

    return orders.map((order, i) => (
        <View key={i} style={styles.headerContainer}>
            <View style={[styles.headerContent, { flex: 1 }]}>
                <Text style={{ color: baseTextColor, fontSize: 12 }}>
                    {i + 1 + ITEMS_PER_PAGE * (page - 1)}
                </Text>
            </View>
            <View style={styles.headerContent}>
                <ConvertedPrice size={12} price={order.totalPrice} />
            </View>
            <View style={styles.headerContent}>
                <Entypo
                    size={14}
                    name={order.isPaid ? "check" : "cross"}
                    color={order.isPaid ? colors.success : colors.iconRed}
                />
            </View>
            <View style={styles.headerContent}>
                <Entypo
                    size={14}
                    name={order.isDelivered ? "check" : "cross"}
                    color={order.isDelivered ? colors.success : colors.iconRed}
                />
            </View>
            <View style={styles.headerContent}>
                <Button
                    onPress={navigationToSpecificOrder.bind(null, order.id)}
                    navgationBtn
                    small
                >
                    details
                </Button>
            </View>
            {navigatorName > 2 && (
                <View style={styles.headerContent}>
                    {!order.isDelivered && order.isPaid && (
                        <DeliverButton buttonSize='small' orderId={order.id} />
                    )}
                </View>
            )}
        </View>
    ));
};

export default OrdersTabelBody;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        height: 35,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.inActiveText,
        borderRightColor: colors.inActiveText,
        borderRightWidth: 0.5,
    },
    headerContent: {
        borderLeftWidth: 0.5,
        borderLeftColor: colors.inActiveText,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        textTransform: "capitalize",
        flex: 2,
    },
});
