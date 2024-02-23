import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { deleteMe as deleteMeFun } from "../../../../store/actions/userActions";
import {
    dashboard_allUsers as dashboard_allUsersFun,
    dashboard_deleteUser as dashboard_deleteUserFun,
} from "../../../../store/actions/dashboardActions";

import Spinner from "../../../ui/Spinner";
import Message from "../../../ui/Message";
import ConfirmDelete from "../../../models/ConfirmDelete";
import EditUserModel from "./EditUserModel";
import Backdrop from "../../../models/Backdrop";

import UsersTabelHeader from "./UsersTabelHeader";
import UsersTabelBody from "./UsersTabelBody";
import FilterBox from "../FilterBox";
import Pagination from "../../../utils/Pagination";

import {
    AllUsersInterface,
    DeleteUserInterface,
    EditUserInterface,
    DeleteMeInterface,
    UserInfo,
} from "../../../../interfaces/store/user/userInterface";
import { LoginInterface } from "../../../../interfaces/store/user/authInterface";
import { FilterDataInterface } from "../../../../interfaces/components/dashboard";
import {
    DeleteUserStateInterface,
    EditUserStateInterface,
} from "../../../../interfaces/components/dashboard";

const Users = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const [showModule, setShowModule] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterDataExist, setFilterDataExist] = useState<boolean>(false);
    const [deleteUser, setDeleteUser] = useState<DeleteUserStateInterface>({
        user: null,
        showDeleteUserModel: false,
    });
    const [editUser, setEditUser] = useState<EditUserStateInterface>({
        user: null,
        showEditUserModel: false,
    });
    const location = useLocation();
    const page = new URLSearchParams(location.search).get("page") || 1;

    const { dashboard_allUsers } = useSelector(
        (state) => state as AllUsersInterface
    );
    const { loading, users, error, total_pages, ITEMS_PER_PAGE } =
        dashboard_allUsers;

    const { dashboard_deleteUser } = useSelector(
        (state) => state as DeleteUserInterface
    );
    const { loading: loadingDeleteUser } = dashboard_deleteUser;

    const { dashboard_editUser } = useSelector(
        (state) => state as EditUserInterface
    );
    const { loading: loadingEditUser } = dashboard_editUser;

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo, loading: loadingUserData } = userLogin;

    const { deleteMe } = useSelector((state) => state as DeleteMeInterface);
    const { deletedUser, loading: loadingDeleteMe } = deleteMe;

    useEffect(() => {
        if (!filterDataExist) {
            dispatch(dashboard_allUsersFun(null, +page));
        }
    }, [dispatch, page, filterDataExist]);

    // hide delete user model when loading is false mean that the process is finished
    useEffect(() => {
        if (loadingDeleteUser === false) {
            setDeleteUser({
                user: { id: "", name: "", role: "" },
                showDeleteUserModel: false,
            });
        }
        if (loadingEditUser === false || deletedUser) {
            setEditUser({
                user: {
                    id: "",
                    name: "",
                    role: "",
                    email: "",
                    imageUrl: "",
                    activeStatus: false,
                },
                showEditUserModel: false,
            });
        }
    }, [loadingDeleteUser, loadingEditUser, deletedUser]);

    const deleteUserHandler = (user: UserInfo) => {
        setDeleteUser({ user: user, showDeleteUserModel: true });
    };

    const editUserHandler = (user: UserInfo) => {
        setEditUser({ user: user, showEditUserModel: true });
    };

    const hideUserModelHandler = () => {
        setDeleteUser({
            user: { id: "", name: "", role: "" },
            showDeleteUserModel: false,
        });
        setEditUser({
            user: {
                id: "",
                name: "",
                role: "",
                email: "",
                imageUrl: "",
                activeStatus: false,
            },
            showEditUserModel: false,
        });
    };

    const confirmDeleteHandler = (confirmDelete: boolean) => {
        if (confirmDelete) {
            // if true delete user
            if (userInfo.id === deleteUser.user?.id) {
                dispatch(deleteMeFun());
            } else {
                dispatch(dashboard_deleteUserFun(deleteUser.user?.id!));
            }
        } else {
            // if false close the model only
            hideUserModelHandler();
        }
    };

    const filterDataHandler = (filterData: FilterDataInterface) => {
        setFilterDataExist(true);
        if (searchParams.has("page")) {
            searchParams.delete("page");
            setSearchParams(searchParams);
        }
        dispatch(dashboard_allUsersFun(filterData, 1));
    };

    const showModuleHandler = (toggle: boolean) => {
        setShowModule(toggle);
    };

    return (
        <div className='mx-auto w-full mt-10'>
            <h3 className='capitalize font-bold break-words tracking-widest text-lg pb-3 sm:pb-6'>
                users
            </h3>

            <FilterBox
                filterData={filterDataHandler}
                showModuleHandler={showModuleHandler}
            />

            {/* Tabel */}
            {loading ? (
                <Spinner className={`${showModule && "top-[95%]"}`} />
            ) : error ? (
                <Message
                    className={`${showModule && "top-[95%]"}`}
                    type='error'
                >
                    {error}
                </Message>
            ) : (
                <>
                    <table className='w-full border-l-[1px] border-r-[1px] dark:border-darkGray'>
                        <UsersTabelHeader
                            loadingUserData={loadingUserData}
                            userInfo={userInfo}
                        />
                        <UsersTabelBody
                            markUserWantToDelete={deleteUser}
                            markUserWantToEdit={editUser}
                            users={users}
                            userInfo={userInfo}
                            page={+page}
                            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                            deleteUser={deleteUserHandler}
                            editUser={editUserHandler}
                        />
                    </table>
                    <Pagination total_pages={total_pages} />
                </>
            )}
            {(deleteUser.showDeleteUserModel || editUser.showEditUserModel) && (
                <Backdrop onClose={hideUserModelHandler} />
            )}

            {editUser.user && (
                <EditUserModel
                    loading={loadingEditUser}
                    showEditUserModel={editUser.showEditUserModel}
                    user={editUser.user}
                    onClose={hideUserModelHandler}
                    header='Edit User'
                    userInfo={userInfo}
                />
            )}

            {userInfo.id === deleteUser.user?.id ? (
                <ConfirmDelete
                    loading={loadingDeleteMe}
                    showDeleteModel={deleteUser.showDeleteUserModel}
                    confirmDeleteHandler={confirmDeleteHandler}
                    header='Confirm delete user'
                    element={"My account"}
                    text={`Make sure we will make your account inactive. we will
                        not delete it at all. if you want back to Azure family
                        you will welcomed again. we will keep a copy of your
                        data.`}
                />
            ) : (
                <ConfirmDelete
                    loading={loadingDeleteUser}
                    showDeleteModel={deleteUser.showDeleteUserModel}
                    confirmDeleteHandler={confirmDeleteHandler}
                    header='Confirm delete user'
                    element={deleteUser.user?.name!}
                    text={`Make sure user with name ${deleteUser.user?.name}, role ${deleteUser.user?.role} and id ${deleteUser.user?.id} will completely
                        deleted from the database. Are you sure you want delete it.`}
                />
            )}
        </div>
    );
};

export default Users;
