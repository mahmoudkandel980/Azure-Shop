import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { GetAllProducts } from "../../../../store/actions/productActions";

import ProductsTabelHeader from "./ProductsTabelHeader";
import ProductsTabelBody from "./ProductsTabelBody";

import Spinner from "../../../ui/Spinner";
import Message from "../../../ui/Message";
import FilterBox from "../FilterBox";
import Pagination from "../../../utils/Pagination";
import EditDeleteProductsModel from "../../../models/EditDeleteProductsModel";

import {
    GetAllProductsInterface,
    ProductStateInterface,
} from "../../../../interfaces/store/product/productInterface";
import { LoginInterface } from "../../../../interfaces/store/user/authInterface";
import { FilterDataInterface } from "../../../../interfaces/components/dashboard";

const Products = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const [showModule, setShowModule] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterDataExist, setFilterDataExist] = useState<boolean>(false);
    const [editProduct, setEditProduct] =
        useState<ProductStateInterface | null>(null);
    const [deleteProduct, setDeleteProduct] =
        useState<ProductStateInterface | null>(null);

    const location = useLocation();
    const page = new URLSearchParams(location.search).get("page") || "1";

    const { allProducts } = useSelector(
        (state) => state as GetAllProductsInterface
    );
    const { loading, error, products, total_pages, ITEMS_PER_PAGE } =
        allProducts;

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo, loading: loadingUserData } = userLogin;

    useEffect(() => {
        if (!filterDataExist) {
            dispatch(GetAllProducts(null, +page, "dashboard"));
        }
    }, [dispatch, page, filterDataExist]);

    const deleteProductHandler = (product: ProductStateInterface) => {
        setDeleteProduct(product);
    };

    const editProductHandler = (product: ProductStateInterface) => {
        setEditProduct(product);
    };

    // send filter data to server to get filterd data
    const filterDataHandler = (filterData: FilterDataInterface) => {
        setFilterDataExist(true);
        if (searchParams.has("page")) {
            searchParams.delete("page");
            setSearchParams(searchParams);
        }
        dispatch(GetAllProducts(filterData, 1, "dashboard"));
    };

    const showModuleHandler = (toggle: boolean) => {
        setShowModule(toggle);
    };

    return (
        <div className='mx-auto w-full mt-10'>
            <h3 className='capitalize font-bold break-words tracking-widest text-lg pb-3 sm:pb-6'>
                products
            </h3>

            <FilterBox
                filterData={filterDataHandler}
                showModuleHandler={showModuleHandler}
            />

            {/* Tabel */}
            {loading ? (
                <Spinner className={`${showModule && "top-[95%]"}`} />
            ) : error ? (
                <Message
                    className={`${showModule && "top-[95%]"}`}
                    type='error'
                >
                    {error}
                </Message>
            ) : (
                <>
                    <table className='w-full border-l-[1px] border-r-[1px] dark:border-darkGray'>
                        <ProductsTabelHeader
                            loadingUserData={loadingUserData}
                            userInfo={userInfo}
                        />

                        <ProductsTabelBody
                            markProductWantToDelete={deleteProduct}
                            markProductWantToEdit={editProduct}
                            products={products}
                            userInfo={userInfo}
                            page={page}
                            ITEMS_PER_PAGE={ITEMS_PER_PAGE!}
                            deleteProduct={deleteProductHandler}
                            editProduct={editProductHandler}
                        />
                    </table>
                    <EditDeleteProductsModel
                        editProductModel={editProduct!}
                        deleteProductModel={deleteProduct!}
                        editProductModelHandler={editProductHandler}
                        deleteProductModelHandler={deleteProductHandler}
                    />
                    <Pagination total_pages={total_pages} />
                </>
            )}
        </div>
    );
};

export default Products;
