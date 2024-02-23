import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    createProduct,
    editMyProduct,
    resetCreateEditProductDataError,
} from "../../../store/slices/productsSlice";
import {
    editProduct,
    resetEditProductDataError,
} from "../../../store/slices/dashboard/productOrderSlice";

// components
import CreateEdit from "../../models/CreateEdit";
import Input from "../../shared/inputs/Input";
import ImageInput from "../../shared/inputs/ImageInput";
import SelectInput from "../../shared/inputs/SelectInput";

// interfaces
import { CreateEditType } from "../../../interfaces/models";
import { CreateEditProductModelProps } from "../../../interfaces/screens/products";

// validation
import validateInput, {
    validateImageInput,
} from "../../../validation/validateInput";

// data
import categories from "../../../data/productCategories";

const CreateEditProductModel = (props: CreateEditProductModelProps) => {
    const { setShowCreateEditModel, showCreateEditModel, type, product } =
        props;

    const dispatch = useDispatch<AppDispatch>();
    const {
        createProductLoading,
        createProductData,
        editMyProductLoading,
        editMyProductData,
    } = useSelector((state: RootState) => state.products);
    const { editProductLoading, editProductData } = useSelector(
        (state: RootState) => state.dashbordProductsOrders
    );
    const { loginData } = useSelector((state: RootState) => state.auth);

    // form
    const [image, setImage] = useState<object | null>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [priceDiscount, setPriceDiscount] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [formError, setFormError] = useState({
        nameError: "",
        imageError: "",
        categoryError: "",
        descriptionError: "",
        priceError: "",
        priceDiscountError: "",
        countInStockError: "",
    });
    const {
        categoryError,
        countInStockError,
        descriptionError,
        imageError,
        nameError,
        priceDiscountError,
        priceError,
    } = formError;

    // if we in edit mode make sure to reset states
    useEffect(() => {
        if (type === CreateEditType.edit) {
            const {
                imageUrl,
                name,
                category,
                description,
                price,
                priceDiscount,
                countInStock,
            } = product!;
            setImageUrl(imageUrl);
            setName(name);
            setCategory(category);
            setDescription(description);
            setPrice(price.toString());
            setPriceDiscount(priceDiscount.toString());
            setCountInStock(countInStock.toString());
        }
    }, [product]);

    // if product is created close model
    useEffect(() => {
        if (createProductData || editMyProductData || editProductData) {
            setShowCreateEditModel(false);
            dispatch(resetCreateEditProductDataError());
            dispatch(resetEditProductDataError());

            // reset states
            setImage(null);
            setImageUrl("");
            setName("");
            setCategory("");
            setDescription("");
            setPrice("");
            setPriceDiscount("");
            setCountInStock("");
        }
    }, [createProductData, editMyProductData, editProductData]);

    // bearer image
    const localImageBearerHandler = (assets: object) => {
        setImage(assets);
    };

    const currentValueHandler = (currentValue: string) => {
        setCategory(currentValue);
    };

    // confirm edit or create product
    const confirmCreateEditHandler = (confirmed: boolean) => {
        if (!confirmed) {
            setShowCreateEditModel(false);
            return;
        }

        // validation
        const categoryErr = validateInput({
            inputValue: category,
            type: "Category",
        });
        const countInStockErr = validateInput({
            inputValue: countInStock,
            type: "Count In Stock",
        });
        const descriptionErr = validateInput({
            inputValue: description,
            type: "Description",
        });
        const nameErr = validateInput({ inputValue: name, type: "Name" });
        const priceDiscountErr = validateInput({
            inputValue: priceDiscount,
            type: "Price Discount",
        });
        const priceErr = validateInput({ inputValue: price, type: "Price" });
        let imageErr = "";
        if (CreateEditType.create === type) {
            imageErr = validateImageInput({
                inputValue: image,
                type: "Image",
            });
        }

        setFormError({
            categoryError: categoryErr,
            countInStockError: countInStockErr,
            descriptionError: descriptionErr,
            imageError: imageErr,
            nameError: nameErr,
            priceDiscountError: priceDiscountErr,
            priceError: priceErr,
        });

        if (
            categoryErr ||
            countInStockErr ||
            descriptionErr ||
            nameErr ||
            priceDiscountErr ||
            priceErr ||
            imageErr
        ) {
            return;
        }

        let submitedData: any = {
            name,
            category,
            description,
            price: +price,
            priceDiscount: +priceDiscount,
            countInStock: +countInStock,
        };

        if (CreateEditType.create === type) {
            // create product
            dispatch(createProduct({ ...submitedData, imageUrl: image! }));
        } else {
            // edit product
            if (image) submitedData.imageUrl = image;

            if (loginData?.id === product?.creator.id) {
                // edit my product
                dispatch(
                    editMyProduct({ ...submitedData, productId: product?.id! })
                );
            } else {
                // edit dashboard product
                dispatch(
                    editProduct({
                        productFormData: submitedData,
                        productId: product?.id!,
                    })
                );
            }
        }
    };

    return (
        <CreateEdit
            confirmCreateEditHandler={confirmCreateEditHandler}
            createEditBtnContent={
                CreateEditType.create === type ? "create" : "edit"
            }
            header={
                CreateEditType.create === type
                    ? "create product"
                    : "edit product"
            }
            showCreateEditModel={showCreateEditModel}
            type={type}
            loading={
                CreateEditType.create === type
                    ? createProductLoading
                    : loginData?.id === product?.creator.id
                    ? editMyProductLoading
                    : editProductLoading
            }
        >
            <>
                <ImageInput
                    imageUrl={imageUrl}
                    imageUrlError={imageError}
                    localImage={localImageBearerHandler}
                />
                <Input
                    label='name'
                    onChangeText={setName}
                    value={name}
                    placeholder='Enter name'
                    inputMode='text'
                    error={nameError}
                />
                <SelectInput
                    currentValue={currentValueHandler}
                    items={categories.map((category) => ({
                        label: category,
                        value: category,
                    }))}
                    inialValue={category}
                    label='category'
                    error={categoryError}
                />
                {/* visabel in create product or edit your product */}
                {loginData &&
                    loginData.id &&
                    (type === CreateEditType.create ||
                        (type === CreateEditType.edit &&
                            loginData.id === product?.creator.id)) && (
                        <>
                            <View style={styles.inputsGroup}>
                                <Input
                                    label='price'
                                    onChangeText={setPrice}
                                    value={price}
                                    placeholder='Enter price'
                                    inputMode='numeric'
                                    error={priceError}
                                />
                                <Input
                                    label='price discount'
                                    onChangeText={setPriceDiscount}
                                    value={priceDiscount}
                                    placeholder='Enter price discount'
                                    inputMode='numeric'
                                    error={priceDiscountError}
                                />
                            </View>
                            <Input
                                label='count in stock'
                                onChangeText={setCountInStock}
                                value={countInStock}
                                placeholder='Enter count in stock'
                                inputMode='numeric'
                                error={countInStockError}
                            />
                        </>
                    )}
                <Input
                    label='description'
                    onChangeText={setDescription}
                    value={description}
                    placeholder='Enter description'
                    multiline={true}
                    numberOfLines={5}
                    error={descriptionError}
                />
            </>
        </CreateEdit>
    );
};

export default CreateEditProductModel;

const styles = StyleSheet.create({
    inputsGroup: {
        flexDirection: "row",
        columnGap: 10,
        alignItems: "flex-start",
    },
});
