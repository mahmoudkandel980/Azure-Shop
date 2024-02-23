import React from "react";

import CartOfProducts from "../../utils/CartOfProducts";

const Cart = (): JSX.Element => {
    return (
        <div className='px-30'>
            <CartOfProducts className='mx-auto container flex-1' />
        </div>
    );
};

export default Cart;
