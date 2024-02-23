import { ReviewStateInterface } from "../reviews/reviewInterface";
import { UserInfo } from "../user/userInterface";

export interface ProductStateInterface {
    _id: string;
    id: string;
    name: string;
    imageUrl: string;
    category: string;
    description: string;
    price: number;
    priceDiscount: number;
    countInStock: number;
    creator: UserInfo; //
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    numReviews: number;
    rating: number;
    soldCount: number;
    creatorActiveStatus: boolean;
    reviews?: ReviewStateInterface[]; //
    type?: string | undefined;
}

export interface GetAllProductsInterface {
    allProducts: {
        loading?: boolean;
        products: ProductStateInterface[];
        ITEMS_PER_PAGE?: number;
        total_pages?: number;
        pageType?: string;
        error?: string;
    };
}

export interface DashboardEditProductInterface {
    dashboard_editProduct: {
        loading?: boolean;
        product?: ProductStateInterface;
        error?: string;
    };
}

export interface EditProductInterface {
    editProduct: {
        loading?: boolean;
        product?: ProductStateInterface;
        error?: string;
    };
}

export interface DashboardDeleteProductInterface {
    dashboard_deleteProduct: {
        loading?: boolean;
        message?: string;
        error?: string;
    };
}

export interface CreateProductInterface {
    createProduct: {
        loading?: boolean;
        product?: ProductStateInterface;
        error?: string;
    };
}

export interface DeleteProductInterface {
    deleteProduct: {
        loading?: boolean;
        message?: string;
        error?: string;
    };
}

export interface ProductDetailsInterface {
    productDetails: {
        loading?: boolean;
        product?: ProductStateInterface;
        error?: string;
    };
}

export interface MyProductsInterface {
    myProducts: {
        loading?: boolean;
        products?: ProductStateInterface[];
        total_pages?: number;
        error?: string;
    };
}

export interface TopRatedBestSaleProductsInterface {
    topRatedBestSaleProducts: {
        loading?: boolean;
        topRatedProducts?: ProductStateInterface[];
        bestSaleProducts?: ProductStateInterface[];
        total_pages?: number;
        error?: string;
    };
}

// REDUCERS
export interface GetAllProductsReducerInterface {
    loading?: boolean;
    products?: ProductStateInterface[];
    ITEMS_PER_PAGE?: number;
    total_pages?: number;
    pageType?: string;
    error?: string;
}

export interface DashboardEditProductReducerInterface {
    loading?: boolean;
    product?: ProductStateInterface;
    error?: string;
}

export interface EditProductReducerInterface {
    loading?: boolean;
    product?: ProductStateInterface | { reviews: ReviewStateInterface[] };
    error?: string;
}

export interface DashboardDeleteProductReducerInterface {
    loading?: boolean;
    message?: string;
    error?: string;
}

export interface CreateProductReducerInterface {
    loading?: boolean;
    product?: ProductStateInterface | { reviews: ReviewStateInterface[] };
    error?: string;
}

export interface DeleteProductReducerInterface {
    loading?: boolean;
    message?: string;
    error?: string;
}

export interface ProductDetailsReducerInterface {
    loading?: boolean;
    product?: ProductStateInterface | { reviews: ReviewStateInterface[] };
    error?: string;
}

export interface MyProductsReducerInterface {
    loading?: boolean;
    products?: ProductStateInterface[];
    total_pages?: number;
    error?: string;
}

export interface TopRatedBestSaleProductsReducerInterface {
    loading?: boolean;
    topRatedProducts?: ProductStateInterface[];
    bestSaleProducts?: ProductStateInterface[];
    total_pages?: number;
    error?: string;
}
