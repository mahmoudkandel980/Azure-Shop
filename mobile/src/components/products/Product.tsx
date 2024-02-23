import React, { useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { product } from "../../store/slices/productsSlice";

// components
import Spinner from "../shared/Spinner";
import ErrorMessage from "../shared/ErrorMessage";
import ProductDetails from "./specificProduct/ProductDetails";

const Product = () => {
    const { productId } = useRoute<any>().params;
    const dispatch = useDispatch<AppDispatch>();
    const { productData, productLoading, productError } = useSelector(
        (state: RootState) => state.products
    );
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;
        dispatch(product({ id: productId }));
    }, [productId, isFocused]);

    return productLoading ? (
        <Spinner />
    ) : productError ? (
        <ErrorMessage>{productError}</ErrorMessage>
    ) : !productData?.id ? (
        <ErrorMessage>Product not Found or had been removed | 404</ErrorMessage>
    ) : (
        <ProductDetails {...productData} />
    );
};

export default Product;
