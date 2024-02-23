import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";

// utilities functions
import {
    findIndex,
    isExist,
    findIndexOfUser,
    findIndexOfProduct,
    updateLocalStorage,
} from "../../helpers/utilitiesFunForSocketIo";

import { logout } from "../../store/actions/userActions";

// consts
import {
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_SUCCESS,
    TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
} from "../../store/constants/productConstants";
import { GET_PRODUCT_REVIEWS_SUCCESS } from "../../store/constants/reviewConstants";
import {
    USER_LOGIN_SUCCESS,
    USER_DETAILS_SUCCESS,
} from "../../store/constants/userConstants";
import { GET_ORDER_BY_ORDER_ID_SUCCESS } from "../../store/constants/orderConstants";
import {
    DASHBOARD_ALL_USERS_SUCCESS,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_SUCCESS,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_SUCCESS,
} from "../../store/constants/dashboardConstants";
import { GET_ALLPRODUCTS_IN_CART_SUCCESS } from "../../store/constants/cartConstants";

import { LoginInterface } from "../../interfaces/store/user/authInterface";
import {
    GetAllProductsInterface,
    ProductDetailsInterface,
    TopRatedBestSaleProductsInterface,
} from "../../interfaces/store/product/productInterface";
import { ProductReviewsInterface } from "../../interfaces/store/reviews/reviewInterface";
import {
    UserDetailsInterface,
    AllUsersInterface,
    UsersWantToBeSellerInterface,
    UsersWantToBeSellerNumberInterface,
} from "../../interfaces/store/user/userInterface";
import { OrderByOrderIdInterface } from "../../interfaces/store/order/orderInterface";
import { CartStateInterface } from "../../interfaces/store/cart/cartInterface";

