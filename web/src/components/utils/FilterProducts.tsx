import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { GetAllProducts } from "../../store/actions/productActions";

import Input from "../ui/Input";
import DropDown from "../ui/DropDown";
import Rating from "../ui/Rating";
import Button from "../ui/Button";

import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import categories from "../../data/productCategories";

const FilterProducts = (): JSX.Element => {
    const ratings = ["all", 1, 2, 3, 4, 5];
    const dispatch = useDispatch<AppDispatch>();

    const dataIsChnaged = useRef({
        categoryIsChanged: false,
        rateIsChanged: false,
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const [showModule, setShowModule] = useState(false);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [filterData, setFormData] = useState({
        name: "",
        category: "all",
        priceFrom: "",
        priceTo: "",
        rate: "all",
    });
    const { name, category, priceFrom, priceTo, rate } = filterData;

    useEffect(() => {
        // filter when category changed or rate change
        if (
            dataIsChnaged.current.categoryIsChanged ||
            dataIsChnaged.current.rateIsChanged
        ) {
            filterLogicFun();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, rate]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
    ) => {
        if (e.target.id === "category" || e.target.id === "rate") {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.title,
            }));
            if (
                !dataIsChnaged.current.categoryIsChanged ||
                !dataIsChnaged.current.rateIsChanged
            ) {
                if (e.target.id === "category") {
                    dataIsChnaged.current.categoryIsChanged = true;
                } else {
                    dataIsChnaged.current.rateIsChanged = true;
                }
            }
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

    const filterLogicFun = () => {
        // remove query of page from url
        if (searchParams.has("page")) {
            searchParams.delete("page");
            setSearchParams(searchParams);
        }
        dispatch(GetAllProducts({ ...filterData }, 1, "home"));
    };

    const submitFilterHandler = (
        e: React.FormEvent<HTMLFormElement | HTMLSpanElement>
    ) => {
        e.preventDefault();
        filterLogicFun();
    };

    const toggleModuleHandler = () => {
        setShowModule((prevState) => !prevState);
    };

    return (
        <aside>
            <h4 className='flex justify-start gap-2 items-center font-semibold border-b-[1px] dark:border-darkGray w-fit mb-5'>
                <span>filter products</span>
                <span
                    className='cursor-pointer block sm:hidden'
                    onClick={toggleModuleHandler}
                >
                    {showModule ? (
                        <IoIosArrowUp className='shake-vertical' />
                    ) : (
                        <IoIosArrowDown className='shake-vertical' />
                    )}
                </span>
            </h4>
            <form
                onSubmit={submitFilterHandler}
                className={`${
                    !showModule && "hidden sm:flex"
                } w-full text-xs sm:text-sm border-[1px] dark:border-darkGray rounded-md p-3`}
            >
                <div className='grid gap-y-3 sm:gap-y-5 gap-x-10 grid-cols-1'>
                    <div className='relative'>
                        <Input
                            htmlFor='name'
                            label='product name'
                            type='text'
                            id='name'
                            placeholder='Enter product name'
                            required={false}
                            value={name}
                            onChange={onChange}
                        />
                        <span
                            onClick={submitFilterHandler}
                            className='absolute bottom-2 right-2 hover:scale-125 scale-110 cursor-pointer'
                        >
                            <FiSearch />
                        </span>
                    </div>
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
                    <div>
                        <label htmlFor='rate'>Rate</label>
                        <div className='pt-2'>
                            <div className='flex flex-col gap-1 register-input'>
                                {ratings.map((r, i) => (
                                    <span
                                        className={`${
                                            rate.includes(r.toString()) &&
                                            "text-stars"
                                        } cursor-pointer relative flex justify-start items-center gap-2 hover:text-stars duration-300`}
                                        key={i}
                                        onClick={onChange}
                                    >
                                        <span
                                            id='rate'
                                            title={
                                                r === "all"
                                                    ? "all"
                                                    : +r < 5
                                                    ? `greater than and equal ${r}`
                                                    : "equal 5"
                                            }
                                            className='absolute top-0 left-0 w-full h-full'
                                        ></span>
                                        {r === "all" ? (
                                            "All"
                                        ) : (
                                            <>
                                                <Rating rating={+r} />
                                                {+r < 5 && <span>& up</span>}
                                            </>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-start  gap-1 sm:gap-2 items-end'>
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
                        <Button className='text-sm py-0.5 sm:py-1'>Go</Button>
                    </div>
                </div>
            </form>
            {openDropDown && (
                <div
                    onClick={closeDropdownHandler}
                    className='absolute bg-transparent w-[100%] h-[100%] top-0 left-0'
                ></div>
            )}
        </aside>
    );
};

export default FilterProducts;
