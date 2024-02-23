import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
    deleteUser,
    resetDeleteUserDataError,
} from "../../../../store/slices/dashboard/userSlice";

// components
import Button from "../../../shared/Button";
import ConfirmDelete from "../../../models/ConfirmDelete";

// colors
import colors from "../../../../constants/Colors";

// icons
import { AntDesign } from "@expo/vector-icons";

// interfaces
import { UserInfo } from "../../../../interfaces/screens/regester";

const DeleteUser = (props: UserInfo) => {
    const { id, name, role } = props;
    const [showConfirmDeleteModel, setShowConfirmDeleteModel] = useState(false);
    const [userId, setUserId] = useState("");

    const dispatch = useDispatch<AppDispatch>();

    const { loginData } = useSelector((state: RootState) => state.auth);
    const { deleteUserData, deleteUserLoading } = useSelector(
        (state: RootState) => state.dashbordUsers
    );

    // close delte model after delete user
    useEffect(() => {
        if (deleteUserData) {
            setShowConfirmDeleteModel(false);
            dispatch(resetDeleteUserDataError());
        }
    }, [deleteUserData]);

    const toggleConfirmDeleteModel = () => {
        setShowConfirmDeleteModel((prevState) => !prevState);
    };

    const confirmDeleteHandler = (confirm: boolean) => {
        if (!confirm) {
            setShowConfirmDeleteModel(false);
            return;
        }
        setUserId(id!);
        dispatch(deleteUser({ userId: id! }));
    };

    return (
        <>
            {loginData &&
                loginData.role &&
                (loginData.id === id ||
                    (role === "user" &&
                        ["moderator", "subAdmin", "admin"].includes(
                            loginData.role
                        )) ||
                    (role === "seller" &&
                        ["moderator", "subAdmin", "admin"].includes(
                            loginData.role
                        )) ||
                    (role === "moderator" &&
                        ["subAdmin", "admin"].includes(loginData.role)) ||
                    (role === "subAdmin" &&
                        ["admin"].includes(loginData.role))) && (
                    <Button
                        imgBtn
                        deleteBtn
                        loading={deleteUserLoading && userId === id}
                        onPress={toggleConfirmDeleteModel}
                        icon={
                            <AntDesign
                                name='delete'
                                size={16}
                                color={colors.white}
                            />
                        }
                    />
                )}

            {/* delete user model */}
            <ConfirmDelete
                showDeleteModel={showConfirmDeleteModel}
                element={name}
                loading={deleteUserLoading}
                deleteBtnContent='confrim'
                confirmDeleteHandler={confirmDeleteHandler}
                text={`Make sure user with name ${name}, role ${role} and id ${id} will completely deleted from the database. Are you sure you want delete it.`}
                header={`Confirm delete user with name`}
            />
        </>
    );
};

export default DeleteUser;
