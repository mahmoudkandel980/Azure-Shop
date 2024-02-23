import baseRoute from "../../api/baseRoute";
import AsyncStorage from "@react-native-async-storage/async-storage";

// helpers
import TransformToFormDataFun, {
    TransformedCartDataWishListIds,
} from "../../helpers/TransformToFormDataFun";

// interfaces
import {
    ForgetPasswordParams,
    LoginParams,
    ResetPasswordParams,
    SignupParams,
    UpdatePasswordParams,
} from "../../interfaces/store/auth";

const signup = async (formData: SignupParams) => {
    const { convertedCartItems, convertedWishListItems } =
        TransformedCartDataWishListIds(formData.cartData, formData.wishListIds);

    return await baseRoute.post("/users/signup", {
        ...formData,
        cartData: convertedCartItems,
        wishListIds: convertedWishListItems,
    });
};

const login = async (formData: LoginParams) => {
    const { convertedCartItems, convertedWishListItems } =
        TransformedCartDataWishListIds(formData.cartData, formData.wishListIds);

    return await baseRoute.post("/users/login", {
        ...formData,
        cartData: convertedCartItems,
        wishListIds: convertedWishListItems,
    });
};

const forgotPassword = async (formData: ForgetPasswordParams) => {
    const submittedFormData = TransformToFormDataFun(formData);

    const { data } = await baseRoute.post(
        "/users/forgotPassword",
        submittedFormData
    );

    return { data };
};

const resetPassword = async (formData: ResetPasswordParams) => {
    const { password, passwordConfirm, token } = formData;

    const { data } = await baseRoute.patch(`/users/resetPassword/${token}`, {
        password,
        passwordConfirm,
    });

    return { data };
};

const profile = async () => {
    const { data } = await baseRoute.get(`/users/profile`);
    return { data };
};

const updatePassword = async (formData: UpdatePasswordParams) => {
    return await baseRoute.patch("/users/updatePassword", { ...formData });
};

const logout = async () => {
    const { data } = await baseRoute.get("/users/logout");

    // modify storage
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userInfo");
    await AsyncStorage.setItem("cartItems", JSON.stringify([]));
    await AsyncStorage.setItem("wishListItems", JSON.stringify([]));

    return { data };
};

const authService = {
    login,
    signup,
    forgotPassword,
    resetPassword,
    updatePassword,
    profile,
    logout,
};

export default authService;
