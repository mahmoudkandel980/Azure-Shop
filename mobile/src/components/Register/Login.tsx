import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// navigation
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login } from "../../store/slices/authSlice";
import { resetCartData } from "../../store/slices/cartSlice";
import { resetWishListData } from "../../store/slices/wishListSlice";

// components
import Input from "../shared/inputs/Input";
import Button from "../shared/Button";
import AuthContainer from "./AuthContainer";

// colors
import colors from "../../constants/Colors";

// toast
import Toast from "react-native-toast-message";

// validation
import validateInput from "../../validation/validateInput";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState({
        emailError: "",
        passwordError: "",
    });
    const { emailError, passwordError } = formError;

    const navigation = useNavigation<StackNavigationProp<any>>();
    const dispatch = useDispatch<AppDispatch>();
    const { loginData, loginError, loginLoading } = useSelector(
        (state: RootState) => state.auth
    );

    const navToForgetPasswordHandler = () => {
        navigation.navigate("ForgetPassword");
    };

    // show error messsage when find error
    useEffect(() => {
        if (loginError) {
            Toast.show({
                type: "error",
                text1: loginError,
            });
        }
    }, [loginError]);

    // show success messsage when log in
    useEffect(() => {
        if (loginData) {
            Toast.show({
                type: "success",
                text1: "You logged in successfully",
            });

            //  update wishlist data and cart data
            if (loginData.wishList) {
                dispatch(resetWishListData(loginData.wishList));
            }
            if (loginData.cart) {
                dispatch(resetCartData(loginData.cart));
            }

            // navigate
            navigation.navigate("ProductsScreens");
        }
    }, [loginData]);

    // login
    const loginHandler = async () => {
        // Make sure not login twice
        if (loginLoading) return;

        // validation
        const emailErr = validateInput({
            inputValue: email,
            type: "Email",
        });
        const passwordErr = validateInput({
            inputValue: password,
            type: "Password",
        });
        // reset error State
        setFormError({
            emailError: emailErr,
            passwordError: passwordErr,
        });

        if (emailErr || passwordErr) return;

        const wishListIdsInString = await AsyncStorage.getItem("wishListItems");
        let wishListIds = [];
        if (wishListIdsInString) {
            wishListIds = JSON.parse(wishListIdsInString);
        }

        const cartDataString = await AsyncStorage.getItem("cartItems");
        let cartData = [];
        if (cartDataString) {
            cartData = JSON.parse(cartDataString);
        }

        dispatch(login({ email, password, cartData, wishListIds }));
    };

    return (
        <AuthContainer header='Log In'>
            <Input
                label='E-Mail'
                onChangeText={setEmail}
                value={email}
                placeholder='Enter E-Mail'
                inputMode='email'
                error={emailError}
            />
            <Input
                label='Password'
                onChangeText={setPassword}
                value={password}
                placeholder='Enter Password'
                type='password'
                secureTextEntry
                error={passwordError}
            />
            <View style={styles.itemsContainer}>
                <Button onPress={loginHandler} loading={loginLoading}>
                    Log In
                </Button>
            </View>
            <TouchableOpacity
                onPress={navToForgetPasswordHandler}
                style={styles.itemsContainer}
            >
                <Text style={styles.forgetPassword}>Forget Password</Text>
            </TouchableOpacity>
        </AuthContainer>
    );
};

export default Login;

const styles = StyleSheet.create({
    itemsContainer: {
        marginTop: 30,
        alignItems: "center",
    },
    forgetPassword: {
        color: colors.darkRed,
        alignSelf: "flex-end",
        marginRight: 20,
    },
});
