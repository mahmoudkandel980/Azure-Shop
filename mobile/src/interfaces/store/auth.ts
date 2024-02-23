import { UserInfo, LoginSignUp } from "../screens/regester";

export interface InitialAuthState {
    // login
    loginLoading: boolean;
    loginData: null | LoginSignUp;
    loginError: null | any;
    // signup
    signupLoading: boolean;
    signupData: null | LoginSignUp;
    signupError: null | any;
    // forgotPassword
    forgotPasswordLoading: boolean;
    forgotPasswordData: null | string;
    forgotPasswordError: null | any;
    // resetPassword
    resetPasswordLoading: boolean;
    resetPasswordData: null | UserInfo;
    resetPasswordError: null | any;
    // updatePassword
    updatePasswordLoading: boolean;
    updatePasswordData: null | UserInfo;
    updatePasswordError: null | any;
    // profile
    profileLoading: boolean;
    profileData: null | UserInfo;
    profileError: null | any;
    // logout
    logoutLoading: boolean;
    logoutData: null | string;
    logoutError: null | any;
}

export interface SignupParams {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    wishListIds: [];
    cartData: [];
}

export interface LoginParams {
    email: string;
    password: string;
    wishListIds: [];
    cartData: [];
}

export interface ForgetPasswordParams {
    email: string;
}

export interface ResetPasswordParams {
    token: string;
    password: string;
    passwordConfirm: string;
}

export interface UpdatePasswordParams {
    currentPassword: string;
    newPassword: string;
    passwordConfirm: string;
}
