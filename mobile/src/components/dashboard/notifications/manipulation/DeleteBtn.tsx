import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
    updateUserWantToBeSeller,
    resetUpdateUsersWantToBeSellersDataError,
} from "../../../../store/slices/dashboard/userSlice";

// components
import Button from "../../../shared/Button";
import ConfirmDelete from "../../../models/ConfirmDelete";

// colors
import colors from "../../../../constants/Colors";

// icons
import { Entypo } from "@expo/vector-icons";

// interfaces
import { UserInfo } from "../../../../interfaces/screens/regester";

const DeleteBtn = (porps: UserInfo) => {
    const { name, id, role } = porps;
    const [showConfirmModel, setShowConfirmModel] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { updateUserWantToBeSellerData, updateUserWantToBeSellerLoading } =
        useSelector((state: RootState) => state.dashbordUsers);

    // close model after update it
    useEffect(() => {
        if (updateUserWantToBeSellerData) {
            setShowConfirmModel(false);
            dispatch(resetUpdateUsersWantToBeSellersDataError());
        }
    }, [updateUserWantToBeSellerData]);

    const showUnConfrimModelHandler = () => {
        setShowConfirmModel(true);
    };

    const confirmHandler = (confirmed: boolean) => {
        if (!confirmed) {
            setShowConfirmModel(false);
            return;
        }

        dispatch(updateUserWantToBeSeller({ role: role!, userId: id! }));
    };

    return (
        <>
            <Button
                onPress={showUnConfrimModelHandler}
                imgBtn
                deleteBtn
                icon={<Entypo name='cross' size={16} color={colors.white} />}
            />

            <ConfirmDelete
                header='Confirm rejection to be seler'
                text={`Make sure user with name ${name}, role ${role} and id ${id} will rejected to be seller. but he can send another request to be seller.`}
                showDeleteModel={showConfirmModel}
                confirmDeleteHandler={confirmHandler}
                deleteBtnContent='confirm'
                element={name}
                loading={updateUserWantToBeSellerLoading}
            />
        </>
    );
};

export default DeleteBtn;
