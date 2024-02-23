import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
    addProductToCart,
    deleteProductFromCart,
} from "../../store/actions/cartActions";

import Button from "../ui/Button";
import ButtonSpinner from "../ui/ButtonSpinner";

import { MdAddShoppingCart, MdOutlineShoppingCart } from "react-icons/md";

import { AddToCardButtonInterface } from "../../interfaces/components/utils";
import {
    AddToCartInterface,
    DeleteFromCartInterface,
} from "../../interfaces/store/cart/cartInterface";

const AddToCardButton = (props: AddToCardButtonInterface): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const { product, quantity, productInCart } = props;

    const { addProductToCard } = useSelector(
        (state) => state as AddToCartInterface
    );
    const {
        loading: loadingAddProductToCart,
        productId: productIdAddProductToCart,
    } = addProductToCard;

    const { deleteProductFromCard } = useSelector(
        (state) => state as DeleteFromCartInterface
    );
    const {
        loading: loadingDeleteProductFromCard,
        productId: productIdDeleteProductFromCard,
    } = deleteProductFromCard;

    const addToCartHandler = () => {
        dispatch(addProductToCart(product, quantity || 1));
    };

    const deleteProductFromCartHandler = () => {
        dispatch(deleteProductFromCart(product.id));
    };

    return (
        <div className='flex flex-col justify-center items-center gap-2 w-full'>
            {productInCart ? (
                <Button
                    onClick={deleteProductFromCartHandler}
                    deleteBtn
                    className='w-fit px-5'
                >
                    {loadingDeleteProductFromCard &&
                    product.id === productIdDeleteProductFromCard ? (
                        <ButtonSpinner className='scale-[0.25] -mt-1 mb-1 ml-2 w-5 h-5 px-10' />
                    ) : (
                        <>
                            <MdOutlineShoppingCart />
                            <span className='text-xs sm:text-sm'>
                                Remove to Cart
                            </span>
                        </>
                    )}
                </Button>
            ) : (
                <Button
                    onClick={addToCartHandler}
                    createBtn
                    className='w-fit px-5'
                >
                    {loadingAddProductToCart &&
                    product.id === productIdAddProductToCart ? (
                        <ButtonSpinner className='scale-[0.25] -mt-1 mb-1 ml-2 w-5 h-5 px-10' />
                    ) : (
                        <>
                            <MdAddShoppingCart />
                            <span className='text-xs sm:text-sm'>
                                Add to Cart
                            </span>
                        </>
                    )}
                </Button>
            )}
        </div>
    );
};

export default AddToCardButton;
