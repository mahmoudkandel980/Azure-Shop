import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
    updateMe,
    resetUpdateMeDataError,
} from "../../../../store/slices/userSlice";
import {
    editUser,
    resetEditUser,
} from "../../../../store/slices/dashboard/userSlice";

// components
import CreateEdit from "../../../models/CreateEdit";
import Input from "../../../shared/inputs/Input";
import ImageInput from "../../../shared/inputs/ImageInput";
import RadioGroup from "../../../shared/RadioInput/RadioGroup";

// validation
import validateInput from "../../../../validation/validateInput";

// interfaces
import { EditUserModelProps } from "../../../../interfaces/screens/users";

const EditUserModel = (porps: EditUserModelProps) => {
    const { setShowCreateEditModel, showEditModel, user, type } = porps;

    // form
    const [image, setImage] = useState<object | null>(null);
    const [imageUrl, setImageUrl] = useState(user.imageUrl!);
    const [name, setName] = useState(user.name!);
    const [email, setEmail] = useState(user.email!);
    const [role, setRole] = useState(user.role!);
    const [active, setActive] = useState(
        user.activeStatus ? "active" : "inActive"
    );

    const [activeRadioButtons, setActiveRadioButtons] = useState(["active"]);
    const [roleRadioButtons, setRoleRadioButtons] = useState([
        "user",
        "seller",
    ]);

    const [formError, setFormError] = useState({
        emailError: "",
        nameError: "",
    });
    const { emailError, nameError } = formError;

    const dispatch = useDispatch<AppDispatch>();
    const { loginData } = useSelector((state: RootState) => state.auth);
    const { editUserData, editUserLoading, editUserError } = useSelector(
        (state: RootState) => state.dashbordUsers
    );
    const { updateMeData, updateMeLoading } = useSelector(
        (state: RootState) => state.user
    );

    // useEffect to auto close the model after udpate user
    useEffect(() => {
        if (editUserData || updateMeData) {
            setShowCreateEditModel(false);
            dispatch(resetUpdateMeDataError());
            dispatch(resetEditUser());
        }
    }, [editUserData, updateMeData]);

    // useEffect for render active or not and user role
    useEffect(() => {
        // role
        if (loginData?.role === "moderator") {
            if (loginData.id === user.id) {
                setRoleRadioButtons(["user", "seller", "moderator"]);
            } else {
                setRoleRadioButtons(["user", "seller"]);
            }
        } else if (loginData?.role === "subAdmin") {
            if (loginData.id === user.id) {
                setRoleRadioButtons([
                    "user",
                    "seller",
                    "moderator",
                    "subAdmin",
                ]);
            } else {
                setRoleRadioButtons(["user", "seller", "moderator"]);
            }
        } else if (loginData?.role === "admin") {
            if (loginData.id === user.id) {
                setRoleRadioButtons(["admin"]);
            } else {
                setRoleRadioButtons([
                    "user",
                    "seller",
                    "moderator",
                    "subAdmin",
                ]);
            }
        }

        // active
        if (
            (loginData?.role === "admin" && user.id !== loginData?.id) ||
            loginData?.role === "subAdmin" ||
            loginData?.role === "moderator"
        ) {
            setActiveRadioButtons(["active", "inActive"]);
        } else {
            setActiveRadioButtons(["active"]);
        }
    }, [user.id]);

    // bearer image
    const localImageBearerHandler = (assets: object) => {
        setImage(assets);
    };

    const confirmEditUserHandler = (confirmed: boolean) => {
        if (!confirmed) {
            setShowCreateEditModel(false);
            return;
        }

        // validation
        const nameErr = validateInput({
            inputValue: name,
            type: "Name",
        });
        const emailErr = validateInput({
            inputValue: email,
            type: "Email",
        });

        // reset error State
        setFormError({
            emailError: emailErr,
            nameError: nameErr,
        });

        if (emailErr || nameErr) return;

        let submitedData: any = {
            name,
            email,
            role,
            activeStatus: active === "active" ? true : false,
        };
        if (image) submitedData.imageUrl = image;

        // edit user
        if (loginData?.id === user.id) {
            // update me
            dispatch(updateMe({ ...submitedData }));
        } else {
            // dashboard
            dispatch(
                editUser({
                    userFormData: { ...submitedData },
                    userId: user.id!,
                })
            );
        }
    };

    return (
        <CreateEdit
            confirmCreateEditHandler={confirmEditUserHandler}
            createEditBtnContent='update'
            header='edit user'
            showCreateEditModel={showEditModel}
            type={type}
            loading={
                loginData?.id === user.id ? updateMeLoading : editUserLoading
            }
        >
            <>
                <ImageInput
                    imageUrl={imageUrl}
                    imageUrlError=''
                    localImage={localImageBearerHandler}
                />
                <Input
                    label='name'
                    onChangeText={setName}
                    value={name}
                    placeholder='Enter name'
                    inputMode='text'
                    error={nameError}
                />
                <Input
                    label='email'
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Enter email'
                    inputMode='email'
                    error={emailError}
                />
                <RadioGroup
                    radioButtons={roleRadioButtons.map((btn) => ({
                        value: btn,
                        label: btn,
                    }))}
                    onPress={setRole}
                    selectedValue={role}
                    layout='row'
                    label='role'
                />
                <RadioGroup
                    radioButtons={activeRadioButtons.map((btn) => ({
                        value: btn,
                        label: btn,
                    }))}
                    onPress={setActive}
                    selectedValue={active}
                    layout='row'
                    label='active'
                />
            </>
        </CreateEdit>
    );
};

export default EditUserModel;

const styles = StyleSheet.create({
    inputsGroup: {
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
    },
});
