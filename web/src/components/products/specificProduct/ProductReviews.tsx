import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
    getProductReviews,
    addProductReview as addProductReviewFun,
    editProductReview as editProductReviewFun,
} from "../../../store/actions/reviewActions";
import {
    ADD_PRODUCT_REVIEW_RESET,
    EDIT_PRODUCT_REVIEW_RESET,
    DELETE_PRODUCT_REVIEW_RESET,
} from "../../../store/constants/reviewConstants";

import Rating from "../../ui/Rating";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Message from "../../ui/Message";
import ButtonSpinner from "../../ui/ButtonSpinner";

import ReviewSettings from "../../models/productReviews/ReviewSettings";
import Backdrop from "../../models/Backdrop";
import DeleteReviewModel from "../../models/productReviews/DeleteReviewModel";

import convertTimestampFun from "../../../helpers/convertTimestampFun";

import { RxDotsHorizontal } from "react-icons/rx";

import { LoginInterface } from "../../../interfaces/store/user/authInterface";
import {
    ReviewStateInterface,
    ProductReviewsInterface,
    AddProductReviewsInterface,
    EditProductReviewsInterface,
    DeleteProductReviewsInterface,
} from "../../../interfaces/store/reviews/reviewInterface";
import imageUrlConverter from "../../../helpers/imageUrlConverter";

