import { useEffect } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    resetUsers,
    users,
    resetUsersWantToBeSellers,
    resetUsersWantToBeSellersNumber,
} from "../../store/slices/dashboard/userSlice";
import {
    resetProducts,
    resetProduct,
    resetTopRatedBestSaleProducts,
} from "../../store/slices/productsSlice";
import { resetProductReviews } from "../../store/slices/reviewsSlice";
import { logout, resetLoginData } from "../../store/slices/authSlice";
import { resetUserDetails } from "../../store/slices/userSlice";
import { resetOrderByOrderId } from "../../store/slices/ordersSlice";
import { resetCartData } from "../../store/slices/cartSlice";

// helper functions
import {
    updateLocalStorage,
    findIndexOfUser,
    isExist,
    findIndex,
    findIndexOfProduct,
} from "../../helpers/utilitiesFunForSocketIo";

// lodash
import _ from "lodash";

// interfces
import { PageType } from "../../interfaces/public";

const useEmitUser = (socket: any) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const dispatch = useDispatch<AppDispatch>();

    const { loginData } = useSelector((state: RootState) => state.auth);
    const { cartData } = useSelector((state: RootState) => state.cart);
    const { userDetailsData } = useSelector((state: RootState) => state.user);
    const { orderByOrderIdData } = useSelector(
        (state: RootState) => state.orders
    );
    const { productReviewsData } = useSelector(
        (state: RootState) => state.reviews
    );
    const { productsData, productData, topRatedBestSaleProductsData } =
        useSelector((state: RootState) => state.products);
    const {
        usersData,
        usersWantToBeSellersData,
        usersWantToBeSellersNumberData,
    } = useSelector((state: RootState) => state.dashbordUsers);

    useEffect(() => {
        const handler = async (data: any) => {
            const userId = data.user.id;

            // topRatedBestSaleProducts
            let indexesOfTopRatedProducts: number | number[] = -1;
            let indexesOfBestSaleProducts: number | number[] = -1;
            if (topRatedBestSaleProductsData) {
                indexesOfTopRatedProducts = await findIndexOfUser(
                    topRatedBestSaleProductsData?.topRatedProducts,
                    userId
                );
                indexesOfBestSaleProducts = await findIndexOfUser(
                    topRatedBestSaleProductsData?.bestSaleProducts,
                    userId
                );
            }

            // productDetails
            const isProductDetailsBelongToUser = productData
                ? isExist(productData?.creator, userId)
                : false;

            // productReviews
            const indexesOfReview = productReviewsData?.reviews
                ? await findIndexOfUser(productReviewsData?.reviews, userId)
                : -1;

            // dashboard_allUsers
            const indexOfuserInAllUsers =
                usersData && usersData.users && usersData.users.length > 0
                    ? await findIndex(usersData.users, userId)
                    : -1;

            // cart
            const indexesOfProductsInCart = await findIndexOfProduct(
                cartData,
                userId
            );

            // ----------------------------------
            // WHEN USER IS CREATED
            // ----------------------------------
            if (data.action === "create") {
                // users
                const user = data.user;
                if (usersData && usersData.users.length > 0) {
                    const newUsers = [
                        { ...user, products: [] },
                        ...usersData.users,
                    ];
                    dispatch(
                        resetUsers({
                            users: newUsers,
                            total_pages: usersData.total_pages,
                            ITEMS_PER_PAGE: usersData.ITEMS_PER_PAGE + 1 || 1,
                        })
                    );
                }
            }

            // ----------------------------------
            // WHEN USER IS EDIT
            // ----------------------------------
            if (data.action === "edit") {
                const user = data.user;
                // UPDATE localStorage
                await updateLocalStorage(user, "edit", null, null, null);

                // products
                const indexesOfProductInAllProducts =
                    productsData && productsData?.products
                        ? await findIndexOfUser(productsData?.products, user.id)
                        : -1;
                if (indexesOfProductInAllProducts !== -1) {
                    const newProducts = _.cloneDeep(productsData?.products!);
                    if (
                        productsData?.pageType !== PageType.dashboard &&
                        user.activeStatus === false
                    ) {
                        indexesOfProductInAllProducts
                            .reverse()
                            .forEach((i) => newProducts.splice(i, 1));
                    } else {
                        indexesOfProductInAllProducts.map(
                            (i) => (newProducts[i].creator = user)
                        );
                    }
                    dispatch(
                        resetProducts({
                            ...productsData,
                            products: newProducts,
                        })
                    );
                }

                // product
                if (isProductDetailsBelongToUser) {
                    const newProduct = {
                        ...productData,
                        creator: user,
                        creatorActiveStatus: user.activeStatus,
                    };
                    dispatch(resetProduct(newProduct));
                }

                // topRatedBestSaleProducts
                if (
                    indexesOfTopRatedProducts !== -1 &&
                    typeof indexesOfTopRatedProducts !== "number"
                ) {
                    const newTopRatedProducts = _.cloneDeep(
                        topRatedBestSaleProductsData?.topRatedProducts!
                    );
                    indexesOfTopRatedProducts.map(
                        (i) => (newTopRatedProducts[i].creator = user)
                    );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            topRatedProducts: newTopRatedProducts,
                        })
                    );
                }
                if (
                    indexesOfBestSaleProducts !== -1 &&
                    typeof indexesOfBestSaleProducts !== "number"
                ) {
                    const newBestSaleProducts = _.cloneDeep(
                        topRatedBestSaleProductsData?.bestSaleProducts!
                    );
                    indexesOfBestSaleProducts.map(
                        (i) => (newBestSaleProducts[i].creator = user)
                    );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            bestSaleProducts: newBestSaleProducts,
                        })
                    );
                }

                // productReviews
                if (indexesOfReview !== -1) {
                    const newProductReviews = _.cloneDeep(
                        productReviewsData?.reviews!
                    );
                    indexesOfReview.forEach(
                        (i) => (newProductReviews[i].creator = user)
                    );
                    dispatch(
                        resetProductReviews({
                            reviews: newProductReviews,
                            productId: productReviewsData?.productId,
                        })
                    );
                }

                // userLogin
                if (loginData && loginData.id === user.id) {
                    const token = loginData.token;
                    let newUserInfo = {
                        ...user,
                        products: [],
                        token: token,
                    };
                    await AsyncStorage.setItem(
                        "userInfo",
                        JSON.stringify(newUserInfo)
                    );
                    dispatch(resetLoginData({ ...newUserInfo }));
                }

                // userDetails
                // if (
                //     userDetailsData &&
                //     userDetailsData.user &&
                //     userDetailsData.user._id === user.id
                // ) {
                //     const newUserDetails = {
                //         ...user,
                //         products: userDetailsData.user.products,
                //     };
                //     dispatch(
                //         resetUserDetails({
                //             user: newUserDetails,
                //             total_pages: userDetailsData.total_pages,
                //         })
                //     );
                // }

                // getOrderByOrderId
                if (
                    orderByOrderIdData &&
                    orderByOrderIdData?.creator &&
                    orderByOrderIdData?.creator.id === user.id
                ) {
                    const newOrder = {
                        ...orderByOrderIdData,
                        creator: user,
                    };
                    dispatch(resetOrderByOrderId({ ...newOrder }));
                }

                // dashboard_allUsers
                if (indexOfuserInAllUsers !== -1) {
                    const newUsers = _.cloneDeep(usersData?.users!);
                    newUsers[indexOfuserInAllUsers] = user;
                    newUsers[indexOfuserInAllUsers].products =
                        usersData?.users[indexOfuserInAllUsers].products;
                    dispatch(
                        resetUsers({
                            users: newUsers,
                            total_pages: usersData?.total_pages,
                            ITEMS_PER_PAGE: usersData?.ITEMS_PER_PAGE,
                        })
                    );
                }

                // dashboard_usersWantToBeSellers and numbers of them
                if (
                    loginData &&
                    loginData.role &&
                    ["moderator", "subAdmin", "admin"].includes(loginData.role)
                ) {
                    const indexOfUsersWantToBeSeller =
                        usersWantToBeSellersData &&
                        usersWantToBeSellersData.users &&
                        usersWantToBeSellersData.users.length > 0
                            ? await findIndex(
                                  usersWantToBeSellersData.users,
                                  user.id
                              )
                            : -1;
                    let newUsersNumber = usersWantToBeSellersNumberData
                        ? usersWantToBeSellersNumberData
                        : 0;
                    let newUsers =
                        usersWantToBeSellersData &&
                        usersWantToBeSellersData.users &&
                        usersWantToBeSellersData.users.length > 0
                            ? [...usersWantToBeSellersData.users]
                            : [];

                    if (user.nominateAsSeller.wantToBeSeller === true) {
                        if (indexOfUsersWantToBeSeller === -1) {
                            newUsers = [...newUsers, user];
                            newUsersNumber += 1;
                        }
                    } else {
                        if (indexOfUsersWantToBeSeller !== -1) {
                            newUsers.splice(indexOfUsersWantToBeSeller, 1);
                            newUsersNumber -= 1;
                        }
                    }
                    // dashboard_usersWantToBeSellers
                    dispatch(
                        resetUsersWantToBeSellers({
                            users: newUsers,
                            total_pages:
                                usersWantToBeSellersData?.total_pages || 1,
                            ITEMS_PER_PAGE:
                                usersWantToBeSellersData?.ITEMS_PER_PAGE
                                    ? usersWantToBeSellersData?.ITEMS_PER_PAGE +
                                      1
                                    : 1,
                        })
                    );
                    // dashboard_usersWantToBeSellersNumbers
                    dispatch(resetUsersWantToBeSellersNumber(newUsersNumber));
                }

                // cart
                if (indexesOfProductsInCart !== -1) {
                    const newCartData = _.cloneDeep(cartData!);
                    indexesOfProductsInCart.map(
                        (i) =>
                            (newCartData[i].product.creatorActiveStatus =
                                user.activeStatus)
                    );
                    dispatch(resetCartData(newCartData));
                }
            }

            // ----------------------------------
            // WHEN USER IS DELETE
            // ----------------------------------
            if (data.action === "delete") {
                const user = data.user;
                // UPDATE localStorage
                await updateLocalStorage(
                    user,
                    "delete",
                    dispatch,
                    logout,
                    navigation
                );

                // allProducts
                const indexesOfProductInAllProducts =
                    productsData &&
                    productsData?.products &&
                    productsData?.products.length > 0
                        ? await findIndexOfUser(productsData.products, user.id)
                        : -1;
                if (indexesOfProductInAllProducts !== -1) {
                    const newProducts = _.cloneDeep(productsData?.products!);
                    indexesOfProductInAllProducts.map((i) =>
                        newProducts.splice(i, 1)
                    );
                    dispatch(
                        resetProducts({
                            ...productsData,
                            products: newProducts,
                        })
                    );
                }

                // productDetails
                if (isProductDetailsBelongToUser) {
                    dispatch(resetProduct(null));
                }

                // topRatedBestSaleProducts
                if (
                    indexesOfTopRatedProducts !== -1 &&
                    typeof indexesOfTopRatedProducts !== "number"
                ) {
                    const newTopRatedProducts = _.cloneDeep(
                        topRatedBestSaleProductsData?.topRatedProducts!
                    );
                    indexesOfTopRatedProducts.map((i) =>
                        newTopRatedProducts!.splice(i, 1)
                    );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            topRatedProducts: newTopRatedProducts,
                        })
                    );
                }
                if (
                    indexesOfBestSaleProducts !== -1 &&
                    typeof indexesOfBestSaleProducts !== "number"
                ) {
                    const newBestSaleProducts = _.cloneDeep(
                        topRatedBestSaleProductsData?.bestSaleProducts!
                    );
                    indexesOfBestSaleProducts.map((i) =>
                        newBestSaleProducts!.splice(i, 1)
                    );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            bestSaleProducts: newBestSaleProducts,
                        })
                    );
                }

                // productReviews
                if (indexesOfReview !== -1) {
                    const newProductReviews = _.cloneDeep(
                        productReviewsData?.reviews!
                    );
                    indexesOfReview.map((i) => newProductReviews!.splice(i, 1));
                    dispatch(
                        resetProductReviews({
                            reviews: newProductReviews,
                            productId: productReviewsData?.productId,
                        })
                    );
                }

                // // userLogin
                // // ==> logic will done in updateLocalStorage Function
                // // userDetails
                // if (
                //     userDetailsData &&
                //     userDetailsData.user &&
                //     userDetailsData.user.id === user.id
                // ) {
                //     dispatch(
                //         resetUserDetails({
                //             user: {},
                //             total_pages: userDetailsData.total_pages,
                //         })
                //     );
                // }

                // getOrderByOrderId
                if (
                    orderByOrderIdData &&
                    orderByOrderIdData.creator &&
                    orderByOrderIdData.creator.id === user.id
                ) {
                    dispatch(resetOrderByOrderId(null));
                }

                // dashboard_allUsers
                if (indexOfuserInAllUsers !== -1) {
                    const newUsers = _.cloneDeep(usersData?.users!);
                    newUsers.splice(indexOfuserInAllUsers, 1);
                    dispatch(
                        resetUsers({
                            users: newUsers,
                            total_pages: usersData?.total_pages,
                            ITEMS_PER_PAGE: usersData?.ITEMS_PER_PAGE,
                        })
                    );
                }

                // dashboard_usersWantToBeSellers and numbers of them
                if (
                    loginData &&
                    loginData.role &&
                    ["moderator", "subAdmin", "admin"].includes(loginData.role)
                ) {
                    const indexOfUsersWantToBeSeller =
                        usersWantToBeSellersData &&
                        usersWantToBeSellersData.users &&
                        usersWantToBeSellersData.users.length > 0
                            ? await findIndex(
                                  usersWantToBeSellersData.users,
                                  user.id
                              )
                            : -1;
                    let newUsersNumber = usersWantToBeSellersNumberData
                        ? usersWantToBeSellersNumberData
                        : 0;
                    let newUsers =
                        usersWantToBeSellersData &&
                        usersWantToBeSellersData.users &&
                        usersWantToBeSellersData.users.length > 0
                            ? [...usersWantToBeSellersData.users]
                            : [];
                    if (indexOfUsersWantToBeSeller !== -1) {
                        newUsers.splice(indexOfUsersWantToBeSeller, 1);
                        newUsersNumber -= 1;
                    }
                    // dashboard_usersWantToBeSellers
                    dispatch(
                        resetUsersWantToBeSellers({
                            users: newUsers,
                            total_pages: usersWantToBeSellersData?.total_pages,
                            ITEMS_PER_PAGE:
                                usersWantToBeSellersData?.ITEMS_PER_PAGE,
                        })
                    );
                    // dashboard_usersWantToBeSellersNumbers
                    dispatch(resetUsersWantToBeSellersNumber(newUsersNumber));
                }
            }
        };

        socket.on("user", handler);
        return () => socket.off("user", handler);
    }, [
        socket,
        dispatch,
        navigation,
        productsData,
        productData,
        topRatedBestSaleProductsData,
        productReviewsData,
        loginData,
        userDetailsData,
        orderByOrderIdData,
        usersData,
        usersWantToBeSellersData,
        usersWantToBeSellersNumberData,
        cartData,
    ]);
};

export default useEmitUser;
