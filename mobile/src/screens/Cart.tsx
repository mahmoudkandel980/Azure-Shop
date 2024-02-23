import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// components
import CartScreen from "../components/cart/Cart";
import Shipping from "../components/checkout/Shipping";
import Order from "../components/checkout/order/Order";

// context
import ThemeContext from "../context/darkModeTheme";

const Stack = createStackNavigator();

const Cart = () => {
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
            <Stack.Screen name='CartScreen' component={CartScreen} />
            <Stack.Screen name='Shipping' component={Shipping} />
            <Stack.Screen name='Order' component={Order} />
        </Stack.Navigator>
    );
};

export default Cart;
