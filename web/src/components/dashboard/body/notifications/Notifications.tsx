import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import {
    dashboard_usersWantToBeSellers as dashboard_usersWantToBeSellersFun,
    dashboard_updateuserWantToBeSeller,
} from "../../../../store/actions/dashboardActions";

import UsersTabelHeader from "../users/UsersTabelHeader";
import UsersTabelBody from "./UsersTabelBody";
import Pagination from "../../../utils/Pagination";

import ConfirmAccept from "../../../models/ConfirmAccept";
import ConfirmDelete from "../../../models/ConfirmDelete";
import Backdrop from "../../../models/Backdrop";

import Message from "../../../ui/Message";
import Spinner from "../../../ui/Spinner";

import {
    UsersWantToBeSellerInterface,
    UpdateUserWantToBeSeller,
} from "../../../../interfaces/store/user/userInterface";
import { LoginInterface } from "../../../../interfaces/store/user/authInterface";
import { UserInfo } from "../../../../interfaces/store/user/userInterface";
import {
    AcceptToBeSellerInterface,
    RejectToBeSellerInterface,
} from "../../../../interfaces/components/dashboard";

const Notifications = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();

    const [acceptToBeSeller, setAcceptToBeSeller] =
        useState<AcceptToBeSellerInterface>({
            user: null,
            showAcceptModel: false,
        });
    const [rejectToBeSeller, setRejectToBeSeller] =
        useState<RejectToBeSellerInterface>({
            user: null,
            showRejectModel: false,
        });

    const location = useLocation();
    const page = new URLSearchParams(location.search).get("page") || 1;

    useEffect(() => {
        dispatch(dashboard_usersWantToBeSellersFun(+page));
    }, [dispatch, page]);

    const { dashboard_usersWantToBeSellers } = useSelector(
        (state) => state as UsersWantToBeSellerInterface
    );
    const { loading, users, error, total_pages, ITEMS_PER_PAGE } =
        dashboard_usersWantToBeSellers;

    const { userLogin } = useSelector((state) => state as LoginInterface);
    const { userInfo, loading: loadingUserData } = userLogin;

    const { dashboard_updateUserWantToBeSeller } = useSelector(
        (state) => state as UpdateUserWantToBeSeller
    );
    const { loading: loadingUpdateUserWantToBeSeller } =
        dashboard_updateUserWantToBeSeller;

    // hide models when update userWantToBeSeller
    useEffect(() => {
        if (loadingUpdateUserWantToBeSeller === false) {
            hideUserModelHandler();
        }
    }, [loadingUpdateUserWantToBeSeller]);

    const acceptUserToBeSellerHandler = (user: UserInfo) => {
        user.role = "seller";
        setAcceptToBeSeller({ user: user, showAcceptModel: true });
    };

    const rejectUserToBeSellerHandler = (user: UserInfo) => {
        setRejectToBeSeller({ user: user, showRejectModel: true });
    };

    const hideUserModelHandler = () => {
        setAcceptToBeSeller({
            user: { name: "", id: "", role: "" },
            showAcceptModel: false,
        });
        setRejectToBeSeller({
            user: { name: "", id: "", role: "" },
            showRejectModel: false,
        });
    };

    const confirmAcceptHandler = (confirmAcception: boolean) => {
        if (confirmAcception) {
            dispatch(
                dashboard_updateuserWantToBeSeller(
                    acceptToBeSeller.user?.id!,
                    acceptToBeSeller.user?.role!
                )
            );
        } else {
            // if false close the model only
            hideUserModelHandler();
        }
    };
    const confirmRejectHandler = (confirmRejection: boolean) => {
        if (confirmRejection) {
            dispatch(
                dashboard_updateuserWantToBeSeller(
                    rejectToBeSeller.user?.id!,
                    rejectToBeSeller.user?.role!
                )
            );
        } else {
            // if false close the model only
            hideUserModelHandler();
        }
    };

    return (
        <div className='mx-auto w-full mt-10'>
            <h3 className='capitalize font-bold break-words tracking-widest text-lg pb-3 sm:pb-6'>
                notifications
            </h3>
            <h5 className='capitalize font-semibold text-base pb-3 sm:pb-6'>
                users want to be sellers
            </h5>

            {loading ? (
                <Spinner />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : users && users.length === 0 ? (
                <Message type='error'>
                    Not found any user want to be a seller
                </Message>
            ) : (
                <>
                    <table className='w-full border-l-[1px] border-r-[1px] dark:border-darkGray'>
                        <UsersTabelHeader
                            loadingUserData={loadingUserData}
                            userInfo={userInfo}
                        />
                        <UsersTabelBody
                            markUserWantToDelete={rejectToBeSeller}
                            markUserWantToEdit={acceptToBeSeller}
                            users={users!}
                            userInfo={userInfo}
                            page={+page}
                            ITEMS_PER_PAGE={ITEMS_PER_PAGE!}
                            deleteUser={rejectUserToBeSellerHandler}
                            editUser={acceptUserToBeSellerHandler}
                        />
                    </table>
                    <Pagination total_pages={total_pages} />
                </>
            )}

            {(acceptToBeSeller.showAcceptModel ||
                rejectToBeSeller.showRejectModel) && (
                <Backdrop onClose={hideUserModelHandler} />
            )}

            <ConfirmAccept
                loading={loadingUpdateUserWantToBeSeller}
                showAcceptModel={acceptToBeSeller.showAcceptModel}
                confirmAcceptHandler={confirmAcceptHandler}
                header='Confirm acceptance to be seller'
                element={acceptToBeSeller.user?.name!}
                text={`User with name ${acceptToBeSeller.user
                    ?.name!}, with role user and id ${
                    acceptToBeSeller.user?.id
                } want 
                be seller.`}
            />

            <ConfirmDelete
                loading={loadingUpdateUserWantToBeSeller}
                showDeleteModel={rejectToBeSeller.showRejectModel}
                confirmDeleteHandler={confirmRejectHandler}
                header='Confirm rejection to be seler'
                element={rejectToBeSeller.user?.name!}
                text={`Make sure user with name ${rejectToBeSeller.user?.name}, role ${rejectToBeSeller.user?.role} and id ${rejectToBeSeller.user?.id} will 
                rejected to be seller. but he can send another request to be seller.`}
            />
        </div>
    );
};

export default Notifications;
