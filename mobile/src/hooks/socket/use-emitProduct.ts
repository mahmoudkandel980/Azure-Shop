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
import { resetUserDetails } from "../../store/slices/userSlice";
import { resetCartData } from "../../store/slices/cartSlice";
import { resetWishListData } from "../../store/slices/wishListSlice";

// helper functions
import { isExist, findIndex } from "../../helpers/utilitiesFunForSocketIo";

// lodash
import _ from "lodash";

const useEmitProduct = (socket: any) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const dispatch = useDispatch<AppDispatch>();

    const { loginData } = useSelector((state: RootState) => state.auth);
    const { cartData } = useSelector((state: RootState) => state.cart);
    const { wishListData } = useSelector((state: RootState) => state.wishList);
    const { userDetailsData } = useSelector((state: RootState) => state.user);
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
            const prodId =
                data.action === "delete" ? data.productId : data.product.id;
            // allProducts
            const indexOfProducReviewtInAllProducts =
                productsData && productsData.products
                    ? await findIndex(productsData.products, prodId)
                    : -1;

            // productDetails
            const isCurrentProductDetailsIsProductEdited = productData
                ? isExist(productData, prodId)
                : false;

            // myProducts
            const indexOfProducReviewtInMyProducts =
                myProductsData && myProductsData?.products
                    ? await findIndex(myProductsData?.products, prodId)
                    : -1;

            // topRatedBestSaleProducts
            let indexesOfTopRatedProducts: number = -1;
            let indexesOfBestSaleProducts: number = -1;
            if (topRatedBestSaleProductsData) {
                indexesOfTopRatedProducts = await findIndex(
                    topRatedBestSaleProductsData?.topRatedProducts,
                    prodId
                );
                indexesOfBestSaleProducts = await findIndex(
                    topRatedBestSaleProductsData?.bestSaleProducts,
                    prodId
                );
            }

            // userDetails
            const indexOfProductInUserDetails = userDetailsData
                ? await findIndex(userDetailsData?.user.products, prodId)
                : -1;

            // cart
            const indexOfProductInCart =
                cartData && cartData.length > 0
                    ? cartData.findIndex((p) => p.product.id === prodId)
                    : -1;

            // wishList
            const indexOfProducReviewtInWishList = await findIndex(
                wishListData,
                prodId
            );

            // ----------------------------------
            // WHEN PRODUCT IS CREATED
            // ----------------------------------
            if (data.action === "create") {
                const product = data.product;
                // allProducts
                if (productsData && productsData.products) {
                    const newProducts = _.cloneDeep(productsData?.products);
                    newProducts.unshift(product);
                    dispatch(
                        resetProducts({
                            ...productsData,
                            products: newProducts,
                            ITEMS_PER_PAGE:
                                productsData.ITEMS_PER_PAGE + 1 || 1,
                        })
                    );
                }

                // myProducts
                if (myProductsData && myProductsData?.products) {
                    const newMyProducts = _.cloneDeep(myProductsData?.products);
                    newMyProducts.unshift(product);
                    dispatch(
                        resetMyProducts({
                            ...myProductsData,
                            products: newMyProducts,
                        })
                    );
                }
            }

            // ----------------------------------
            // WHEN PRODUCT IS EDIT
            // ----------------------------------
            if (data.action === "edit") {
                const product = data.product;
                // allProducts
                if (indexOfProducReviewtInAllProducts !== -1) {
                    const newProducts = _.cloneDeep(productsData?.products!);
                    newProducts.splice(
                        indexOfProducReviewtInAllProducts,
                        1,
                        product
                    );
                    dispatch(
                        resetProducts({
                            ...productsData,
                            products: newProducts,
                        })
                    );
                }

                // productDetails
                if (isCurrentProductDetailsIsProductEdited) {
                    dispatch(resetProduct({ ...product }));
                }

                // myProducts
                if (indexOfProducReviewtInMyProducts >= 0) {
                    const newMyProducts = _.cloneDeep(
                        myProductsData?.products!
                    );
                    newMyProducts.splice(
                        indexOfProducReviewtInMyProducts,
                        1,
                        product
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
                    const newTopRatedProducts = _.cloneDeep(
                        topRatedBestSaleProductsData?.topRatedProducts!
                    );
                    newTopRatedProducts.splice(
                        indexesOfTopRatedProducts,
                        1,
                        product
                    );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            topRatedProducts: newTopRatedProducts,
                        })
                    );
                }
                if (indexesOfBestSaleProducts !== -1) {
                    const newBestSaleProducts = _.cloneDeep(
                        topRatedBestSaleProductsData?.bestSaleProducts!
                    );
                    newBestSaleProducts.splice(
                        indexesOfBestSaleProducts,
                        1,
                        product
                    );
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            bestSaleProducts: newBestSaleProducts,
                        })
                    );
                }

                // // userDetails
                // if (indexOfProductInUserDetails >= 0) {
                //     const newUserDetailsProducts = _.cloneDeep(
                //         userDetailsData?.user.products!
                //     );
                //     newUserDetailsProducts.splice(
                //         indexOfProductInUserDetails,
                //         1,
                //         product
                //     );
                //     dispatch(
                //         resetUserDetails({
                //             ...userDetailsData,
                //             user: {
                //                 ...userDetailsData?.user,
                //                 products: newUserDetailsProducts,
                //             },
                //         })
                //     );
                // }

                // cart
                if (indexOfProductInCart >= 0) {
                    const newCartData = _.cloneDeep(cartData!);
                    newCartData[indexOfProductInCart].product = product;
                    dispatch(resetCartData(newCartData));
                }

                // wishList
                if (indexOfProducReviewtInWishList !== -1) {
                    const newWishList = _.cloneDeep(wishListData!);
                    newWishList.splice(
                        indexOfProducReviewtInWishList,
                        1,
                        product
                    );
                    dispatch(resetWishListData(newWishList));
                }
            }

            // ----------------------------------
            // WHEN PRODUCT IS DELETE
            // ----------------------------------
            if (data.action === "delete") {
                const productId = data.productId;

                // allProducts
                if (indexOfProducReviewtInAllProducts !== -1) {
                    const newProducts = _.cloneDeep(productsData?.products!);
                    newProducts.splice(indexOfProducReviewtInAllProducts, 1);
                    dispatch(
                        resetProducts({
                            ...productsData,
                            products: newProducts,
                        })
                    );
                }

                // productDetails
                if (isCurrentProductDetailsIsProductEdited) {
                    dispatch(resetProduct(null));
                }

                // myProducts
                if (indexOfProducReviewtInMyProducts >= 0) {
                    const newMyProducts = _.cloneDeep(
                        myProductsData?.products!
                    );
                    newMyProducts.splice(indexOfProducReviewtInMyProducts, 1);
                    dispatch(
                        resetMyProducts({
                            ...myProductsData,
                            products: newMyProducts,
                        })
                    );
                }

                // topRatedBestSaleProducts
                if (indexesOfTopRatedProducts !== -1) {
                    const newTopRatedProducts = _.cloneDeep(
                        topRatedBestSaleProductsData?.topRatedProducts!
                    );
                    newTopRatedProducts.splice(indexesOfTopRatedProducts, 1);
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            topRatedProducts: newTopRatedProducts,
                        })
                    );
                }
                if (indexesOfBestSaleProducts !== -1) {
                    const newBestSaleProducts = _.cloneDeep(
                        topRatedBestSaleProductsData?.bestSaleProducts!
                    );
                    newBestSaleProducts.splice(indexesOfBestSaleProducts, 1);
                    dispatch(
                        resetTopRatedBestSaleProducts({
                            ...topRatedBestSaleProductsData,
                            bestSaleProducts: newBestSaleProducts,
                        })
                    );
                }

                // // userDetails
                // if (indexOfProductInUserDetails >= 0) {
                //     const newUserDetailsProducts = _.cloneDeep(
                //         userDetailsData?.user.products!
                //     );
                //     newUserDetailsProducts.splice(
                //         indexOfProductInUserDetails,
                //         1
                //     );
                //     dispatch(
                //         resetUserDetails({
                //             ...userDetailsData,
                //             user: {
                //                 ...userDetailsData?.user,
                //                 products: newUserDetailsProducts,
                //             },
                //         })
                //     );
                // }

                // cart
                if (indexOfProductInCart >= 0) {
                    const newCartData = _.cloneDeep(cartData!);
                    newCartData.splice(indexOfProductInCart, 1);
                    dispatch(resetCartData(newCartData));
                }

                // wishList
                if (indexOfProducReviewtInWishList !== -1) {
                    const newWishList = _.cloneDeep(wishListData!);
                    newWishList.splice(indexOfProducReviewtInWishList, 1);
                    dispatch(resetWishListData(newWishList));
                }
            }
        };

        socket.on("product", handler);
        return () => socket.off("product", handler);
    }, [
        socket,
        dispatch,
        navigation,
        productsData,
        productData,
        myProductsData,
        topRatedBestSaleProductsData,
        productReviewsData,
        userDetailsData,
        cartData,
        wishListData,
        loginData,
    ]);
};

export default useEmitProduct;
