import { UserInfo } from "./userInterface";

export interface LoginInterface {
    userLogin: {
        userInfo: UserInfo;
        loading?: boolean;
        error?: string;
    };
}

export interface SignupInterface {
    userSignup: {
        userInfo: UserInfo;
        loading?: boolean;
        error?: string;
    };
}

export interface ForgetPasswordInterface {
    forgetPassword: {
        message?: string;
        loading?: boolean;
        error?: string;
    };
}

export interface ResetPasswordInterface {
    resetPassword: {
        userInfo?: UserInfo;
        loading?: boolean;
        error?: string;
    };
}

// REDUCERS
export interface LoginReducerInterface {
    userInfo?: UserInfo;
    loading?: boolean;
    error?: string;
}

export interface SignupReducerInterface {
    userInfo?: UserInfo;
    loading?: boolean;
    error?: string;
}

export interface ForgetPasswordReducerInterface {
    message?: string;
    loading?: boolean;
    error?: string;
}

export interface ResetPasswordReducerInterface {
    userInfo?: UserInfo;
    loading?: boolean;
    error?: string;
}
