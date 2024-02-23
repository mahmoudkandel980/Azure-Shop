import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { ShippingDataInterface } from "../../interfaces/components/checkout";

const Shipping = () => {
    const navigate = useNavigate();

    const [shipping, setShipping] = useState<ShippingDataInterface>({
        address: "",
        city: "",
        phone: "",
        postalCode: "",
        country: "",
    });
    const [shippingError, setShippingError] = useState<ShippingDataInterface>({
        address: "",
        city: "",
        phone: "",
        postalCode: "",
        country: "",
    });

    const { address, city, country, phone, postalCode } = shipping;

    // loading shippingData from local storage
    useEffect(() => {
        if (localStorage.getItem("shippingData")) {
            const shippingData = JSON.parse(
                localStorage.getItem("shippingData") as string
            );

            for (const [key, value] of Object.entries(shippingData)) {
                setShipping((prevState) => ({
                    ...prevState,
                    [key]: value,
                }));
            }
        }
    }, []);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setShipping((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));

        setShippingError((prevState) => ({
            ...prevState,
            [e.target.id]: "",
        }));
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ckeck if address, city, country, phone or postalCode is empty
        let noError = true;
        Object.keys(shipping).forEach((input) => {
            const value = shipping[input as keyof ShippingDataInterface];
            if (!value || value.trim().length === 0) {
                noError = false;
                setShippingError((prevState) => ({
                    ...prevState,
                    [input]: `please fill ${input} field`,
                }));
            }
        });

        // sote shipping in localStorage
        if (noError) {
            localStorage.setItem("shippingData", JSON.stringify(shipping));
            navigate("/checkout/order");
        }
    };

    return (
        <div className='flex flex-col justify-center px-30'>
            <h2 className='capitalize border-b-[1px] font-bold break-words tracking-widest text-lg mb-10 w-fit'>
                shipping
            </h2>
            <div className='w-full flex justify-center'>
                <form
                    onSubmit={submitFormHandler}
                    className='grid grid-cols-1 sm:grid-cols-2 mx-2 gap-8 justify-start items-center w-full lg:w-[90%] p-5 border-[1px] border-lightDark/20 dark:border-lightDark rounded-md'
                >
                    <Input
                        htmlFor='address'
                        label='Address'
                        type='text'
                        id='address'
                        placeholder='Enter Address'
                        value={address}
                        onChange={onChange}
                        error={shippingError.address}
                    />
                    <Input
                        htmlFor='city'
                        label='City'
                        type='text'
                        id='city'
                        placeholder='Enter City'
                        value={city}
                        onChange={onChange}
                        error={shippingError.city}
                    />
                    <Input
                        htmlFor='country'
                        label='Country'
                        type='text'
                        id='country'
                        placeholder='Enter Country'
                        value={country}
                        onChange={onChange}
                        error={shippingError.country}
                    />
                    <Input
                        htmlFor='phone'
                        label='Phone'
                        textStart
                        type='number'
                        id='phone'
                        placeholder='Enter Phone Number'
                        value={phone}
                        onChange={onChange}
                        error={shippingError.phone}
                    />
                    <Input
                        htmlFor='postalCode'
                        label='Postal Code'
                        type='number'
                        textStart
                        id='postalCode'
                        placeholder='Enter Postal Code'
                        value={postalCode}
                        onChange={onChange}
                        error={shippingError.postalCode}
                    />
                    <div className='sm:col-span-2 flex justify-center'>
                        <Button className='w-fit px-10'>next</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Shipping;
