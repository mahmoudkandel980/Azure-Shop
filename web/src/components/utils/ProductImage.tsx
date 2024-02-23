import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
    addProductToWishList as addProductToWishListFun,
    deleteProductFromWishList as deleteProductFromWishListFun,
} from "../../store/actions/wishListActions";

import Button from "../ui/Button";

import { AiFillHeart } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import { LoginInterface } from "../../interfaces/store/user/authInterface";
import { ProductImageInterface } from "../../interfaces/components/utils";
import { ProductStateInterface } from "../../interfaces/store/product/productInterface";
import {
    WishListInterface,
    AddProductToWishListInterface,
    DeleteProductFromWishListInterface,
} from "../../interfaces/store/wishList/wishList";
import imageUrlConverter from "../../helpers/imageUrlConverter";

const ProductImage = (props: ProductImageInterface) => {
    const { product } = props;
    const [productInWishList, setProductInWishList] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { wishList } = useSelector((state) => state as WishListInterface);
    const { wishListItemsIds } = wishList;

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const { addProductToWishList } = useSelector(
        (state) => state as AddProductToWishListInterface
    );
    const {
        loading: loadingAddProductToWishList,
        productId: productIdAddProductToWishList,
    } = addProductToWishList;

    const { deleteProductFromWishList } = useSelector(
        (state) => state as DeleteProductFromWishListInterface
    );
    const {
        loading: loadingDeleteProductFromWishList,
        productId: productIdDeleteProductFromWishList,
    } = deleteProductFromWishList;

    useEffect(() => {
        let productExist =
            wishListItemsIds && wishListItemsIds.length > 0
                ? wishListItemsIds.find((id) => id === product.id)
                : null;

        productExist ? setProductInWishList(true) : setProductInWishList(false);
        setLoading(true);
    }, [product.id, wishListItemsIds]);

    const toggleProductInWishListHandler = () => {
        if (productInWishList) {
            dispatch(deleteProductFromWishListFun(product.id));
        } else {
            dispatch(addProductToWishListFun(product));
        }
    };

    const toggleDeleteProductModelHandler = (
        product: ProductStateInterface
    ) => {
        props.deleteProduct(product);
    };

    const toggleEditProductModelHandler = (product: ProductStateInterface) => {
        props.editProduct(product);
    };

    return (
        <>
            <div className='w-full relative overflow-hidden group'>
                {product.priceDiscount && product.priceDiscount > 0 ? (
                    <span className='flicker flex items-center justify-center space-x-1 absolute top-4 -left-12 w-36 h-5 -rotate-45 bg-darkRed'>
                        <span className='text-sm text-center bg-darkRed w-full text-white'>
                            Sale
                        </span>
                    </span>
                ) : (
                    ""
                )}
                {location.pathname === "/" ||
                location.pathname.includes("/profile") ||
                location.pathname === "/wishlist" ||
                location.pathname.includes("/user") ? (
                    <Link to={`/product/${product.id}`}>
                        <img
                            loading='lazy'
                            className={`${
                                !product.type && "h-44"
                            } object-top object-cover w-full group-hover:object-bottom duration-1000 ease-in-out `}
                            src={imageUrlConverter(
                                "products",
                                product.imageUrl
                            )}
                            alt={`${product.name}_image`}
                        />
                    </Link>
                ) : (
                    <img
                        loading='lazy'
                        className='w-full object-fill rounded-md'
                        src={imageUrlConverter("products", product.imageUrl)}
                        alt={`${product.name}_image`}
                    />
                )}
                {loading && (
                    <span
                        className={`${
                            location.pathname === "/" ||
                            location.pathname.includes("/profile") ||
                            location.pathname.includes("/user") ||
                            location.pathname === "/wishlist"
                                ? "w-[10%] h-fit"
                                : "sm:w-[10%] md:w-[7%] xl:w-[5%] h-fit"
                        } flex flex-col h-full justify-between items-center py-[2%] gap-2 group absolute top-[0%] right-[2%]  text-white`}
                    >
                        <Button
                            className='h-6 w-6 cursor-pointer rounded-md p-0.5 bg-none bg-smothDark/50'
                            onClick={toggleProductInWishListHandler}
                            imgBtn
                        >
                            {(userInfo &&
                                userInfo.name &&
                                loadingAddProductToWishList &&
                                productIdAddProductToWishList === product.id) ||
                            (loadingDeleteProductFromWishList &&
                                productIdDeleteProductFromWishList ===
                                    product.id) ? (
                                <AiFillHeart
                                    className={`${
                                        loadingAddProductToWishList &&
                                        "text-darkRed"
                                    } relative h-full w-full hover:scale-105 duration-300`}
                                />
                            ) : (
                                <AiFillHeart
                                    className={`${
                                        productInWishList && "text-darkRed"
                                    } ${productInWishList} relative h-full w-full hover:scale-105 duration-300`}
                                />
                            )}
                        </Button>
                        {userInfo && userInfo.role && (
                            <div className='flex flex-col gap-2'>
                                <Button
                                    onClick={toggleEditProductModelHandler.bind(
                                        null,
                                        product
                                    )}
                                    className={`${
                                        product.creator.role === "admin" &&
                                        userInfo.role !== "admin" &&
                                        "hidden"
                                    } ${
                                        product.creator.role === "subAdmin" &&
                                        userInfo.role === "subAdmin" &&
                                        product.creator.email !==
                                            userInfo.email &&
                                        "hidden"
                                    } ${
                                        product.creator.role === "subAdmin" &&
                                        (userInfo.role === "moderator" ||
                                            userInfo.role === "seller" ||
                                            userInfo.role === "user") &&
                                        "hidden"
                                    } ${
                                        product.creator.role === "moderator" &&
                                        userInfo.role === "moderator" &&
                                        product.creator.email !==
                                            userInfo.email &&
                                        "hidden"
                                    }  ${
                                        product.creator.role === "moderator" &&
                                        (userInfo.role === "seller" ||
                                            userInfo.role === "user") &&
                                        "hidden"
                                    }  ${
                                        product.creator.role === "seller" &&
                                        userInfo.role === "seller" &&
                                        product.creator.email !==
                                            userInfo.email &&
                                        "hidden"
                                    } ${
                                        product.creator.role === "seller" &&
                                        userInfo.role === "user" &&
                                        "hidden"
                                    }    h-fit w-full cursor-pointer rounded-md p-0.5`}
                                    editBtn
                                    imgBtn
                                >
                                    <MdOutlineModeEditOutline className='relative h-full w-full hover:scale-105 duration-300' />
                                </Button>
                                <Button
                                    onClick={toggleDeleteProductModelHandler.bind(
                                        null,
                                        product
                                    )}
                                    className={`${
                                        product.creator.role === "admin" &&
                                        userInfo.role !== "admin" &&
                                        "hidden"
                                    } ${
                                        product.creator.role === "subAdmin" &&
                                        userInfo.role === "subAdmin" &&
                                        product.creator.email !==
                                            userInfo.email &&
                                        "hidden"
                                    } ${
                                        product.creator.role === "subAdmin" &&
                                        (userInfo.role === "moderator" ||
                                            userInfo.role === "seller" ||
                                            userInfo.role === "user") &&
                                        "hidden"
                                    } ${
                                        product.creator.role === "moderator" &&
                                        userInfo.role === "moderator" &&
                                        product.creator.email !==
                                            userInfo.email &&
                                        "hidden"
                                    }  ${
                                        product.creator.role === "moderator" &&
                                        (userInfo.role === "seller" ||
                                            userInfo.role === "user") &&
                                        "hidden"
                                    }  ${
                                        product.creator.role === "seller" &&
                                        userInfo.role === "seller" &&
                                        product.creator.email !==
                                            userInfo.email &&
                                        "hidden"
                                    } ${
                                        product.creator.role === "seller" &&
                                        userInfo.role === "user" &&
                                        "hidden"
                                    } h-fit w-full cursor-pointer rounded-md p-0.5`}
                                    deleteBtn
                                    imgBtn
                                >
                                    <RiDeleteBinLine className=' relative h-full w-full hover:scale-105 duration-300' />
                                </Button>
                            </div>
                        )}
                    </span>
                )}
            </div>
        </>
    );
};

export default ProductImage;
