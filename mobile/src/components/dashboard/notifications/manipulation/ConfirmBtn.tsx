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
import Confirm from "../../../models/Confrim";

// colors
import colors from "../../../../constants/Colors";

// icons
import { Entypo } from "@expo/vector-icons";

// interfaces
import { UserInfo } from "../../../../interfaces/screens/regester";

const ConfirmBtn = (porps: UserInfo) => {
    const { name, id } = porps;
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

    const showConfrimModelHandler = () => {
        setShowConfirmModel(true);
    };

    const confirmHandler = (confirmed: boolean) => {
        if (!confirmed) {
            setShowConfirmModel(false);
            return;
        }

        dispatch(updateUserWantToBeSeller({ role: "seller", userId: id! }));
    };

    return (
        <>
            <Button
                onPress={showConfrimModelHandler}
                imgBtn
                navgationBtn
                icon={<Entypo name='check' size={16} color={colors.white} />}
            />

            <Confirm
                header='Confirm acceptance to be seller'
                text={`User with name ${name}, with role user and id ${id} want be seller.`}
                showConfrimModel={showConfirmModel}
                confirmHandler={confirmHandler}
                confirmBtnContent='confirm'
                element={name}
                loading={updateUserWantToBeSellerLoading}
            />
        </>
    );
};

export default ConfirmBtn;
