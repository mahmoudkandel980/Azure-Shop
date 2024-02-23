import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { resetLoginData } from "../store/slices/authSlice";
import { intailCartItems } from "../store/slices/cartSlice";
import { intailWishListItems } from "../store/slices/wishListSlice";

const useLoadInintalState = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (async () => {
            const userInfo = await AsyncStorage.getItem("userInfo");
            const token = await AsyncStorage.getItem("token");
            const cartItems = await AsyncStorage.getItem("cartItems");
            const wishListItems = await AsyncStorage.getItem("wishListItems");

            if (userInfo && token) {
                dispatch(
                    resetLoginData({
                        ...JSON.parse(userInfo),
                        token: JSON.parse(token),
                    })
                );
            }

            if (cartItems) {
                dispatch(intailCartItems(JSON.parse(cartItems)));
            }

            if (wishListItems) {
                dispatch(intailWishListItems(JSON.parse(wishListItems)));
            }
        })();
    }, []);
    return {};
};

export default useLoadInintalState;
