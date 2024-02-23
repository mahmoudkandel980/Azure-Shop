import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ButtonSpinner from "../../ui/ButtonSpinner";
import DropDown from "../../ui/DropDown";

import { BsCamera, BsCloudUpload } from "react-icons/bs";

import categories from "../../../data/productCategories";

import { CreateEditProductFormInterface } from "../../../interfaces/components/models";
import imageUrlConverter from "../../../helpers/imageUrlConverter";

const CreateEditProductForm = (
    props: CreateEditProductFormInterface
): JSX.Element => {
    const { pathname } = useLocation();
    const [openDropDown, setOpenDropDown] = useState(false);

    const {
        userInfo,
        product,
        name,
        category,
        description,
        price,
        priceDiscount,
        countInStock,
        imageUrl,
        localImage,
        formError,
        loading,
        onChange,
        createProduct,
    } = props;

    const openHandler = (state: boolean) => {
        setOpenDropDown(state);
    };

    const closeDropdownHandler = () => {
        setOpenDropDown(false);
    };

    return (
        <div className='flex overflow-hidden flex-col sm:grid text-sm sm:text-base sm:grid-cols-2 gap-x-10 gap-y-5 sm:gap-y-16 px-1 sm:px-5'>
            <div className='relative'>
                <div className='relative w-28 h-28'>
                    {imageUrl || localImage ? (
                        <img
                            loading='lazy'
                            className='h-full w-full rounded-full object-cover'
                            src={
                                localImage
                                    ? window.URL.createObjectURL(localImage)
                                    : imageUrlConverter("products", imageUrl)
                            }
                            alt={name}
                        />
                    ) : (
                        <span className='absolute top-0 left-0 h-full w-full rounded-full border-[1px] dark:border-gray-600/40 border-gray-400/25'>
                            <label
                                htmlFor='uploadProfileImage'
                                className='cursor-pointer'
                            >
                                <BsCloudUpload className='absolute top-0 left-0 h-[50%] translate-x-[50%] w-[50%] translate-y-[50%]' />
                            </label>
                        </span>
                    )}
                    <span className='absolute -bottom-1 -right-1.5 bg-grayWhite dark:bg-smothDark w-12 h-12 rounded-full'>
                        <label
                            htmlFor='uploadProfileImage'
                            className='cursor-pointer'
                        >
                            <BsCamera className='absolute top-1.5 left-2 w-7 h-7' />
                        </label>
                        <input
                            className='hidden'
                            type='file'
                            id='uploadProfileImage'
                            accept='.jpg,.png,.jpeg'
                            multiple={false}
                            max='1'
                            onChange={onChange}
                        />
                    </span>
                </div>
                <span className='absolute -bottom-6 text-sm text-darkRed '>
                    {formError.imageUrl}
                </span>
            </div>
            <div></div>
            <Input
                htmlFor='name'
                label='Name'
                type='text'
                id='name'
                placeholder='Enter Name'
                value={name}
                onChange={onChange}
                error={formError.name}
            />

            <DropDown
                htmlFor='category'
                label='Category'
                id='category'
                value={category}
                error={formError.category}
                options={categories}
                onChange={onChange}
                openHandler={openHandler}
                openDropDown={openDropDown}
            />
            {(createProduct ||
                product.creator.id === userInfo.id ||
                pathname.includes("/profile")) && (
                <div className='grid grid-cols-2 gap-5'>
                    <Input
                        htmlFor='price'
                        label='Price'
                        type='number'
                        id='price'
                        placeholder='Enter price'
                        value={price}
                        onChange={onChange}
                        error={formError.price}
                    />
                    <Input
                        htmlFor='priceDiscount'
                        label='Price discount'
                        type='number'
                        id='priceDiscount'
                        placeholder='Enter price discount'
                        value={priceDiscount}
                        onChange={onChange}
                        error={formError.priceDiscount}
                    />
                </div>
            )}
            {(createProduct ||
                product.creator.id === userInfo.id ||
                pathname.includes("/profile")) && (
                <Input
                    htmlFor='countInStock'
                    label='Count in stock'
                    type='number'
                    id='countInStock'
                    placeholder='Enter price count in stock'
                    value={countInStock}
                    onChange={onChange}
                    error={formError.countInStock}
                />
            )}
            <Input
                htmlFor='description'
                label='Description'
                type='textarea'
                id='description'
                placeholder='Enter description'
                value={description}
                onChange={onChange}
                error={formError.description}
            />
            <Button
                className='mx-auto w-[80%] sm:w-[50%] lg:w-[20%] mt-5'
                style={{ gridColumn: "-3/-1" }}
            >
                {loading ? (
                    <ButtonSpinner className='scale-[0.25] mb-1 w-8 h-5' />
                ) : (
                    <span>{createProduct ? "Create" : "Update"}</span>
                )}
            </Button>
            {openDropDown && (
                <div
                    onClick={closeDropdownHandler}
                    className='absolute bg-transparent w-[100%] h-[100%] top-0 left-0'
                ></div>
            )}
        </div>
    );
};

export default CreateEditProductForm;
