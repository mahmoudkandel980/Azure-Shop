import React, { useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

// components
import Button from "../../../shared/Button";
import EditUserModel from "./EditUserModel";

// colors
import colors from "../../../../constants/Colors";

// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// interface
import { UserInfo } from "../../../../interfaces/screens/regester";
import { CreateEditType } from "../../../../interfaces/models";

const EditUserBtn = (props: UserInfo) => {
    const { role, id } = props;
    const { loginData } = useSelector((state: RootState) => state.auth);
    const [showEditModel, setShowEditModel] = useState(false);

    const showEditUserModel = () => {
        setShowEditModel(true);
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
                        onPress={showEditUserModel}
                        imgBtn
                        navgationBtn
                        icon={
                            <MaterialCommunityIcons
                                name='pencil-outline'
                                size={16}
                                color={colors.white}
                            />
                        }
                    />
                )}

            {/* edit user model */}
            <EditUserModel
                type={CreateEditType.edit}
                showEditModel={showEditModel}
                setShowCreateEditModel={setShowEditModel}
                user={props}
            />
        </>
    );
};

export default EditUserBtn;
