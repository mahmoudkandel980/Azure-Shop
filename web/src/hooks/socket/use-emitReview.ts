import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";

// utilities functions
import {
    findIndex,
    totalRating,
    modifiedProductsAfterAddReview,
    modifiedProductsAfterEditReview,
    modifiedProductsAfterDeleteReview,
} from "../../helpers/utilitiesFunForSocketIo";

// consts
import {
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_SUCCESS,
    MY_PRODUCTS_SUCCESS,
    TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
} from "../../store/constants/productConstants";
import { GET_PRODUCT_REVIEWS_SUCCESS } from "../../store/constants/reviewConstants";
import { GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS } from "../../store/constants/wishListConstants";

import {
    GetAllProductsInterface,
    ProductDetailsInterface,
    MyProductsInterface,
    TopRatedBestSaleProductsInterface,
} from "../../interfaces/store/product/productInterface";
import { ProductReviewsInterface } from "../../interfaces/store/reviews/reviewInterface";
import { WishListInterface } from "../../interfaces/store/wishList/wishList";

const useEmitReview = (socket: any) => {
    const dispatch = useDispatch<AppDispatch>();

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
    // productReviews
    const { productReviews: productReviewsState } = useSelector(
        (state) => state as ProductReviewsInterface
    );
    const { reviews: productReviews, productId: productReviewsProductId } =
        productReviewsState;
    // wishList
    const { wishList } = useSelector((state) => state as WishListInterface);
    const { wishListItems } = wishList;

    useEffect(() => {
        const handler = (data: any) => {
            // ----------------------------------
            // WHEN REVIEW IS ADD
            // ----------------------------------
            if (data.action === "add") {
                const review = data.review;
                // allProducts
                const indexOfProducReviewtInAllProducts = findIndex(
                    allProducts,
                    review.product
                );
                if (indexOfProducReviewtInAllProducts >= 0) {
                    const newAllProducts = modifiedProductsAfterAddReview(
                        allProducts,
                        indexOfProducReviewtInAllProducts,
                        review
                    );
                    dispatch({
                        type: ALL_PRODUCTS_SUCCESS,
                        payload: {
                            products: newAllProducts,
                            ITEMS_PER_PAGE: allProductsITEMS_PER_PAGE,
                            total_pages: allProductsTotal_pages,
                            pageType: allProductsPageType,
                        },
                    });
                }
                // productDetails
                const newReviews = [...productDetails?.reviews!, review];
                productDetails!.reviews = newReviews;
                const rating = totalRating(productDetails!.reviews);
                productDetails!.rating = rating;
                productDetails!.numReviews = productDetails!.reviews.length;
                dispatch({
                    type: PRODUCT_DETAILS_SUCCESS,
                    payload: { ...productDetails },
                });
                // myProducts
                const indexOfProducReviewtInMyProducts = findIndex(
                    myProducts,
                    review.product
                );
                if (indexOfProducReviewtInMyProducts >= 0) {
                    const newMyProducts = modifiedProductsAfterAddReview(
                        myProducts,
                        indexOfProducReviewtInMyProducts,
                        review
                    );
                    dispatch({
                        type: MY_PRODUCTS_SUCCESS,
                        payload: {
                            products: newMyProducts,
                            total_pages: myProductsTotal_pages,
                        },
                    });
                }
                // topRatedBestSaleProducts
                const indexOfProductInTopRatedProducts = findIndex(
                    topRatedProducts,
                    review.product
                );
                const indexOfProductInBestSaleProducts = findIndex(
                    bestSaleProducts,
                    review.product
                );
                if (indexOfProductInTopRatedProducts >= 0) {
                    const newTopRatedProducts = modifiedProductsAfterAddReview(
                        topRatedProducts,
                        indexOfProductInTopRatedProducts,
                        review
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: newTopRatedProducts,
                            bestSaleProducts: bestSaleProducts,
                        },
                    });
                }
                if (indexOfProductInBestSaleProducts >= 0) {
                    const newBestSaleProducts = modifiedProductsAfterAddReview(
                        bestSaleProducts,
                        indexOfProductInBestSaleProducts,
                        review
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: topRatedProducts,
                            bestSaleProducts: newBestSaleProducts,
                        },
                    });
                }
                // productReviews
                if (
                    productReviewsProductId &&
                    productReviewsProductId === review.product
                ) {
                    const newProductReviews = [...productReviews!, review];
                    dispatch({
                        type: GET_PRODUCT_REVIEWS_SUCCESS,
                        payload: {
                            reviews: newProductReviews,
                            productId: productReviewsProductId,
                        },
                    });
                }
                // wishList
                const indexOfProducReviewtInWishList = findIndex(
                    wishListItems,
                    review.product
                );
                if (indexOfProducReviewtInWishList >= 0) {
                    const newWishList = modifiedProductsAfterAddReview(
                        wishListItems,
                        indexOfProducReviewtInWishList,
                        review
                    );
                    dispatch({
                        type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                        payload: [...newWishList],
                    });
                }
            }

            // ----------------------------------
            // WHEN REVIEW IS EDIT
            // ----------------------------------
            if (data.action === "edit") {
                const review = data.review;
                // allProducts
                const indexOfProducReviewtInAllProducts = findIndex(
                    allProducts,
                    review.product
                );
                if (indexOfProducReviewtInAllProducts >= 0) {
                    const newAllProducts = modifiedProductsAfterEditReview(
                        allProducts,
                        indexOfProducReviewtInAllProducts,
                        review
                    );
                    dispatch({
                        type: ALL_PRODUCTS_SUCCESS,
                        payload: {
                            products: newAllProducts,
                            ITEMS_PER_PAGE: allProductsITEMS_PER_PAGE,
                            total_pages: allProductsTotal_pages,
                            pageType: allProductsPageType,
                        },
                    });
                }
                // productDetails
                const reviewIndex = findIndex(
                    productDetails!.reviews,
                    review.id
                );
                productDetails?.reviews!.splice(reviewIndex, 1, review);
                const productDetailsRating = totalRating(
                    productDetails?.reviews
                );
                productDetails!.rating = productDetailsRating;
                productDetails!.numReviews = productDetails!.reviews!.length;
                dispatch({
                    type: PRODUCT_DETAILS_SUCCESS,
                    payload: { ...productDetails },
                });
                // myProducts
                const indexOfProducReviewtInMyProducts = findIndex(
                    myProducts,
                    review.product
                );
                if (indexOfProducReviewtInMyProducts >= 0) {
                    const newMyProducts = modifiedProductsAfterEditReview(
                        myProducts,
                        indexOfProducReviewtInMyProducts,
                        review
                    );
                    dispatch({
                        type: MY_PRODUCTS_SUCCESS,
                        payload: {
                            products: newMyProducts,
                            total_pages: myProductsTotal_pages,
                        },
                    });
                }
                // topRatedBestSaleProducts
                const indexOfProductInTopRatedProducts = findIndex(
                    topRatedProducts,
                    review.product
                );
                const indexOfProductInBestSaleProducts = findIndex(
                    bestSaleProducts,
                    review.product
                );
                if (indexOfProductInTopRatedProducts >= 0) {
                    const newTopRatedProducts = modifiedProductsAfterEditReview(
                        topRatedProducts,
                        indexOfProductInTopRatedProducts,
                        review
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: newTopRatedProducts,
                            bestSaleProducts: bestSaleProducts,
                        },
                    });
                }
                if (indexOfProductInBestSaleProducts >= 0) {
                    const newBestSaleProducts = modifiedProductsAfterEditReview(
                        bestSaleProducts,
                        indexOfProductInBestSaleProducts,
                        review
                    );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: topRatedProducts,
                            bestSaleProducts: newBestSaleProducts,
                        },
                    });
                }
                // productReviews
                if (
                    productReviewsProductId &&
                    productReviewsProductId === review.product
                ) {
                    const inedxOfEditReview = findIndex(
                        productReviews,
                        review.id
                    );
                    productReviews!.splice(inedxOfEditReview, 1, review);
                    dispatch({
                        type: GET_PRODUCT_REVIEWS_SUCCESS,
                        payload: {
                            reviews: productReviews,
                            productId: productReviewsProductId,
                        },
                    });
                }
                // wishList
                const indexOfProducReviewtInWishList = findIndex(
                    wishListItems,
                    review.product
                );
                if (indexOfProducReviewtInWishList >= 0) {
                    const newWishList = modifiedProductsAfterEditReview(
                        wishListItems,
                        indexOfProducReviewtInWishList,
                        review
                    );
                    dispatch({
                        type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                        payload: [...newWishList],
                    });
                }
            }

            // ----------------------------------
            // WHEN REVIEW IS DELETE
            // ----------------------------------
            if (data.action === "delete") {
                const review = data.review;
                // allProducts
                const indexOfProducReviewtInAllProducts = findIndex(
                    allProducts,
                    review.product
                );
                if (indexOfProducReviewtInAllProducts >= 0) {
                    const newAllProducts = modifiedProductsAfterDeleteReview(
                        allProducts,
                        indexOfProducReviewtInAllProducts,
                        review
                    );
                    dispatch({
                        type: ALL_PRODUCTS_SUCCESS,
                        payload: {
                            products: newAllProducts,
                            ITEMS_PER_PAGE: allProductsITEMS_PER_PAGE,
                            total_pages: allProductsTotal_pages,
                            pageType: allProductsPageType,
                        },
                    });
                }
                // productDetails
                const reviewIndex = findIndex(
                    productDetails!.reviews,
                    review.id
                );
                productDetails?.reviews!.splice(reviewIndex, 1);
                const productDetailsRating = totalRating(
                    productDetails!.reviews
                );
                productDetails!.rating = productDetailsRating;
                productDetails!.numReviews = productDetails!.reviews!.length;
                dispatch({
                    type: PRODUCT_DETAILS_SUCCESS,
                    payload: { ...productDetails },
                });
                // myProducts
                const indexOfProducReviewtInMyProducts = findIndex(
                    myProducts,
                    review.product
                );
                if (indexOfProducReviewtInMyProducts >= 0) {
                    const newMyProducts = modifiedProductsAfterDeleteReview(
                        myProducts,
                        indexOfProducReviewtInMyProducts,
                        review
                    );
                    dispatch({
                        type: MY_PRODUCTS_SUCCESS,
                        payload: {
                            products: newMyProducts,
                            total_pages: myProductsTotal_pages,
                        },
                    });
                }
                // topRatedBestSaleProducts
                const indexOfProductInTopRatedProducts = findIndex(
                    topRatedProducts,
                    review.product
                );
                const indexOfProductInBestSaleProducts = findIndex(
                    bestSaleProducts,
                    review.product
                );
                if (indexOfProductInTopRatedProducts >= 0) {
                    const newTopRatedProducts =
                        modifiedProductsAfterDeleteReview(
                            topRatedProducts,
                            indexOfProductInTopRatedProducts,
                            review
                        );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: newTopRatedProducts,
                            bestSaleProducts: bestSaleProducts,
                        },
                    });
                }
                if (indexOfProductInBestSaleProducts >= 0) {
                    const newBestSaleProducts =
                        modifiedProductsAfterDeleteReview(
                            bestSaleProducts,
                            indexOfProductInBestSaleProducts,
                            review
                        );
                    dispatch({
                        type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                        payload: {
                            topRatedProducts: topRatedProducts,
                            bestSaleProducts: newBestSaleProducts,
                        },
                    });
                }
                // productReviews
                if (
                    productReviewsProductId &&
                    productReviewsProductId === review.product
                ) {
                    const inedxOfEditReview = findIndex(
                        productReviews,
                        review.id
                    );
                    productReviews!.splice(inedxOfEditReview, 1);
                    dispatch({
                        type: GET_PRODUCT_REVIEWS_SUCCESS,
                        payload: {
                            reviews: productReviews,
                            productId: productReviewsProductId,
                        },
                    });
                }
                // wishList
                const indexOfProducReviewtInWishList = findIndex(
                    wishListItems,
                    review.product
                );
                if (indexOfProducReviewtInWishList >= 0) {
                    const newWishList = modifiedProductsAfterDeleteReview(
                        wishListItems,
                        indexOfProducReviewtInWishList,
                        review
                    );
                    dispatch({
                        type: GET_ALL_PRODUCTS_IN_WISHLIST_SUCCESS,
                        payload: [...newWishList],
                    });
                }
            }
        };

        socket.on("review", handler);
        return () => socket.off("review", handler);
    }, [
        socket,
        dispatch,
        allProducts,
        allProductsITEMS_PER_PAGE,
        allProductsTotal_pages,
        productDetails,
        myProducts,
        myProductsTotal_pages,
        bestSaleProducts,
        topRatedProducts,
        productReviews,
        productReviewsProductId,
        wishListItems,
        allProductsPageType,
    ]);
};

export default useEmitReview;
