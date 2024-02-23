import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
    addProductToCart,
    deleteProductFromCart,
} from "../../store/actions/cartActions";

import Input from "../ui/Input";
import Button from "../ui/Button";
import ConvertedPrice from "../ui/ConvertedPrice";

import { RiDeleteBinLine } from "react-icons/ri";

import { SingleProductOfCartInterface } from "../../interfaces/components/ui";
import imageUrlConverter from "../../helpers/imageUrlConverter";

const SingleProductOfCart = (
    props: SingleProductOfCartInterface
): JSX.Element => {
    const { product, cartItems, qty, index } = props;
    const [quantity, setQuantity] = useState(qty);
    const [prevQuantityValue, setPrevQuantityValue] = useState(qty);
    const [isTheSame, setIsTheSame] = useState(false);

    const location = useLocation();
    const { pathname } = location;

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const timer = setTimeout(() => {
            if (quantity === prevQuantityValue && quantity !== qty) {
                setIsTheSame(true);
            } else {
                setIsTheSame(false);
                setPrevQuantityValue(quantity);
            }
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [quantity, prevQuantityValue, qty]);

    useEffect(() => {
        if (isTheSame) {
            dispatch(addProductToCart(product, quantity));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isTheSame]);

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

        setIsTheSame(false);
        if (+value > product.countInStock) {
            setQuantity(+product.countInStock);
        } else {
            setQuantity(+value || 1);
        }
    };

    const deleteProductFromCartHandler = () => {
        dispatch(deleteProductFromCart(product.id));
    };

    return (
        <div
            key={product.id}
            className={`${
                cartItems.length > 1 &&
                index !== cartItems.length - 1 &&
                " border-b-[1px] pb-3 dark:border-white/30"
            } ${
                index === cartItems.length - 1 &&
                "border-b-[1px] lg:border-none pb-3 dark:border-white/30"
            } ${
                !product.creatorActiveStatus && "bg-darkRed/10"
            } text-[10px] sm:text-base flex items-center justify-between flex-1`}
        >
            <img
                loading='lazy'
                className='w-10 h-10 sm:w-24 sm:h-24 object-cover rounded-md'
                src={imageUrlConverter("products", product.imageUrl)}
                alt={`${product.name}_image`}
            />
            <Link
                to={`/product/${product.id}`}
                className='border-b-[1px] dark:border-white border-smothDark'
            >
                {product.name.length > 15
                    ? product.name.slice(0, 15) + "..."
                    : product.name}
            </Link>

            <ConvertedPrice price={product.price - product.priceDiscount} />
            <div
                className={`${
                    pathname === "/profile" ? "w-10 sm:w-20" : "w-14 sm:w-fit"
                }`}
            >
                <Input
                    htmlFor='quantity'
                    type='number'
                    id='quantity'
                    step={1}
                    value={quantity}
                    onChange={onChange}
                    // onBlur={onBlurHandler}
                />
            </div>

            <Button
                onClick={deleteProductFromCartHandler}
                deleteBtn={true}
                className='w-fit sm:px-5'
            >
                <RiDeleteBinLine />
            </Button>
        </div>
    );
};

export default SingleProductOfCart;
