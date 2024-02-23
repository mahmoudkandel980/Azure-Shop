import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
    updateMe as updateMeFun,
    deleteMe as deleteMeFun,
} from "../../../store/actions/userActions";

import { BsCamera } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ButtonSpinner from "../../ui/ButtonSpinner";

import Backdrop from "../../models/Backdrop";
import ConfirmDelete from "../../models/ConfirmDelete";

import { SettingsInterface } from "../../../interfaces/components/profile";
import {
    UpdateMeInterface,
    DeleteMeInterface,
} from "../../../interfaces/store/user/userInterface";
import imageUrlConverter from "../../../helpers/imageUrlConverter";

const Settings = (props: SettingsInterface): JSX.Element => {
    const { userInfo } = props;
    const dispatch = useDispatch<AppDispatch>();
    const [showDeleteMeModel, setShowDeleteMeModel] = useState(false);
    const [updateActiveStatus, setUpdateActiveStatus] = useState(false);
    const [options] = useState(["no", "yes"]);
    const [selectType, setSelectType] = useState(options[0]);
    const [localImage, setLocalImage] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        name: userInfo.name,
        email: userInfo.email,
        imageUrl: userInfo.imageUrl,
    });
    const { name, email, imageUrl } = formData;

    const [formError, setFormError] = useState({
        name: "",
        email: "",
        password: "",
        backendError: "",
    });

    const { updateMe } = useSelector((state) => state as UpdateMeInterface);
    const { loading, error } = updateMe;

    const { deleteMe } = useSelector((state) => state as DeleteMeInterface);
    const { deletedUser, loading: loadingDeleteMe } = deleteMe;

    // to ensure select "no" if request to be a seller is rejected immediately
    useEffect(() => {
        if (selectType === "yes") {
            setSelectType(options[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo.nominateAsSeller?.wantToBeSeller]);

    // render when userInfo changed
    useEffect(() => {
        setFormData({
            name: userInfo.name,
            email: userInfo.email,
            imageUrl: userInfo.imageUrl,
        });
    }, [userInfo]);

    useEffect(() => {
        if (deletedUser) {
            setShowDeleteMeModel(false);
        }
    }, [deletedUser]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));

        setFormError((prevState) => ({
            ...prevState,
            [e.target.id]: "",
            backendError: "",
        }));

        const target = e.target as HTMLInputElement;
        if (target && (target.files as FileList)) {
            const file: File = (target.files as FileList)[0];
            setLocalImage(file);
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectType(e.target.value);
    };

    const toggleDeleteMeModelHandler = () => {
        setShowDeleteMeModel((prevState) => !prevState);
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUpdateActiveStatus(false);

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
            if (userInfo.email !== email) {
                SubmitedFormDate.append("email", email);
            }
            localImage &&
                localImage?.name &&
                SubmitedFormDate.append("imageUrl", localImage);

            if (selectType === "yes") {
                SubmitedFormDate.append("wantToBeSeller", "true");
            }

            dispatch(updateMeFun(SubmitedFormDate));
        } catch (err: any) {
            setFormError((prevState) => ({
                ...prevState,
                backendError: err.message,
            }));
            return;
        }
    };

    const confirmDeleteHandler = (confirmDelete: boolean) => {
        if (confirmDelete) {
            // if true delete user
            dispatch(deleteMeFun());
        } else {
            // if false close the model only
            setShowDeleteMeModel(false);
        }
    };

    const updateActiveStatusHandler = () => {
        setUpdateActiveStatus(true);
        const SubmitedFormDate = new FormData();
        SubmitedFormDate.append("activeStatus", "true");
        dispatch(updateMeFun(SubmitedFormDate));
    };

    return (
        <div className='flex flex-col justify-center px-30'>
            <h2 className='uppercase font-bold break-words tracking-widest text-lg pb-20'>
                Account Settings
            </h2>
            <form
                onSubmit={submitFormHandler}
                className='flex flex-col md:grid md:grid-cols-2 gap-8 justify-start items-center w-full'
            >
                <div className='relative w-28 h-28'>
                    <img
                        loading='lazy'
                        className='h-full w-full rounded-full object-cover'
                        src={
                            localImage
                                ? window.URL.createObjectURL(localImage)
                                : imageUrlConverter("users", imageUrl!)
                        }
                        alt={name}
                    />
                    <span className='absolute -bottom-1 -right-1.5 bg-grayWhite dark:bg-smothDark w-12 h-12 rounded-full'>
                        <label
                            htmlFor='uploadProfileImage'
                            className='cursor-pointer'
                        >
                            <BsCamera className='absolute top-1.5 left-2 w-7 h-7' />
                        </label>
                        <input
                            className='hidden'
                            type='file'
                            id='uploadProfileImage'
                            accept='.jpg,.png,.jpeg'
                            multiple={false}
                            max='1'
                            onChange={onChange}
                        />
                    </span>
                </div>
                <span></span>
                <Input
                    htmlFor='name'
                    label='Name'
                    type='text'
                    id='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={onChange}
                    error={formError.name}
                />
                <Input
                    htmlFor='email'
                    label='E-Mail'
                    type='email'
                    id='email'
                    placeholder='Enter E-Mail'
                    value={email}
                    onChange={onChange}
                    error={formError.email}
                />
                <Input
                    htmlFor='role'
                    label='Role'
                    type='text'
                    id='role'
                    value={userInfo.role}
                    readOnly={true}
                />
                {userInfo.role === "user" &&
                !userInfo.nominateAsSeller?.wantToBeSeller ? (
                    <div className='relative flex flex-col justify-center items-start gap-1 w-full'>
                        <label htmlFor='Types'>
                            Do you want to ba a seller
                        </label>
                        <select
                            className='register-input'
                            name='Types'
                            id='Types'
                            onChange={onChangeHandler}
                        >
                            {options.map((option) => (
                                <option key={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    userInfo.role === "user" && (
                        <Input
                            htmlFor='wantToBeSeller'
                            label='Want to ba a seller'
                            type='text'
                            id='wantToBeSeller'
                            value={"Pending"}
                            readOnly={true}
                        />
                    )
                )}

                <Button
                    className='mx-auto w-fit px-14'
                    style={{ gridColumn: "-3/-1" }}
                >
                    {loading && !updateActiveStatus ? (
                        <ButtonSpinner className='scale-[0.25] mb-1.5 w-8 h-5 py-1 px-6' />
                    ) : (
                        "Update"
                    )}
                </Button>
                <span
                    className='text-darkRed text-sm w-full text-center'
                    style={{ gridColumn: "-3/-1" }}
                >
                    {error}
                </span>
            </form>

            <div className='flex justify-end items-center w-full mt-10'>
                {userInfo.activeStatus ? (
                    <Button
                        onClick={toggleDeleteMeModelHandler}
                        deleteBtn={true}
                        className='w-fit px-8'
                    >
                        <>
                            <RiDeleteBinLine />
                            Delete Me
                        </>
                    </Button>
                ) : (
                    <Button
                        onClick={updateActiveStatusHandler}
                        createBtn
                        className='w-fit px-8'
                    >
                        {loading ? (
                            <ButtonSpinner className='scale-[0.25] mb-1.5 w-8 h-5 py-1 px-10' />
                        ) : (
                            <>
                                <FaCheck /> Activate Me
                            </>
                        )}
                    </Button>
                )}
            </div>

            <ConfirmDelete
                loading={loadingDeleteMe}
                showDeleteModel={showDeleteMeModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header='Confirm delete user'
                element={"My account"}
                text={`Make sure we will make your account inactive. we will
                        not delete it at all. if you want back to Azure family
                        you will welcomed again. we will keep a copy of your
                        data.`}
            />

            {showDeleteMeModel && (
                <Backdrop onClose={toggleDeleteMeModelHandler} />
            )}
        </div>
    );
};

export default Settings;
