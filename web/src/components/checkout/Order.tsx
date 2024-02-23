import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useShowErrorMessage from "../../hooks/use-showErrorMessage";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getAllProductsInCart } from "../../store/actions/cartActions";
import { createOrder as createOrderFun } from "../../store/actions/orderActions";

import SingleProductOfOrder from "../utils/SingleProductOfOrder";
import PriceSummary from "../utils/PriceSummary";

import Button from "../ui/Button";
import Message from "../ui/Message";
import Spinner from "../ui/Spinner";
import ButtonSpinner from "../ui/ButtonSpinner";

import { CartStateInterface } from "../../interfaces/store/cart/cartInterface";
import { CreateOrderInterface } from "../../interfaces/store/order/orderInterface";

const Order = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const shippingData = useRef(
        localStorage.getItem("shippingData")
            ? JSON.parse(localStorage.getItem("shippingData") as string)
            : null
    );

    const { cart } = useSelector((state) => state as CartStateInterface);
    const { loading = false, cartItems, error } = cart;

    const { createOrder } = useSelector(
        (state) => state as CreateOrderInterface
    );
    const {
        loading: createOrderLoading,
        order,
        error: createOrderError,
    } = createOrder;
    const { errorMessage } = useShowErrorMessage({
        loading: createOrderLoading,
        error: createOrderError,
        time: 5000,
    });

    useEffect(() => {
        dispatch(getAllProductsInCart());
    }, [dispatch]);

    // if user make the order navigate to orders page
    useEffect(() => {
        if (order && cartItems.length === 0) {
            navigate(`/order/${order.id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order, cartItems]);

    useEffect(() => {
        if (!localStorage.getItem("shippingData")) {
            navigate(-1);
        }
    }, [navigate]);

    useEffect(() => {
        if (!cartItems) {
            dispatch(getAllProductsInCart());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, cartItems]);

    // Calcualte prices
    const addDecimals = (num: number) => {
        return +(Math.round(+num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
        cart.cartItems
            ? cart.cartItems.reduce(
                  (acc: number, item) =>
                      acc +
                      item.qty *
                          (+item.product.price - +item.product.priceDiscount),
                  0
              )
            : 0
    );
    const shippingPrice = addDecimals(
        itemsPrice > 100 ? itemsPrice * (0.5 / 100) : 20
    );
    const taxPrice = addDecimals(Number((0.03 * itemsPrice).toFixed(2)));
    const totalPrice = addDecimals(+itemsPrice + +taxPrice + +shippingPrice);

    const orderHander = () => {
        if (!createOrderLoading) dispatch(createOrderFun());
    };

    return (
        <div className='flex flex-col justify-center px-30'>
            <h2 className='capitalize font-bold border-b-[1px] break-words tracking-widest text-lg mb-10 w-fit'>
                order
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
                <section className='flex-col lg:flex-row flex justify-start items-center sm:items-start gap-10 select-none px-1 sm:px-0'>
                    <div className='w-full flex flex-col gap-16'>
                        <div className='flex flex-col flex-1 gap-2 w-full'>
                            <h4 className='capitalize font-semibold break-words tracking-wide pb-2'>
                                shipping
                            </h4>
                            {shippingData.current.address && (
                                <div className='text-sm font-light  tracking-widest'>
                                    <div>
                                        <span>address: </span>
                                        <span>
                                            {shippingData.current.address},{" "}
                                            {shippingData.current.city},{" "}
                                            {shippingData.current.postalCode},{" "}
                                            {shippingData.current.country}.
                                        </span>
                                    </div>
                                    <div>
                                        <span>phone: </span>
                                        <span>
                                            {shippingData.current.phone}.
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col flex-1 gap-2 w-full'>
                            <h4 className='capitalize font-semibold break-words tracking-wide pb-2'>
                                order items
                            </h4>
                            {cartItems &&
                                cartItems.map((item, index) => (
                                    <SingleProductOfOrder
                                        key={item.product.id}
                                        product={item.product}
                                        cartItems={cartItems}
                                        qty={item.qty}
                                        index={index}
                                    />
                                ))}
                        </div>
                    </div>

                    <PriceSummary
                        itemsPrice={itemsPrice}
                        shippingPrice={shippingPrice}
                        taxPrice={taxPrice}
                        totalPrice={totalPrice}
                    >
                        <div className='flex flex-col gap-3 relative justify-center px-2 items-center w-full py-3 pb-1'>
                            <Button
                                onClick={orderHander}
                                className='capitalize mb-5 w-fit px-3'
                            >
                                {createOrderLoading ? (
                                    <ButtonSpinner className='scale-[0.25] -mt-1 mb-1 w-5 h-5 px-5 py-3' />
                                ) : (
                                    "order"
                                )}
                            </Button>
                            <p
                                className={`${
                                    !errorMessage && "hidden"
                                } w-full py-3 border-[1px] text-[10px] sm:text-xs border-darkRed bg-darkRed/10 text-darkRed capitalize text-center`}
                            >
                                {errorMessage}
                            </p>
                        </div>
                    </PriceSummary>
                </section>
            )}
        </div>
    );
};

export default Order;
