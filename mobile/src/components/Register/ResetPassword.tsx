import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
    useRoute,
    useNavigation,
    NavigationProp,
} from "@react-navigation/native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    resetPassword,
    resetResetPasswordDataError,
} from "../../store/slices/authSlice";

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

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [formError, setFormError] = useState({
        passwordError: "",
        passwordConfirmError: "",
    });
    const { passwordConfirmError, passwordError } = formError;

    const route = useRoute();
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<any>>();
    const token = route.path?.split("token=")[1];

    const { resetPasswordData, resetPasswordError, resetPasswordLoading } =
        useSelector((state: RootState) => state.auth);

    // navigate to login screen if we have not token
    useEffect(() => {
        if (!token) {
            navigation.navigate("Register", { screen: "Login" });
        }
    }, [token]);

    // show toast when there is an error or success reset password
    useEffect(() => {
        if (resetPasswordData) {
            Toast.show({
                type: "success",
                text1: "Password was changed successfully",
            });
            dispatch(resetResetPasswordDataError());
        }
        if (resetPasswordError) {
            Toast.show({
                type: "error",
                text1: resetPasswordError,
            });
            dispatch(resetResetPasswordDataError());
        }
    }, [resetPasswordData, resetPasswordError]);

    const resetPasswordHandler = () => {
        // Make sure not reset password twice
        if (resetPasswordLoading) return;

        const passwordErr = validateInput({
            inputValue: password,
            type: "New Password",
        });
        const confirmPasswordErr = ValidateConfrimPassword({
            ConfrimPassword: passwordConfirm,
            password: password,
        });
        // reset error State
        setFormError({
            passwordConfirmError: confirmPasswordErr,
            passwordError: passwordErr,
        });
        if (passwordErr || confirmPasswordErr) return;

        dispatch(
            resetPassword({
                password,
                passwordConfirm,
                token: token!,
            })
        );
    };

    return (
        <AuthContainer header='Reset Password'>
            <Input
                label='New Password'
                onChangeText={setPassword}
                value={password}
                placeholder='Enter New Password'
                type='password'
                secureTextEntry
                error={passwordError}
            />
            <Input
                label='Confirm Password'
                onChangeText={setPasswordConfirm}
                value={passwordConfirm}
                placeholder='Enter Confirm Password'
                type='password'
                secureTextEntry
                error={passwordConfirmError}
            />
            <View style={styles.itemsContainer}>
                <Button
                    loading={resetPasswordLoading}
                    onPress={resetPasswordHandler}
                >
                    Change Password
                </Button>
            </View>
        </AuthContainer>
    );
};

export default ResetPassword;

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
