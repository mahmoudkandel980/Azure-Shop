import React from "react";

import WishListofProducts from "../components/utils/WishListofProducts";

const WishList = (): JSX.Element => {
    return (
        <div className='flex-1'>
            <WishListofProducts className='container mx-auto grid grid-cols-1 gap-6 gap-y-12  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center' />
        </div>
    );
};

export default WishList;
