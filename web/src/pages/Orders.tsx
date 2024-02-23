import React from "react";

import OrdersTabel from "../components/orders/OrdersTabel";

const Orders = (): JSX.Element => {
    return (
        <div className='flex-1 container mx-auto relative'>
            <OrdersTabel />
        </div>
    );
};

export default Orders;
