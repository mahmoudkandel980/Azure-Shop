import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";
import StoreWhenLoginOrSignup from "../../helpers/StoreWhenLoginOrSignup";

// interfaces
import {
    InitialUserState,
    UpdateMeParams,
    UserDetailsParams,
} from "../../interfaces/store/user";
import { Error } from "../../interfaces/public";

const initialState: InitialUserState = {
    // userDetails
    userDetailsLoading: false,
    userDetailsData: null,
    userDetailsError: null,
    // updateMe
    updateMeLoading: false,
    updateMeData: null,
    updateMeError: null,
    // deleteMe
    deleteMeLoading: false,
    deleteMeData: null,
    deleteMeError: null,
};

// userDetails
export const userDetails = createAsyncThunk(
    "/userDetails",
    async (args: UserDetailsParams, thunkAPI) => {
        try {
            return await userService.userDetails(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// updateMe
export const updateMe = createAsyncThunk(
    "/updateMe",
    async (args: UpdateMeParams, thunkAPI) => {
        try {
            const data = await userService.updateMe(args);
            await StoreWhenLoginOrSignup(data.data.user);
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

// deleteMe
export const deleteMe = createAsyncThunk("/deleteMe", async (_, thunkAPI) => {
    try {
        const data = await userService.deleteMe();
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

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetUpdateDeleteMeDataError: (state) => ({
            ...state,
            updateMeData: null,
            updateMeError: null,
            deleteMeData: null,
            deleteMeError: null,
        }),
        resetUserDetails: (state, action) => ({
            ...state,
            userDetailsData: action.payload,
        }),
        resetUpdateMeDataError: (state) => ({
            ...state,
            updateMeData: null,
            updateMeError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // userDetails
            .addCase(userDetails.pending, (state) => {
                state.userDetailsLoading = true;
                state.userDetailsError = null;
            })
            .addCase(userDetails.fulfilled, (state, action) => {
                state.userDetailsLoading = false;
                const { data } = action.payload;
                state.userDetailsData = data;
            })
            .addCase(userDetails.rejected, (state, action) => {
                state.userDetailsLoading = false;
                state.userDetailsError = action.payload;
            })
            // updateMe
            .addCase(updateMe.pending, (state) => {
                state.updateMeLoading = true;
                state.updateMeError = null;
            })
            .addCase(updateMe.fulfilled, (state, action) => {
                state.updateMeLoading = false;
                const { data } = action.payload;
                state.updateMeData = data.user;
            })
            .addCase(updateMe.rejected, (state, action) => {
                state.updateMeLoading = false;
                state.updateMeError = action.payload;
            })
            // deleteMe
            .addCase(deleteMe.pending, (state) => {
                state.deleteMeLoading = true;
                state.deleteMeError = null;
            })
            .addCase(deleteMe.fulfilled, (state, action) => {
                state.deleteMeLoading = false;
                const { data } = action.payload;
                state.deleteMeData = data.user;
            })
            .addCase(deleteMe.rejected, (state, action) => {
                state.deleteMeLoading = false;
                state.deleteMeError = action.payload;
            });
    },
});

export const {
    reset,
    resetUpdateDeleteMeDataError,
    resetUserDetails,
    resetUpdateMeDataError,
} = userSlice.actions;
export default userSlice.reducer;
