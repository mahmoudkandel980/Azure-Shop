import React, { useContext } from "react";

// Icons
import {
    Ionicons,
    FontAwesome,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

// Screens
import ChangePassword from "../components/profile/ChangePassword";
import Myproducts from "../components/profile/Myproducts";
import MyReviews from "../components/profile/reviews/MyReviews";
import Settings from "../components/profile/settings/Settings";

// components
import CreateProductBtn from "../components/products/shared/CreateProductBtn";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Context
import ThemeContext from "../context/darkModeTheme";
import colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();

const Profile = () => {
    const { theme, baseTextColor } = useContext(ThemeContext);

    return (
        <>
            <CreateProductBtn />
            <BottomTab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarInactiveTintColor: colors.inActiveText,
                    tabBarActiveTintColor: baseTextColor,
                    tabBarStyle: {
                        backgroundColor:
                            theme === "dark" ? colors.darkBody : colors.white,
                        borderColor:
                            theme === "dark"
                                ? colors.smothDark
                                : colors.grayWhite,
                        height: 60,
                    },
                    tabBarLabelStyle: {
                        paddingVertical: 5,
                    },
                }}
            >
                <BottomTab.Screen
                    name='Settings'
                    component={Settings}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <FontAwesome
                                    name='gear'
                                    color={color}
                                    size={size}
                                />
                            );
                        },
                    }}
                />
                <BottomTab.Screen
                    name='ChangePassword'
                    component={ChangePassword}
                    options={{
                        title: "Change Password",
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <Ionicons
                                    name='lock-closed'
                                    color={color}
                                    size={size}
                                />
                            );
                        },
                    }}
                />
                <BottomTab.Screen
                    name='Myproducts'
                    component={Myproducts}
                    options={{
                        title: "My Products",
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <MaterialCommunityIcons
                                    name='cart-variant'
                                    color={color}
                                    size={size}
                                />
                            );
                        },
                    }}
                />
                <BottomTab.Screen
                    name='MyReviews'
                    component={MyReviews}
                    options={{
                        title: "My Reviews",
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <FontAwesome
                                    name='star'
                                    color={color}
                                    size={size}
                                />
                            );
                        },
                    }}
                />
            </BottomTab.Navigator>
        </>
    );
};

export default Profile;
