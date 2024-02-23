import React, { useState, useEffect } from "react";

import Button from "../ui/Button";
import { useSelector } from "react-redux";

import { MdOutlineAdd } from "react-icons/md";
import Backdrop from "../models/Backdrop";
import CreateEditProductModel from "../models/createProduct/CreateEditProductModel";

import { ClassNameInterface } from "../../interfaces/components/public";
import { LoginInterface } from "../../interfaces/store/user/authInterface";
import { CreateProductInterface } from "../../interfaces/store/product/productInterface";

const CreateProduct = (props: ClassNameInterface): JSX.Element => {
    const [showEditProductModel, setShowEditProductModel] = useState(false);

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const { createProduct } = useSelector(
        (state) => state as CreateProductInterface
    );
    const { loading: loadingCreateProduct } = createProduct;

    // hide create product model when loading is false mean that the process is finished
    useEffect(() => {
        if (loadingCreateProduct === false) {
            setShowEditProductModel(false);
        }
    }, [loadingCreateProduct]);

    const createProductHandler = () => {
        setShowEditProductModel(true);
    };

    const hideProductModelHandler = () => {
        setShowEditProductModel(false);
    };

    return (
        <>
            {userInfo &&
            userInfo.role &&
            (userInfo.role === "seller" ||
                userInfo.role === "moderator" ||
                userInfo.role === "subAdmin" ||
                userInfo.role === "admin") ? (
                <>
                    <Button
                        onClick={createProductHandler}
                        createBtn={true}
                        className={`${props.className} ml-auto w-fit hover:scale-105 duration-300 flex justify-center items-center gap-1 text-sm sm:text-base font-bold px-3 sm:px-5`}
                    >
                        <>
                            <MdOutlineAdd />
                            <span>Create Product</span>
                        </>
                    </Button>
                    {showEditProductModel && (
                        <Backdrop onClose={hideProductModelHandler} />
                    )}
                    <CreateEditProductModel
                        loading={loadingCreateProduct}
                        showEditProductModel={showEditProductModel}
                        product={null}
                        onClose={hideProductModelHandler}
                        header='Create Product'
                        userInfo={userInfo}
                        createProduct
                    />
                </>
            ) : (
                ""
            )}
        </>
    );
};

export default CreateProduct;
