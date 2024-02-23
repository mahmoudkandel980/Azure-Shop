import { useEffect } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    resetProducts,
    resetProduct,
    resetTopRatedBestSaleProducts,
    resetMyProducts,
} from "../../store/slices/productsSlice";
import { resetProductReviews } from "../../store/slices/reviewsSlice";
import { resetWishListData } from "../../store/slices/wishListSlice";

// helper functions
import {
    findIndex,
    modifiedProductsAfterAddReview,
    modifiedProductsAfterEditReview,
    modifiedProductsAfterDeleteReview,
    totalRating,
} from "../../helpers/utilitiesFunForSocketIo";

// lodash
import _ from "lodash";

const useEmitReview = (socket: any) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const dispatch = useDispatch<AppDispatch>();

    const { wishListData } = useSelector((state: RootState) => state.wishList);
    const { productReviewsData } = useSelector(
        (state: RootState) => state.reviews
    );
    const {
        productsData,
        productData,
        topRatedBestSaleProductsData,
        myProductsData,
    } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        const handler = async (data: any) => {
            // allProducts
            const indexOfProducReviewtInAllProducts =
                productsData && productsData.products
                    ? await findIndex(
                          productsData.products,
                          data.review.product
                      )
                    : -1;

            // myProducts
            const indexOfProducReviewtInMyProducts =
                myProductsData && myProductsData?.products
                    ? await findIndex(
                          myProductsData?.products,
                          data.review.product
                      )
                    : -1;

            // topRatedBestSaleProducts
            let indexesOfTopRatedProducts: number = -1;
            let indexesOfBestSaleProducts: number = -1;
            if (topRatedBestSaleProductsData) {
                indexesOfTopRatedProducts = await findIndex(
                    topRatedBestSaleProductsData?.topRatedProducts,
                    data.review.product
                );
                indexesOfBestSaleProducts = await findIndex(
                    topRatedBestSaleProductsData?.bestSaleProducts,
                    data.review.product
                );
            }

            // wishList
            const indexOfProducReviewtInWishList = await findIndex(
                wishListData,
                data.review.product
            );

            // ----------------------------------
            // WHEN REVIEW IS ADD
            // ----------------------------------
            if (data.action === "add") {
                const review = data.review;

                // allProducts
                if (indexOfProducReviewtInAllProducts !== -1) {
                    const newProducts = await modifiedProductsAfterAddReview(
                        _.cloneDeep(productsData?.products),
                        indexOfProducReviewtInAllProducts,
                        review
                    );
                    dispatch(
                        resetProducts({
                            ...productsData,
                            products: newProducts,
                        })
                    );
                }

                // productDetails
                if (productData) {
                    const newReviews = productData?.reviews
                        ? [...productData?.reviews, review]
                        : [review];
                    const rating = await totalRating(newReviews);
                    const numReviews = newReviews.length;
                    dispatch(
                        resetProduct({
                            ...productData,
                            reviews: newReviews,
                            rating,
                            numReviews,
                        })
                    );
                }

                // myProducts
                if (indexOfProducReviewtInMyProducts >= 0) {
                    const newMyProducts = await modifiedProductsAfterAddReview(
                        _.cloneDeep(myProductsData?.products),
                        indexOfProducReviewtInMyProducts,
                        review
                    );

                    dispatch(
                        resetMyProducts({
                            ...myProductsData,
                            products: newMyProducts,
                        })
                    );
                }

                // topRatedBestSaleProducts
                if (indexesOfTopRatedProducts !== -1) {
                    const newTopRatedProducts =
                        await modifiedProductsAfterAddReview(
                            _.cloneDeep(
                                topRatedBestSaleProductsData?.topRatedProducts!
                            ),
                            indexesOfTopRatedProducts,
                            review
                        );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            topRatedProducts: newTopRatedProducts,
                        })
                    );
                }
                if (indexesOfBestSaleProducts !== -1) {
                    const newBestSaleProducts =
                        await modifiedProductsAfterAddReview(
                            _.cloneDeep(
                                topRatedBestSaleProductsData?.bestSaleProducts!
                            ),
                            indexesOfBestSaleProducts,
                            review
                        );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            bestSaleProducts: newBestSaleProducts,
                        })
                    );
                }

                // productReviews
                if (
                    productReviewsData &&
                    productReviewsData.productId &&
                    productReviewsData.productId === review.product
                ) {
                    const newProductReviews = [
                        ...productReviewsData.reviews!,
                        review,
                    ];
                    dispatch(
                        resetProductReviews({
                            ...productReviewsData,
                            reviews: newProductReviews,
                        })
                    );
                }

                // wishList
                if (indexOfProducReviewtInWishList !== -1) {
                    const newWishList = await modifiedProductsAfterAddReview(
                        _.cloneDeep(wishListData),
                        indexOfProducReviewtInWishList,
                        review
                    );
                    dispatch(resetWishListData(newWishList));
                }
            }

            // ----------------------------------
            // WHEN REVIEW IS EDIT
            // ----------------------------------
            if (data.action === "edit") {
                const review = data.review;

                // allProducts
                if (indexOfProducReviewtInAllProducts !== -1) {
                    const newProducts = await modifiedProductsAfterEditReview(
                        _.cloneDeep(productsData?.products),
                        indexOfProducReviewtInAllProducts,
                        review
                    );
                    dispatch(
                        resetProducts({
                            ...productsData,
                            products: newProducts,
                        })
                    );
                }

                // productDetails
                if (productData) {
                    const reviewIndex = await findIndex(
                        productData.reviews,
                        review.id
                    );
                    if (reviewIndex !== -1) {
                        const newReviews = _.cloneDeep(productData?.reviews!);
                        newReviews.splice(reviewIndex, 1, review);
                        const rating = await totalRating(newReviews);
                        const numReviews = newReviews.length;
                        dispatch(
                            resetProduct({
                                ...productData,
                                reviews: newReviews,
                                rating,
                                numReviews,
                            })
                        );
                    }
                }

                // myProducts
                if (indexOfProducReviewtInMyProducts !== -1) {
                    const newMyProducts = await modifiedProductsAfterEditReview(
                        _.cloneDeep(myProductsData?.products!),
                        indexOfProducReviewtInMyProducts,
                        review
                    );
                    dispatch(
                        resetMyProducts({
                            ...myProductsData,
                            products: newMyProducts,
                        })
                    );
                }

                // topRatedBestSaleProducts
                if (indexesOfTopRatedProducts !== -1) {
                    const newTopRatedProducts =
                        await modifiedProductsAfterEditReview(
                            _.cloneDeep(
                                topRatedBestSaleProductsData?.topRatedProducts!
                            ),
                            indexesOfTopRatedProducts,
                            review
                        );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            topRatedProducts: newTopRatedProducts,
                        })
                    );
                }
                if (indexesOfBestSaleProducts !== -1) {
                    const newBestSaleProducts =
                        await modifiedProductsAfterEditReview(
                            _.cloneDeep(
                                topRatedBestSaleProductsData?.bestSaleProducts!
                            ),
                            indexesOfBestSaleProducts,
                            review
                        );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            bestSaleProducts: newBestSaleProducts,
                        })
                    );
                }

                // productReviews
                if (
                    productReviewsData &&
                    productReviewsData.productId &&
                    productReviewsData.productId === review.product
                ) {
                    const inedxOfEditReview = await findIndex(
                        productReviewsData.reviews,
                        review.id
                    );
                    if (inedxOfEditReview !== -1) {
                        const newProductReviews = _.cloneDeep(
                            productReviewsData.reviews
                        );
                        newProductReviews!.splice(inedxOfEditReview, 1, review);
                        dispatch(
                            resetProductReviews({
                                ...productReviewsData,
                                reviews: newProductReviews,
                            })
                        );
                    }
                }

                // wishList
                if (indexOfProducReviewtInWishList !== -1) {
                    const newWishList = await modifiedProductsAfterEditReview(
                        _.cloneDeep(wishListData),
                        indexOfProducReviewtInWishList,
                        review
                    );
                    dispatch(resetWishListData(newWishList));
                }
            }

            // ----------------------------------
            // WHEN REVIEW IS DELETE
            // ----------------------------------
            if (data.action === "delete") {
                const review = data.review;

                // allProducts
                if (indexOfProducReviewtInAllProducts !== -1) {
                    const newProducts = await modifiedProductsAfterDeleteReview(
                        _.cloneDeep(productsData?.products),
                        indexOfProducReviewtInAllProducts,
                        review
                    );
                    dispatch(
                        resetProducts({
                            ...productsData,
                            products: newProducts,
                        })
                    );
                }

                // productDetails
                if (productData) {
                    const reviewIndex = await findIndex(
                        productData.reviews,
                        review.id
                    );
                    if (reviewIndex !== -1) {
                        const newReviews = _.cloneDeep(productData?.reviews!);
                        newReviews.splice(reviewIndex, 1);
                        const rating = await totalRating(newReviews);
                        const numReviews = newReviews.length;
                        dispatch(
                            resetProduct({
                                ...productData,
                                reviews: newReviews,
                                rating,
                                numReviews,
                            })
                        );
                    }
                }

                // myProducts
                if (indexOfProducReviewtInMyProducts !== -1) {
                    const newMyProducts =
                        await modifiedProductsAfterDeleteReview(
                            _.cloneDeep(myProductsData?.products!),
                            indexOfProducReviewtInMyProducts,
                            review
                        );
                    dispatch(
                        resetMyProducts({
                            ...myProductsData,
                            products: newMyProducts,
                        })
                    );
                }

                // topRatedBestSaleProducts
                if (indexesOfTopRatedProducts !== -1) {
                    const newTopRatedProducts =
                        await modifiedProductsAfterDeleteReview(
                            _.cloneDeep(
                                topRatedBestSaleProductsData?.topRatedProducts!
                            ),
                            indexesOfTopRatedProducts,
                            review
                        );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            topRatedProducts: newTopRatedProducts,
                        })
                    );
                }
                if (indexesOfBestSaleProducts !== -1) {
                    const newBestSaleProducts =
                        await modifiedProductsAfterDeleteReview(
                            _.cloneDeep(
                                topRatedBestSaleProductsData?.bestSaleProducts!
                            ),
                            indexesOfBestSaleProducts,
                            review
                        );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            bestSaleProducts: newBestSaleProducts,
                        })
                    );
                }

                // productReviews
                if (
                    productReviewsData &&
                    productReviewsData.productId &&
                    productReviewsData.productId === review.product
                ) {
                    const inedxOfEditReview = await findIndex(
                        productReviewsData.reviews,
                        review.id
                    );
                    if (inedxOfEditReview !== -1) {
                        const newProductReviews = _.cloneDeep(
                            productReviewsData.reviews
                        );
                        newProductReviews!.splice(inedxOfEditReview, 1);
                        dispatch(
                            resetProductReviews({
                                ...productReviewsData,
                                reviews: newProductReviews,
                            })
                        );
                    }
                }

                // wishList
                if (indexOfProducReviewtInWishList !== -1) {
                    const newWishList = await modifiedProductsAfterDeleteReview(
                        _.cloneDeep(wishListData),
                        indexOfProducReviewtInWishList,
                        review
                    );
                    dispatch(resetWishListData(newWishList));
                }
            }
        };

        socket.on("review", handler);
        return () => socket.off("review", handler);
    }, [
        socket,
        dispatch,
        navigation,
        productsData,
        productData,
        myProductsData,
        topRatedBestSaleProductsData,
        productReviewsData,
        wishListData,
    ]);
};

export default useEmitReview;
