import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteProductFromCart } from "../../store/actions/cartActions";

import ConvertedPrice from "../ui/ConvertedPrice";
import Button from "../ui/Button";

import { RiDeleteBinLine } from "react-icons/ri";

import { SingleProductOfCartInterface } from "../../interfaces/components/ui";
import imageUrlConverter from "../../helpers/imageUrlConverter";

const SingleProductOfOrder = (props: SingleProductOfCartInterface) => {
    const { product, cartItems, qty, index } = props;
    const dispatch = useDispatch<AppDispatch>();

    const { pathname } = useLocation();
    console.log(pathname.startsWith("/order"));

    const deleteProductFromCartHandler = () => {
        dispatch(deleteProductFromCart(product.id));
    };

    return (
        <table
            key={product.id}
            className={`${
                cartItems.length > 1 &&
                index !== cartItems.length - 1 &&
                "border-b-[1px] dark:border-white/30"
            } ${
                index === cartItems.length - 1 &&
                "border-b-[1px] lg:border-none dark:border-white/30"
            } text-[10px] sm:text-sm  flex-1 lg:w-[90%]`}
        >
            <tbody className='font-light capitalize w-full'>
                <tr
                    className={`${
                        !product.creatorActiveStatus && "bg-darkRed/10"
                    }`}
                >
                    <td className='sm:w-[10%] pb-2'>
                        <img
                            loading='lazy'
                            className='w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-sm'
                            src={imageUrlConverter(
                                "products",
                                product.imageUrl
                            )}
                            alt={`${product.name}_image`}
                        />
                    </td>
                    <td className='sm:w-[30%]'>
                        <Link
                            to={`/product/${product.id || product._id}`}
                            className='border-b-[1px] dark:border-white border-smothDark'
                        >
                            {product.name.length > 10
                                ? `${product.name.slice(0, 10)}...`
                                : product.name}
                        </Link>
                    </td>
                    <td className='sm:w-[25%]'>
                        <span>{qty}</span>
                        <span>X</span>
                        <ConvertedPrice
                            price={product.price - product.priceDiscount}
                        />
                    </td>
                    <td className='sm:w-[5%]'>=</td>
                    <td>
                        <ConvertedPrice
                            price={
                                qty * (product.price - product.priceDiscount)
                            }
                        />
                    </td>
                    <td
                        className={`${
                            pathname.startsWith("/order") && "hidden"
                        } lg:w-[10%]`}
                    >
                        <Button
                            onClick={deleteProductFromCartHandler}
                            deleteBtn={true}
                            className='w-fit sm:px-5'
                        >
                            <RiDeleteBinLine />
                        </Button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default SingleProductOfOrder;
