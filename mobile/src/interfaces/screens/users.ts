import { CreateEditType } from "../models";
import { UserInfo } from "./regester";

export interface UserDetails {
    user: UserInfo;
    total_pages: number;
}

export enum WantToBeSeller {
    yes = "yes",
    no = "no",
}

export interface Users {
    users: UserInfo[];
    total_pages: number;
    ITEMS_PER_PAGE: number;
}

export interface UserFormData {
    name: string;
    email: string;
    role: boolean;
    activeStatus: boolean;
    imageUrl?: object;
}

export interface UsersState {
    active: number;
    inActive: number;
    all: number;
}

export interface UsersOverview {
    allUsers: UsersState;
    users: UsersState;
    sellers: UsersState;
    moderators: UsersState;
    subAdmins: UsersState;
    admins: UsersState;
}
export interface UsersWantToBeSeller {
    users: UserInfo[];
    ITEMS_PER_PAGE: number;
    total_pages: number;
}

export interface UsersGraphData {
    value: number;
    label?: string;
    spacing?: number;
    labelWidth?: number;
    labelTextStyle?: { color: string };
    frontColor: string;
}

export interface EditUserModelProps {
    showEditModel: boolean;
    setShowCreateEditModel: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserInfo;
    type: CreateEditType;
}
