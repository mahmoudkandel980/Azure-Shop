import { ProductStateInterface } from "./products";
import { UserInfo } from "./regester";
import { ReivewSettingsType } from "../models";

export interface ReviewStateInterface {
    _id: string;
    id: string;
    review?: string | undefined;
    rating: number;
    createdAt?: string | undefined;
    product: ProductStateInterface;
    creator: UserInfo;
}

export interface ReviewItems {
    item: ReviewStateInterface;
}

export interface ProductReviewsData {
    reviews: ReviewStateInterface[];
    productId: string;
}

export interface MyReviewsData {
    reviews: ReviewStateInterface[];
    total_pages: number;
}

export interface ReviewModelState {
    type: ReivewSettingsType;
    review: ReviewStateInterface | null;
}
