import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getAllProductsInWishList } from "../../store/actions/wishListActions";

import SingleProduct from "../products/SingleProduct";

import Spinner from "../ui/Spinner";
import Message from "../ui/Message";
import EditDeleteProductsModel from "../models/EditDeleteProductsModel";

import { WishListInterface } from "../../interfaces/store/wishList/wishList";
import { ClassNameInterface } from "../../interfaces/components/public";
import { ProductStateInterface } from "../../interfaces/store/product/productInterface";

const WishListofProducts = (props: ClassNameInterface): JSX.Element => {
    const { className } = props;
    const dispatch = useDispatch<AppDispatch>();

    const [editProduct, setEditProduct] =
        useState<ProductStateInterface | null>(null);
    const [deleteProduct, setDeleteProduct] =
        useState<ProductStateInterface | null>(null);

    const { wishList } = useSelector((state) => state as WishListInterface);
    const { loading = false, wishListItems, error } = wishList;

    useEffect(() => {
        dispatch(getAllProductsInWishList());
    }, [dispatch]);

    const deleteProductHandler = (product: ProductStateInterface) => {
        setDeleteProduct(product);
    };

    const editProductHandler = (product: ProductStateInterface) => {
        setEditProduct(product);
    };

    return (
        <div className='flex flex-col  relative'>
            <h3 className='capitalize text-lg font-bold pb-10 pl-3 sm:pl-10'>
                Wish list
            </h3>
            <div className='px-5 min-h-[150px]'>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <Message type='error'>{error}</Message>
                ) : wishListItems?.length === 0 ? (
                    <Message type='error'>
                        Your wish list is Empty try to add product to your wish
                        list
                    </Message>
                ) : (
                    <section className={className}>
                        {wishListItems?.map((product) => (
                            <SingleProduct
                                product={product}
                                key={product.id}
                                deleteProduct={deleteProductHandler}
                                editProduct={editProductHandler}
                            />
                        ))}
                        <EditDeleteProductsModel
                            editProductModel={editProduct}
                            deleteProductModel={deleteProduct}
                            editProductModelHandler={editProductHandler}
                            deleteProductModelHandler={deleteProductHandler}
                        />
                    </section>
                )}
            </div>
        </div>
    );
};

export default WishListofProducts;
