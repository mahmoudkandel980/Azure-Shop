import { ProductStateInterface } from "../store/product/productInterface";

export interface ProductImageInterface {
    product: ProductStateInterface;
    deleteProduct: (product: ProductStateInterface) => void;
    editProduct: (product: ProductStateInterface) => void;
}

export interface AddToCardButtonInterface {
    product: ProductStateInterface;
    quantity?: number;
    productInCart: boolean;
}
