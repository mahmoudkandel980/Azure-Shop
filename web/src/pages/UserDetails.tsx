import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { getUserDetailsById } from "../store/actions/userActions";

import Spinner from "../components/ui/Spinner";
import Message from "../components/ui/Message";
import Input from "../components/ui/Input";
import SingleProduct from "../components/products/SingleProduct";
import Pagination from "../components/utils/Pagination";
import EditDeleteProductsModel from "../components/models/EditDeleteProductsModel";

import { UserDetailsInterface } from "../interfaces/store/user/userInterface";
import { ProductStateInterface } from "../interfaces/store/product/productInterface";
import imageUrlConverter from "../helpers/imageUrlConverter";

const UserDetails = (): JSX.Element => {
    const { userId } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const [editProduct, setEditProduct] =
        useState<ProductStateInterface | null>(null);
    const [deleteProduct, setDeleteProduct] =
        useState<ProductStateInterface | null>(null);

    const location = useLocation();
    const page = new URLSearchParams(location.search).get("page") || 1;

    const { userDetails } = useSelector(
        (state) => state as UserDetailsInterface
    );
    const { loading, error, user, total_pages } = userDetails;

    useEffect(() => {
        dispatch(getUserDetailsById(userId!, +page));
    }, [dispatch, page, userId]);

    const deleteProductHandler = (product: ProductStateInterface) => {
        setDeleteProduct(product);
    };

    const editProductHandler = (product: ProductStateInterface) => {
        setEditProduct(product);
    };

    return (
        <div className='container mx-auto h-full px-5 sm:px-0 flex-1 relative'>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : user && user.id ? (
                <div className='flex flex-col items-start justify-start'>
                    <h3 className='capitalize text-lg font-bold pb-10 '>
                        {user.name}'s Profile
                    </h3>

                    <div
                        className={`${
                            user.role !== "user" && "border-b-[1px]"
                        } flex flex-col sm:flex-row justify-start items-center gap-10 sm:pl-5 w-full pb-10 dark:border-white/30`}
                    >
                        <img
                            loading='lazy'
                            className='w-36 h-36 rounded-full object-cover'
                            src={imageUrlConverter("users", user.imageUrl!)}
                            alt={user.name}
                        />
                        <div className='flex flex-col gap-8 w-[100%] sm:w-[50%]'>
                            <Input
                                htmlFor='name'
                                label='Name'
                                type='text'
                                id='name'
                                placeholder='Enter Name'
                                value={user.name}
                                readOnly={true}
                            />
                            <Input
                                htmlFor='email'
                                label='E-Mail'
                                type='email'
                                id='email'
                                placeholder='Enter E-Mail'
                                value={user.email}
                                readOnly={true}
                            />
                            <Input
                                htmlFor='role'
                                label='Role'
                                type='text'
                                id='role'
                                value={user.role}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    {user.role !== "user" ? (
                        <div className='pt-5 w-full'>
                            <h4 className='capitalize pb-3 '>
                                {user.name}'s Products
                            </h4>
                            <section
                                className={
                                    user?.products && user.products.length
                                        ? "container mx-auto grid grid-cols-1 gap-6 gap-y-12  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center"
                                        : "relative w-full"
                                }
                            >
                                {user.products && user.products.length > 0 ? (
                                    user.products.map((product) => (
                                        <SingleProduct
                                            product={product}
                                            key={product.id}
                                            deleteProduct={deleteProductHandler}
                                            editProduct={editProductHandler}
                                        />
                                    ))
                                ) : (
                                    <span className=' text-darkRed flex justify-center text-xs sm:text-base font-semibold mt-10 w-full'>
                                        {user.name} not have products yet
                                    </span>
                                )}
                                <EditDeleteProductsModel
                                    editProductModel={editProduct}
                                    deleteProductModel={deleteProduct}
                                    editProductModelHandler={editProductHandler}
                                    deleteProductModelHandler={
                                        deleteProductHandler
                                    }
                                />
                            </section>
                            {user.products && user.products.length > 0 ? (
                                <Pagination total_pages={total_pages} />
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : user.role !== "user" ? (
                        <Message type='error'>
                            {`${user.name} have not any products yet`}
                        </Message>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <Message type='error'>User not found or remvoed</Message>
            )}
        </div>
    );
};

export default UserDetails;
