import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getAllProductsInCart } from "../../store/actions/cartActions";

import Spinner from "../ui/Spinner";
import Message from "../ui/Message";
import SingleProductOfCart from "./SingleProductOfCart";
import Button from "../ui/Button";
import ConvertedPrice from "../ui/ConvertedPrice";

import { ClassNameInterface } from "../../interfaces/components/public";
import { LoginInterface } from "../../interfaces/store/user/authInterface";
import { CartStateInterface } from "../../interfaces/store/cart/cartInterface";
import imageUrlConverter from "../../helpers/imageUrlConverter";

const CartOfProducts = (props: ClassNameInterface): JSX.Element => {
    const { className } = props;
    const dispatch = useDispatch<AppDispatch>();
    const [itemsLength, setItemsLength] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const { cart } = useSelector((state) => state as CartStateInterface);
    const { loading = false, cartItems, error } = cart;

    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        dispatch(getAllProductsInCart());
    }, [dispatch]);

    useEffect(() => {
        setItemsLength(0);
        setTotalPrice(0);
        cartItems &&
            cartItems.forEach((element) => {
                setItemsLength((prevState) => prevState + element.qty);
                setTotalPrice(
                    (prevState) =>
                        prevState +
                        element.qty *
                            (element.product.price -
                                element.product.priceDiscount)
                );
            });
    }, [cartItems]);

    return (
        <div className={`${className}`}>
            <h2 className='uppercase font-bold break-words tracking-widest text-lg pb-10'>
                Cart
            </h2>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : cartItems && cartItems.length === 0 ? (
                <Message type='error'>
                    Your cart is Empty try to add product to your cart
                </Message>
            ) : (
                <section
                    className={`${
                        pathname === "/profile"
                            ? "flex-col"
                            : "flex-col lg:flex-row"
                    } flex justify-start items-center gap-10 select-none px-1 sm:px-0`}
                >
                    <div className='flex flex-col flex-1 gap-3 w-full'>
                        {cartItems.map((item, index) => (
                            <SingleProductOfCart
                                key={item.product.id}
                                product={item.product}
                                cartItems={cartItems}
                                qty={item.qty}
                                index={index}
                            />
                        ))}
                    </div>
                    <div
                        className={`${
                            pathname === "/profile"
                                ? "w-[100%] sm:w-[60%] lg:w-[35%]"
                                : "w-[90%] sm:w-[50%] lg:w-[30%]"
                        } xl:w-[28%] 2xl:w-[25%] rounded-sm flex flex-col justify-center items-center gap-3 border-[1px] dark:border-white/30 pt-5`}
                    >
                        <h3 className='text-lg font-semibold'>
                            total items ({itemsLength})
                        </h3>
                        <div className='text-xs sm:text-base flex flex-col justify-center items-start gap-3 w-full px-3 pb-3 border-b-[1px] dark:border-white/30'>
                            <table className='w-full'>
                                <tbody className='w-full'>
                                    {cartItems.map((item) => (
                                        <tr key={item.product.id}>
                                            <td>{item.qty}</td>
                                            <td>x</td>
                                            <td>
                                                <img
                                                    loading='lazy'
                                                    className='w-8 h-8 object-cover rounded-md'
                                                    src={imageUrlConverter(
                                                        "products",
                                                        item.product.imageUrl
                                                    )}
                                                    alt={`${item.product.name}_image`}
                                                />
                                            </td>
                                            <td>
                                                <ConvertedPrice
                                                    price={
                                                        item.product.price -
                                                        item.product
                                                            .priceDiscount
                                                    }
                                                />
                                            </td>
                                            <td>=</td>
                                            <td>
                                                <ConvertedPrice
                                                    price={
                                                        item.qty *
                                                        (item.product.price -
                                                            item.product
                                                                .priceDiscount)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='text-sm sm:text-base flex justify-end items-center font-semibold w-full gap-5 pr-3 pb-3 border-b-[1px] dark:border-white/30'>
                            <span>Total Price:</span>
                            <ConvertedPrice price={totalPrice} />
                        </div>

                        {userInfo && userInfo.name ? (
                            <Button
                                type='link'
                                to={`/checkout/shipping`}
                                className='capitalize mb-5 w-fit px-3'
                            >
                                checkout
                            </Button>
                        ) : (
                            <>
                                <span className='capitalize text-stars'>
                                    please signup to checkout
                                </span>
                                <Button
                                    type='link'
                                    to={`/register/signup`}
                                    className='capitalize mb-5 w-fit px-3'
                                >
                                    signup
                                </Button>
                            </>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default CartOfProducts;
