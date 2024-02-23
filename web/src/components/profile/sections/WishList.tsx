import React from "react";

import WishListofProducts from "../../utils/WishListofProducts";

const WishList = () => {
    return (
        <div className='px-30'>
            <WishListofProducts className='container mx-auto grid grid-cols-1 gap-6 gap-y-12 px-2 sm:px-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center' />
        </div>
    );
};

export default WishList;
