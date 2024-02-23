import React from "react";
import { Link } from "react-router-dom";

import Button from "../../../ui/Button";
import Rating from "../../../ui/Rating";

import ConvertedPrice from "../../../ui/ConvertedPrice";
import imageUrlConverter from "../../../../helpers/imageUrlConverter";

import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsShieldCheck, BsShieldX } from "react-icons/bs";

import { ProductBodyInterface } from "../../../../interfaces/components/dashboard";
import { ProductStateInterface } from "../../../../interfaces/store/product/productInterface";

const ProductsTabelBody = (props: ProductBodyInterface): JSX.Element => {
    const {
        products,
        userInfo,
        markProductWantToDelete,
        markProductWantToEdit,
        page,
        ITEMS_PER_PAGE,
    } = props;

    const toggleDeleteProductModelHandler = (
        product: ProductStateInterface
    ) => {
        props.deleteProduct(product);
    };

    const toggleEditProductModelHandler = (product: ProductStateInterface) => {
        props.editProduct(product);
    };

    return (
        <tbody className='font-light text-sm'>
            {products &&
                products.length > 0 &&
                products.map((product, i) => (
                    <tr
                        key={i}
                        className={`${
                            markProductWantToDelete !== null &&
                            markProductWantToDelete.id === product.id
                                ? "bg-darkRed/20"
                                : markProductWantToEdit !== null &&
                                  markProductWantToEdit.id === product.id
                                ? "bg-lightBlue/20"
                                : userInfo.id === product.creator.id &&
                                  "bg-whiteElphent dark:bg-dark/30"
                        } border-b-[1px] dark:border-darkGray hover:bg-whiteMilk dark:hover:bg-dark/50`}
                    >
                        <td className='capitalize py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] dark:border-darkGray'>
                            {i + 1 + ITEMS_PER_PAGE * (+page - 1)}
                        </td>
                        <td className='capitalize hidden xl:table-cell pl-1 sm:pl-3'>
                            {product.id.length > 15
                                ? product.id.slice(0, 15) + "..."
                                : product.id}
                        </td>
                        <td className=' pl-1 sm:pl-0 relative cursor-default text-[10px] sm:text-sm'>
                            <Link to={`/product/${product.id}`}>
                                <span className='group hidden sm:block underline'>
                                    {product.name.length > 14
                                        ? product.name.slice(0, 14) + "..."
                                        : product.name}
                                </span>
                                <span className='group block sm:hidden'>
                                    {product.name.length > 8
                                        ? product.name.slice(0, 8) + "..."
                                        : product.name}
                                </span>
                            </Link>
                        </td>
                        <td className='hidden lg:table-cell'>
                            <img
                                loading='lazy'
                                className='rounded-sm object-cover w-6 sm:w-8 h-6 sm:h-8'
                                src={imageUrlConverter(
                                    "products",
                                    product.imageUrl
                                )}
                                alt={`${product.name}_image`}
                            />
                        </td>
                        <td className='hidden md:table-cell'>
                            {product.category.length > 10
                                ? product.category.slice(0, 10) + "..."
                                : product.category}
                        </td>
                        <td className='text-[10px] sm:text-sm'>
                            <ConvertedPrice price={product.price} />
                        </td>
                        <td className='text-[10px] sm:text-sm hidden sm:table-cell'>
                            {(
                                (product.priceDiscount / product.price) *
                                100
                            ).toFixed(0)}{" "}
                            %
                        </td>
                        <td className='text-[10px] sm:text-sm'>
                            {product.numReviews}
                        </td>
                        <td className='text-[10px] sm:text-sm text-stars'>
                            <div className='group hidden sm:block'>
                                <Rating rating={product.rating} />
                            </div>
                            <span className='group block sm:hidden'>
                                {product.rating}
                            </span>
                        </td>
                        <td className='hidden lg:table-cell'>
                            <span className='hidden sm:block'>
                                {product.creator.email!.length > 20
                                    ? product.creator.email!.slice(0, 20) +
                                      "..."
                                    : product.creator.email}
                            </span>
                            <span className='block sm:hidden'>
                                {product.creator.email!.length > 8
                                    ? product.creator.email!.slice(0, 8) + "..."
                                    : product.creator.email}
                            </span>
                        </td>

                        <td className='capitalize text-[10px] sm:text-sm hidden md:table-cell'>
                            {product.creator.role === "subAdmin"
                                ? "sub admin"
                                : product.creator.role}
                        </td>
                        <td
                            className={`${
                                product.creator.activeStatus
                                    ? "text-success"
                                    : "text-darkRed"
                            } capitalize hidden md:table-cell`}
                        >
                            {product.creator.activeStatus ? (
                                <BsShieldCheck className='w-3 sm:w-4 h-3 sm:h-4' />
                            ) : (
                                <BsShieldX className='w-3 sm:w-4 h-3 sm:h-4' />
                            )}
                        </td>
                        <td>
                            <Button
                                onClick={toggleEditProductModelHandler.bind(
                                    null,
                                    product
                                )}
                                editBtn
                                className={`${
                                    userInfo.role !== "admin" &&
                                    product.creator.role === "admin" &&
                                    "hidden"
                                } ${
                                    product.creator.role === "subAdmin" &&
                                    userInfo.role === "subAdmin" &&
                                    product.creator.email !== userInfo.email &&
                                    "hidden"
                                } ${
                                    product.creator.role === "moderator" &&
                                    userInfo.role === "moderator" &&
                                    product.creator.email !== userInfo.email &&
                                    "hidden"
                                } ${
                                    product.creator.role === "subAdmin" &&
                                    userInfo.role === "moderator" &&
                                    "hidden"
                                } w-6 sm:w-8 h-6 sm:h-8`}
                            >
                                <MdOutlineModeEditOutline />
                            </Button>
                        </td>
                        <td>
                            <Button
                                onClick={toggleDeleteProductModelHandler.bind(
                                    null,
                                    product
                                )}
                                deleteBtn
                                className={` ${
                                    product.creator.role === "admin" &&
                                    userInfo.role !== "admin" &&
                                    "hidden"
                                } ${
                                    product.creator.role === "subAdmin" &&
                                    userInfo.role === "subAdmin" &&
                                    product.creator.email !== userInfo.email &&
                                    "hidden"
                                } ${
                                    product.creator.role === "moderator" &&
                                    userInfo.role === "moderator" &&
                                    product.creator.email !== userInfo.email &&
                                    "hidden"
                                } ${
                                    product.creator.role === "subAdmin" &&
                                    userInfo.role === "moderator" &&
                                    "hidden"
                                }  w-6 sm:w-8 h-6 sm:h-8`}
                            >
                                <RiDeleteBinLine />
                            </Button>
                        </td>
                    </tr>
                ))}
        </tbody>
    );
};

export default ProductsTabelBody;