const useEmitUser = (socket: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // allPorducts
    const { allProducts: allProductsState } = useSelector(
        (state) => state as GetAllProductsInterface
    );
    const {
        products: allProducts,
        total_pages: allProductsTotal_pages,
        ITEMS_PER_PAGE: allProductsITEMS_PER_PAGE,
        pageType: allProductsPageType,
    } = allProductsState;
    // productDetails
    const { productDetails: productDetailsState } = useSelector(
        (state) => state as ProductDetailsInterface
    );
    const { product: productDetails } = productDetailsState;
    // topRatedBestSaleProducts
    const { topRatedBestSaleProducts } = useSelector(
        (state) => state as TopRatedBestSaleProductsInterface
    );
    const { topRatedProducts, bestSaleProducts } = topRatedBestSaleProducts;
    // productReviews
    const { productReviews: productReviewsState } = useSelector(
        (state) => state as ProductReviewsInterface
    );
    const { reviews: productReviews, productId: productReviewsProductId } =
        productReviewsState;
    // userLogin
    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;
    // userDetails
    const { userDetails: userDetailsState } = useSelector(
        (state) => state as UserDetailsInterface
    );
    const { user: userDetails, total_pages: userDetailsTotal_pages } =
        userDetailsState;
    // getOrderByOrderId
    const { getOrderByOrderId } = useSelector(
        (state) => state as OrderByOrderIdInterface
    );
    const { order: getOrderByOrderIdOrder } = getOrderByOrderId;
    // dashboard_allUsers
    const { dashboard_allUsers } = useSelector(
        (state) => state as AllUsersInterface
    );
    const {
        users: allUsers,
        ITEMS_PER_PAGE: allUsersITEMS_PER_PAGE,
        total_pages: allUsersTotal_pages,
    } = dashboard_allUsers;
    // dashboard_usersWantToBeSellers
    const { dashboard_usersWantToBeSellers } = useSelector(
        (state) => state as UsersWantToBeSellerInterface
    );
    const {
        users: usersWantToBeSellers,
        ITEMS_PER_PAGE: usersWantToBeSellersITEMS_PER_PAGE,
        total_pages: usersWantToBeSellersTotal_pages,
    } = dashboard_usersWantToBeSellers;
    // dashboard_usersWantToBeSellersNumbers
    const { dashboard_usersWantToBeSellersNumbers } = useSelector(
        (state) => state as UsersWantToBeSellerNumberInterface
    );
    const { usersWantToBeSellersNumber } =
        dashboard_usersWantToBeSellersNumbers;
    // cart
    const { cart } = useSelector((state) => state as CartStateInterface);
    const { cartItems } = cart;

    useEffect(() => {
        const handler = (data: any) => {
            // ----------------------------------
            // WHEN USER IS CREATED
            // ----------------------------------
            if (data.action === "create") {
                // dashboard_allUsers
                const user = data.user;
                if (allUsers && allUsers.length > 0) {
                    user.products = [];
                    allUsers.unshift(user);
                    dispatch({
                        type: DASHBOARD_ALL_USERS_SUCCESS,
                        payload: {
                            users: allUsers,
                            ITEMS_PER_PAGE: allUsersITEMS_PER_PAGE + 1,
                            total_pages: allUsersTotal_pages,
                        },
                    });
                }
            }

            // ----------------------------------
            // WHEN USER IS EDIT
            // ----------------------------------
            if (data.action === "edit") {
                const user = data.user;
                // UPDATE localStorage
                updateLocalStorage(user, "edit", null, null, null);

                // allProducts
                const indexesOfProductInAllProducts = findIndexOfUser(
                    allProducts,
                    user.id
                );
                if (indexesOfProductInAllProducts !== -1) {
                    if (
                        allProductsPageType !== "dashboard" &&
                        user.activeStatus === false
                    ) {
                        indexesOfProductInAllProducts
                            .reverse()
                            .forEach((i) => allProducts.splice(i, 1));
                    } else {
                        indexesOfProductInAllProducts.map(
                            (i) => (allProducts[i].creator = user)
                        );
                    }
                    dispatch({
                        type: ALL_PRODUCTS_SUCCESS,
                        payload: {
                            products: allProducts,
                            ITEMS_PER_PAGE: allProductsITEMS_PER_PAGE,
                            total_pages: allProductsTotal_pages,
                            pageType: allProductsPageType,
                        },
                    });
                }
                // productDetails
                const isProductDetailsBelongToUser = isExist(
                    productDetails!.creator,
                    user.id
                );
                if (isProductDetailsBelongToUser) {
                    productDetails!.creator = user;
                    productDetails!.creatorActiveStatus = user.activeStatus;
                    dispatch({
                        type: PRODUCT_DETAILS_SUCCESS,
                        payload: { ...productDetails },
                    });
                }
                // topRatedBestSaleProducts
                const indexesOfTopRatedProducts = findIndexOfUser(
                    topRatedProducts,
                    user.id
                );
                if (indexesOfTopRatedProducts !== -1) {
                    indexesOfTopRatedProducts.map(
                        (i) => (topRatedProducts![i].creator = user)
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: topRatedProducts,
                            bestSaleProducts: bestSaleProducts,
                        },
                    });
                }
                const indexesOfBestSaleProducts = findIndexOfUser(
                    bestSaleProducts,
                    user.id
                );
                if (indexesOfBestSaleProducts !== -1) {
                    indexesOfBestSaleProducts.map(
                        (i) => (bestSaleProducts![i].creator = user)
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: topRatedProducts,
                            bestSaleProducts: bestSaleProducts,
                        },
                    });
                }
                // productReviews
                const indexesOfReview = findIndexOfUser(
                    productReviews,
                    user.id
                );
                if (indexesOfReview !== -1) {
                    indexesOfReview.map(
                        (i) => (productReviews![i].creator = user)
                    );
                    dispatch({
                        type: GET_PRODUCT_REVIEWS_SUCCESS,
                        payload: {
                            reviews: productReviews,
                            productId: productReviewsProductId,
                        },
                    });
                }
                // userLogin
                if (userInfo && userInfo.id === user.id) {
                    const token = userInfo.token;
                    let newUserInfo = user;
                    newUserInfo.token = token;
                    dispatch({
                        type: USER_LOGIN_SUCCESS,
                        payload: { ...newUserInfo },
                    });
                }
                // userDetails
                if (userDetails && userDetails.id === user.id) {
                    const products = userDetails.products;
                    const newUserDetails = user;
                    newUserDetails.products = products;
                    dispatch({
                        type: USER_DETAILS_SUCCESS,
                        payload: {
                            user: newUserDetails,
                            total_pages: userDetailsTotal_pages,
                        },
                    });
                }
                // getOrderByOrderId
                if (
                    getOrderByOrderIdOrder!.creator &&
                    getOrderByOrderIdOrder!.creator.id === user.id
                ) {
                    getOrderByOrderIdOrder!.creator = user;
                    dispatch({
                        type: GET_ORDER_BY_ORDER_ID_SUCCESS,
                        payload: { order: getOrderByOrderIdOrder },
                    });
                }
                // dashboard_allUsers
                if (allUsers && allUsers.length > 0) {
                    const indexOfuserInAllUsers = findIndex(allUsers, user.id);
                    if (indexOfuserInAllUsers !== -1) {
                        const products =
                            allUsers[indexOfuserInAllUsers].products;
                        allUsers[indexOfuserInAllUsers] = user;
                        allUsers[indexOfuserInAllUsers].products = products;
                        dispatch({
                            type: DASHBOARD_ALL_USERS_SUCCESS,
                            payload: {
                                users: allUsers,
                                ITEMS_PER_PAGE: allUsersITEMS_PER_PAGE,
                                total_pages: allUsersTotal_pages,
                            },
                        });
                    }
                }
                // dashboard_usersWantToBeSellers and numbers of them
                if (
                    userInfo &&
                    (userInfo.role === "moderator" ||
                        userInfo.role === "subAdmin" ||
                        userInfo.role === "admin")
                ) {
                    const indexOfUsersWantToBeSeller = findIndex(
                        usersWantToBeSellers,
                        user.id
                    );
                    let newUsersNumber;
                    if (user.nominateAsSeller.wantToBeSeller === true) {
                        if (indexOfUsersWantToBeSeller === -1) {
                            usersWantToBeSellers!.push(user);
                            newUsersNumber = usersWantToBeSellersNumber! + 1;
                        }
                    } else {
                        if (indexOfUsersWantToBeSeller !== -1) {
                            usersWantToBeSellers!.splice(
                                indexOfUsersWantToBeSeller,
                                1
                            );
                            newUsersNumber = usersWantToBeSellersNumber! - 1;
                        }
                    }
                    // dashboard_usersWantToBeSellers
                    dispatch({
                        type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_SUCCESS,
                        payload: {
                            users: usersWantToBeSellers,
                            ITEMS_PER_PAGE: usersWantToBeSellersITEMS_PER_PAGE,
                            total_pages: usersWantToBeSellersTotal_pages,
                        },
                    });
                    // dashboard_usersWantToBeSellersNumbers
                    dispatch({
                        type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_SUCCESS,
                        payload: { usersNumber: newUsersNumber },
                    });
                }

                // cart
                const indexesOfProductsInCart = findIndexOfProduct(
                    cartItems,
                    user.id
                );
                if (indexesOfProductsInCart !== -1) {
                    indexesOfProductsInCart.map(
                        (i) =>
                            (cartItems[i].product.creatorActiveStatus =
                                user.activeStatus)
                    );
                    dispatch({
                        type: GET_ALLPRODUCTS_IN_CART_SUCCESS,
                        payload: cartItems,
                    });
                }
            }

            // ----------------------------------
            // WHEN USER IS DELETE
            // ----------------------------------
            if (data.action === "delete") {
                const user = data.user;
                // UPDATE localStorage
                updateLocalStorage(user, "delete", dispatch, logout, navigate);
                // allProducts
                const indexesOfProductInAllProducts = findIndexOfUser(
                    allProducts,
                    user.id
                );
                if (indexesOfProductInAllProducts !== -1) {
                    indexesOfProductInAllProducts.map((i) =>
                        allProducts.splice(i, 1)
                    );
                    dispatch({
                        type: ALL_PRODUCTS_SUCCESS,
                        payload: {
                            products: allProducts,
                            ITEMS_PER_PAGE: allProductsITEMS_PER_PAGE,
                            total_pages: allProductsTotal_pages,
                            pageType: allProductsPageType,
                        },
                    });
                }
                // productDetails
                const isProductDetailsBelongToUser = isExist(
                    productDetails!.creator,
                    user.id
                );
                if (isProductDetailsBelongToUser) {
                    dispatch({
                        type: PRODUCT_DETAILS_SUCCESS,
                        payload: { reviews: [] },
                    });
                }
                // topRatedBestSaleProducts
                const indexesOfTopRatedProducts = findIndexOfUser(
                    topRatedProducts,
                    user.id
                );
                if (indexesOfTopRatedProducts !== -1) {
                    indexesOfTopRatedProducts.map((i) =>
                        topRatedProducts!.splice(i, 1)
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: topRatedProducts,
                            bestSaleProducts: bestSaleProducts,
                        },
                    });
                }
                const indexesOfBestSaleProducts = findIndexOfUser(
                    bestSaleProducts,
                    user.id
                );
                if (indexesOfBestSaleProducts !== -1) {
                    indexesOfBestSaleProducts.map((i) =>
                        bestSaleProducts!.splice(i, 1)
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: topRatedProducts,
                            bestSaleProducts: bestSaleProducts,
                        },
                    });
                }
                // productReviews
                const indexesOfReview = findIndexOfUser(
                    productReviews,
                    user.id
                );
                if (indexesOfReview !== -1) {
                    indexesOfReview.map((i) => productReviews!.splice(i, 1));
                    dispatch({
                        type: GET_PRODUCT_REVIEWS_SUCCESS,
                        payload: {
                            reviews: productReviews,
                            productId: productReviewsProductId,
                        },
                    });
                }
                // userLogin
                // ==> logic will done in updateLocalStorage Function
                // userDetails
                if (userDetails && userDetails.id === user.id) {
                    dispatch({
                        type: USER_DETAILS_SUCCESS,
                        payload: {
                            user: {},
                            total_pages: userDetailsTotal_pages,
                        },
                    });
                }
                // getOrderByOrderId
                if (
                    getOrderByOrderIdOrder!.creator &&
                    getOrderByOrderIdOrder!.creator.id === user.id
                ) {
                    dispatch({
                        type: GET_ORDER_BY_ORDER_ID_SUCCESS,
                        payload: { order: {} },
                    });
                }
                // dashboard_allUsers
                if (allUsers && allUsers.length > 0) {
                    const indexOfuserInAllUsers = findIndex(allUsers, user.id);
                    if (indexOfuserInAllUsers !== -1) {
                        allUsers.splice(indexOfuserInAllUsers, 1);
                        dispatch({
                            type: DASHBOARD_ALL_USERS_SUCCESS,
                            payload: {
                                users: allUsers,
                                ITEMS_PER_PAGE: allUsersITEMS_PER_PAGE,
                                total_pages: allUsersTotal_pages,
                            },
                        });
                    }
                }
                // dashboard_usersWantToBeSellers and numbers of them
                if (
                    userInfo &&
                    (userInfo.role === "moderator" ||
                        userInfo.role === "subAdmin" ||
                        userInfo.role === "admin")
                ) {
                    const indexOfUsersWantToBeSeller = findIndex(
                        usersWantToBeSellers,
                        user.id
                    );
                    if (indexOfUsersWantToBeSeller !== -1) {
                        usersWantToBeSellers!.splice(
                            indexOfUsersWantToBeSeller,
                            1
                        );
                        // dashboard_usersWantToBeSellers
                        dispatch({
                            type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_SUCCESS,
                            payload: {
                                users: usersWantToBeSellers,
                                ITEMS_PER_PAGE:
                                    usersWantToBeSellersITEMS_PER_PAGE,
                                total_pages: usersWantToBeSellersTotal_pages,
                            },
                        });
                        // dashboard_usersWantToBeSellersNumbers
                        dispatch({
                            type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_SUCCESS,
                            payload: {
                                usersNumber: usersWantToBeSellersNumber! - 1,
                            },
                        });
                    }
                }
            }
        };

        socket.on("user", handler);
        return () => socket.off("user", handler);
    }, [
        socket,
        dispatch,
        navigate,
        allProducts,
        allProductsITEMS_PER_PAGE,
        allProductsTotal_pages,
        productDetails,
        bestSaleProducts,
        topRatedProducts,
        productReviews,
        productReviewsProductId,
        userInfo,
        userDetails,
        userDetailsTotal_pages,
        getOrderByOrderIdOrder,
        allUsers,
        allUsersTotal_pages,
        allUsersITEMS_PER_PAGE,
        usersWantToBeSellers,
        usersWantToBeSellersTotal_pages,
        usersWantToBeSellersITEMS_PER_PAGE,
        usersWantToBeSellersNumber,
        allProductsPageType,
        cartItems,
    ]);
};

export default useEmitUser;
