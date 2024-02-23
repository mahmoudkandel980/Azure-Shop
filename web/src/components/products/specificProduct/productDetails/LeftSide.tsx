import React, { useState } from "react";

import ProductImage from "../../../utils/ProductImage";
import EditDeleteProductsModel from "../../../models/EditDeleteProductsModel";

import { ProductStateInterface } from "../../../../interfaces/store/product/productInterface";
import { ProductDetailsInterface } from "../../../../interfaces/components/products";

const LeftSide = (props: ProductDetailsInterface): JSX.Element => {
    const { product } = props;

    const [editProduct, setEditProduct] =
        useState<ProductStateInterface | null>(null);
    const [deleteProduct, setDeleteProduct] =
        useState<ProductStateInterface | null>(null);

    const deleteProductHandler = (product: ProductStateInterface) => {
        setDeleteProduct(product);
    };

    const editProductHandler = (product: ProductStateInterface) => {
        setEditProduct(product);
    };

    return (
        <div className='w-full sm:w-[40%] flex flex-col'>
            <ProductImage
                product={product}
                deleteProduct={deleteProductHandler}
                editProduct={editProductHandler}
            />
            <EditDeleteProductsModel
                editProductModel={editProduct}
                deleteProductModel={deleteProduct}
                editProductModelHandler={editProductHandler}
                deleteProductModelHandler={deleteProductHandler}
            />
        </div>
    );
};

export default LeftSide;
