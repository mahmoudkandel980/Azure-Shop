import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    deleteMe,
    updateMe,
    resetUpdateDeleteMeDataError,
} from "../../../store/slices/userSlice";
import { resetLoginData } from "../../../store/slices/authSlice";

// components
import Button from "../../shared/Button";
import ConfirmDelete from "../../models/ConfirmDelete";

// colors
import colors from "../../../constants/Colors";

// icons
import { AntDesign } from "@expo/vector-icons";

const ActivationBtn = () => {
    const [showDeleteMeModel, setShowDeleteMeModel] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { loginData } = useSelector((state: RootState) => state.auth);
    const { deleteMeData, deleteMeLoading, updateMeData, updateMeLoading } =
        useSelector((state: RootState) => state.user);

    // Effect when change deleteMeData update to login state
    useEffect(() => {
        if (deleteMeData || updateMeData) {
            // udpate data in login
            if (deleteMeData) {
                dispatch(
                    resetLoginData({
                        ...loginData,
                        ...deleteMeData,
                    })
                );
            } else {
                dispatch(
                    resetLoginData({
                        ...loginData,
                        ...updateMeData,
                    })
                );
            }

            // reset deleteMe data
            dispatch(resetUpdateDeleteMeDataError());

            // close model if we in deleteMe
            if (deleteMeData) {
                setShowDeleteMeModel(false);
            }
        }
    }, [deleteMeData, updateMeData]);

    // activate and deactivate
    const toggleActivationHandler = () => {
        if (deleteMeLoading || updateMeLoading) return;
        if (loginData?.activeStatus) {
            setShowDeleteMeModel(true);
        } else {
            dispatch(updateMe({ activeStatus: true }));
        }
    };

    const confirmDeactivateHandler = (confirm: boolean) => {
        if (!confirm) {
            setShowDeleteMeModel(false);
            return;
        }

        dispatch(deleteMe());
    };

    return (
        <View style={styles.container}>
            <Button
                onPress={toggleActivationHandler}
                loading={
                    loginData?.activeStatus ? deleteMeLoading : updateMeLoading
                }
                deleteBtn={loginData?.activeStatus}
                createBtn={!loginData?.activeStatus}
                icon={
                    <AntDesign
                        color={colors.white}
                        name={loginData?.activeStatus ? "delete" : "check"}
                        size={16}
                    />
                }
            >
                {loginData?.activeStatus ? "delete me" : "Activate Me"}
            </Button>
            <ConfirmDelete
                header='Deactivate Account'
                deleteBtnContent='confirm'
                showDeleteModel={showDeleteMeModel}
                text='Make sure we will make your account inactive so we will hide your actions like your products. we will not delete it at all. if you want back to Azure family you will welcomed again. we will keep a copy of your data.'
                loading={deleteMeLoading}
                confirmDeleteHandler={confirmDeactivateHandler}
            />
        </View>
    );
};

export default ActivationBtn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
    },
});
