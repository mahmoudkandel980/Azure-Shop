import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    updatePassword,
    resetUpdatePasswordDataError,
} from "../../store/slices/authSlice";

// components
import Input from "../shared/inputs/Input";
import Button from "../shared/Button";
import ScrollViewLayout from "../layout/ScrollViewLayout";

// Toast
import Toast from "react-native-toast-message";

// validation
import validateInput, {
    ValidateConfrimPassword,
} from "../../validation/validateInput";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [formError, setFormError] = useState({
        currentPasswordError: "",
        newPasswordError: "",
        passwordConfirmError: "",
    });
    const { newPasswordError, passwordConfirmError, currentPasswordError } =
        formError;

    const dispatch = useDispatch<AppDispatch>();
    const { updatePasswordData, updatePasswordError, updatePasswordLoading } =
        useSelector((state: RootState) => state.auth);

    // show success messsage when log in
    useEffect(() => {
        if (updatePasswordData) {
            Toast.show({
                type: "success",
                text1: "You password has been changed successfully",
            });
        } else if (updatePasswordError) {
            Toast.show({
                type: "error",
                text1: updatePasswordError,
            });
        }
        dispatch(resetUpdatePasswordDataError());
    }, [updatePasswordData, updatePasswordError]);

    const changePasswordHandler = () => {
        if (updatePasswordLoading) return;

        // Validation
        const newPasswordErr = validateInput({
            inputValue: newPassword,
            type: "New Password",
        });
        const currentPasswordErr = validateInput({
            inputValue: currentPassword,
            type: "Current Password",
        });
        const confirmPasswordErr = ValidateConfrimPassword({
            ConfrimPassword: passwordConfirm,
            password: newPassword,
        });

        // reset error State
        setFormError({
            currentPasswordError: currentPasswordErr,
            newPasswordError: newPasswordErr,
            passwordConfirmError: confirmPasswordErr,
        });

        if (newPasswordErr || confirmPasswordErr || currentPasswordErr) return;

        dispatch(
            updatePassword({ currentPassword, newPassword, passwordConfirm })
        );
    };

    return (
        <ScrollViewLayout>
            <View style={{ paddingHorizontal: 20 }}>
                <Input
                    label='Current Password'
                    onChangeText={setCurrentPassword}
                    value={currentPassword}
                    placeholder='Enter Current Password'
                    type='password'
                    secureTextEntry
                    error={currentPasswordError}
                />
                <Input
                    label='New Password'
                    onChangeText={setNewPassword}
                    value={newPassword}
                    placeholder='Enter New Password'
                    type='password'
                    secureTextEntry
                    error={newPasswordError}
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
                <View style={styles.btnContainer}>
                    <Button
                        onPress={changePasswordHandler}
                        loading={updatePasswordLoading}
                    >
                        change password
                    </Button>
                </View>
            </View>
        </ScrollViewLayout>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    btnContainer: {
        paddingTop: 20,
    },
});
