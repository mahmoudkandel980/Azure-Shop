import React from "react";
import { useParams } from "react-router-dom";

import CheckoutNav from "../components/checkout/CheckoutNav";
import Shipping from "../components/checkout/Shipping";
import Order from "../components/checkout/Order";

const Checkout = () => {
    const { section } = useParams();

    return (
        <div className='mx-auto container flex-1 relative min-h-[350px]'>
            <CheckoutNav />
            <div className='mt-10'>
                {section === "shipping" ? (
                    <Shipping />
                ) : (
                    section === "order" && <Order />
                )}
            </div>
        </div>
    );
};

export default Checkout;
