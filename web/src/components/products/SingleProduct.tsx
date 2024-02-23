import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import ThemeContext from "../../context/darkModeTheme";
import Rating from "../ui/Rating";
import ProductImage from "../utils/ProductImage";
import AddToCardButton from "../utils/AddToCardButton";
import ConvertedPrice from "../ui/ConvertedPrice";

import { CartStateInterface } from "../../interfaces/store/cart/cartInterface";
import { SingleProductInterface } from "../../interfaces/components/products";
import { ProductStateInterface } from "../../interfaces/store/product/productInterface";

const SingleProduct = (props: SingleProductInterface): JSX.Element => {
    const { product } = props;
    const { pathname } = useLocation();
    const { theme } = useContext(ThemeContext);
    const [productInCart, setProductInCart] = useState(false);
    const { cart } = useSelector((state) => state as CartStateInterface);
    const { cartItems } = cart;

    useEffect(() => {
        setProductInCart(false);
        cartItems &&
            cartItems.forEach((item) => {
                if (item.product.id === product.id) {
                    setProductInCart(true);
                }
            });
    }, [product, cartItems]);

    const deleteProductHandler = (product: ProductStateInterface) => {
        props.deleteProduct(product);
    };

    const editProductHandler = (product: ProductStateInterface) => {
        props.editProduct(product);
    };

    return (
        <div
            className={`${
                theme === "dark" ? "cart-shadow-up-dark" : "cart-shadow-up"
            } w-60 sm:w-64 select-none relative hover:scale-[102%] duration-300 border-[1px] pb-1 dark:border-smothDark rounded-lg overflow-hidden`}
        >
            <ProductImage
                product={product}
                deleteProduct={deleteProductHandler}
                editProduct={editProductHandler}
            />

            <Link to={`/product/${product.id}`}>
                <div className='flex flex-col gap-2 p-1 px-2.5'>
                    <div className='flex flex-col items-start gap-0.5'>
                        <h2 className='font-semibold'>
                            {product?.name.length > 20
                                ? product.name.slice(0, 20) + "..."
                                : product.name}
                        </h2>
                        {product.creator?.name ? (
                            <span
                                className={`${
                                    pathname === "/profile/products" && "hidden"
                                } text-xs opacity-70`}
                            >
                                {product.creator?.name.length > 20
                                    ? product.creator.name.slice(0, 20) + "..."
                                    : product.creator.name}
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className='flex items-center gap-2'>
                        {/* <span className='text-stars'>{product.rating}</span> */}
                        <Rating rating={product.rating} />
                        <p
                            className={`${
                                product.numReviews === 0 &&
                                "text-darkRed text-xs"
                            } text-sm opacity-80 pt-1`}
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
                    <div className='flex flex-col items-start justify-start gap-0.5'>
                        <ConvertedPrice
                            className='font-semibold'
                            price={product.price - product.priceDiscount}
                        />

                        {product.priceDiscount > 0 ? (
                            <div className='flex justify-start items-center gap-3'>
                                <ConvertedPrice
                                    className='line-through font-extralight opacity-50'
                                    price={product.price}
                                />
                                <span className='capitalize text-sm bg-success text-white px-3 rounded-md'>
                                    save{" "}
                                    {(
                                        (product.priceDiscount /
                                            product.price) *
                                        100
                                    ).toFixed(0)}{" "}
                                    %
                                </span>
                            </div>
                        ) : (
                            <div className='flex justify-start items-center gap-3 opacity-0'>
                                no discount
                            </div>
                        )}
                    </div>
                </div>
            </Link>
            <div className='flex relative justify-center px-2 items-center w-full py-3 mt-2'>
                <AddToCardButton
                    product={product}
                    productInCart={productInCart}
                />
            </div>
        </div>
    );
};

export default SingleProduct;
