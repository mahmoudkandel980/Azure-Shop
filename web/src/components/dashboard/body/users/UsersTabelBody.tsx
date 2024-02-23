import React from "react";
import { Link, useLocation } from "react-router-dom";

import CreatedAt from "../../../utils/CreatedAt";
import Button from "../../../ui/Button";

import { MdOutlineModeEditOutline, MdCheck } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsShieldCheck, BsShieldX } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import { UsersBodyInterface } from "../../../../interfaces/components/dashboard";
import { UserInfo } from "../../../../interfaces/store/user/userInterface";
import imageUrlConverter from "../../../../helpers/imageUrlConverter";

const UsersTabelBody = (props: UsersBodyInterface): JSX.Element => {
    const {
        users,
        userInfo,
        markUserWantToDelete,
        markUserWantToEdit,
        page,
        ITEMS_PER_PAGE,
    } = props;
    const { pathname } = useLocation();

    const toggleDeleteUserModelHandler = (user: UserInfo) => {
        props.deleteUser(user);
    };

    const toggleEditUserModelHandler = (user: UserInfo) => {
        props.editUser(user);
    };

    return (
        <tbody className='font-light text-sm'>
            {users &&
                users.length > 0 &&
                users.map((user, i) => (
                    <tr
                        key={i}
                        className={`${
                            markUserWantToDelete.user?.id === user.id &&
                            markUserWantToDelete.showDeleteUserModel
                                ? "bg-darkRed/20"
                                : markUserWantToEdit.user?.id === user.id &&
                                  markUserWantToEdit.showEditUserModel
                                ? "bg-lightBlue/20"
                                : userInfo.id === user.id &&
                                  "bg-whiteElphent dark:bg-dark/30"
                        } border-b-[1px] dark:border-darkGray hover:bg-whiteMilk dark:hover:bg-dark/50`}
                    >
                        <td className='capitalize py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] dark:border-darkGray'>
                            {i + 1 + ITEMS_PER_PAGE * (+page - 1)}
                        </td>
                        <td className='capitalize hidden lg:table-cell pl-1 sm:pl-3'>
                            {user.id!.length > 15
                                ? user.id!.slice(0, 15) + "..."
                                : user.id}
                        </td>
                        <td className='capitalize hidden lg:table-cell'>
                            <CreatedAt createdAt={user.createdAt!} />
                        </td>
                        <td className='hidden lg:table-cell'>
                            <img
                                loading='lazy'
                                className='rounded-sm object-cover w-6 sm:w-8 h-6 sm:h-8'
                                src={imageUrlConverter("users", user.imageUrl!)}
                                alt={`${user.name}_image`}
                            />
                        </td>
                        <td className='hidden md:table-cell'>
                            <Link to={`/user/${user.id}`}>
                                <span className='underline'>
                                    {user.name!.length > 14
                                        ? user.name!.slice(0, 14) + "..."
                                        : user.name}
                                </span>
                            </Link>
                        </td>
                        <td className='pl-1 sm:pl-0 relative cursor-default text-[10px] sm:text-sm'>
                            <span className=' hidden sm:block'>
                                {user.email!.length > 20
                                    ? user.email!.slice(0, 20) + "..."
                                    : user.email}
                            </span>
                            <span className='block sm:hidden'>
                                {user.email!.length > 8
                                    ? user.email!.slice(0, 8) + "..."
                                    : user.email}
                            </span>
                        </td>
                        <td className='capitalize text-[10px] sm:text-sm'>
                            {user.role === "subAdmin" ? "sub admin" : user.role}
                        </td>
                        <td
                            className={`${
                                user.activeStatus
                                    ? "text-success"
                                    : "text-darkRed"
                            } capitalize`}
                        >
                            {user.activeStatus ? (
                                <BsShieldCheck className='w-3 sm:w-4 h-3 sm:h-4' />
                            ) : (
                                <BsShieldX className='w-3 sm:w-4 h-3 sm:h-4' />
                            )}
                        </td>
                        {!pathname.includes("notification") && (
                            <td className='capitalize text-[10px] sm:text-sm'>
                                {user.products!.length}
                            </td>
                        )}
                        <td>
                            <Button
                                onClick={toggleEditUserModelHandler.bind(
                                    null,
                                    user
                                )}
                                editBtn
                                className={`${
                                    userInfo.role !== "admin" &&
                                    user.role === "admin" &&
                                    "hidden"
                                } ${
                                    user.role === "subAdmin" &&
                                    userInfo.role === "subAdmin" &&
                                    user.email !== userInfo.email &&
                                    "hidden"
                                } ${
                                    user.role === "moderator" &&
                                    userInfo.role === "moderator" &&
                                    user.email !== userInfo.email &&
                                    "hidden"
                                } ${
                                    user.role === "subAdmin" &&
                                    userInfo.role === "moderator" &&
                                    "hidden"
                                } w-6 sm:w-8 h-6 sm:h-8 `}
                            >
                                {!pathname.includes("notification") ? (
                                    <MdOutlineModeEditOutline />
                                ) : (
                                    <MdCheck />
                                )}
                            </Button>
                        </td>
                        <td>
                            <Button
                                onClick={toggleDeleteUserModelHandler.bind(
                                    null,
                                    user
                                )}
                                deleteBtn
                                className={`${
                                    // user.role === "moderator" &&
                                    userInfo.role === "moderator" &&
                                    user.email !== userInfo.email &&
                                    "hidden"
                                } ${user.role === "admin" && "hidden"} ${
                                    user.role === "subAdmin" &&
                                    userInfo.role === "subAdmin" &&
                                    user.email !== userInfo.email &&
                                    "hidden"
                                } w-6 sm:w-8 h-6 sm:h-8`}
                            >
                                {!pathname.includes("notification") ? (
                                    <RiDeleteBinLine />
                                ) : (
                                    <RxCross2 />
                                )}
                            </Button>
                        </td>
                    </tr>
                ))}
        </tbody>
    );
};

export default UsersTabelBody;
