import { UserInfo } from "../screens/regester";
import { UserDetails, WantToBeSeller } from "../screens/users";

export interface InitialUserState {
    // userDetails
    userDetailsLoading: boolean;
    userDetailsData: null | UserDetails;
    userDetailsError: null | any;
    // updateMe
    updateMeLoading: boolean;
    updateMeData: null | UserInfo;
    updateMeError: null | any;
    // deleteMe
    deleteMeLoading: boolean;
    deleteMeData: null | UserInfo;
    deleteMeError: null | any;
}

export interface UserDetailsParams {
    id: string;
    page: number;
}

export interface UpdateMeParams {
    name?: string;
    email?: string;
    imageUrl?: object;
    wantToBeSeller?: WantToBeSeller;
    activeStatus?: boolean;
}
