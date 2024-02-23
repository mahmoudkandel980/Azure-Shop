import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// icons
import { Entypo } from "@expo/vector-icons";

// components
import Button from "../../shared/Button";
import CreateEditProductModel from "./CreateEditProductModel";

// colors
import colors from "../../../constants/Colors";

// interface
import { CreateEditType } from "../../../interfaces/models";

const CreateProductBtn = () => {
    const { loginData } = useSelector((state: RootState) => state.auth);
    const [showCreateEditModel, setShowCreateEditModel] = useState(false);

    const showCreateEditModelHandler = () => {
        setShowCreateEditModel(true);
    };

    return (
        <>
            {loginData &&
                loginData.role &&
                ["seller", "moderator", "subAdmin", "admin"].includes(
                    loginData.role
                ) && (
                    <View style={styles.btnContainer}>
                        <Button
                            onPress={showCreateEditModelHandler}
                            createBtn
                            icon={
                                <Entypo
                                    name='plus'
                                    color={colors.white}
                                    size={20}
                                />
                            }
                        >
                            create product
                        </Button>
                    </View>
                )}

            {/* edit create product model */}
            <CreateEditProductModel
                type={CreateEditType.create}
                showCreateEditModel={showCreateEditModel}
                setShowCreateEditModel={setShowCreateEditModel}
            />
        </>
    );
};

export default CreateProductBtn;

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingTop: 30,
        paddingBottom: 15,
        marginRight: 10,
    },
});
