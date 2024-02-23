import { ProductStateInterface } from "../product/productInterface";

export interface UserInfo {
    token?: string | undefined;
    _id?: string;
    id?: string;
    name?: string;
    email?: string;
    imageUrl?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
    activeStatus?: boolean;
    nominateAsSeller?: {
        wantToBeSeller: boolean;
        date?: string | undefined;
    };
    products?: ProductStateInterface[] | [];
}

export interface UsersWantToBeSellerNumberInterface {
    dashboard_usersWantToBeSellersNumbers: {
        usersWantToBeSellersNumber?: number;
        loading?: boolean;
        error?: string;
    };
}

export interface UpdateUserWantToBeSeller {
    dashboard_updateUserWantToBeSeller: {
        user?: UserInfo;
        loading?: boolean;
        error?: string;
    };
}

export interface UsersWantToBeSellerInterface {
    dashboard_usersWantToBeSellers: {
        users?: UserInfo[];
        ITEMS_PER_PAGE?: number;
        total_pages?: number;
        loading?: boolean;
        error?: string;
    };
}

export interface UsersStateInterface {
    active: number;
    inActive: number;
    all: number;
}

export interface UsersInterface {
    allUsers: UsersStateInterface;
    users: UsersStateInterface;
    sellers: UsersStateInterface;
    moderators: UsersStateInterface;
    subAdmins: UsersStateInterface;
    admins: UsersStateInterface;
}

// overview
export interface UsersOverViewInterface {
    dashboard_usersOverView: {
        loading?: boolean;
        error?: string;
        users?: UsersInterface;
    };
}

export interface ProductsOfProductsOverViewInterface {
    _id: number;
    numProducts: number;
    rating: number;
}

export interface GraphProductsOfProductsOverViewInterface {
    _id: string;
    sum: number;
}

export interface ProductsOverViewInterface {
    dashboard_productsOverView: {
        loading?: boolean;
        error?: string;
        products?: ProductsOfProductsOverViewInterface[];
        graphProducts: GraphProductsOfProductsOverViewInterface[];
    };
}

export interface UsersInterface {
    _id: string;
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
    activeStatus: boolean;
    products?: {
        _id: string;
        id: string;
        creator: string;
        reviews: { _id: string; rating: string; id: string }[];
    }[];
    nominateAsSeller?: {
        wantToBeSeller: boolean;
        date?: string | undefined;
    };
}

export interface AllUsersInterface {
    dashboard_allUsers: {
        loading?: boolean;
        error?: string;
        users: UserInfo[];
        total_pages: number;
        ITEMS_PER_PAGE: number;
    };
}

export interface DeleteUserInterface {
    dashboard_deleteUser: {
        loading?: boolean;
        error?: string;
        message?: string;
    };
}

export interface ProfileInterface {
    profile: {
        loading?: boolean;
        error?: string;
        user?: UserInfo;
    };
}

export interface EditUserInterface {
    dashboard_editUser: {
        loading?: boolean;
        error?: string;
        user?: UserInfo;
    };
}

export interface UpdateMeInterface {
    updateMe: {
        loading?: boolean;
        error?: string;
        updatedUser?: UserInfo;
    };
}

export interface DeleteMeInterface {
    deleteMe: {
        loading?: boolean;
        error?: string;
        deletedUser?: UserInfo;
    };
}

export interface ChangePasswordInterface {
    changePassword: {
        loading?: boolean;
        error?: string;
        updatedUser?: UserInfo;
    };
}

export interface UserDetailsInterface {
    userDetails: {
        loading?: boolean;
        error?: string;
        user?: UserInfo;
        total_pages?: number;
    };
}

// REDUCERS
export interface UsersWantToBeSellerNumberReducerInterface {
    usersWantToBeSellersNumber?: number;
    loading?: boolean;
    error?: string;
}

export interface UpdateUserWantToBeSellerReducerInterface {
    user?: UserInfo;
    loading?: boolean;
    error?: string;
}

export interface UsersWantToBeSellerReducerInterface {
    users?: UserInfo[];
    ITEMS_PER_PAGE?: number;
    total_pages?: number;
    loading?: boolean;
    error?: string;
}

export interface UsersOverViewReducerInterface {
    loading?: boolean;
    error?: string;
    users?: UsersInterface;
}

export interface ProductsOverViewReducerInterface {
    loading?: boolean;
    error?: string;
    products?: ProductsOfProductsOverViewInterface[];
    graphProducts?: GraphProductsOfProductsOverViewInterface[];
}

export interface AllUsersReducerInterface {
    loading?: boolean;
    error?: string;
    users?: UserInfo[];
    total_pages?: number;
    ITEMS_PER_PAGE?: number;
}

export interface DeleteUserReducerInterface {
    loading?: boolean;
    error?: string;
    message?: string;
}

export interface EditUserReducerInterface {
    loading?: boolean;
    error?: string;
    user?: UserInfo;
}

export interface ProfileReducerInterface {
    loading?: boolean;
    error?: string;
    user?: UserInfo;
}

export interface UpdateMeReducerInterface {
    loading?: boolean;
    error?: string;
    updatedUser?: UserInfo;
}

export interface DeleteMeReducerInterface {
    loading?: boolean;
    error?: string;
    deletedUser?: UserInfo;
}

export interface ChangePasswordReducerInterface {
    loading?: boolean;
    error?: string;
    updatedUser?: UserInfo;
}

export interface UserDetailsReducerInterface {
    loading?: boolean;
    error?: string;
    user?: UserInfo;
    total_pages?: number;
}
