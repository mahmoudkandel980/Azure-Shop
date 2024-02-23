import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { GetAllProducts } from "../store/actions/productActions";

import Spinner from "../components/ui/Spinner";
import Message from "../components/ui/Message";
import SingleProduct from "../components/products/SingleProduct";
import CreateProduct from "../components/utils/CreateProduct";
import Pagination from "../components/utils/Pagination";
import EditDeleteProductsModel from "../components/models/EditDeleteProductsModel";
import HomeSwiper from "../components/swiper/HomeSwiper";
import FilterProducts from "../components/utils/FilterProducts";

import {
    ProductStateInterface,
    GetAllProductsInterface,
} from "../interfaces/store/product/productInterface";

const Products = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();

    const [editProduct, setEditProduct] =
        useState<null | ProductStateInterface>(null);
    const [deleteProduct, setDeleteProduct] =
        useState<null | ProductStateInterface>(null);

    const location = useLocation();
    const page = new URLSearchParams(location.search).get("page") || 1;

    const { allProducts } = useSelector(
        (state) => state as GetAllProductsInterface
    );
    const { loading, error, products, total_pages } = allProducts;

    useEffect(() => {
        dispatch(GetAllProducts(null, +page));
    }, [dispatch, page]);

    const deleteProductHandler = useCallback(
        (product: ProductStateInterface) => {
            setDeleteProduct(product);
        },
        []
    );

    const editProductHandler = useCallback((product: ProductStateInterface) => {
        setEditProduct(product);
    }, []);

    return (
        <div className='flex-1 relative'>
            <HomeSwiper />
            <div className='mx-auto container px-2'>
                <CreateProduct className='mb-10' />
                <div className='flex flex-col sm:flex-row justify-start items-start relative'>
                    <div className='w-full sm:w-60 mb-10'>
                        <FilterProducts />
                    </div>
                    <div className='flex-1 mx-auto'>
                        {loading ? (
                            <Spinner />
                        ) : error ? (
                            <Message type='error'>{error}</Message>
                        ) : products.length === 0 ? (
                            <Message type='error'>
                                Not found any products with those Specifications
                            </Message>
                        ) : (
                            <>
                                <section className='grid grid-cols-1 gap-6 sm:gap-y-12 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 justify-items-center'>
                                    {products ? (
                                        products.map((product) => (
                                            <SingleProduct
                                                product={product}
                                                key={product.id}
                                                deleteProduct={
                                                    deleteProductHandler
                                                }
                                                editProduct={editProductHandler}
                                            />
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </section>
                            </>
                        )}
                    </div>
                </div>
                {total_pages ? <Pagination total_pages={total_pages} /> : <></>}
                <EditDeleteProductsModel
                    editProductModel={editProduct}
                    deleteProductModel={deleteProduct}
                    editProductModelHandler={editProductHandler}
                    deleteProductModelHandler={deleteProductHandler}
                />
            </div>
        </div>
    );
};

export default Products;
