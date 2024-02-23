import React, { useContext } from "react";

import { View } from "react-native";

// Icons
import {
    Ionicons,
    Octicons,
    FontAwesome,
    MaterialCommunityIcons,
    AntDesign,
} from "@expo/vector-icons";

// Screens
import Notifications from "../components/dashboard/notifications/Notifications";
import Orders from "../components/dashboard/orders/Orders";
import Overview from "../components/dashboard/overview/Overview";
import Products from "../components/dashboard/products/Products";
import Users from "../components/dashboard/users/Users";

// components
import NotificationDot from "../components/shared/NotificationDot";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Context
import ThemeContext from "../context/darkModeTheme";
import colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();

const Dashboard = () => {
    const { theme, baseTextColor } = useContext(ThemeContext);

    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: colors.inActiveText,
                tabBarActiveTintColor: baseTextColor,
                tabBarStyle: {
                    backgroundColor:
                        theme === "dark" ? colors.darkBody : colors.white,
                    borderColor:
                        theme === "dark" ? colors.smothDark : colors.grayWhite,
                    height: 60,
                },
                tabBarLabelStyle: {
                    paddingVertical: 5,
                },
            }}
        >
            {/* <BottomTab.Screen
                name='DashboardOverview'
                component={Overview}
                options={{
                    title: "Overview",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <AntDesign
                                name='areachart'
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            /> */}
            <BottomTab.Screen
                name='DashboardUsers'
                component={Users}
                options={{
                    title: "Users",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <FontAwesome
                                name='users'
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name='DashboardProducts'
                component={Products}
                options={{
                    title: "Products",
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
                name='DashboardOrders'
                component={Orders}
                options={{
                    title: "Orders",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Octicons
                                name='list-unordered'
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name='DashboardNotifications'
                component={Notifications}
                options={{
                    title: "Notifications",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View>
                                <Ionicons
                                    name='notifications'
                                    color={color}
                                    size={size}
                                />
                                {/* <View
                                    style={{
                                        position: "absolute",
                                        top: -5,
                                        right: -5,
                                        width: 10,
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: "red",
                                    }}
                                /> */}
                                <NotificationDot type='usersWantToBeSellersNumber' />
                            </View>
                        );
                    },
                }}
            />
        </BottomTab.Navigator>
    );
};

export default Dashboard;
