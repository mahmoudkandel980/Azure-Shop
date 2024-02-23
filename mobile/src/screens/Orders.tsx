import React, { useContext } from "react";

// Screens
import Orders from "../components/orders/Orders";
import Order from "../components/orders/Order";

// context
import ThemeContext from "../context/darkModeTheme";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const OrdersScreen = () => {
    const { baseBgColor } = useContext(ThemeContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: baseBgColor,
                },
            }}
        >
            <Stack.Screen name='Orders' component={Orders} />
            <Stack.Screen name='Order' component={Order} />
        </Stack.Navigator>
    );
};

export default OrdersScreen;
