import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
    forgotPassword,
    resetForgotPasswordData,
} from "../../store/slices/authSlice";

// components
import Input from "../shared/inputs/Input";
import Button from "../shared/Button";
import AuthContainer from "./AuthContainer";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// toast
import Toast from "react-native-toast-message";

// validation
import validateInput from "../../validation/validateInput";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch<AppDispatch>();
    const { forgotPasswordData, forgotPasswordError, forgotPasswordLoading } =
        useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!forgotPasswordData) return;
        Toast.show({
            type: "success",
            text1: forgotPasswordData,
        });
        dispatch(resetForgotPasswordData());
    }, [forgotPasswordData]);

    const sendEmailHandler = () => {
        // make sure no send email twice
        if (forgotPasswordLoading) return;

        const emailErr = validateInput({
            inputValue: email,
            type: "Email",
        });
        setEmailError(emailErr);
        if (emailErr) return;

        dispatch(forgotPassword({ email }));
    };

    return (
        <AuthContainer header='Forget Password'>
            <Text
                style={[
                    styles.content,
                    {
                        color:
                            theme === "dark"
                                ? colors.whiteMilk
                                : colors.smothDark,
                    },
                ]}
            >
                Please enter your email and we will send you an E-mail with a
                token to check if you are the user of this account.
            </Text>
            <Input
                label='E-Mail'
                onChangeText={setEmail}
                value={email}
                placeholder='Enter E-Mail'
                error={emailError}
            />
            <View style={styles.itemsContainer}>
                <Button
                    loading={forgotPasswordLoading}
                    onPress={sendEmailHandler}
                >
                    Send E-Mail
                </Button>
            </View>
        </AuthContainer>
    );
};

export default ForgetPassword;

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
    content: {
        paddingHorizontal: 10,
    },
});
