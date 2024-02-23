import {
    createStore,
    combineReducers,
    applyMiddleware,
    AnyAction,
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { UserInfo } from "../interfaces/store/user/userInterface";
import { ProductStateInterface } from "../interfaces/store/product/productInterface";
import { CartItems } from "../interfaces/store/cart/cartInterface";

import {
    getAllProductsReducer,
    productDetailsReducer,
    myProductsReducer,
    createProductReducer,
    editProductReducer,
    deleteProductReducer,
    getTopRatedBestSaleProductsReducer,
} from "./reducers/productReducers";

import {
    userLoginReducer,
    usersignupReducer,
    userDetailsRducer,
    forgetPasswordReducer,
    resetPasswordReducer,
    updateMeReducer,
    deleteMeReducer,
    changePasswordReducer,
    profileReducer,
} from "./reducers/userReducers";

import {
    getAllProductsInCartReducer,
    addProductToCartReducer,
    deleteProductFromCartReducer,
} from "./reducers/CartReducer";
import {
    getAllProductsInWishListReducer,
    addProductToWishListReducer,
    deleteProductFromWishListReducer,
} from "./reducers/wishListReducer";

import {
    productReviewsReducer,
    addProductReviewReducer,
    editProductReviewReducer,
    deleteProductReviewReducer,
    getMyReviewsReducer,
} from "./reducers/reviewReducer";

import {
    dashboard_allUsersReducer,
    dashboard_usersOverViewReducer,
    dashboard_productsOverViewReducer,
    dashboard_deleteUser_usersPageReducer,
    dashboard_editUser_usersPageReducer,
    dashboard_deleteProduct_productsPageReducer,
    dashboard_Editroduct_productsPageReducer,
    dashboard_usersWantToBeSellersReducer,
    dashboard_usersWantToBeSellersNumbersReducer,
    dashboard_updateUserWantToBeSellerReducer,
    dashboard_allOrdersReducer,
} from "./reducers/dashboardReducers";

import {
    createOrderReducer,
    getMyOrdersReducer,
    getOrderByOrderIdReducer,
    createCheckoutSessionReducer,
    updateOrderToPaidReducer,
    updateOrderToDeliveredReducer,
} from "./reducers/orderReducer";
import { Dispatch } from "react";

const reducer = combineReducers({
    // Products
    allProducts: getAllProductsReducer,
    productDetails: productDetailsReducer,
    myProducts: myProductsReducer,
    createProduct: createProductReducer,
    editProduct: editProductReducer,
    deleteProduct: deleteProductReducer,
    topRatedBestSaleProducts: getTopRatedBestSaleProductsReducer,
    // Reviews
    productReviews: productReviewsReducer,
    addProductReview: addProductReviewReducer,
    editProductReview: editProductReviewReducer,
    deleteProductReview: deleteProductReviewReducer,
    myReviews: getMyReviewsReducer,
    // Users
    userLogin: userLoginReducer,
    userSignup: usersignupReducer,
    userDetails: userDetailsRducer,
    forgetPassword: forgetPasswordReducer,
    resetPassword: resetPasswordReducer,
    updateMe: updateMeReducer,
    deleteMe: deleteMeReducer,
    changePassword: changePasswordReducer,
    profile: profileReducer,
    // cart
    cart: getAllProductsInCartReducer,
    addProductToCard: addProductToCartReducer,
    deleteProductFromCard: deleteProductFromCartReducer,
    // Order
    createOrder: createOrderReducer,
    getMyOrders: getMyOrdersReducer,
    getOrderByOrderId: getOrderByOrderIdReducer,
    createCheckoutSession: createCheckoutSessionReducer,
    updateOrderToPaid: updateOrderToPaidReducer,
    updateOrderToDelivered: updateOrderToDeliveredReducer,
    // wishList
    wishList: getAllProductsInWishListReducer,
    addProductToWishList: addProductToWishListReducer,
    deleteProductFromWishList: deleteProductFromWishListReducer,
    // dashboard
    dashboard_allUsers: dashboard_allUsersReducer,
    dashboard_usersOverView: dashboard_usersOverViewReducer,
    dashboard_productsOverView: dashboard_productsOverViewReducer,
    dashboard_deleteUser: dashboard_deleteUser_usersPageReducer,
    dashboard_editUser: dashboard_editUser_usersPageReducer,
    dashboard_deleteProduct: dashboard_deleteProduct_productsPageReducer,
    dashboard_editProduct: dashboard_Editroduct_productsPageReducer,
    dashboard_usersWantToBeSellers: dashboard_usersWantToBeSellersReducer,
    dashboard_usersWantToBeSellersNumbers:
        dashboard_usersWantToBeSellersNumbersReducer,
    dashboard_updateUserWantToBeSeller:
        dashboard_updateUserWantToBeSellerReducer,
    dashboard_allOrders: dashboard_allOrdersReducer,
});

const userInfo: UserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : {};

const cartItems: CartItems[] | [] = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") as string)
    : [];

const wishListItems: ProductStateInterface[] | [] = localStorage.getItem(
    "wishListItems"
)
    ? JSON.parse(localStorage.getItem("wishListItems") as string)
    : [];

const initialState = {
    userLogin: { userInfo: userInfo },
    cart: { cartItems: cartItems },
    wishList: {
        wishListItems: wishListItems,
        wishListItemsIds:
            wishListItems && wishListItems.length > 0
                ? wishListItems.map((p: ProductStateInterface) => p.id)
                : [],
    },
};

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = Dispatch<AnyAction> &
    ThunkDispatch<RootState, null, AnyAction>;

export default store;
