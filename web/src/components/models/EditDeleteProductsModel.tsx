import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { dashboard_deleteProduct as dashboard_deleteProductFun } from "../../store/actions/dashboardActions";
import { deleteProduct as deleteMyProduct } from "../../store/actions/productActions";

import CreateEditProductModel from "./createProduct/CreateEditProductModel";
import Backdrop from "./Backdrop";
import ConfirmDelete from "./ConfirmDelete";

import {
    EditDeleteProductsModelInterface,
    EditProductModelInterface,
    DeleteProductModelInterface,
} from "../../interfaces/components/models";
import { LoginInterface } from "../../interfaces/store/user/authInterface";
import {
    EditProductInterface,
    DashboardEditProductInterface,
    DeleteProductInterface,
    DashboardDeleteProductInterface,
} from "../../interfaces/store/product/productInterface";

const EditDeleteProductsModel = (
    props: EditDeleteProductsModelInterface
): JSX.Element => {
    const { editProductModel, deleteProductModel } = props;
    const dispatch = useDispatch<AppDispatch>();

    const [deleteProduct, setDeleteProduct] =
        useState<DeleteProductModelInterface>({
            product: null,
            showDeleteProductModel: false,
        });
    const [editProduct, setEditProduct] = useState<EditProductModelInterface>({
        product: null,
        showEditProductModel: false,
    });

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const { dashboard_editProduct } = useSelector(
        (state) => state as DashboardEditProductInterface
    );
    const { loading: loadingEditProduct_dashboard } = dashboard_editProduct;

    const { editProduct: editProductRedux } = useSelector(
        (state) => state as EditProductInterface
    );
    const { loading: loadingEditProduct } = editProductRedux;

    const { dashboard_deleteProduct } = useSelector(
        (state) => state as DashboardDeleteProductInterface
    );
    const { loading: loadingDeleteProduct_dashboard } = dashboard_deleteProduct;

    const { deleteProduct: deleteProduct_redux } = useSelector(
        (state) => state as DeleteProductInterface
    );
    const { loading: loadingDeleteProduct } = deleteProduct_redux;

    // hide delete product model when loading is false mean that the process is finished
    useEffect(() => {
        if (!loadingDeleteProduct && !loadingDeleteProduct_dashboard) {
            props.deleteProductModelHandler(null!);
        }
        if (!loadingEditProduct && !loadingEditProduct_dashboard) {
            props.editProductModelHandler(null!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        loadingDeleteProduct,
        loadingEditProduct,
        loadingEditProduct_dashboard,
        loadingDeleteProduct_dashboard,
    ]);

    useEffect(() => {
        if (editProductModel) {
            setEditProduct({
                product: editProductModel,
                showEditProductModel: true,
            });
        } else {
            setEditProduct((prevState) => ({
                ...prevState,
                showEditProductModel: false,
            }));
        }
    }, [editProductModel]);

    useEffect(() => {
        if (deleteProductModel) {
            setDeleteProduct({
                product: deleteProductModel,
                showDeleteProductModel: true,
            });
        } else {
            setDeleteProduct((prevState) => ({
                ...prevState,
                showDeleteProductModel: false,
            }));
        }
    }, [deleteProductModel]);

    // hide delete && edit product model
    const hideProductModelHandler = () => {
        props.deleteProductModelHandler(null!);
        props.editProductModelHandler(null!);
    };

    const confirmDeleteHandler = (confirmDelete: boolean) => {
        if (confirmDelete) {
            // if true delete product
            if (
                deleteProduct.product?.creator.id === userInfo.id
                // ||deleteProduct.product.creator === userInfo.id
            ) {
                dispatch(deleteMyProduct(deleteProduct.product?.id!));
            } else {
                dispatch(
                    dashboard_deleteProductFun(deleteProduct.product?.id!)
                );
            }
        } else {
            // if false close the model only
            hideProductModelHandler();
        }
    };

    return (
        <>
            {(deleteProduct.showDeleteProductModel ||
                editProduct.showEditProductModel) && (
                <Backdrop onClose={hideProductModelHandler} />
            )}
            <ConfirmDelete
                loading={
                    deleteProduct.product &&
                    deleteProduct.product.creator &&
                    deleteProduct.product.creator.id === userInfo.id
                        ? //  || deleteProduct.product.creator === userInfo.id
                          loadingDeleteProduct
                        : loadingDeleteProduct_dashboard
                }
                showDeleteModel={deleteProduct.showDeleteProductModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header='Confirm delete product'
                element={deleteProduct.product?.name!}
                text={`Make sure user with name ${deleteProduct.product?.name} and id ${deleteProduct.product?.id} will completely
                    deleted from the database. Are you sure you want delete it.`}
            />
            <CreateEditProductModel
                loading={
                    editProduct.product &&
                    editProduct.product.creator &&
                    editProduct.product.creator.id === userInfo.id
                        ? //  ||editProduct.product.creator === userInfo.id
                          loadingEditProduct
                        : loadingEditProduct_dashboard
                }
                showEditProductModel={editProduct.showEditProductModel}
                product={editProduct.product}
                onClose={hideProductModelHandler}
                header='Edit Product'
                userInfo={userInfo}
                createProduct={false}
            />
        </>
    );
};

export default EditDeleteProductsModel;
