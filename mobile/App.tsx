import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, View, Pressable } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import {
    createDrawerNavigator,
    DrawerToggleButton,
} from "@react-navigation/drawer";
import Toast from "react-native-toast-message";
import toastConfig from "./src/configs/tostConfig";
import * as Linking from "expo-linking";
import openSocket from "socket.io-client";

// icons
import { Ionicons, Entypo } from "@expo/vector-icons";

// stripe
import { StripeProvider } from "@stripe/stripe-react-native";

// components
import LogoutButton from "./src/components/Register/LogoutButton";
import NotificationDot from "./src/components/shared/NotificationDot";

// Sreens
import UserDetails from "./src/screens/UserDetails";

// colors
import colors from "./src/constants/Colors";

// context
import ThemeContext, {
    ThemeContextProvider,
} from "./src/context/darkModeTheme";
import { EditDeleteReviewContextProvider } from "./src/context/editDeleteReview";

// Redux
import { Provider } from "react-redux";
import store from "./src/store/store";

// hooks
import useLoadInintalState from "./src/hooks/use-LoadInintalState";
import useAuth from "./src/hooks/use-Auth";
import useEmitUser from "./src/hooks/socket/use-emitUser";
import useEmitReview from "./src/hooks/socket/use-emitReview";
import useEmitProduct from "./src/hooks/socket/use-emitProduct";
import useEmitOrder from "./src/hooks/socket/use-emitOrder";

const Drawer = createDrawerNavigator();

export const Main = () => {
    // custome hooks
    useLoadInintalState();
    const { screens } = useAuth();

    // open socket
    const socket = openSocket(
        process.env.EXPO_PUBLIC_API_BACKEND_URL as string
    );
    useEmitProduct(socket);
    useEmitReview(socket);
    useEmitOrder(socket);
    useEmitUser(socket);

    const { theme, baseBgColor, toggleMode } = useContext(ThemeContext);

    return (
        <View style={styles.mainContainer}>
            <StatusBar style={theme === "dark" ? "light" : "dark"} />
            {screens && (
                <Drawer.Navigator
                    screenOptions={{
                        sceneContainerStyle: {
                            backgroundColor: baseBgColor,
                        },
                        headerLeft: ({
                            labelVisible,
                            pressColor,
                            pressOpacity,
                            tintColor,
                        }) => (
                            <View>
                                <DrawerToggleButton
                                    pressColor={pressColor}
                                    pressOpacity={pressOpacity}
                                    tintColor={tintColor}
                                />
                                <View
                                    style={{
                                        position: "absolute",
                                        bottom: 20,
                                        right: 12,
                                        top: 5,
                                        left: 30,
                                    }}
                                >
                                    <NotificationDot type='both' />
                                </View>
                            </View>
                        ),
                        headerRight: ({ tintColor }) => {
                            return (
                                <TouchableOpacity
                                    onPress={toggleMode}
                                    style={styles.modeContainer}
                                >
                                    {theme === "dark" ? (
                                        <Entypo
                                            name='light-up'
                                            size={24}
                                            color={tintColor}
                                        />
                                    ) : (
                                        <Ionicons
                                            name='cloudy-night'
                                            size={24}
                                            color={tintColor}
                                        />
                                    )}
                                </TouchableOpacity>
                            );
                        },
                        headerStyle: {
                            backgroundColor:
                                theme === "dark"
                                    ? colors.darkBody
                                    : colors.white,
                            borderBottomColor:
                                theme === "dark"
                                    ? colors.lightDark
                                    : colors.whiteMilk,
                            borderBottomWidth: 1,
                        },
                        headerTintColor:
                            theme === "dark"
                                ? colors.whiteMilk
                                : colors.smothDark,
                        drawerActiveBackgroundColor:
                            theme === "dark"
                                ? colors.darkBody
                                : colors.grayWhite,
                        drawerInactiveTintColor:
                            theme === "dark"
                                ? colors.lightGray
                                : colors.inActiveText,
                        drawerActiveTintColor: colors.lighertBlue,
                        drawerStyle: {
                            width: 250,
                            backgroundColor: baseBgColor,
                        },
                    }}
                    drawerContent={(props) => <LogoutButton {...props} />}
                >
                    {screens.map((screen, index) => {
                        const { Componet, IconType, iconName, name, title } =
                            screen;
                        return (
                            <Drawer.Screen
                                key={index}
                                name={name}
                                component={Componet}
                                options={{
                                    title: `${title ? title : name}`,
                                    drawerIcon: ({ color, size }) => {
                                        return (
                                            <View>
                                                <IconType
                                                    // @ts-ignore
                                                    name={iconName}
                                                    color={color}
                                                    size={size}
                                                />
                                                {name === "Dashboard" ? (
                                                    <NotificationDot type='usersWantToBeSellersNumber' />
                                                ) : (
                                                    <></>
                                                )}
                                                {name === "Cart" ? (
                                                    <NotificationDot type='cartProductsNumber' />
                                                ) : (
                                                    <></>
                                                )}
                                            </View>
                                        );
                                    },
                                }}
                            />
                        );
                    })}
                </Drawer.Navigator>
            )}
        </View>
    );
};

const prefix = Linking.makeUrl("/");

export default function App() {
    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                Register: {
                    path: "register",
                    screens: {
                        ResetPassword: "resetPassword",
                    },
                },
            },
        },
    };

    return (
        <>
            <Provider store={store}>
                <StripeProvider
                    publishableKey={
                        process.env.EXPO_PUBLIC_API_PUBLISHABLE_KEY!
                    }
                >
                    <ThemeContextProvider>
                        <EditDeleteReviewContextProvider>
                            <NavigationContainer linking={linking}>
                                <Main />
                                <Toast config={toastConfig} />
                            </NavigationContainer>
                        </EditDeleteReviewContextProvider>
                    </ThemeContextProvider>
                </StripeProvider>
            </Provider>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    modeContainer: {
        marginRight: 15,
    },
});
