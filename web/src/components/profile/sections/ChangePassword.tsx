import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { changePassword as changePasswordFun } from "../../../store/actions/userActions";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ButtonSpinner from "../../ui/ButtonSpinner";

import { ChangePasswordInterface } from "../../../interfaces/store/user/userInterface";

const ChangePassword = (): JSX.Element => {
    const [passwordIschanged, setPasswordIsChanged] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        backendError: "",
    });
    const { currentPassword, newPassword, confirmPassword } = formData;

    const dispatch = useDispatch<AppDispatch>();

    const { changePassword } = useSelector(
        (state) => state as ChangePasswordInterface
    );
    const { updatedUser, error, loading } = changePassword;

    useEffect(() => {
        // clear inputs if the passsword is updated
        let timer: any;
        if (
            loading === false &&
            !error &&
            updatedUser &&
            currentPassword !== "" &&
            newPassword !== "" &&
            confirmPassword !== ""
        ) {
            setFormData(() => ({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            }));

            setPasswordIsChanged(true);
            timer = setTimeout(() => {
                setPasswordIsChanged(false);
            }, 5000);
        }

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, error]);

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
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!currentPassword || currentPassword.trim().length === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    currentPassword: "Please fill email Current password",
                }));
                return;
            }
            if (!newPassword || newPassword.trim().length === 0) {
                setFormError((prevState) => ({
                    ...prevState,
                    newPassword: "Please fill email New password field",
                }));
                return;
            }
            if (newPassword !== confirmPassword) {
                setFormError((prevState) => ({
                    ...prevState,
                    confirmPassword: "New password not equal confirm password",
                }));
                return;
            }

            dispatch(
                changePasswordFun(currentPassword, newPassword, confirmPassword)
            );
        } catch (err: any) {
            setFormError((prevState) => ({
                ...prevState,
                backendError: err.message,
            }));
            return;
        }
    };

    return (
        <div className='flex flex-col justify-center px-30'>
            <h2 className='uppercase font-bold break-words tracking-widest text-lg pb-20'>
                Change Password
            </h2>
            <div className='w-full flex justify-center'>
                <form
                    onSubmit={submitFormHandler}
                    className='grid grid-cols-1 gap-8 justify-start items-center w-full lg:w-[80%] xl:w-[50%]'
                >
                    <div className='pb-8'>
                        <Input
                            htmlFor='currentPassword'
                            label='current Password'
                            type='password'
                            id='currentPassword'
                            placeholder='Enter Current Password'
                            value={currentPassword}
                            onChange={onChange}
                            error={formError.currentPassword}
                        />
                    </div>
                    <Input
                        htmlFor='newPassword'
                        label='New Password'
                        type='password'
                        id='newPassword'
                        placeholder='Enter New Password'
                        value={newPassword}
                        onChange={onChange}
                        error={formError.newPassword}
                    />
                    <Input
                        htmlFor='confirmPassword'
                        label='Confirm Password'
                        type='password'
                        id='confirmPassword'
                        placeholder='Enter Confirm Password'
                        value={confirmPassword}
                        onChange={onChange}
                        error={formError.confirmPassword}
                    />
                    <Button className='mx-auto w-fit px-14'>
                        {loading ? (
                            <ButtonSpinner className='scale-[0.25] mb-1.5 w-fit h-5 py-1 px-8' />
                        ) : (
                            "Change Password"
                        )}
                    </Button>

                    <span className='text-darkRed text-sm w-full text-center'>
                        {error}
                    </span>
                    {passwordIschanged && (
                        <span className='text-success text-sm w-full text-center'>
                            Password has been changed
                        </span>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
