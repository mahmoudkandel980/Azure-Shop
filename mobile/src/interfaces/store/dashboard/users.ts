import { FilterDate } from "../../screens/dashboard";
import { UserInfo } from "../../screens/regester";
import {
    Users,
    UsersOverview,
    UsersWantToBeSeller,
    UserFormData,
} from "../../screens/users";

export interface InitialDashboardUserState {
    // users
    usersLoading: boolean;
    usersData: null | Users;
    usersError: null | any;
    // usersOverview
    usersOverviewLoading: boolean;
    usersOverviewData: null | UsersOverview;
    usersOverviewError: null | any;
    // editUser
    editUserLoading: boolean;
    editUserData: null | UserInfo;
    editUserError: null | any;
    // deleteUser
    deleteUserLoading: boolean;
    deleteUserData: null | string;
    deleteUserError: null | any;
    // usersWantToBeSellers
    usersWantToBeSellersLoading: boolean;
    usersWantToBeSellersData: null | UsersWantToBeSeller;
    usersWantToBeSellersError: null | any;
    // usersWantToBeSellersNumber
    usersWantToBeSellersNumberLoading: boolean;
    usersWantToBeSellersNumberData: null | number;
    usersWantToBeSellersNumberError: null | any;
    // updateUserWantToBeSeller
    updateUserWantToBeSellerLoading: boolean;
    updateUserWantToBeSellerData: null | UserInfo;
    updateUserWantToBeSellerError: null | any;
}

export interface UsersParams {
    filterData: FilterDate | null;
    page: number;
}

export interface EditUserParams {
    userId: string;
    userFormData: UserFormData;
}

export interface DeleteUserParams {
    userId: string;
}

export interface UsersWantToBeSellersParams {
    page: number;
}

export interface UpdateUserWantToBeSellerParams {
    userId: string;
    role: string;
}

export interface PaginationBtnProps {
    display?: "none" | "flex" | undefined;
    currentPage?: boolean;
    navigationContent: {
        params: any;
        name: string;
        page: number;
    };
    children: string | number;
}
