import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { dashboard_editUser } from "../../../../store/actions/dashboardActions";

import EditUserForm from "./EditUserForm";
import Button from "../../../ui/Button";

import { EditUserModelInterface } from "../../../../interfaces/components/dashboard";

const EditUserModel = (props: EditUserModelInterface): JSX.Element => {
    const { header, showEditUserModel, user, loading, userInfo } = props;
    const dispatch = useDispatch<AppDispatch>();
    const [localImage, setLocalImage] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        imageUrl: "",
        role: "",
        activeStatus: false,
    });
    const [formError, setFormError] = useState({
        name: "",
        email: "",
        imageUrl: "",
        role: "",
        activeStatus: "",
        backendError: "",
    });
    const { name, email, imageUrl, role, activeStatus } = formData;

    useEffect(() => {
        if (user.email) {
            setFormData({
                name: user?.name!,
                email: user?.email!,
                imageUrl: user?.imageUrl!,
                role: user?.role!,
                activeStatus: user?.activeStatus!,
            });
        }
    }, [user]);

    // delete image when close model if from this component or from the backdrop
    useEffect(() => {
        if (!showEditUserModel) {
            setLocalImage(null);
        }
    }, [showEditUserModel]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (
            e.target.id === "user" ||
            e.target.id === "seller" ||
            e.target.id === "moderator" ||
            e.target.id === "subAdmin" ||
            e.target.id === "admin"
        ) {
            setFormData((prevState) => ({
                ...prevState,
                role: e.target.id,
            }));

            setFormError((prevState) => ({
                ...prevState,
                role: "",
                backendError: "",
            }));
        } else {
            if (e.target.id === "active" || e.target.id === "inActive") {
                setFormData((prevState) => ({
                    ...prevState,
                    activeStatus: e.target.id === "active" ? true : false,
                }));

                setFormError((prevState) => ({
                    ...prevState,
                    activeStatus: "",
                    backendError: "",
                }));
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [e.target.id]: e.target.value,
                }));

                setFormError((prevState) => ({
                    ...prevState,
                    [e.target.id]: "",
                    backendError: "",
                }));
            }
        }

        const target = e.target as HTMLInputElement;
        if (target.files as FileList) {
            const file: File = (target.files as FileList)[0];
            setLocalImage(file);
        }
    };

    const closeHandler = () => {
        props.onClose(false);
    };

    const editHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!name || name.trim().length === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    name: "please fill name field",
                }));
                return;
            }
            if (!email || email.trim().length === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    email: "please fill email field",
                }));
                return;
            }
            const SubmitedFormDate = new FormData();

            SubmitedFormDate.append("name", name);
            SubmitedFormDate.append("email", email);
            SubmitedFormDate.append("role", role);
            SubmitedFormDate.append("activeStatus", `${activeStatus}`);
            localImage?.name && SubmitedFormDate.append("imageUrl", localImage);

            dispatch(dashboard_editUser(user.id!, SubmitedFormDate));
        } catch (error: any) {
            setFormError((prevState) => ({
                ...prevState,
                backendError: error.message,
            }));
            return;
        }
    };

    return (
        <AnimatePresence>
            {showEditUserModel && (
                <motion.div
                    className='fixed z-10 flex flex-col overflow-hidden dark:border-gray-600/40 border-gray-400/25 dark:bg-smothDark bg-grayWhite p-5 px-2 sm:p-5 lg:p-10 sm:px-5 lg:px-5 top-[10%] sm:top-[12.5%] w-[97%] sm:w-[90%] lg:w-[80%] h-[80%] sm:h-[75%] left-[1.5%] sm:left-[5%] lg:left-[10%] border-[2px] rounded-lg'
                    initial={{
                        scale: 0,
                        opacity: 0,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 100,
                    }}
                    exit={{
                        scale: 0,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                >
                    <h3 className='capitalize font-bold break-words tracking-widest text-lg pb-5 sm:pb-6'>
                        {header}
                    </h3>
                    <div className='h-full overflow-y-scroll sm:overflow-y-auto'>
                        <form onSubmit={editHandler}>
                            <EditUserForm
                                userInfo={userInfo}
                                user={user}
                                role={role}
                                imageUrl={imageUrl}
                                localImage={localImage}
                                name={name}
                                email={email}
                                activeStatus={activeStatus}
                                formError={formError}
                                loading={loading}
                                onChange={onChange}
                            />
                        </form>
                        <div className='mt-5 pr-5'>
                            <Button
                                className='ml-auto w-fit px-8'
                                onClick={closeHandler}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditUserModel;