const ProductReviews = (): JSX.Element => {
    const { productId } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [showReviewSettings, setShowReviewSettings] = useState({
        reviewId: "",
        showReviewSettings: false,
    });
    const [showReviewEditModel, setShowReviewEditModel] = useState(false);
    const [reviewId, setReviewId] = useState("");
    const [showReviewDeleteModel, setShowReviewDeleteModel] = useState({
        reviewId: "",
        showDeleteModel: false,
    });

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const { productReviews } = useSelector(
        (state) => state as ProductReviewsInterface
    );
    const { loading, error, reviews } = productReviews;

    const { addProductReview } = useSelector(
        (state) => state as AddProductReviewsInterface
    );
    const { loading: addProductReviewLoading, error: addProductReviewError } =
        addProductReview;

    const { editProductReview } = useSelector(
        (state) => state as EditProductReviewsInterface
    );
    const { loading: editProductReviewLoading, error: editProductReviewError } =
        editProductReview;

    const { deleteProductReview } = useSelector(
        (state) => state as DeleteProductReviewsInterface
    );
    const {
        loading: deleteProductReviewLoading,
        message,
        error: deleteProductReviewError,
    } = deleteProductReview;

    useEffect(() => {
        if (
            (message || deleteProductReviewError) &&
            !deleteProductReviewLoading
        ) {
            dispatch({ type: DELETE_PRODUCT_REVIEW_RESET });
            setShowReviewDeleteModel({
                reviewId: "",
                showDeleteModel: false,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteProductReviewLoading, message, deleteProductReviewError]);

    // remove error when add, edit or delete review after 5s
    useEffect(() => {
        let timer = setTimeout(() => {
            if (addProductReviewError) {
                dispatch({ type: ADD_PRODUCT_REVIEW_RESET });
            }
            if (editProductReviewError) {
                dispatch({ type: EDIT_PRODUCT_REVIEW_RESET });
            }
            if (deleteProductReviewError) {
                dispatch({ type: DELETE_PRODUCT_REVIEW_RESET });
            }
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [
        addProductReviewError,
        editProductReviewError,
        deleteProductReviewError,
        dispatch,
    ]);

    useEffect(() => {
        dispatch(getProductReviews(productId!));
    }, [dispatch, productId]);

    const changeRatingHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRating(+e.target.value);
    };

    const changeReviewHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    };

    const submitReviewHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // send error to frontend to make sure user Authenticated
        if (showReviewEditModel) {
            dispatch(
                editProductReviewFun(productId!, reviewId, review, +rating)
            );
        } else {
            dispatch(addProductReviewFun(productId!, review, +rating));
        }
        setRating(0);
        setReview("");
        setShowReviewEditModel(false);
    };

    const toggleReviewSettingsHandler = (reviewId: string) => {
        setShowReviewDeleteModel({
            reviewId: reviewId,
            showDeleteModel: false,
        });
        if (showReviewSettings.showReviewSettings === true) {
            setShowReviewSettings({
                reviewId: "",
                showReviewSettings: false,
            });
        } else {
            setShowReviewSettings({
                reviewId: reviewId,
                showReviewSettings: true,
            });
        }
    };

    const showEditReviewModelHandler = (review: ReviewStateInterface) => {
        setShowReviewSettings({ reviewId: "", showReviewSettings: false });
        setShowReviewEditModel(true);
        // fill Rating and review inputs
        setRating(review.rating);
        setReview(review.review!);
        setReviewId(review.id);
    };
    const showDeleteReviewModelHandler = () => {
        setShowReviewSettings({ reviewId: "", showReviewSettings: false });
        setShowReviewDeleteModel((prevState) => ({
            ...prevState,
            showDeleteModel: true,
        }));
    };

    const closeAnyModelHandler = () => {
        setShowReviewSettings({ reviewId: "", showReviewSettings: false });
        setShowReviewDeleteModel({
            reviewId: "",
            showDeleteModel: false,
        });
    };

    const closeReviewDeleteModel = () => {
        setShowReviewDeleteModel({
            reviewId: "",
            showDeleteModel: false,
        });
    };

    return (
        <div className='pt-6 px-2 sm:px-0 border-t-[1px] dark:border-white/30'>
            <h3 className='text-lg font-bold uppercase border-b-[1px] w-fit mb-5'>
                reviews
            </h3>

            <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-start gap-5'>
                <div className='w-full relative self-stretch'>
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <Message type='error'>{error}</Message>
                    ) : reviews?.length === 0 ? (
                        <Message type='error'>No Reviews Yet</Message>
                    ) : (
                        <div className='sm:pl-3 flex flex-col justify-center gap-5'>
                            {reviews?.length! > 0 &&
                                reviews?.map((review) => (
                                    <div
                                        key={review.id}
                                        className={`relative flex justify-start items-start gap-3 sm:gap-3 group p-2 py-1 rounded-md ${
                                            userInfo &&
                                            userInfo.id &&
                                            userInfo.id === review.creator.id &&
                                            "bg-whiteMilk dark:bg-dark/10"
                                        }`}
                                    >
                                        <Link
                                            to={
                                                userInfo &&
                                                userInfo.id &&
                                                userInfo.id ===
                                                    review.creator.id
                                                    ? "/profile/settings"
                                                    : `/user/${review.creator.id}`
                                            }
                                            className='relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden rounded-full'
                                        >
                                            <img
                                                loading='lazy'
                                                className='rounded-full object-cover w-12 h-12'
                                                src={imageUrlConverter(
                                                    "users",
                                                    review.creator.imageUrl!
                                                )}
                                                alt={review.creator.name}
                                            />
                                        </Link>
                                        <div className='flex flex-col justify-center items-start text-[12px] text-xs sm:text-sm flex-1'>
                                            <span className='flex justify-start items-start gap-3 mb-1'>
                                                <span>
                                                    {review.creator.name}
                                                </span>
                                                <Rating
                                                    rating={review.rating}
                                                />
                                            </span>
                                            <span
                                                className='text-sm leading-4'
                                                style={{
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                {review.review}
                                            </span>
                                            <span className='text-gray-400 dark:text-gray-300 text-[10px]'>
                                                {convertTimestampFun(
                                                    review.createdAt!
                                                )}
                                            </span>
                                        </div>
                                        <span
                                            onClick={toggleReviewSettingsHandler.bind(
                                                null,
                                                review.id
                                            )}
                                            className={`${
                                                !showReviewSettings.showReviewSettings &&
                                                "opacity-0 group-hover:opacity-100"
                                            } ${
                                                review.creator.id !==
                                                    userInfo.id && "hidden"
                                            } duration-300 cursor-pointer`}
                                        >
                                            <RxDotsHorizontal />
                                        </span>
                                        {showReviewSettings.showReviewSettings &&
                                            showReviewSettings.reviewId ===
                                                review.id && (
                                                <ReviewSettings
                                                    review={review}
                                                    showEditReviewModelHandler={showEditReviewModelHandler.bind(
                                                        null,
                                                        review
                                                    )}
                                                    showDeleteReviewModelHandler={
                                                        showDeleteReviewModelHandler
                                                    }
                                                />
                                            )}
                                        {(showReviewSettings.showReviewSettings ||
                                            showReviewDeleteModel.showDeleteModel) && (
                                            <Backdrop
                                                onClose={closeAnyModelHandler}
                                            />
                                        )}
                                        {showReviewDeleteModel.reviewId ===
                                            review.id &&
                                            showReviewDeleteModel.showDeleteModel && (
                                                <DeleteReviewModel
                                                    review={review}
                                                    closeReviewDeleteModel={
                                                        closeReviewDeleteModel
                                                    }
                                                />
                                            )}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                <div className='w-full px-2 sm:px-0 relative'>
                    <h4 className='font-bold border-b-[1px] w-fit mb-5'>
                        Write a review
                    </h4>
                    {userInfo && userInfo.name ? (
                        <form
                            onSubmit={submitReviewHandler}
                            className='flex flex-col w-full sm:w-[80%] px-5 sm:pl-5 gap-7'
                        >
                            <div className='relative flex flex-col justify-center items-start gap-1'>
                                <div className='flex items-center justify-start gap-5'>
                                    <label htmlFor='rate'>Rate</label>
                                    <Rating rating={rating} />
                                </div>
                                <select
                                    className='register-input'
                                    id='rate'
                                    value={rating}
                                    onChange={changeRatingHandler}
                                >
                                    <option value='0'>0 - Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </select>
                            </div>
                            <div className='relative flex flex-col justify-center items-start gap-1'>
                                <label htmlFor='review'>Review</label>
                                <textarea
                                    className='register-input'
                                    id='review'
                                    cols={30}
                                    rows={3}
                                    value={review}
                                    onChange={changeReviewHandler}
                                ></textarea>
                            </div>
                            <Button className='mx-auto w-[50%] lg:w-[40%]'>
                                {addProductReviewLoading ||
                                editProductReviewLoading ? (
                                    <ButtonSpinner className='scale-[0.25] -mt-1 mb-1 ml-2 w-5 h-5 py-3 px-10' />
                                ) : showReviewEditModel ? (
                                    "Update"
                                ) : (
                                    "Review"
                                )}
                            </Button>
                            {(addProductReviewError ||
                                editProductReviewError ||
                                deleteProductReviewError) && (
                                <p className='text-darkRed text-center'>
                                    {addProductReviewError ||
                                        editProductReviewError ||
                                        deleteProductReviewError}
                                </p>
                            )}
                        </form>
                    ) : (
                        <div className='flex flex-col justify-center items-center gap-3 w-full py-24 relative'>
                            <p className='text-darkRed'>
                                Please create an account to write a review
                            </p>
                            <Button
                                type='link'
                                to='/register/signup'
                                className='px-3'
                            >
                                Sign up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;
