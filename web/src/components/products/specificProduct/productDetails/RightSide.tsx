import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useShowErrorMessage from "../../../../hooks/use-showErrorMessage";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { addProductToCart } from "../../../../store/actions/cartActions";

import Rating from "../../../ui/Rating";
import Input from "../../../ui/Input";

import AddToCardButton from "../../../utils/AddToCardButton";
import ConvertedPrice from "../../../ui/ConvertedPrice";

import { RightSideProductDetailsInterface } from "../../../../interfaces/components/products";
import { LoginInterface } from "../../../../interfaces/store/user/authInterface";
import { AddToCartInterface } from "../../../../interfaces/store/cart/cartInterface";
import imageUrlConverter from "../../../../helpers/imageUrlConverter";

const RightSide = (props: RightSideProductDetailsInterface): JSX.Element => {
    const { product, productInCart, productQuantity } = props;
    const [quantity, setQuantity] = useState(productQuantity);
    const [prevQuantityValue, setPrevQuantityValue] = useState(productQuantity);
    const [isTheSame, setIsTheSame] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const { addProductToCard } = useSelector(
        (state) => state as AddToCartInterface
    );
    const { error, loading } = addProductToCard;
    const { errorMessage } = useShowErrorMessage({
        loading,
        error,
        time: 5000,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                quantity === prevQuantityValue &&
                quantity !== productQuantity
            ) {
                setIsTheSame(true);
            } else {
                setIsTheSame(false);
                setPrevQuantityValue(quantity);
            }
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [quantity, prevQuantityValue, productQuantity]);

    useEffect(() => {
        setQuantity(productQuantity);
    }, [productQuantity]);

    useEffect(() => {
        if (isTheSame && productInCart) {
            dispatch(addProductToCart(product, quantity));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isTheSame, productInCart]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        let value = e.target.value;
        if (value.includes(".")) {
            value = value.split(".")[0];
        }

        if (value.startsWith("0") || +e.target.value < 0) {
            value = "1";
        }

        if (+value > product.countInStock) {
            setQuantity(+product.countInStock);
        } else {
            setQuantity(+value || 1);
        }
    };

    return (
        <div className='h-full w-full sm:w-[60%]'>
            <h1 className='text-lg font-bold w-fit uppercase border-b-[1px] mb-5'>
                {product.name}
            </h1>
            <div className='flex flex-col xl:flex-row h-full justify-start gap-10 items-start w-full'>
                <div className='flex flex-col items-start justify-start w-full xl:w-[50%]'>
                    <div className='flex flex-col justify-start items-start text-sm border-b-[1px] gap-1 dark:border-white/30 py-2 pl-1 w-full'>
                        <span className='capitalize'>created by</span>
                        <Link
                            to={
                                userInfo &&
                                userInfo.id &&
                                userInfo.id === product.creator.id
                                    ? "/profile/settings"
                                    : `/user/${product.creator.id}`
                            }
                            className='flex pl-2 justify-start items-center gap-2 relative'
                        >
                            <img
                                loading='lazy'
                                className='w-10 h-10 rounded-full object-cover'
                                src={imageUrlConverter(
                                    "users",
                                    product.creator.imageUrl!
                                )}
                                alt={`${product.creator.name}_image`}
                            />
                            <div className='flex flex-col opacity-80 items-start justify-start text-xs'>
                                <span>{product.creator.name}</span>
                                <span>{product.creator.email}</span>
                            </div>
                            <span
                                className={`${
                                    product.creatorActiveStatus
                                        ? "bg-success"
                                        : "bg-darkRed"
                                } w-2.5 h-2.5 absolute top-7 left-9 rounded-full border-[1px] border-grayWhite dark:border-smothDark`}
                            ></span>
                        </Link>
                    </div>
                    <div className='flex justify-start items-center text-sm gap-2 border-b-[1px] dark:border-white/30 py-2 pl-1 w-full'>
                        <Rating rating={product.rating} />
                        <p
                            className={`${
                                product.numReviews === 0 && "text-darkRed"
                            } opacity-80 pt-1`}
                        >
                            <span
                                className={`${
                                    product.numReviews === 0 && "hidden"
                                }`}
                            >
                                {product.numReviews}
                            </span>{" "}
                            {product.numReviews === 0
                                ? "No Reviews Yet"
                                : product.numReviews === 1
                                ? "Review"
                                : "Reviews"}
                        </p>
                    </div>
                    <div className='flex justify-start items-center text-sm gap-2 border-b-[1px] dark:border-white/30 py-2 pl-1 w-full'>
                        <span className='capitalize'>category</span>
                        <p className='opacity-80 '>{product.category}</p>
                    </div>
                    <div className='flex justify-start items-center text-sm gap-2 border-b-[1px] dark:border-white/30 py-2 pl-1 w-full'>
                        <span className='capitalize'>created at</span>
                        <p className='opacity-80 '>
                            {new Date(product.createdAt!).toLocaleString()}
                        </p>
                    </div>
                    <div className='flex justify-start items-center text-sm gap-2 border-b-[1px] dark:border-white/30 py-2 pl-1 w-full'>
                        <span className='capitalize'>last updated at</span>
                        <p className='opacity-80 '>
                            {new Date(product.updatedAt!).toLocaleString()}
                        </p>
                    </div>
                    <div className='text-sm gap-2 py-2 pl-1 w-full'>
                        <p>
                            Description <span className='px-0.5'></span>
                            <span className='opacity-80'>
                                {product.description}
                            </span>
                        </p>
                    </div>
                </div>

                <div className='flex flex-col w-full xl:w-[40%] border-[1px] dark:border-white/30 rounded-sm px-3'>
                    <div className='flex justify-between px-2 items-center w-full border-b-[1px] dark:border-white/30 py-3'>
                        <span className='capitalize'>actual price:</span>
                        <ConvertedPrice
                            className={`w-[50%] text-darkRed ${
                                product.priceDiscount > 0 && "line-through"
                            }`}
                            price={product.price}
                        />
                    </div>
                    <div className='flex justify-between px-2 items-center w-full border-b-[1px] dark:border-white/30 py-3'>
                        <span className='capitalize'>Price Discount:</span>
                        <ConvertedPrice
                            className='w-[50%] text-success'
                            price={product.priceDiscount}
                        />
                    </div>
                    <div className='flex justify-between px-2 items-center w-full border-b-[1px] dark:border-white/30 py-3'>
                        <span className='capitalize'>Final Price:</span>
                        <ConvertedPrice
                            className='w-[50%]'
                            price={product.price - product.priceDiscount}
                        />
                    </div>
                    <div className='flex justify-between px-2 items-center w-full border-b-[1px] dark:border-white/30 py-3'>
                        <span className='capitalize'>count In Stock:</span>
                        <span className='w-[50%]'>{product.countInStock}</span>
                    </div>
                    {product.soldCount > 0 && (
                        <div className='flex justify-between px-2 items-center w-full border-b-[1px] dark:border-white/30 py-3'>
                            <span className='capitalize'>sold count:</span>
                            <span className='w-[50%]'>{product.soldCount}</span>
                        </div>
                    )}
                    <div className='flex relative justify-between px-2 items-center w-full border-b-[1px] dark:border-white/30 py-3'>
                        <span className='capitalize'>Qty</span>
                        <div className='absolute w-[30%] left-[50%] justify-self-start'>
                            <Input
                                htmlFor='quantity'
                                type='number'
                                id='quantity'
                                step={1}
                                value={quantity}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 relative justify-center px-2 items-center w-full mt-2 py-3'>
                        <AddToCardButton
                            quantity={quantity}
                            product={product}
                            productInCart={productInCart}
                        />
                        <p
                            className={`${
                                !errorMessage && "hidden"
                            } w-full py-3 border-[1px] text-[10px] sm:text-xs border-darkRed bg-darkRed/10 text-darkRed capitalize text-center`}
                        >
                            {errorMessage}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSide;
