import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import LeftSide from "./productDetails/LeftSide";
import RightSide from "./productDetails/RightSide";

import Message from "../../ui/Message";

import { ProductDetailsInterface } from "../../../interfaces/components/products";
import { CartStateInterface } from "../../../interfaces/store/cart/cartInterface";

const ProductDetails = (props: ProductDetailsInterface): JSX.Element => {
    const { product } = props;
    const [productQuantity, setProductQuantity] = useState(1);
    const [productInCart, setProductInCart] = useState(false);

    const { cart } = useSelector((state) => state as CartStateInterface);
    const { cartItems } = cart;

    useEffect(() => {
        setProductInCart(false);
        setProductQuantity(1);
        cartItems &&
            cartItems.forEach((item) => {
                if (item.product.id === product.id) {
                    setProductInCart(true);
                    setProductQuantity(item.qty);
                }
            });
    }, [product, cartItems]);

    if (!product.id) {
        return <Message type='error'>Something went wrong</Message>;
    }
    return (
        <div className='flex px-4 sm:px-0 flex-col sm:flex-row gap-5 items-start justify-start pb-16'>
            <LeftSide product={product} />
            <RightSide
                product={product}
                productInCart={productInCart}
                productQuantity={productQuantity}
            />
        </div>
    );
};

export default ProductDetails;
