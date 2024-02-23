import { useEffect } from "react";
import { StyleSheet } from "react-native";

// Navigation
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// icons
import { Ionicons } from "@expo/vector-icons";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logout, reset } from "../../store/slices/authSlice";
import { reset as resetUsers } from "../../store/slices/dashboard/userSlice";
import { reset as resetDashboard } from "../../store/slices/dashboard/productOrderSlice";
import { resetWishListData } from "../../store/slices/wishListSlice";
import { resetCartData } from "../../store/slices/cartSlice";

// colors
import colors from "../../constants/Colors";

// Toast
import Toast from "react-native-toast-message";

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";

function LogoutButton(props: any) {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);

    // show message when logout successfully
    useEffect(() => {
        if (auth.logoutData) {
            Toast.show({
                type: "success",
                text1: auth.logoutData,
            });

            // Reset wishlist data and cart data
            dispatch(resetWishListData(null));
            dispatch(resetCartData(null));
            dispatch(reset());
            dispatch(resetDashboard());
            dispatch(resetUsers());

            navigation.navigate("ProductsScreens");
        }
    }, [auth.logoutData]);

    const logoutHandler = async () => {
        // log out
        dispatch(logout());
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {auth.loginData && auth.loginData?.token && (
                <DrawerItem
                    icon={({ color, size }) => (
                        <Ionicons
                            name='log-out'
                            size={size}
                            color={colors.lightRed}
                        />
                    )}
                    label='Log Out'
                    style={styles.button}
                    labelStyle={styles.label}
                    onPress={logoutHandler}
                />
            )}
        </DrawerContentScrollView>
    );
}

export default LogoutButton;

const styles = StyleSheet.create({
    button: {
        marginTop: 100,
        // backgroundColor: "#ff6b6b",
    },
    label: {
        color: colors.lightRed,
    },
});
