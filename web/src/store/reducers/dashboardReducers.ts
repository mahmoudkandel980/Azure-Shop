import {
    DASHBOARD_ALL_USERS_REQUSET,
    DASHBOARD_ALL_USERS_SUCCESS,
    DASHBOARD_ALL_USERS_FAIL,
    DASHBOARD_USERS_OVERVIEW_REQUSET,
    DASHBOARD_USERS_OVERVIEW_SUCCESS,
    DASHBOARD_USERS_OVERVIEW_FAIL,
    DASHBOARD_PODUCTS_OVERVIEW_REQUSET,
    DASHBOARD_PODUCTS_OVERVIEW_SUCCESS,
    DASHBOARD_PODUCTS_OVERVIEW_FAIL,
    DASHBOARD_DELETE_USER_USERS_PAGE_REQUSET,
    DASHBOARD_DELETE_USER_USERS_PAGE_SUCCESS,
    DASHBOARD_DELETE_USER_USERS_PAGE_FAIL,
    DASHBOARD_EDIT_USER_USERS_PAGE_REQUSET,
    DASHBOARD_EDIT_USER_USERS_PAGE_SUCCESS,
    DASHBOARD_EDIT_USER_USERS_PAGE_FAIL,
    DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_REQUSET,
    DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_SUCCESS,
    DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_FAIL,
    DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_REQUSET,
    DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_SUCCESS,
    DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_FAIL,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_REQUSET,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_SUCCESS,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_FAIL,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_REQUSET,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_SUCCESS,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_FAIL,
    DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_REQUSET,
    DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_SUCCESS,
    DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_FAIL,
    DASHBOARD_ALL_ORDERS_REQUSET,
    DASHBOARD_ALL_ORDERS_SUCCESS,
    DASHBOARD_ALL_ORDERS_FAIL,
} from "../constants/dashboardConstants";

import { AnyAction } from "redux";

import {
    UsersOverViewReducerInterface,
    ProductsOverViewReducerInterface,
    AllUsersReducerInterface,
    DeleteUserReducerInterface,
    EditUserReducerInterface,
    UsersWantToBeSellerReducerInterface,
    UsersWantToBeSellerNumberReducerInterface,
    UpdateUserWantToBeSellerReducerInterface,
} from "../../interfaces/store/user/userInterface";

import {
    DashboardDeleteProductReducerInterface,
    EditProductReducerInterface,
} from "../../interfaces/store/product/productInterface";
import { AllOrdersReducerInterface } from "../../interfaces/store/order/orderInterface";

// OVERVIEW
export const dashboard_usersOverViewReducer = (
    state = {},
    action: AnyAction
): UsersOverViewReducerInterface => {
    switch (action.type) {
        case DASHBOARD_USERS_OVERVIEW_REQUSET:
            return { loading: true };
        case DASHBOARD_USERS_OVERVIEW_SUCCESS:
            return { loading: false, users: action.payload };
        case DASHBOARD_USERS_OVERVIEW_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboard_productsOverViewReducer = (
    state = {},
    action: AnyAction
): ProductsOverViewReducerInterface => {
    switch (action.type) {
        case DASHBOARD_PODUCTS_OVERVIEW_REQUSET:
            return { loading: true };
        case DASHBOARD_PODUCTS_OVERVIEW_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                graphProducts: action.payload.graphProducts,
            };
        case DASHBOARD_PODUCTS_OVERVIEW_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// USERS
export const dashboard_allUsersReducer = (
    state = { users: [] },
    action: AnyAction
): AllUsersReducerInterface => {
    switch (action.type) {
        case DASHBOARD_ALL_USERS_REQUSET:
            return { loading: true, users: [] };
        case DASHBOARD_ALL_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                ITEMS_PER_PAGE: action.payload.ITEMS_PER_PAGE,
                total_pages: action.payload.total_pages || 1,
            };
        case DASHBOARD_ALL_USERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboard_deleteUser_usersPageReducer = (
    state = { loading: false },
    action: AnyAction
): DeleteUserReducerInterface => {
    switch (action.type) {
        case DASHBOARD_DELETE_USER_USERS_PAGE_REQUSET:
            return { loading: true };
        case DASHBOARD_DELETE_USER_USERS_PAGE_SUCCESS:
            return { loading: false, message: action.payload };
        case DASHBOARD_DELETE_USER_USERS_PAGE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboard_editUser_usersPageReducer = (
    state = { loading: false },
    action: AnyAction
): EditUserReducerInterface => {
    switch (action.type) {
        case DASHBOARD_EDIT_USER_USERS_PAGE_REQUSET:
            return { loading: true };
        case DASHBOARD_EDIT_USER_USERS_PAGE_SUCCESS:
            return { loading: false, user: action.payload.user };
        case DASHBOARD_EDIT_USER_USERS_PAGE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// PRODUCTS
export const dashboard_deleteProduct_productsPageReducer = (
    state = { loading: false },
    action: AnyAction
): DashboardDeleteProductReducerInterface => {
    switch (action.type) {
        case DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_REQUSET:
            return { loading: true };
        case DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_SUCCESS:
            return { loading: false, message: action.payload };
        case DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboard_Editroduct_productsPageReducer = (
    state = { loading: false },
    action: AnyAction
): EditProductReducerInterface => {
    switch (action.type) {
        case DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_REQUSET:
            return { loading: true };
        case DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_SUCCESS:
            return { loading: false, product: action.payload.product };
        case DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboard_usersWantToBeSellersReducer = (
    state = { users: [] },
    action: AnyAction
): UsersWantToBeSellerReducerInterface => {
    switch (action.type) {
        case DASHBOARD_USERS_WANT_TO_BE_SELLERS_REQUSET:
            return { loading: true };
        case DASHBOARD_USERS_WANT_TO_BE_SELLERS_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                ITEMS_PER_PAGE: action.payload.ITEMS_PER_PAGE,
                total_pages: action.payload.total_pages || 1,
            };
        case DASHBOARD_USERS_WANT_TO_BE_SELLERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboard_usersWantToBeSellersNumbersReducer = (
    state = { usersWantToBeSellersNumber: 0 },
    action: AnyAction
): UsersWantToBeSellerNumberReducerInterface => {
    switch (action.type) {
        case DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_REQUSET:
            return { loading: true };
        case DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_SUCCESS:
            return {
                loading: false,
                usersWantToBeSellersNumber: action.payload.usersNumber || 0,
            };
        case DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboard_updateUserWantToBeSellerReducer = (
    state = { loading: false },
    action: AnyAction
): UpdateUserWantToBeSellerReducerInterface => {
    switch (action.type) {
        case DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_REQUSET:
            return { loading: true };
        case DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_SUCCESS:
            return { loading: false, user: action.payload.user };
        case DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const dashboard_allOrdersReducer = (
    state = { orders: [] },
    action: AnyAction
): AllOrdersReducerInterface => {
    switch (action.type) {
        case DASHBOARD_ALL_ORDERS_REQUSET:
            return { loading: true };
        case DASHBOARD_ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                ITEMS_PER_PAGE: action.payload.ITEMS_PER_PAGE,
                total_pages: action.payload.total_pages || 1,
            };
        case DASHBOARD_ALL_ORDERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
