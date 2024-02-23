import { LoginSignUp } from "../interfaces/screens/regester";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreWhenLoginOrSignup = async (data: LoginSignUp) => {
    const userInfo = { ...data };
    if (userInfo.token) {
        await AsyncStorage.setItem("token", JSON.stringify(userInfo.token));
    }

    if (userInfo.cart) {
        await AsyncStorage.setItem("cartItems", JSON.stringify(userInfo.cart));
        delete userInfo.cart;
    }

    if (userInfo.wishList) {
        await AsyncStorage.setItem(
            "wishListItems",
            JSON.stringify(userInfo.wishList)
        );
        delete userInfo.wishList;
    }

    if (userInfo.token) {
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
        const stringifyToken = await AsyncStorage.getItem("token");
        const token = JSON.parse(stringifyToken!);
        await AsyncStorage.setItem(
            "userInfo",
            JSON.stringify({ ...userInfo, token: token })
        );
    }

    return;
};

export default StoreWhenLoginOrSignup;
