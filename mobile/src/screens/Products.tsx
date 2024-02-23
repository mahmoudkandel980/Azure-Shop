import React, { useContext } from "react";

// Screens
import Products from "../components/products/Products";
import Product from "../components/products/Product";

// context
import ThemeContext from "../context/darkModeTheme";
import colors from "../constants/Colors";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const ProductsScreen = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor:
                        theme === "dark" ? colors.smothDark : colors.white,
                },
            }}
        >
            <Stack.Screen name='Products' component={Products} />
            <Stack.Screen name='Product' component={Product} />
        </Stack.Navigator>
    );
};

export default ProductsScreen;
