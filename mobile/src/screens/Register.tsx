import React, { useContext } from "react";

// Screens
import Login from "../components/Register/Login";
import Signup from "../components/Register/Signup";
import ResetPassword from "../components/Register/ResetPassword";
import ForgetPassword from "../components/Register/ForgetPassword";

// Context
import ThemeContext from "../context/darkModeTheme";
import colors from "../constants/Colors";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Register = () => {
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
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    title: "Log In",
                }}
            />
            <Stack.Screen
                name='Signup'
                component={Signup}
                options={{
                    title: "Sign Up",
                }}
            />
            <Stack.Screen
                name='ForgetPassword'
                component={ForgetPassword}
                options={{
                    title: "Forget Password",
                }}
            />
            <Stack.Screen
                name='ResetPassword'
                component={ResetPassword}
                options={{
                    title: "Reset Password",
                }}
            />
        </Stack.Navigator>
    );
};

export default Register;
