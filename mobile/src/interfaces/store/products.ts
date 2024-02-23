import {
    ProductStateInterface,
    ProductsState,
    TopRatedBestSaleProducts,
} from "../screens/products";
import { PageType, FilterDateInterface } from "../public";

export interface InitialProductsState {
    // products
    productsLoading: boolean;
    productsData: null | ProductsState;
    productsError: null | any;
    // product
    productLoading: boolean;
    productData: null | ProductStateInterface;
    productError: null | any;
    // my products
    myProductsLoading: boolean;
    myProductsData: null | ProductsState;
    myProductsError: null | any;
    // create product
    createProductLoading: boolean;
    createProductData: null | ProductStateInterface;
    createProductError: null | any;
    // edit my product
    editMyProductLoading: boolean;
    editMyProductData: null | ProductStateInterface;
    editMyProductError: null | any;
    // delete my product
    deleteMyProductLoading: boolean;
    deleteMyProductData: null | string | any;
    deleteMyProductError: null | any;
    // top Rated Best Sale products
    topRatedBestSaleProductsLoading: boolean;
    topRatedBestSaleProductsData: null | TopRatedBestSaleProducts;
    topRatedBestSaleProductsError: null | any;
}

export interface GetProductsParams {
    page: number;
    pageType: PageType;
    filterData?: FilterDateInterface | null;
}

export interface GetProductParams {
    id: string;
}

export interface GetMyProductsParams {
    page: number;
}

export interface CreateProductParams {
    name: string;
    imageUrl: object;
    category: string;
    description: string;
    price: number;
    priceDiscount: number;
    countInStock: number;
}

export interface EditProductParams {
    productId: string;
    name: string;
    imageUrl?: object;
    category: string;
    description: string;
    price: number;
    priceDiscount: number;
    countInStock: number;
}

export interface DeleteProductParams {
    productId: string;
}
