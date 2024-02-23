import React from "react";

import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import ButtonSpinner from "../../../ui/ButtonSpinner";

import { BsCamera } from "react-icons/bs";

import { EditUserFormInterface } from "../../../../interfaces/components/dashboard";
import imageUrlConverter from "../../../../helpers/imageUrlConverter";

const EditUserForm = (props: EditUserFormInterface): JSX.Element => {
    const {
        userInfo,
        user,
        role,
        onChange,
        imageUrl,
        localImage,
        name,
        email,
        formError,
        loading,
        activeStatus,
    } = props;

    return (
        <div className='flex flex-col sm:grid text-sm sm:text-base sm:grid-cols-2 gap-x-10 gap-y-5 sm:gap-y-16 px-1 sm:px-5'>
            <div className='relative w-28 h-28'>
                {(imageUrl || localImage) && (
                    <img
                        loading='lazy'
                        className='h-full w-full rounded-full object-contain'
                        src={
                            localImage
                                ? window.URL.createObjectURL(localImage)
                                : imageUrlConverter("users", imageUrl)
                        }
                        alt={name}
                    />
                )}
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
            <div></div>
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
            <div className=''>
                <span>Role</span>
                <div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-5  text-xs sm:text-sm pl-5 md:pl-10'>
                    <Input
                        htmlFor='user'
                        id='user'
                        label='User'
                        type='radio'
                        name='role'
                        value={role}
                        onChange={onChange}
                        checked={role === "user"}
                    />
                    <Input
                        htmlFor='seller'
                        id='seller'
                        label='Seller'
                        type='radio'
                        name='role'
                        value={role}
                        onChange={onChange}
                        checked={role === "seller"}
                    />
                    {(userInfo.role === "admin" ||
                        userInfo.role === "subAdmin" ||
                        (userInfo.role === "moderator" &&
                            user.id === userInfo.id)) && (
                        <Input
                            htmlFor='moderator'
                            id='moderator'
                            label='Moderator'
                            type='radio'
                            name='role'
                            value={role}
                            onChange={onChange}
                            checked={role === "moderator"}
                        />
                    )}
                    {(userInfo.role === "admin" ||
                        (userInfo.role === "subAdmin" &&
                            user.id === userInfo.id)) && (
                        <Input
                            htmlFor='subAdmin'
                            id='subAdmin'
                            label='Sub admin'
                            type='radio'
                            name='role'
                            value={role}
                            onChange={onChange}
                            checked={role === "subAdmin"}
                        />
                    )}
                    {userInfo.role === "admin" && user.role === "admin" && (
                        <Input
                            htmlFor='admin'
                            id='admin'
                            label='Admin'
                            type='radio'
                            name='role'
                            value={role}
                            onChange={onChange}
                            checked={role === "admin"}
                        />
                    )}
                </div>
            </div>
            <div className=''>
                <span>Active</span>
                <div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-5  text-xs sm:text-sm pl-5 md:pl-10'>
                    <Input
                        htmlFor='active'
                        id='active'
                        label='Active'
                        type='radio'
                        name='role'
                        value='active'
                        onChange={onChange}
                        checked={activeStatus}
                    />
                    {((userInfo.role === "admin" && user.id !== userInfo.id) ||
                        userInfo.role === "subAdmin" ||
                        userInfo.role === "moderator") && (
                        <Input
                            htmlFor='inActive'
                            id='inActive'
                            label='Inactive'
                            type='radio'
                            name='active'
                            value='Inactive'
                            onChange={onChange}
                            checked={!activeStatus}
                        />
                    )}
                </div>
            </div>
            <Button
                className='mx-auto w-[80%] sm:w-[50%] lg:w-[20%] mt-5'
                style={{ gridColumn: "-3/-1" }}
            >
                {loading ? (
                    <ButtonSpinner className='scale-[0.25] mb-1 w-8 h-5' />
                ) : (
                    <span>Update</span>
                )}
            </Button>
        </div>
    );
};

export default EditUserForm;
