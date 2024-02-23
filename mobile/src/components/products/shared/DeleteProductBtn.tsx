import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    deleteMyProduct,
    resetDeleteMyProductDataError,
} from "../../../store/slices/productsSlice";
import {
    deleteProduct,
    resetDeleteProductDataError,
} from "../../../store/slices/dashboard/productOrderSlice";

// components
import Button from "../../shared/Button";
import ConfirmDelete from "../../models/ConfirmDelete";

// colors
import colors from "../../../constants/Colors";

// icons
import { AntDesign } from "@expo/vector-icons";

// interfaces
import { EditDeleteProductBtnProps } from "../../../interfaces/screens/products";
import { PageType } from "../../../interfaces/public";

const DeleteProductBtn = (props: EditDeleteProductBtnProps) => {
    const {
        product: {
            name,
            creator: { role, id },
        },
        screenType,
    } = props;

    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const { loginData } = useSelector((state: RootState) => state.auth);
    const { deleteMyProductLoading, deleteMyProductData } = useSelector(
        (state: RootState) => state.products
    );
    const { deleteProductLoading, deleteProductData } = useSelector(
        (state: RootState) => state.dashbordProductsOrders
    );

    // close delete product model when delete product successfully
    useEffect(() => {
        if (deleteMyProductData || deleteProductData) {
            setShowDeleteModel(false);
            dispatch(resetDeleteMyProductDataError());
            dispatch(resetDeleteProductDataError());
        }
    }, [deleteMyProductData, deleteProductData]);

    const showDeleteModelHandler = () => {
        setShowDeleteModel(true);
    };

    const confirmDeleteProductHandler = (confirmed: boolean) => {
        if (!confirmed) {
            setShowDeleteModel(false);
            return;
        }

        const productId = props.product.id;
        if (screenType === PageType.home) {
            // my products
            dispatch(deleteMyProduct({ productId }));
        } else {
            // dashboard products
            dispatch(deleteProduct({ productId }));
        }
    };

    return (
        <>
            {loginData &&
                loginData.role &&
                (loginData.id === id ||
                    (role === "user" &&
                        ["moderator", "subAdmin", "admin"].includes(
                            loginData.role
                        )) ||
                    (role === "seller" &&
                        ["moderator", "subAdmin", "admin"].includes(
                            loginData.role
                        )) ||
                    (role === "moderator" &&
                        ["subAdmin", "admin"].includes(loginData.role)) ||
                    (role === "subAdmin" &&
                        ["admin"].includes(loginData.role))) && (
                    <Button
                        onPress={showDeleteModelHandler}
                        imgBtn
                        deleteBtn
                        icon={
                            <AntDesign
                                name='delete'
                                size={16}
                                color={colors.white}
                            />
                        }
                    />
                )}

            {/* delete product model */}
            <ConfirmDelete
                header='Confirm delete product'
                text='Once this review is deleted, it will be permanently deleted from the database and cannot be retrieved again. Are you sure you want to delete this?'
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteProductHandler}
                deleteBtnContent='confirm'
                element={name}
                loading={
                    screenType === PageType.home
                        ? deleteMyProductLoading
                        : deleteProductLoading
                }
            />
        </>
    );
};

export default DeleteProductBtn;
