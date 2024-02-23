import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useSelector } from "react-redux";

import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import { LoginInterface } from "../../../interfaces/store/user/authInterface";
import { ReviewSettingsInterface } from "../../../interfaces/store/reviews/reviewInterface";

const ReviewSettings = (props: ReviewSettingsInterface): JSX.Element => {
    const { review } = props;

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo } = userLogin;

    const editReviewHandler = () => {
        props.showEditReviewModelHandler(review);
    };
    const deleteReviewHandler = () => {
        props.showDeleteReviewModelHandler();
    };

    return (
        <AnimatePresence>
            <motion.div
                className='absolute top-10 z-20 right-0 flex flex-col justify-center items-start gap-2 w-28 select-none p-2 px-0  dark:bg-lightDark text-sm bg-white rounded-md border-lightDark/20 border-[1px]'
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                transition={{
                    duration: 0.3,
                }}
            >
                <span
                    className='dark:bg-lightDark bg-lightDark/20 absolute -top-3 right-2 w-3 h-3'
                    style={{
                        clipPath: "polygon(51% 49%, 0% 100%, 100% 100%)",
                    }}
                ></span>
                {review.creator._id === userInfo.id && (
                    <span
                        onClick={editReviewHandler}
                        className='profile-model text-lightBlue cursor-pointer'
                    >
                        <MdOutlineModeEditOutline />
                        <span>Edit</span>
                    </span>
                )}
                {review.creator._id === userInfo.id && (
                    <span
                        onClick={deleteReviewHandler}
                        className='profile-model text-darkRed cursor-pointer'
                    >
                        <RiDeleteBinLine />
                        <span>Delete</span>
                    </span>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default ReviewSettings;
