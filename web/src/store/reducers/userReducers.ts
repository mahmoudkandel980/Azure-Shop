import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_FORGET_PASSWORD_REQUEST,
    USER_FORGET_PASSWORD_SUCCESS,
    USER_FORGET_PASSWORD_FAIL,
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAIL,
    PROFILE_SUCCESS,
    PROFILE_REQUEST,
    PROFILE_FAIL,
    UPDATE_ME_REQUEST,
    UPDATE_ME_SUCCESS,
    UPDATE_ME_FAIL,
    DELETE_ME_REQUEST,
    DELETE_ME_SUCCESS,
    DELETE_ME_FAIL,
    CHANGE_USER_PASSWORD_REQUEST,
    CHANGE_USER_PASSWORD_SUCCESS,
    CHANGE_USER_PASSWORD_FAIL,
} from "../constants/userConstants";

import { AnyAction } from "redux";
import {
    SignupReducerInterface,
    LoginReducerInterface,
    ForgetPasswordReducerInterface,
    ResetPasswordReducerInterface,
} from "../../interfaces/store/user/authInterface";
import {
    UserDetailsReducerInterface,
    UpdateMeReducerInterface,
    DeleteMeReducerInterface,
    ChangePasswordReducerInterface,
    EditUserReducerInterface,
    ProfileReducerInterface,
} from "../../interfaces/store/user/userInterface";

export const usersignupReducer = (
    state = {},
    action: AnyAction
): SignupReducerInterface => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true };
        case USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userLoginReducer = (
    state = {},
    action: AnyAction
): LoginReducerInterface => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userDetailsRducer = (
    state = { user: { products: [] } },
    action: AnyAction
): UserDetailsReducerInterface => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload.user,
                total_pages: action.payload.total_pages || 1,
            };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case USER_DETAILS_RESET:
            return { user: { products: [] } };
        default:
            return state;
    }
};

export const forgetPasswordReducer = (
    state = {},
    action: AnyAction
): ForgetPasswordReducerInterface => {
    switch (action.type) {
        case USER_FORGET_PASSWORD_REQUEST:
            return { ...state, loading: true };
        case USER_FORGET_PASSWORD_SUCCESS:
            return { loading: false, message: action.payload };
        case USER_FORGET_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const resetPasswordReducer = (
    state = {},
    action: AnyAction
): ResetPasswordReducerInterface => {
    switch (action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return { ...state, loading: true };
        case USER_RESET_PASSWORD_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_RESET_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const profileReducer = (
    state = {},
    action: AnyAction
): ProfileReducerInterface => {
    switch (action.type) {
        case PROFILE_SUCCESS:
            return { ...state, loading: true };
        case PROFILE_REQUEST:
            return { loading: false, user: action.payload };
        case PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateMeReducer = (
    state = {},
    action: AnyAction
): UpdateMeReducerInterface => {
    switch (action.type) {
        case UPDATE_ME_REQUEST:
            return { ...state, loading: true };
        case UPDATE_ME_SUCCESS:
            return { loading: false, updatedUser: action.payload };
        case UPDATE_ME_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteMeReducer = (
    state = {},
    action: AnyAction
): DeleteMeReducerInterface => {
    switch (action.type) {
        case DELETE_ME_REQUEST:
            return { ...state, loading: true };
        case DELETE_ME_SUCCESS:
            return { loading: false, deletedUser: action.payload };
        case DELETE_ME_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const changePasswordReducer = (
    state = {},
    action: AnyAction
): ChangePasswordReducerInterface => {
    switch (action.type) {
        case CHANGE_USER_PASSWORD_REQUEST:
            return { ...state, loading: true };
        case CHANGE_USER_PASSWORD_SUCCESS:
            return { loading: false, updatedUser: action.payload };
        case CHANGE_USER_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
