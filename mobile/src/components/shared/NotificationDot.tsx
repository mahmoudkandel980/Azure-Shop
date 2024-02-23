import React, { useEffect, useState, useContext } from "react";

import { View, Text, StyleSheet } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { usersWantToBeSellersNumber } from "../../store/slices/dashboard/userSlice";
import { cart } from "../../store/slices/cartSlice";
import { profile, resetLoginData } from "../../store/slices/authSlice";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// interfaces
import {
    NotificationDotProps,
    NotificationDotContainerProps,
} from "../../interfaces/shared";

const NotificationDotContainer = (porps: NotificationDotContainerProps) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View
            style={[
                styles.container,
                {
                    borderColor:
                        theme === "dark" ? colors.darkGray : colors.white,
                },
            ]}
        >
            <Text style={styles.content}>{porps.children}</Text>
        </View>
    );
};

const NotificationDot = (props: NotificationDotProps) => {
    const { type } = props;

    const dispatch = useDispatch<AppDispatch>();
    const { loginData, profileData } = useSelector(
        (state: RootState) => state.auth
    );
    const { cartData } = useSelector((state: RootState) => state.cart);
    const { usersWantToBeSellersNumberData } = useSelector(
        (state: RootState) => state.dashbordUsers
    );

    const [cartProductsNumber, setCartProductsNumber] = useState(0);
    const [usersWantToBeSellersNumbers, setUsersWantToBeSellersNumbers] =
        useState(0);

    // update login data when refresh or open app
    useEffect(() => {
        if (profileData) {
            dispatch(resetLoginData({ ...loginData, ...profileData }));
        }
    }, [profileData]);

    useEffect(() => {
        dispatch(usersWantToBeSellersNumber());
        dispatch(profile());
        dispatch(cart());
    }, []);

    useEffect(() => {
        if (
            loginData &&
            loginData?.role &&
            ["moderator", "subAdmin", "admin"].includes(loginData?.role)
        ) {
            setUsersWantToBeSellersNumbers(
                usersWantToBeSellersNumberData
                    ? usersWantToBeSellersNumberData
                    : 0
            );
        } else {
            setUsersWantToBeSellersNumbers(0);
        }

        setCartProductsNumber(cartData ? cartData.length : 0);
    }, [usersWantToBeSellersNumberData, cartData]);

    if (type === "cartProductsNumber") {
        return cartProductsNumber > 0 ? (
            <NotificationDotContainer>
                {cartProductsNumber > 9 ? "9+" : cartProductsNumber}
            </NotificationDotContainer>
        ) : (
            <></>
        );
    }

    if (type === "usersWantToBeSellersNumber") {
        return usersWantToBeSellersNumbers > 0 ? (
            <NotificationDotContainer>
                {usersWantToBeSellersNumbers > 9
                    ? "9+"
                    : usersWantToBeSellersNumbers}
            </NotificationDotContainer>
        ) : (
            <></>
        );
    }

    if (type === "both") {
        return Number(cartProductsNumber + usersWantToBeSellersNumbers) > 0 ? (
            <NotificationDotContainer>
                {Number(cartProductsNumber + usersWantToBeSellersNumbers) > 9
                    ? "9+"
                    : cartProductsNumber + usersWantToBeSellersNumbers}
            </NotificationDotContainer>
        ) : (
            <></>
        );
    }
};

export default NotificationDot;

const styles = StyleSheet.create({
    container: {
        width: 18,
        height: 18,
        borderRadius: 18,
        backgroundColor: colors.iconRed,
        position: "absolute",
        top: -5,
        right: -5,
        borderWidth: 2,
    },
    content: {
        fontWeight: "900",
        fontSize: 10,
        color: colors.white,
        textAlign: "center",
    },
});
