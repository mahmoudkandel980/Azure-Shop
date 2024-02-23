import { UserInfo } from "../store/user/userInterface";
import { ProductStateInterface } from "../store/product/productInterface";
import { UsersInterface } from "../store/user/userInterface";
import { UserFormError } from "./public";

export interface FilterDataInterface {
    // mutual
    id: string;
    createdFrom: string;
    createdTo: string;
    // products
    category: string;
    priceFrom: string;
    priceTo: string;
    rate: string;
    // users
    email: string;
    role: string;
    active: string;
    // orders
    isPaid: string;
    isDelivered: string;
    // products && users
    name: string;
}

export interface FilterBoxInterface {
    filterData: (filterData: FilterDataInterface) => void;
    showModuleHandler: (showModule: boolean) => void;
}

export interface ProductHeaderInterface {
    loadingUserData?: boolean;
    userInfo: UserInfo;
}
export interface ProductBodyInterface {
    markProductWantToDelete: ProductStateInterface | null;
    markProductWantToEdit: ProductStateInterface | null;
    products: ProductStateInterface[];
    userInfo: UserInfo;
    page: string;
    ITEMS_PER_PAGE: number;
    deleteProduct: (product: ProductStateInterface) => void;
    editProduct: (product: ProductStateInterface) => void;
}

export interface UsersHeaderInterface {
    loadingUserData?: boolean;
    userInfo: UserInfo;
}
export interface UserDataModel {
    id: string;
    name: string;
    role: string;
}

export interface UserBodyNotificationInterface {
    markUserWantToDelete: {
        user: UserInfo | null;
        showAcceptModel?: boolean;
    };
    markUserWantToEdit: {
        user: UserInfo | null;
        showRejectModel?: boolean;
    };
    users: UserInfo[];
    userInfo: UserInfo;
    page: number;
    ITEMS_PER_PAGE: number;
    deleteUser: (product: UserInfo) => void;
    editUser: (product: UserInfo) => void;
}

export interface UsersBodyInterface {
    markUserWantToDelete: {
        user: UserInfo | null;
        showDeleteUserModel?: boolean;
    };
    markUserWantToEdit: {
        user: UserInfo | null;
        showEditUserModel?: boolean;
    };
    users: UserInfo[];
    userInfo: UserInfo;
    page: number;
    ITEMS_PER_PAGE: number;
    deleteUser: (user: UserInfo) => void;
    editUser: (user: UserInfo) => void;
}

export interface EditUserModelInterface {
    header: string;
    showEditUserModel: boolean;
    user: UserInfo;
    loading?: boolean;
    userInfo: UserInfo;
    onClose: (e: boolean) => void;
}

export interface EditUserFormInterface {
    userInfo: UserInfo;
    user: UserInfo;
    role: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    imageUrl: string;
    localImage: File | null;
    name: string;
    email: string;
    formError: UserFormError;
    loading?: boolean;
    activeStatus: boolean;
}

export interface AcceptToBeSellerInterface {
    user: UserInfo | null;
    showAcceptModel: boolean;
}

export interface RejectToBeSellerInterface {
    user: UserInfo | null;
    showRejectModel: boolean;
}

export interface DeleteUserStateInterface {
    user: UserInfo | null;
    showDeleteUserModel: boolean;
}

export interface EditUserStateInterface {
    user: UserInfo | null;
    showEditUserModel: boolean;
}
