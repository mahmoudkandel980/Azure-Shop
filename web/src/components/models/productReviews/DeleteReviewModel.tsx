import React from "react";
import { useParams } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { deleteProductReview as deleteProductReviewFun } from "../../../store/actions/reviewActions";

import Button from "../../ui/Button";

import { RiDeleteBinLine } from "react-icons/ri";
import ButtonSpinner from "../../ui/ButtonSpinner";

import {
    DeleteReviewModelInterface,
    DeleteProductReviewsInterface,
} from "../../../interfaces/store/reviews/reviewInterface";

const DeleteReviewModel = (props: DeleteReviewModelInterface): JSX.Element => {
    const { review } = props;
    const { productId } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { deleteProductReview } = useSelector(
        (state) => state as DeleteProductReviewsInterface
    );
    const { loading } = deleteProductReview;

    const deleteMeHandler = () => {
        // Delete product review
        dispatch(deleteProductReviewFun(productId!, review.id));
    };

    const closeHandler = () => {
        props.closeReviewDeleteModel();
    };

    return (
        <AnimatePresence>
            <motion.div
                className='absolute z-10 dark:bg-smothDark bg-grayWhite dark:border-gray-600/40 border-gray-400/25 border-[2px] px-5 p-8 rounded-lg  left-[50%] -translate-x-[50%]'
                initial={{
                    opacity: 0,
                    top: "0",
                }}
                animate={{
                    opacity: 1,
                    top: "100px",
                }}
                exit={{
                    opacity: 0,
                }}
                transition={{
                    duration: 0.3,
                }}
            >
                <h1 className='pb-3'>Confirm delete your account</h1>
                <p className='opacity-50 text-sm'>
                    Are you sure you want to delete this reviwe. Actuly if you
                    delte this reveiw you can write one any time you want.
                </p>
                <div className='flex justify-center gap-2 items-center w-full mt-5'>
                    <Button
                        className='flex-1'
                        deleteBtn={true}
                        onClick={deleteMeHandler}
                    >
                        {loading ? (
                            <ButtonSpinner className='scale-[0.25] mb-1 w-8 h-5' />
                        ) : (
                            <>
                                <RiDeleteBinLine />
                                <span>Confirm</span>
                            </>
                        )}
                    </Button>
                    <Button className='flex-1' onClick={closeHandler}>
                        Cancel
                    </Button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DeleteReviewModel;
