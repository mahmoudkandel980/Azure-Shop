import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// navigation
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { signup } from "../../store/slices/authSlice";
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
import validateInput, {
    ValidateConfrimPassword,
} from "../../validation/validateInput";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
    });
    const { confirmPasswordError, emailError, nameError, passwordError } =
        formError;

    const navigation = useNavigation<StackNavigationProp<any>>();
    const dispatch = useDispatch<AppDispatch>();
    const { signupData, signupError, signupLoading } = useSelector(
        (state: RootState) => state.auth
    );

    // show error messsage when find error
    useEffect(() => {
        if (signupError) {
            Toast.show({
                type: "error",
                text1: signupError,
            });
        }
    }, [signupError]);

    // show success messsage when log in
    useEffect(() => {
        if (signupData) {
            Toast.show({
                type: "success",
                text1: "You signed in successfully",
            });

            //  update wishlist data and cart data
            if (signupData.wishList) {
                dispatch(resetWishListData(signupData.wishList));
            }
            if (signupData.cart) {
                dispatch(resetCartData(signupData.cart));
            }

            // navigate
            navigation.navigate("ProductsScreens");
        }
    }, [signupData]);

    // signup
    const signupHandler = async () => {
        // Make sure not signup twice
        if (signupLoading) return;

        // Validation
        const nameErr = validateInput({ inputValue: name, type: "Name" });
        const emailErr = validateInput({ inputValue: email, type: "Email" });
        const passwordErr = validateInput({
            inputValue: password,
            type: "Password",
        });
        const confirmPasswordErr = ValidateConfrimPassword({
            ConfrimPassword: confirmPassword,
            password: password,
        });

        // reset error State
        setFormError({
            confirmPasswordError: confirmPasswordErr,
            emailError: emailErr,
            nameError: nameErr,
            passwordError: passwordErr,
        });

        if (nameErr || emailErr || passwordErr || confirmPasswordErr) return;

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

        dispatch(
            signup({
                name,
                email,
                password,
                passwordConfirm: confirmPassword,
                cartData,
                wishListIds,
            })
        );
    };

    return (
        <AuthContainer header='Sign Up'>
            <Input
                label='Name'
                onChangeText={setName}
                value={name}
                placeholder='Enter Name'
                error={nameError}
            />
            <Input
                label='E-Mail'
                onChangeText={setEmail}
                value={email}
                placeholder='Enter E-Mail'
                error={emailError}
                inputMode='email'
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
            <Input
                label='Confirm Password'
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder='Enter Confirm Password'
                type='password'
                secureTextEntry
                error={confirmPasswordError}
            />
            <View style={styles.itemsContainer}>
                <Button onPress={signupHandler} loading={signupLoading}>
                    Sign Up
                </Button>
            </View>
        </AuthContainer>
    );
};

export default Signup;

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
