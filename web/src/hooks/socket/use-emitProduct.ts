import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";

// utilities functions
import { findIndex, isExist } from "../../helpers/utilitiesFunForSocketIo";

// consts
import {
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_SUCCESS,
    MY_PRODUCTS_SUCCESS,
    TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
} from "../../store/constants/productConstants";
import { USER_DETAILS_SUCCESS } from "../../store/constants/userConstants";
import { GET_ALLPRODUCTS_IN_CART_SUCCESS } from "../../store/constants/cartConstants";
import { GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS } from "../../store/constants/wishListConstants";

import { LoginInterface } from "../../interfaces/store/user/authInterface";
import {
    GetAllProductsInterface,
    ProductDetailsInterface,
    MyProductsInterface,
    TopRatedBestSaleProductsInterface,
} from "../../interfaces/store/product/productInterface";
import { UserDetailsInterface } from "../../interfaces/store/user/userInterface";
import { CartStateInterface } from "../../interfaces/store/cart/cartInterface";
import { WishListInterface } from "../../interfaces/store/wishList/wishList";

const useEmitProduct = (socket: any) => {
    const dispatch = useDispatch<AppDispatch>();

    // userLogin
    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;
    // allProducts
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
    // myProducts
    const { myProducts: myProductsState } = useSelector(
        (state) => state as MyProductsInterface
    );
    const { products: myProducts, total_pages: myProductsTotal_pages } =
        myProductsState;
    // topRatedBestSaleProducts
    const { topRatedBestSaleProducts } = useSelector(
        (state) => state as TopRatedBestSaleProductsInterface
    );
    const { topRatedProducts, bestSaleProducts } = topRatedBestSaleProducts;
    // userDetails
    const { userDetails: userDetailsState } = useSelector(
        (state) => state as UserDetailsInterface
    );
    const { user: userDetails, total_pages: userDetailsTotal_pages } =
        userDetailsState;
    // cart
    const { cart } = useSelector((state) => state as CartStateInterface);
    const { cartItems } = cart;
    // wishList
    const { wishList } = useSelector((state) => state as WishListInterface);
    const { wishListItems } = wishList;

    useEffect(() => {
        const handler = (data: any) => {
            // ----------------------------------
            // WHEN PRODUCT IS EditProductToPaid
            // ----------------------------------
            if (data.action === "editProductToPaid") {
                const product = data.product;
                // productDetails
                const isCurrentProductDetailsIsProductEdited = isExist(
                    productDetails,
                    product.id
                );
                if (isCurrentProductDetailsIsProductEdited) {
                    dispatch({
                        type: PRODUCT_DETAILS_SUCCESS,
                        payload: { ...product },
                    });
                }
            }

            // ----------------------------------
            // WHEN PRODUCT IS CREATED
            // ----------------------------------
            if (data.action === "create") {
                const product = data.product;
                // allProducts
                allProducts.unshift(product);
                dispatch({
                    type: ALL_PRODUCTS_SUCCESS,
                    payload: {
                        products: allProducts,
                        ITEMS_PER_PAGE: allProductsITEMS_PER_PAGE! + 1,
                        total_pages: allProductsTotal_pages,
                        pageType: allProductsPageType,
                    },
                });
                // myProducts
                if (userInfo && userInfo.id === product.creator.id) {
                    myProducts!.unshift(product);
                    dispatch({
                        type: MY_PRODUCTS_SUCCESS,
                        payload: {
                            products: myProducts,
                            total_pages: myProductsTotal_pages,
                        },
                    });
                }
            }

            // ----------------------------------
            // WHEN PRODUCT IS EDIT
            // ----------------------------------
            if (data.action === "edit") {
                const product = data.product;
                // allProducts
                const indexOfProductInAllProducts = findIndex(
                    allProducts,
                    product.id
                );
                if (indexOfProductInAllProducts >= 0) {
                    allProducts.splice(indexOfProductInAllProducts, 1, product);
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
                const isCurrentProductDetailsIsProductEdited = isExist(
                    productDetails,
                    product.id
                );
                if (isCurrentProductDetailsIsProductEdited) {
                    dispatch({
                        type: PRODUCT_DETAILS_SUCCESS,
                        payload: { ...product },
                    });
                }
                // myProducts
                const indexOfProductInMyProducts = findIndex(
                    myProducts,
                    product.id
                );
                if (indexOfProductInMyProducts >= 0) {
                    myProducts!.splice(indexOfProductInMyProducts, 1, product);
                    dispatch({
                        type: MY_PRODUCTS_SUCCESS,
                        payload: {
                            products: myProducts,
                            total_pages: myProductsTotal_pages,
                        },
                    });
                }
                // topRatedBestSaleProducts
                const indexOfProductInTopRatedProducts = findIndex(
                    topRatedProducts,
                    product.id
                );
                const indexOfProductInBestSaleProducts = findIndex(
                    bestSaleProducts,
                    product.id
                );
                if (indexOfProductInTopRatedProducts >= 0) {
                    topRatedProducts!.splice(
                        indexOfProductInTopRatedProducts,
                        1,
                        product
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: topRatedProducts,
                            bestSaleProducts: bestSaleProducts,
                        },
                    });
                }
                if (indexOfProductInBestSaleProducts >= 0) {
                    bestSaleProducts!.splice(
                        indexOfProductInBestSaleProducts,
                        1,
                        product
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: topRatedProducts,
                            bestSaleProducts: bestSaleProducts,
                        },
                    });
                }
                // userDetails
                const indexOfProductInUserDetails = findIndex(
                    userDetails!.products,
                    product.id
                );
                if (indexOfProductInUserDetails >= 0) {
                    userDetails?.products!.splice(
                        indexOfProductInUserDetails,
                        1,
                        product
                    );
                    dispatch({
                        type: USER_DETAILS_SUCCESS,
                        payload: {
                            user: userDetails,
                            total_pages: userDetailsTotal_pages,
                        },
                    });
                }
                // cart
                const indexOfProductInCart =
                    cartItems.length > 0
                        ? cartItems.findIndex(
                              (p) => p.product.id === product.id
                          )
                        : -1;
                if (indexOfProductInCart >= 0) {
                    cartItems[indexOfProductInCart].product = product;
                    dispatch({
                        type: GET_ALLPRODUCTS_IN_CART_SUCCESS,
                        payload: cartItems,
                    });
                }
                // wishList
                const indexOfProductInWishList = findIndex(
                    wishListItems,
                    product.id
                );
                if (indexOfProductInWishList >= 0) {
                    wishListItems!.splice(indexOfProductInWishList, 1, product);
                    dispatch({
                        type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                        payload: wishListItems,
                    });
                    localStorage.setItem(
                        "wishListItems",
                        JSON.stringify(wishListItems)
                    );
                }
            }

            // ----------------------------------
            // WHEN PRODUCT IS DELETE
            // ----------------------------------
            if (data.action === "delete") {
                const productId = data.productId;
                // allProducts
                const indexOfProductInAllProducts = findIndex(
                    allProducts,
                    productId
                );
                if (indexOfProductInAllProducts >= 0) {
                    allProducts.splice(indexOfProductInAllProducts, 1);
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
                const isCurrentProductDetailsIsProductDel = isExist(
                    productDetails,
                    productId
                );
                if (isCurrentProductDetailsIsProductDel) {
                    dispatch({
                        type: PRODUCT_DETAILS_SUCCESS,
                        payload: { reviews: [] },
                    });
                }
                // myProducts
                const indexOfProductInMyProducts = findIndex(
                    myProducts,
                    productId
                );
                if (indexOfProductInMyProducts >= 0) {
                    myProducts!.splice(indexOfProductInMyProducts, 1);
                    dispatch({
                        type: MY_PRODUCTS_SUCCESS,
                        payload: {
                            products: myProducts,
                            total_pages: myProductsTotal_pages,
                        },
                    });
                }
                // topRatedBestSaleProducts
                const indexOfProductInTopRatedProducts = findIndex(
                    topRatedProducts,
                    productId
                );
                const indexOfProductInBestSaleProducts = findIndex(
                    bestSaleProducts,
                    productId
                );
                if (indexOfProductInTopRatedProducts >= 0) {
                    topRatedProducts!.splice(
                        indexOfProductInTopRatedProducts,
                        1
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: topRatedProducts,
                            bestSaleProducts: bestSaleProducts,
                        },
                    });
                }
                if (indexOfProductInBestSaleProducts >= 0) {
                    bestSaleProducts!.splice(
                        indexOfProductInBestSaleProducts,
                        1
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: topRatedProducts,
                            bestSaleProducts: bestSaleProducts,
                        },
                    });
                }
                // userDetails
                const indexOfProductInUserDetails = findIndex(
                    userDetails!.products,
                    productId
                );
                if (indexOfProductInUserDetails >= 0) {
                    userDetails?.products!.splice(
                        indexOfProductInUserDetails,
                        1
                    );
                    dispatch({
                        type: USER_DETAILS_SUCCESS,
                        payload: {
                            user: userDetails,
                            total_pages: userDetailsTotal_pages,
                        },
                    });
                }
                // cart
                const indexOfProductInCart =
                    cartItems.length > 0
                        ? cartItems.findIndex((p) => p.product.id === productId)
                        : -1;
                if (indexOfProductInCart >= 0) {
                    cartItems.splice(indexOfProductInCart, 1);
                    dispatch({
                        type: GET_ALLPRODUCTS_IN_CART_SUCCESS,
                        payload: cartItems,
                    });
                }
                // wishList
                const indexOfProductInWishList = findIndex(
                    wishListItems,
                    productId
                );
                if (indexOfProductInWishList >= 0) {
                    wishListItems!.splice(indexOfProductInWishList, 1);
                    dispatch({
                        type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                        payload: wishListItems,
                    });
                    localStorage.setItem(
                        "wishListItems",
                        JSON.stringify(wishListItems)
                    );
                }
            }
        };

        socket.on("product", handler);
        return () => socket.off("product", handler);
    }, [
        socket,
        dispatch,
        allProducts,
        allProductsITEMS_PER_PAGE,
        allProductsTotal_pages,
        productDetails,
        myProducts,
        bestSaleProducts,
        topRatedProducts,
        myProductsTotal_pages,
        userDetails,
        userDetailsTotal_pages,
        cartItems,
        wishListItems,
        userInfo,
        allProductsPageType,
    ]);
};

export default useEmitProduct;
