import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { productDetails as productDetailsFun } from "../store/actions/productActions";

import ThemeContext from "../context/darkModeTheme";

import ProductDetails from "../components/products/specificProduct/ProductDetails";
import ProductReviews from "../components/products/specificProduct/ProductReviews";
import Spinner from "../components/ui/Spinner";
import Message from "../components/ui/Message";

import { IoIosArrowBack } from "react-icons/io";

import { ProductDetailsInterface } from "../interfaces/store/product/productInterface";

const Product = (): JSX.Element => {
    const { theme } = useContext(ThemeContext);
    const { productId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { productDetails } = useSelector(
        (state) => state as ProductDetailsInterface
    );
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(productDetailsFun(productId!));
    }, [dispatch, productId]);

    const goBackHandler = () => {
        navigate(-1);
    };

    return (
        <div className='container mx-auto flex-1 relative min-h-[300px]'>
            {product?.id && (
                <p
                    className={`${
                        product?.name! &&
                        product?.creatorActiveStatus &&
                        "hidden"
                    } w-full py-3 border-[1px] text-xs sm:text-sm font-semibold border-darkRed bg-darkRed/10 text-darkRed mb-10 capitalize text-center`}
                >
                    owner of {product?.name} is inactive
                </p>
            )}
            <div
                className={`${
                    theme === "dark"
                        ? "button-shadow-up-dark"
                        : "button-shadow-up"
                } ml-2 sm:ml-0 resister-button cursor-pointer w-fit flex justify-start items-center gap-0.5 p-6 rounded-md py-1`}
                onClick={goBackHandler}
            >
                <IoIosArrowBack />
                <span>Back</span>
            </div>
            <div className='flex mt-6'>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <Message type='error'>{error}</Message>
                ) : !product?.id ? (
                    <Message type='error'>
                        Product not Found or had been removed | 404
                    </Message>
                ) : (
                    <div className='flex flex-col gap-10 w-full'>
                        <ProductDetails product={product} />
                        <ProductReviews />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
