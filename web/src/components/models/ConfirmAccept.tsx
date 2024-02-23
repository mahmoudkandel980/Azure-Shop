import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import { FaCheck } from "react-icons/fa";

import Button from "../ui/Button";
import ButtonSpinner from "../ui/ButtonSpinner";

import { ConfirmAcceptInterface } from "../../interfaces/components/models";

const ConfirmAccept = (props: ConfirmAcceptInterface): JSX.Element => {
    const { header, text, element, showAcceptModel, loading } = props;

    const acceptHandler = () => {
        props.confirmAcceptHandler(true);
    };

    const closeHandler = () => {
        props.confirmAcceptHandler(false);
    };

    return (
        <AnimatePresence>
            {showAcceptModel && (
                <motion.div
                    className='fixed z-10 dark:border-gray-600/40 border-gray-400/25 dark:bg-smothDark bg-grayWhite w-72 sm:w-96 p-4 sm:p-8 px-2 sm:px-5 top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] border-[2px] rounded-lg'
                    initial={{
                        opacity: 0,
                        top: "0",
                    }}
                    animate={{
                        opacity: 1,
                        top: "300px",
                    }}
                    exit={{
                        opacity: 0,
                        top: "0",
                    }}
                    transition={{
                        duration: 0.4,
                    }}
                >
                    <h1 className='pb-3'>
                        {header}{" "}
                        <span className='font-semibold text-success'>
                            {element.length > 15
                                ? element.slice(0, 15) + "..."
                                : element}
                        </span>
                    </h1>
                    <div className='px-1 sm:px-2 pt-5'>
                        <p className='opacity-50 text-sm'>{text}</p>
                        <span className='flex justify-center gap-2 items-center w-full mt-5'>
                            <Button
                                className='flex-1'
                                createBtn={true}
                                onClick={acceptHandler}
                            >
                                {loading ? (
                                    <ButtonSpinner className='scale-[0.25] mb-1 w-8 h-5' />
                                ) : (
                                    <>
                                        <FaCheck />
                                        <span>Confirm</span>
                                    </>
                                )}
                            </Button>
                            <Button className='flex-1' onClick={closeHandler}>
                                Cancel
                            </Button>
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmAccept;
