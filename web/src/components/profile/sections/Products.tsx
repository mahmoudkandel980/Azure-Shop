import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { myProducts as myProductsFun } from "../../../store/actions/productActions";

import Spinner from "../../ui/Spinner";
import Message from "../../ui/Message";

import SingleProduct from "../../products/SingleProduct";
import Pagination from "../../utils/Pagination";
import EditDeleteProductsModel from "../../models/EditDeleteProductsModel";

import {
    MyProductsInterface,
    ProductStateInterface,
} from "../../../interfaces/store/product/productInterface";

const Products = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();

    const [editProduct, setEditProduct] =
        useState<ProductStateInterface | null>(null);
    const [deleteProduct, setDeleteProduct] =
        useState<ProductStateInterface | null>(null);

    const location = useLocation();
    const page = new URLSearchParams(location.search).get("page") || 1;

    const { myProducts } = useSelector((state) => state as MyProductsInterface);
    const { loading, error, products, total_pages } = myProducts;

    useEffect(() => {
        dispatch(myProductsFun(+page));
    }, [dispatch, page]);

    const deleteProductHandler = (product: ProductStateInterface) => {
        setDeleteProduct(product);
    };

    const editProductHandler = (product: ProductStateInterface) => {
        setEditProduct(product);
    };

    return (
        <div className='flex flex-col justify-center px-30'>
            <h2 className='uppercase font-bold break-words tracking-widest text-lg pb-10'>
                My Products
            </h2>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : products?.length === 0 || !products ? (
                <Message type='error'>Your Have not any products yet</Message>
            ) : (
                products && (
                    <>
                        <section className='container mx-auto grid grid-cols-1 gap-6 gap-y-12 px-2 sm:px-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center'>
                            {products.map((product) => (
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
                        <Pagination total_pages={total_pages} />
                    </>
                )
            )}
        </div>
    );
};

export default Products;
