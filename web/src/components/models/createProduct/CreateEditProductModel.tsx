import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { dashboard_editProduct } from "../../../store/actions/dashboardActions";
import { createProduct as createProductAction } from "../../../store/actions/productActions";
import { editProduct } from "../../../store/actions/productActions";

import CreateEditProductForm from "./CreateEditProductForm";
import Button from "../../ui/Button";

import { CreateEditProductModelInterface } from "../../../interfaces/components/models";

const CreateEditProductModel = (
    props: CreateEditProductModelInterface
): JSX.Element => {
    const {
        header,
        showEditProductModel,
        product,
        loading,
        userInfo,
        createProduct,
    } = props;
    const dispatch = useDispatch<AppDispatch>();
    const [localImage, setLocalImage] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        imageUrl: "",
        category: "",
        description: "",
        price: 0,
        priceDiscount: 0,
        countInStock: 0,
    });
    const [formError, setFormError] = useState({
        name: "",
        imageUrl: "",
        category: "",
        description: "",
        price: "",
        priceDiscount: "",
        countInStock: "",
        backendError: "",
    });

    const {
        name,
        imageUrl,
        category,
        description,
        price,
        priceDiscount,
        countInStock,
    } = formData;

    useEffect(() => {
        if (showEditProductModel && product) {
            setFormData({
                name: product.name,
                imageUrl: product.imageUrl,
                category: product.category,
                description: product.description,
                price: product.price,
                priceDiscount: product.priceDiscount,
                countInStock: product.countInStock,
            });
        }
    }, [product, showEditProductModel]);

    // delete image when close model if from this component or from the backdrop
    useEffect(() => {
        if (!showEditProductModel) {
            setLocalImage(null);
            setFormData({
                name: "",
                imageUrl: "",
                category: "",
                description: "",
                price: 0,
                priceDiscount: 0,
                countInStock: 0,
            });
        }
    }, [showEditProductModel]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.target.id === "category") {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.title,
            }));
        } else if (
            (e.target.id === "price" ||
                e.target.id === "priceDiscount" ||
                e.target.id === "countInStock") &&
            (+e.target.value < 0 || e.target.value.startsWith("0"))
        ) {
            setFormData((prevState) => ({
                ...prevState,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }));
        }

        setFormError(() => ({
            name: "",
            imageUrl: "",
            category: "",
            description: "",
            price: "",
            priceDiscount: "",
            countInStock: "",
            backendError: "",
        }));

        const target = e.target as HTMLInputElement;
        if (target && (target.files as FileList)) {
            const file: File = (target.files as FileList)[0];
            setLocalImage(file);
        }
    };

    const closeHandler = () => {
        props.onClose(false);
    };

    const editHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!imageUrl && !localImage) {
                setFormError((prevState) => ({
                    ...prevState,
                    imageUrl: "please upload image",
                }));
                return;
            }
            if (!name || name.trim().length === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    name: "please fill name field",
                }));
                return;
            }
            if (!category || category.trim().length === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    category: "please fill category field",
                }));
                return;
            }
            if (!price || +price === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    price: "please fill price field",
                }));
                return;
            }
            if (+priceDiscount > +price) {
                setFormError((prevState) => ({
                    ...prevState,
                    priceDiscount:
                        "priceDiscount field should be bigger than price field",
                }));
                return;
            }
            if (!countInStock || +countInStock === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    countInStock: "please fill countInStock field",
                }));
                return;
            }
            if (!description || description.trim().length === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    description: "please fill description field",
                }));
                return;
            }

            const SubmitedFormDate = new FormData();

            SubmitedFormDate.append("name", name);
            SubmitedFormDate.append("category", category);
            SubmitedFormDate.append("description", description);
            SubmitedFormDate.append("price", price.toString());
            SubmitedFormDate.append("priceDiscount", priceDiscount.toString());
            SubmitedFormDate.append("countInStock", countInStock.toString());
            localImage?.name && SubmitedFormDate.append("imageUrl", localImage);

            if (createProduct) {
                dispatch(createProductAction(SubmitedFormDate));
            } else {
                if (product && product.creator.id === userInfo.id) {
                    dispatch(editProduct(product.id, SubmitedFormDate));
                } else {
                    dispatch(
                        dashboard_editProduct(product?.id!, SubmitedFormDate)
                    );
                }
            }
        } catch (error: any) {
            setFormError((prevState) => ({
                ...prevState,
                backendError: error.message,
            }));
            return;
        }
    };

    return (
        <AnimatePresence>
            {showEditProductModel && (
                <motion.div
                    className='fixed z-10 flex flex-col overflow-hidden dark:border-gray-600/40 border-gray-400/25 dark:bg-smothDark bg-grayWhite p-5 px-2 sm:p-5 lg:p-10 sm:px-5 lg:px-5 top-[10%] sm:top-[12.5%] w-[97%] sm:w-[90%] lg:w-[80%] h-[80%] sm:h-[75%] left-[1.5%] sm:left-[5%] lg:left-[10%] border-[2px] rounded-lg'
                    initial={{
                        scale: 0,
                        opacity: 0,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 100,
                    }}
                    exit={{
                        scale: 0,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                >
                    <h3 className='capitalize font-bold break-words tracking-widest text-lg pb-5 sm:pb-6'>
                        {header}
                    </h3>
                    <div className='h-full overflow-y-scroll sm:overflow-y-auto hideScrollBar'>
                        <form onSubmit={editHandler}>
                            <CreateEditProductForm
                                userInfo={userInfo}
                                product={product!}
                                name={name}
                                category={category}
                                description={description}
                                price={price}
                                priceDiscount={priceDiscount}
                                countInStock={countInStock}
                                imageUrl={imageUrl}
                                localImage={localImage}
                                formError={formError}
                                loading={loading!}
                                onChange={onChange}
                                createProduct={createProduct}
                            />
                        </form>
                        <div className='mt-5 pr-5'>
                            <Button
                                className='ml-auto w-fit px-8'
                                onClick={closeHandler}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CreateEditProductModel;
