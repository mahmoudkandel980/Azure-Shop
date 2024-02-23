import React, { useEffect, memo } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getTopRatedBestSaleProducts } from "../../store/actions/productActions";

// swiperJs
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Rating from "../ui/Rating";
import ConvertedPrice from "../ui/ConvertedPrice";
import Spinner from "../ui/Spinner";
import Message from "../ui/Message";

import { LoginInterface } from "../../interfaces/store/user/authInterface";
import { TopRatedBestSaleProductsInterface } from "../../interfaces/store/product/productInterface";
import imageUrlConverter from "../../helpers/imageUrlConverter";

SwiperCore.use([Navigation, Autoplay]);

const HomeSwiper = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const { topRatedBestSaleProducts } = useSelector(
        (state) => state as TopRatedBestSaleProductsInterface
    );
    const { loading, error, topRatedProducts, bestSaleProducts } =
        topRatedBestSaleProducts;

    useEffect(() => {
        dispatch(getTopRatedBestSaleProducts());
    }, [dispatch]);
    return (
        <div className='mb-10 select-none'>
            <div className='w-full lg:w-[80%] h-80 sm:h-[500px] relative mx-auto shadow-whiteMilk dark:shadow-dark shadow-md overflow-hidden'>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <Message type='error'>{error}</Message>
                ) : (
                    <Swiper
                        spaceBetween={5}
                        slidesPerView={1}
                        navigation
                        slidesPerGroup={1}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        speed={4500}
                        grabCursor={true}
                        mousewheel={true}
                        loop={true}
                        parallax={true}
                    >
                        {topRatedProducts &&
                            bestSaleProducts &&
                            [...topRatedProducts, ...bestSaleProducts].map(
                                (product, i) => (
                                    <SwiperSlide key={i}>
                                        <div className='relative group flex justify-center w-full h-80 sm:h-[500px] text-white'>
                                            <Link
                                                to={`/product/${product.id}`}
                                                className='block absolute top-0 left-0 w-full h-full z-10'
                                            />
                                            <div className='absolute top-0 left-0 h-full w-full block'>
                                                <div className='relative flex justify-center h-full text-white'>
                                                    <img
                                                        loading='lazy'
                                                        className='object-top object-cover w-full group-hover:object-bottom ease-in-out duration-[3s] md:blur-sm'
                                                        src={imageUrlConverter(
                                                            "products",
                                                            product.imageUrl
                                                        )}
                                                        alt={`${product.name}_image`}
                                                    />
                                                    {/*overlay*/}
                                                    <div className='absolute top-0 left-0 h-full w-full bg-gradient-to-t from-darkGray/50 to-darkGray/80 duration-1000'></div>
                                                    <div className='md:w-64 md:absolute md:top-[50%] md:-translate-y-[50%] md:right-5 lg:right-14'>
                                                        <img
                                                            loading='lazy'
                                                            className='hidden md:flex object-center object-fill rounded-md'
                                                            src={imageUrlConverter(
                                                                "products",
                                                                product.imageUrl
                                                            )}
                                                            alt={`${product.name}_image`}
                                                        />
                                                        <div className='absolute right-3 sm:right-5 md:right-2 top-3 sm:top-5 md:top-2 w-10 h-10 z-10'>
                                                            <span
                                                                className={`${
                                                                    product.type ===
                                                                    "topRated"
                                                                        ? "bg-yellow-400"
                                                                        : "bg-darkRed"
                                                                } absolute w-10 h-10 block rotate-[20deg] rounded-lg`}
                                                            ></span>
                                                            <span
                                                                className={`${
                                                                    product.type ===
                                                                    "topRated"
                                                                        ? "bg-yellow-400"
                                                                        : "bg-darkRed"
                                                                } absolute w-10 h-10 block rotate-[155deg] rounded-lg`}
                                                            ></span>
                                                            <span className='absolute flex justify-center items-center w-10 h-10 text-center text-xs'>
                                                                {product.type ===
                                                                "topRated"
                                                                    ? "Top Rated"
                                                                    : "Best Sale"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='absolute pl-1 sm:pl-3 flex flex-col justify-start w-full container mx-auto pt-2 sm:pt-5 h-full'>
                                                        <h1 className='text-base sm:text-2xl font-bold w-fit uppercase mb-5 border-b-[1px]'>
                                                            {product?.name
                                                                .length > 20
                                                                ? product.name.slice(
                                                                      0,
                                                                      20
                                                                  ) + "..."
                                                                : product.name}
                                                        </h1>
                                                        <div className='pl-1 sm:pl-5 pr-3 sm:pr-5 flex flex-col gap-1 text-xs sm:text-lg h-full'>
                                                            <div className='flex justify-start items-center gap-2'>
                                                                <span className='capitalize'>
                                                                    rating :
                                                                </span>
                                                                <Rating
                                                                    rating={
                                                                        product.rating
                                                                    }
                                                                />
                                                            </div>
                                                            <div className='flex justify-start items-center gap-2'>
                                                                <span className='capitalize'>
                                                                    reviews
                                                                    number :
                                                                </span>
                                                                <p
                                                                    className={`${
                                                                        product.numReviews ===
                                                                            0 &&
                                                                        "text-darkRed"
                                                                    } opacity-80 pt-1`}
                                                                >
                                                                    <span
                                                                        className={`${
                                                                            product.numReviews ===
                                                                                0 &&
                                                                            "hidden"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            product.numReviews
                                                                        }
                                                                    </span>{" "}
                                                                    {product.numReviews ===
                                                                    0
                                                                        ? "No Reviews Yet"
                                                                        : product.numReviews ===
                                                                          1
                                                                        ? "Review"
                                                                        : "Reviews"}
                                                                </p>
                                                            </div>
                                                            <div className='flex justify-start items-center gap-2'>
                                                                <span className='capitalize'>
                                                                    count in
                                                                    stock :
                                                                </span>
                                                                <span className=''>
                                                                    {
                                                                        product.countInStock
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className='flex justify-start items-start gap-2'>
                                                                <span className='capitalize'>
                                                                    price :
                                                                </span>
                                                                <div className='flex flex-col items-start justify-start gap-0.5'>
                                                                    <ConvertedPrice
                                                                        className='font-semibold'
                                                                        price={
                                                                            product.price -
                                                                            product.priceDiscount
                                                                        }
                                                                    />
                                                                    {product.priceDiscount >
                                                                    0 ? (
                                                                        <div className='flex justify-start items-center gap-3'>
                                                                            <ConvertedPrice
                                                                                className='line-through font-extralight opacity-50'
                                                                                price={
                                                                                    product.price
                                                                                }
                                                                            />
                                                                            <span className='capitalize  bg-success text-white px-3 rounded-md'>
                                                                                save{" "}
                                                                                {(
                                                                                    (product.priceDiscount /
                                                                                        product.price) *
                                                                                    100
                                                                                ).toFixed(
                                                                                    0
                                                                                )}{" "}
                                                                                %
                                                                            </span>
                                                                        </div>
                                                                    ) : (
                                                                        <div className='flex justify-start items-center gap-3 opacity-0'>
                                                                            no
                                                                            discount
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className='flex justify-start items-center gap-2'>
                                                                <span className='capitalize'>
                                                                    category :
                                                                </span>
                                                                <p className='text-white/80'>
                                                                    {
                                                                        product.category
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className='gap-2 w-full sm:w-[60%]'>
                                                                <p className='line-clamp-3'>
                                                                    Description
                                                                    :
                                                                    <span className='px-0.5'></span>
                                                                    <span className='text-white/80 text-xs sm:text-sm'>
                                                                        {
                                                                            product.description
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className='flex flex-col justify-center items-end gap-1 py-2 w-full mt-auto pb-2 sm:pb-5 z-10'>
                                                                <div className=''>
                                                                    <span className='capitalize flex justify-start'>
                                                                        created
                                                                        by
                                                                    </span>
                                                                    <Link
                                                                        to={
                                                                            userInfo &&
                                                                            userInfo.id &&
                                                                            userInfo.id ===
                                                                                product
                                                                                    .creator
                                                                                    .id
                                                                                ? "/profile/products"
                                                                                : `/user/${product.creator.id}`
                                                                        }
                                                                        className='flex pl-2 justify-start items-center gap-2'
                                                                    >
                                                                        <img
                                                                            loading='lazy'
                                                                            className='w-10 sm:w-14 h-10 sm:h-14 rounded-full object-cover'
                                                                            src={imageUrlConverter(
                                                                                "users",
                                                                                product
                                                                                    .creator
                                                                                    .imageUrl!
                                                                            )}
                                                                            alt={`${product.creator.name}_image`}
                                                                        />
                                                                        <div className='flex flex-col opacity-80 items-start justify-start text-xs'>
                                                                            <span>
                                                                                {
                                                                                    product
                                                                                        .creator
                                                                                        .name
                                                                                }
                                                                            </span>
                                                                            <span>
                                                                                {
                                                                                    product
                                                                                        .creator
                                                                                        .email
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            )}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default memo(HomeSwiper);
