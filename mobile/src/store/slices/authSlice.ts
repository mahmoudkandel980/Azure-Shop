import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import StoreWhenLoginOrSignup from "../../helpers/StoreWhenLoginOrSignup";

// interfaces
import {
    InitialAuthState,
    ForgetPasswordParams,
    LoginParams,
    ResetPasswordParams,
    SignupParams,
    UpdatePasswordParams,
} from "../../interfaces/store/auth";
import { Error } from "../../interfaces/public";

const initialState: InitialAuthState = {
    // login
    loginLoading: false,
    loginData: null,
    loginError: null,
    // signup
    signupLoading: false,
    signupData: null,
    signupError: null,
    // forgotPassword
    forgotPasswordLoading: false,
    forgotPasswordData: null,
    forgotPasswordError: null,
    // resetPassword
    resetPasswordLoading: false,
    resetPasswordData: null,
    resetPasswordError: null,
    // updatePassword
    updatePasswordLoading: false,
    updatePasswordData: null,
    updatePasswordError: null,
    // profile
    profileLoading: false,
    profileData: null,
    profileError: null,
    // logout
    logoutLoading: false,
    logoutData: null,
    logoutError: null,
};

// signup
export const signup = createAsyncThunk(
    "/signup",
    async (args: SignupParams, thunkAPI) => {
        try {
            const data = await authService.signup(args);
            await StoreWhenLoginOrSignup(data.data);
            return data;
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// login
export const login = createAsyncThunk(
    "/login",
    async (args: LoginParams, thunkAPI) => {
        try {
            const data = await authService.login(args);
            await StoreWhenLoginOrSignup(data.data);
            return data;
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// forgotPassword
export const forgotPassword = createAsyncThunk(
    "/forgotPassword",
    async (args: ForgetPasswordParams, thunkAPI) => {
        try {
            return await authService.forgotPassword(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// resetPassword
export const resetPassword = createAsyncThunk(
    "/resetPassword",
    async (args: ResetPasswordParams, thunkAPI) => {
        try {
            return await authService.resetPassword(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// updatePassword
export const updatePassword = createAsyncThunk(
    "/updatePassword",
    async (args: UpdatePasswordParams, thunkAPI) => {
        try {
            const data = await authService.updatePassword(args);
            await StoreWhenLoginOrSignup(data.data);
            return data;
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// prfile
export const profile = createAsyncThunk("/profile", async (_, thunkAPI) => {
    try {
        const data = await authService.profile();
        await StoreWhenLoginOrSignup(data.data.user);
        return data;
    } catch (err: Error) {
        return thunkAPI.rejectWithValue(
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        );
    }
});

// logout
export const logout = createAsyncThunk("/logout", async (_, thunkAPI) => {
    try {
        return await authService.logout();
    } catch (err: Error) {
        return thunkAPI.rejectWithValue(
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        );
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetLoginData: (state, action) => ({
            ...state,
            loginData: action.payload,
        }),
        resetForgotPasswordData: (state) => ({
            ...state,
            forgotPasswordData: null,
        }),
        resetUpdatePasswordDataError: (state) => ({
            ...state,
            updatePasswordData: null,
            updatePasswordError: null,
        }),
        resetResetPasswordDataError: (state) => ({
            ...state,
            resetPasswordData: null,
            resetPasswordError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // signup
            .addCase(signup.pending, (state) => {
                state.signupLoading = true;
                state.signupError = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.signupLoading = false;
                const { data } = action.payload;

                // update loginData
                state.loginData = data;
                state.signupData = data;
            })
            .addCase(signup.rejected, (state, action) => {
                state.signupLoading = false;
                state.signupError = action.payload;
            })
            // login
            .addCase(login.pending, (state) => {
                state.loginLoading = true;
                state.loginError = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginLoading = false;
                const { data } = action.payload;

                state.loginData = data;
            })
            .addCase(login.rejected, (state, action) => {
                state.loginLoading = false;

                state.loginError = action.payload;
            })
            // forgotPassword
            .addCase(forgotPassword.pending, (state) => {
                state.forgotPasswordLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.forgotPasswordLoading = false;
                const { data } = action.payload;
                state.forgotPasswordData = data.message;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.forgotPasswordLoading = false;
                state.forgotPasswordError = action.payload;
            })
            // resetPassword
            .addCase(resetPassword.pending, (state) => {
                state.resetPasswordLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPasswordLoading = false;
                const { data } = action.payload;
                state.resetPasswordData = data;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resetPasswordLoading = false;
                state.resetPasswordError = action.payload;
            })
            // updatePassword
            .addCase(updatePassword.pending, (state) => {
                state.updatePasswordLoading = true;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.updatePasswordLoading = false;
                const { data } = action.payload;

                // update loginData
                state.loginData = data;

                state.updatePasswordData = data;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.updatePasswordLoading = false;
                state.updatePasswordError = action.payload;
            })
            // profile
            .addCase(profile.pending, (state) => {
                state.profileLoading = true;
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.profileLoading = false;
                const { data } = action.payload;
                state.profileData = data.user;
            })
            .addCase(profile.rejected, (state, action) => {
                state.profileLoading = false;
                state.profileError = action.payload;
            })
            // logout
            .addCase(logout.pending, (state) => {
                state.logoutLoading = true;
                state.logoutData = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.logoutLoading = false;
                const { data } = action.payload;

                // logout code ==> update userInfo
                state.loginData = null;
                state.signupData = null;

                state.logoutData = data.message;
            })
            .addCase(logout.rejected, (state, action) => {
                state.logoutLoading = false;
                state.logoutError = action.payload;
            });
    },
});

export const {
    reset,
    resetLoginData,
    resetForgotPasswordData,
    resetUpdatePasswordDataError,
    resetResetPasswordDataError,
} = authSlice.actions;
export default authSlice.reducer;
