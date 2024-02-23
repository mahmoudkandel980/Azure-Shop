import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { getMyReviews } from "../../../store/actions/reviewActions";

import ThemeContext from "../../../context/darkModeTheme";

import Message from "../../ui/Message";
import Spinner from "../../ui/Spinner";
import Rating from "../../ui/Rating";

import Pagination from "../../utils/Pagination";
import convertTimestampFun from "../../../helpers/convertTimestampFun";

import { MyReviewsInterface } from "../../../interfaces/store/reviews/reviewInterface";
import imageUrlConverter from "../../../helpers/imageUrlConverter";

const Reviews = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();

    const { theme } = useContext(ThemeContext);
    const location = useLocation();
    const page = new URLSearchParams(location.search).get("page") || 1;

    const { myReviews } = useSelector((state) => state as MyReviewsInterface);
    const { loading, reviews, error, total_pages } = myReviews;
    useEffect(() => {
        dispatch(getMyReviews(+page));
    }, [dispatch, page]);

    return (
        <div className='flex flex-col justify-center px-30'>
            <h2 className='uppercase font-bold break-words tracking-widest text-lg pb-10'>
                My Reviews
            </h2>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : reviews?.length === 0 ? (
                <Message type='error'>Your Have not any reivews yet</Message>
            ) : (
                reviews &&
                reviews.length > 0 && (
                    <>
                        <section className='container mx-auto grid grid-cols-1 gap-6 gap-y-12 px-2 sm:px-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center'>
                            {reviews.map((review) => (
                                <div
                                    className={`${
                                        theme === "dark"
                                            ? "cart-shadow-up-dark"
                                            : "cart-shadow-up"
                                    } group w-60 sm:w-64 select-none relative hover:scale-[102%] duration-300 border-[1px] pb-1 dark:border-smothDark rounded-lg overflow-hidden`}
                                    key={review.id}
                                >
                                    <div className='relative'>
                                        <img
                                            loading='lazy'
                                            className='h-16 border-4 border-white dark:border-smothDark w-16 object-contain absolute z-10 bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] rounded-full'
                                            src={imageUrlConverter(
                                                "users",
                                                review.creator.imageUrl!
                                            )}
                                            alt={`${review.creator.name}_review`}
                                        />

                                        <Link
                                            to={`/product/${review.product.id}`}
                                        >
                                            <img
                                                loading='lazy'
                                                className={`${
                                                    !review.product.type &&
                                                    "h-44"
                                                } object-top object-cover w-full group-hover:object-bottom duration-1000 ease-in-out `}
                                                src={imageUrlConverter(
                                                    "products",
                                                    review.product.imageUrl
                                                )}
                                                alt={`${review.product.name}_image`}
                                            />
                                        </Link>
                                    </div>
                                    <div className='h-28 mt-10 flex flex-col justify-start items-center gap-1 px-2'>
                                        <div className='flex flex-col justify-start items-center gap-5 w-full'>
                                            <Rating rating={review.rating} />
                                            <span className='text-sm self-start'>
                                                {review.creator.name}
                                            </span>
                                        </div>
                                        <div className='self-start flex flex-col'>
                                            <p className='w-full text-gray-400 dark:text-gray-300 text-xs line-clamp-2'>
                                                {review.review}
                                            </p>
                                            <span className='text-gray-400 dark:text-gray-300 text-[10px]'>
                                                {convertTimestampFun(
                                                    review.createdAt!
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <Pagination total_pages={total_pages} />
                    </>
                )
            )}
        </div>
    );
};

export default Reviews;
