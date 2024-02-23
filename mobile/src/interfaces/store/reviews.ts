import {
    ReviewStateInterface,
    MyReviewsData,
    ProductReviewsData,
} from "../screens/reviews";

export interface InitialWishListState {
    // productReviews
    productReviewsLoading: boolean;
    productReviewsData: null | ProductReviewsData;
    productReviewsError: null | any;
    // myReviews
    myReviewsLoading: boolean;
    myReviewsData: null | MyReviewsData;
    myReviewsError: null | any;
    // addReview
    addReviewLoading: boolean;
    addReviewData: null | ReviewStateInterface;
    addReviewError: null | any;
    // editReview
    editReviewLoading: boolean;
    editReviewData: null | ReviewStateInterface;
    editReviewError: null | any;
    // deleteReview
    deleteReviewLoading: boolean;
    deleteReviewData: null | string;
    deleteReviewError: null | any;
}

export interface ProductReviewsParams {
    productId: string;
}

export interface MyReviewsParams {
    page: number;
}

export interface AddReviewParams {
    comment: string;
    rating: number;
    productId: string;
}

export interface EditReviewParams {
    comment: string;
    rating: number;
    productId: string;
    reviewId: string;
}

export interface DeleteReviewParams {
    productId: string;
    reviewId: string;
}
