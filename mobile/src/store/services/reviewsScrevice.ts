import baseRoute from "../../api/baseRoute";

// interfaces
import {
    ProductReviewsParams,
    MyReviewsParams,
    AddReviewParams,
    EditReviewParams,
    DeleteReviewParams,
} from "../../interfaces/store/reviews";

const productReviews = async (formData: ProductReviewsParams) => {
    const { productId } = formData;

    const { data } = await baseRoute.get(`/product/${productId}/reviews/all`);

    return { data };
};

const myReviews = async (formData: MyReviewsParams) => {
    const { page } = formData;

    const { data } = await baseRoute.get(`/product/myReviews?page=${page}`);

    return { data };
};

const addReview = async (formData: AddReviewParams) => {
    const { comment, productId, rating } = formData;

    const { data } = await baseRoute.post(`/product/${productId}/reviews`, {
        comment,
        rating,
    });

    return { data };
};

const editReview = async (formData: EditReviewParams) => {
    const { comment, productId, rating, reviewId } = formData;

    const { data } = await baseRoute.patch(
        `/product/${productId}/review/${reviewId}`,
        {
            comment,
            rating,
        }
    );

    return { data };
};

const deleteReview = async (formData: DeleteReviewParams) => {
    const { productId, reviewId } = formData;

    const { data } = await baseRoute.delete(
        `/product/${productId}/review/${reviewId}`
    );

    return { data };
};

const reviewsService = {
    productReviews,
    myReviews,
    addReview,
    editReview,
    deleteReview,
};

export default reviewsService;
