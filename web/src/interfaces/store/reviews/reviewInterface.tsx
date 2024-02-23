import { UserInfo } from "../user/userInterface";
import { ProductStateInterface } from "../product/productInterface";

export interface ReviewStateInterface {
    _id: string;
    id: string;
    review?: string | undefined;
    rating: number;
    createdAt?: string | undefined;
    product: ProductStateInterface; //
    creator: UserInfo; //
}

export interface DeleteReviewModelInterface {
    review: ReviewStateInterface;
    closeReviewDeleteModel: () => void;
}

export interface ReviewSettingsInterface {
    review: ReviewStateInterface;
    showEditReviewModelHandler: (reveiw: ReviewStateInterface) => void;
    showDeleteReviewModelHandler: () => void;
}

export interface ProductReviewsInterface {
    productReviews: {
        loading?: boolean;
        error?: string;
        reviews?: ReviewStateInterface[];
        productId?: string | null;
    };
}

export interface AddProductReviewsInterface {
    addProductReview: {
        loading?: boolean;
        error?: string;
        review?: ReviewStateInterface;
    };
}

export interface EditProductReviewsInterface {
    editProductReview: {
        loading?: boolean;
        error?: string;
        review?: ReviewStateInterface;
    };
}

export interface DeleteProductReviewsInterface {
    deleteProductReview: {
        loading?: boolean;
        error?: string;
        message?: string;
    };
}

export interface MyReviewsInterface {
    myReviews: {
        loading?: boolean;
        reviews?: ReviewStateInterface[];
        total_pages?: number;
        error?: string;
    };
}

// REDUCERS

export interface ProductReviewsReducerInterface {
    loading?: boolean;
    error?: string;
    reviews?: ReviewStateInterface[];
    productId?: string | null;
}

export interface AddProductReviewsReducerInterface {
    loading?: boolean;
    error?: string;
    review?: ReviewStateInterface;
}

export interface EditProductReviewsReducerInterface {
    loading?: boolean;
    error?: string;
    review?: ReviewStateInterface;
}

export interface DeleteProductReviewsReducerInterface {
    loading?: boolean;
    error?: string;
    message?: string;
}

export interface MyReviewsReducerInterface {
    loading?: boolean;
    reviews?: ReviewStateInterface[];
    total_pages?: number;
    error?: string;
}
