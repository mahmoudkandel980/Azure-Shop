import React, { useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// components
import Button from "../../shared/Button";
import CreateEditProductModel from "./CreateEditProductModel";

// colors
import colors from "../../../constants/Colors";

// interface
import { EditDeleteProductBtnProps } from "../../../interfaces/screens/products";
import { CreateEditType } from "../../../interfaces/models";

const EditProductBtn = (props: EditDeleteProductBtnProps) => {
    const {
        product: {
            creator: { role, id },
        },
        screenType,
    } = props;

    const { loginData } = useSelector((state: RootState) => state.auth);
    const [showCreateEditModel, setShowCreateEditModel] = useState(false);

    const showCreateEditModelHandler = () => {
        setShowCreateEditModel(true);
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
                        onPress={showCreateEditModelHandler}
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

            {/* edit create product model */}
            <CreateEditProductModel
                type={CreateEditType.edit}
                showCreateEditModel={showCreateEditModel}
                setShowCreateEditModel={setShowCreateEditModel}
                product={props.product}
                screenType={screenType}
            />
        </>
    );
};

export default EditProductBtn;
