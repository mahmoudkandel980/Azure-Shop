import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Input from "../../ui/Input";
import SelectInput from "../../ui/SelectInput";
import Button from "../../ui/Button";
import DropDown from "../../ui/DropDown";

import categories from "../../../data/productCategories";

import { FilterBoxInterface } from "../../../interfaces/components/dashboard";

const FilterBox = (props: FilterBoxInterface): JSX.Element => {
    const { type } = useParams();
    const [showModule, setShowModule] = useState(false);
    const [openDropDown, setOpenDropDown] = useState(false);

    const [filterData, setFormData] = useState({
        // mutual
        id: "",
        createdFrom: "",
        createdTo: "",
        // products
        category: "all",
        priceFrom: "",
        priceTo: "",
        rate: "all",
        // users
        email: "",
        role: "all",
        active: "all",
        // orders
        isPaid: "all",
        isDelivered: "all",
        // products && users
        name: "",
    });
    const {
        id,
        createdFrom,
        createdTo,
        category,
        priceFrom,
        priceTo,
        rate,
        email,
        role,
        active,
        isPaid,
        isDelivered,
        name,
    } = filterData;

    useEffect(() => {
        props.showModuleHandler(showModule);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showModule]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.target.id === "category") {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.title,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }));
        }
    };

    const openHandler = (state: boolean) => {
        setOpenDropDown(state);
    };

    const closeDropdownHandler = () => {
        setOpenDropDown(false);
    };

    const toggleModuleHandler = () => {
        setShowModule((prevState) => !prevState);
    };

    const submitFilterHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.filterData(filterData);
        setShowModule((prevState) => !prevState);
    };

    return (
        <div>
            <h3 className='flex justify-start items-center gap-1 text-sm apitalize font-semibold break-words tracking-wider pb-3 sm:pb-6'>
                <span className='cursor-pointer' onClick={toggleModuleHandler}>
                    open filtration module
                </span>
                <span className='cursor-pointer' onClick={toggleModuleHandler}>
                    {showModule ? (
                        <IoIosArrowUp className='shake-vertical' />
                    ) : (
                        <IoIosArrowDown className='shake-vertical' />
                    )}
                </span>
            </h3>
            {showModule && (
                <form
                    onSubmit={submitFilterHandler}
                    className='w-full text-xs sm:text-sm border-[1px]  dark:border-darkGray rounded-md mb-32 p-3 sm:p-5 '
                >
                    <div className='grid gap-y-3 sm:gap-y-5 gap-x-10 sm:grid-cols-2'>
                        <Input
                            htmlFor='id'
                            label='Id'
                            type='text'
                            id='id'
                            placeholder='Enter user id'
                            required={false}
                            value={id}
                            onChange={onChange}
                        />
                        <div className='grid grid-cols-2 gap-1 sm:gap-10 items-center'>
                            <Input
                                htmlFor='createdFrom'
                                label='created from'
                                type='date'
                                id='createdFrom'
                                required={false}
                                value={createdFrom}
                                onChange={onChange}
                            />
                            <Input
                                htmlFor='createdTo'
                                label='created to'
                                type='date'
                                id='createdTo'
                                required={false}
                                value={createdTo}
                                onChange={onChange}
                            />
                        </div>
                        {(type === "products" || type === "users") && (
                            <Input
                                htmlFor='name'
                                label='Name'
                                type='text'
                                id='name'
                                placeholder='Enter user name'
                                required={false}
                                value={name}
                                onChange={onChange}
                            />
                        )}
                        {type === "products" && (
                            <>
                                <DropDown
                                    htmlFor='category'
                                    label='Category'
                                    id='category'
                                    value={category}
                                    options={["all", ...categories]}
                                    onChange={onChange}
                                    openHandler={openHandler}
                                    openDropDown={openDropDown}
                                />
                                <div className='grid grid-cols-2 gap-1 sm:gap-10 items-center'>
                                    <Input
                                        htmlFor='priceFrom'
                                        label='Price From'
                                        type='number'
                                        id='priceFrom'
                                        placeholder='price From'
                                        required={false}
                                        value={priceFrom}
                                        onChange={onChange}
                                    />
                                    <Input
                                        htmlFor='priceTo'
                                        label='Price To'
                                        type='number'
                                        id='priceTo'
                                        placeholder='price To'
                                        required={false}
                                        value={priceTo}
                                        onChange={onChange}
                                    />
                                </div>
                                <SelectInput
                                    htmlFor='rate'
                                    label='Rate'
                                    id='rate'
                                    value={rate}
                                    onChange={onChange}
                                    options={[
                                        "all",
                                        "greater than and equal 1",
                                        "greater than and equal 2",
                                        "greater than and equal 3",
                                        "greater than and equal 4",
                                        "equal 5",
                                    ]}
                                />
                            </>
                        )}
                        {type === "users" && (
                            <>
                                <Input
                                    htmlFor='email'
                                    label='Email'
                                    type='text'
                                    id='email'
                                    placeholder='Enter user email'
                                    required={false}
                                    value={email}
                                    onChange={onChange}
                                />
                                <div className='grid grid-cols-2 gap-1 sm:gap-10 items-center'>
                                    <SelectInput
                                        htmlFor='role'
                                        label='Role'
                                        id='role'
                                        value={role}
                                        onChange={onChange}
                                        options={[
                                            "all",
                                            "user",
                                            "seller",
                                            "moderator",
                                            "subAdmin",
                                            "admin",
                                        ]}
                                    />
                                    <SelectInput
                                        htmlFor='active'
                                        label='Status'
                                        id='active'
                                        value={active}
                                        onChange={onChange}
                                        options={["all", "active", "inActive"]}
                                    />
                                </div>
                            </>
                        )}
                        {type === "orders" && (
                            <div className='grid grid-cols-2 gap-1 sm:gap-10 items-center'>
                                <SelectInput
                                    htmlFor='isPaid'
                                    label='Is Paid'
                                    id='isPaid'
                                    value={isPaid}
                                    onChange={onChange}
                                    options={["all", "is paid", "not paid"]}
                                />
                                <SelectInput
                                    htmlFor='isDelivered'
                                    label='Is Delivered'
                                    id='isDelivered'
                                    value={isDelivered}
                                    onChange={onChange}
                                    options={[
                                        "all",
                                        "is delivered",
                                        "not delivered",
                                    ]}
                                />
                            </div>
                        )}
                    </div>
                    <Button className='mx-auto p-10 py-1 mt-5'>Filter</Button>
                </form>
            )}
            {openDropDown && (
                <div
                    onClick={closeDropdownHandler}
                    className='absolute bg-transparent w-[100%] h-[100%] top-0 left-0'
                ></div>
            )}
        </div>
    );
};

export default FilterBox;
