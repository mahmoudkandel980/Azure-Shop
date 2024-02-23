import { ProductStateInterface } from "../store/product/productInterface";

export interface SingleProductInterface {
    product: ProductStateInterface;
    deleteProduct: (product: ProductStateInterface) => void;
    editProduct: (product: ProductStateInterface) => void;
}

export interface ProductDetailsInterface {
    product: ProductStateInterface;
}

export interface RightSideProductDetailsInterface {
    product: ProductStateInterface;
    productInCart: boolean;
    productQuantity: number;
}
