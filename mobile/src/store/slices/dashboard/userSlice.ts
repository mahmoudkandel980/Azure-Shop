import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardUsersService from "../../services/dashboard/userService";

// interfaces
import {
    DeleteUserParams,
    EditUserParams,
    InitialDashboardUserState,
    UpdateUserWantToBeSellerParams,
    UsersParams,
    UsersWantToBeSellersParams,
} from "../../../interfaces/store/dashboard/users";
import { Error } from "../../../interfaces/public";

const initialState: InitialDashboardUserState = {
    // users
    usersLoading: false,
    usersData: null,
    usersError: null,
    // usersOverview
    usersOverviewLoading: false,
    usersOverviewData: null,
    usersOverviewError: null,
    // editUser
    editUserLoading: false,
    editUserData: null,
    editUserError: null,
    // deleteUser
    deleteUserLoading: false,
    deleteUserData: null,
    deleteUserError: null,
    // usersWantToBeSellers
    usersWantToBeSellersLoading: false,
    usersWantToBeSellersData: null,
    usersWantToBeSellersError: null,
    // usersWantToBeSellersNumber
    usersWantToBeSellersNumberLoading: false,
    usersWantToBeSellersNumberData: null,
    usersWantToBeSellersNumberError: null,
    // updateUserWantToBeSeller
    updateUserWantToBeSellerLoading: false,
    updateUserWantToBeSellerData: null,
    updateUserWantToBeSellerError: null,
};

// users
export const users = createAsyncThunk(
    "/dashboard/users",
    async (args: UsersParams, thunkAPI) => {
        try {
            return await dashboardUsersService.users(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// usersOverview
export const usersOverview = createAsyncThunk(
    "/dashboard/usersOverview",
    async (_, thunkAPI) => {
        try {
            return await dashboardUsersService.usersOverview();
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// editUser
export const editUser = createAsyncThunk(
    "/dashboard/editUser",
    async (args: EditUserParams, thunkAPI) => {
        try {
            return await dashboardUsersService.editUser(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// deleteUser
export const deleteUser = createAsyncThunk(
    "/dashboard/deleteUser",
    async (args: DeleteUserParams, thunkAPI) => {
        try {
            return await dashboardUsersService.deleteUser(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// usersWantToBeSellers
export const usersWantToBeSellers = createAsyncThunk(
    "/dashboard/usersWantToBeSellers",
    async (args: UsersWantToBeSellersParams, thunkAPI) => {
        try {
            return await dashboardUsersService.usersWantToBeSellers(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// usersWantToBeSellersNumber
export const usersWantToBeSellersNumber = createAsyncThunk(
    "/dashboard/usersWantToBeSellersNumber",
    async (_, thunkAPI) => {
        try {
            return await dashboardUsersService.usersWantToBeSellersNumber();
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// updateUserWantToBeSeller
export const updateUserWantToBeSeller = createAsyncThunk(
    "/dashboard/updateUserWantToBeSeller",
    async (args: UpdateUserWantToBeSellerParams, thunkAPI) => {
        try {
            return await dashboardUsersService.updateUserWantToBeSeller(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

export const dashbordUsersSlice = createSlice({
    name: "dashbordUsers",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetUsers: (state, dispatch) => ({
            ...state,
            usersData: dispatch.payload,
        }),
        resetUsersWantToBeSellers: (state, dispatch) => ({
            ...state,
            usersWantToBeSellersData: dispatch.payload,
        }),
        resetUsersWantToBeSellersNumber: (state, dispatch) => ({
            ...state,
            usersWantToBeSellersNumberData: dispatch.payload,
        }),
        resetUpdateUsersWantToBeSellersDataError: (state) => ({
            ...state,
            updateUserWantToBeSellerData: null,
            updateUserWantToBeSellerError: null,
        }),
        resetDeleteUserDataError: (state) => ({
            ...state,
            deleteUserData: null,
            deleteUserError: null,
        }),
        resetEditUser: (state) => ({
            ...state,
            editUserData: null,
            editUserError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // users
            .addCase(users.pending, (state) => {
                state.usersLoading = true;
            })
            .addCase(users.fulfilled, (state, action) => {
                state.usersLoading = false;
                const { data } = action.payload;
                state.usersData = data;
            })
            .addCase(users.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.payload;
            })
            // usersOverview
            .addCase(usersOverview.pending, (state) => {
                state.usersOverviewLoading = true;
            })
            .addCase(usersOverview.fulfilled, (state, action) => {
                state.usersOverviewLoading = false;
                const { data } = action.payload;
                state.usersOverviewData = data;
            })
            .addCase(usersOverview.rejected, (state, action) => {
                state.usersOverviewLoading = false;
                state.usersOverviewError = action.payload;
            })
            // editUser
            .addCase(editUser.pending, (state) => {
                state.editUserLoading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.editUserLoading = false;
                const { data } = action.payload;

                // udpate all users

                state.editUserData = data.user;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.editUserLoading = false;
                state.editUserError = action.payload;
            })
            // deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.deleteUserLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.deleteUserLoading = false;
                const { data } = action.payload;

                // udpate all users

                state.deleteUserData = data.message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deleteUserLoading = false;
                state.deleteUserError = action.payload;
            })
            // usersWantToBeSellers
            .addCase(usersWantToBeSellers.pending, (state) => {
                state.usersWantToBeSellersLoading = true;
            })
            .addCase(usersWantToBeSellers.fulfilled, (state, action) => {
                state.usersWantToBeSellersLoading = false;
                const { data } = action.payload;
                state.usersWantToBeSellersData = data;
            })
            .addCase(usersWantToBeSellers.rejected, (state, action) => {
                state.usersWantToBeSellersLoading = false;
                state.usersWantToBeSellersError = action.payload;
            })
            // usersWantToBeSellersNumber
            .addCase(usersWantToBeSellersNumber.pending, (state) => {
                state.usersWantToBeSellersNumberLoading = true;
            })
            .addCase(usersWantToBeSellersNumber.fulfilled, (state, action) => {
                state.usersWantToBeSellersNumberLoading = false;
                const { data } = action.payload;
                state.usersWantToBeSellersNumberData = data.usersNumber;
            })
            .addCase(usersWantToBeSellersNumber.rejected, (state, action) => {
                state.usersWantToBeSellersNumberLoading = false;
                state.usersWantToBeSellersNumberError = action.payload;
            })
            // updateUserWantToBeSeller
            .addCase(updateUserWantToBeSeller.pending, (state) => {
                state.updateUserWantToBeSellerLoading = true;
            })
            .addCase(updateUserWantToBeSeller.fulfilled, (state, action) => {
                state.updateUserWantToBeSellerLoading = false;
                const { data } = action.payload;

                // udpate all users

                state.updateUserWantToBeSellerData = data.user;
            })
            .addCase(updateUserWantToBeSeller.rejected, (state, action) => {
                state.updateUserWantToBeSellerLoading = false;
                state.updateUserWantToBeSellerError = action.payload;
            });
    },
});

export const {
    reset,
    resetUsers,
    resetUsersWantToBeSellers,
    resetUsersWantToBeSellersNumber,
    resetUpdateUsersWantToBeSellersDataError,
    resetDeleteUserDataError,
    resetEditUser,
} = dashbordUsersSlice.actions;
export default dashbordUsersSlice.reducer;
