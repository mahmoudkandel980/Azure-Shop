import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { resetLoginData } from "../../../store/slices/authSlice";
import {
    resetUpdateDeleteMeDataError,
    updateMe,
} from "../../../store/slices/userSlice";

// components
import ImageInput from "../../shared/inputs/ImageInput";
import SelectInput from "../../shared/inputs/SelectInput";
import Input from "../../shared/inputs/Input";
import Button from "../../shared/Button";
import ActivationBtn from "./ActivationBtn";
import ScrollViewLayout from "../../layout/ScrollViewLayout";

// interfaces
import { UpdateMeParams } from "../../../interfaces/store/user";
import { WantToBeSeller } from "../../../interfaces/screens/users";

// data
import { wantTobeSeller } from "../../../data/public";

// validation
import validateInput from "../../../validation/validateInput";

const Settings = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loginData } = useSelector((state: RootState) => state.auth);
    const { updateMeLoading, updateMeData, updateMeError } = useSelector(
        (state: RootState) => state.user
    );
    const [image, setImage] = useState<object | null>(null);
    const [name, setName] = useState(loginData?.name || "");
    const [email, setEmail] = useState(loginData?.email || "");
    const [activeStatus, setActiveStatus] = useState(
        loginData?.nominateAsSeller?.wantToBeSeller ? "yes" : "no" || "no"
    );
    const [formError, setFormError] = useState({
        nameError: "",
        emailError: "",
    });
    const { emailError, nameError } = formError;

    // update name image and email if changed
    useEffect(() => {
        // setImage(loginData?.imageUrl);
        setName(loginData?.name || "");
        setEmail(loginData?.email || "");
    }, [loginData]);

    // Effect when change update me to login state
    useEffect(() => {
        if (updateMeData) {
            // udpate data in login
            dispatch(
                resetLoginData({
                    ...loginData,
                    ...updateMeData,
                })
            );

            // reset deleteMe data
            dispatch(resetUpdateDeleteMeDataError());
        }
    }, [updateMeData]);

    // bearer image
    const localImageBearerHandler = (assets: object) => {
        setImage(assets);
    };

    // set current value if user want to be a seller
    const currentActiveStatusValueHandler = (value: string) => {
        setActiveStatus(value);
    };

    const updateMeHandler = () => {
        if (updateMeLoading) return;

        // Validation
        const nameErr = validateInput({ inputValue: name, type: "Name" });
        const emailErr = validateInput({ inputValue: email, type: "Email" });

        // reset error State
        setFormError({
            emailError: emailErr,
            nameError: nameErr,
        });

        if (nameErr || emailErr) return;

        const objectData: UpdateMeParams = { name };
        if (email !== loginData?.email) {
            objectData.email = email;
        }
        if (image) {
            objectData.imageUrl = image;
        }
        if (activeStatus === "yes") {
            objectData.wantToBeSeller = WantToBeSeller.yes;
        }

        dispatch(updateMe(objectData));
    };

    return (
        <ScrollViewLayout>
            <View style={{ paddingHorizontal: 20 }}>
                <ImageInput
                    imageUrl={loginData?.imageUrl || ""}
                    imageUrlError=''
                    localImage={localImageBearerHandler}
                />
                <Input
                    label='Name'
                    onChangeText={setName}
                    value={name}
                    placeholder='Enter Name'
                    error={nameError}
                />
                <Input
                    label='Email'
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Enter Email'
                    error={emailError}
                />
                <Input
                    label='Role'
                    value={loginData?.role}
                    editable={false}
                    placeholder='Enter Role'
                />
                {loginData?.role === "user" ? (
                    !loginData.nominateAsSeller?.wantToBeSeller ? (
                        <SelectInput
                            label='do you want to ba a seller'
                            currentValue={currentActiveStatusValueHandler}
                            items={wantTobeSeller}
                            inialValue={activeStatus}
                        />
                    ) : (
                        <Input
                            label='do you want to ba a seller'
                            value='Pending'
                            editable={false}
                        />
                    )
                ) : (
                    <></>
                )}
                <View style={styles.btnContainer}>
                    <Button loading={updateMeLoading} onPress={updateMeHandler}>
                        update
                    </Button>
                </View>
                <View style={styles.btnContainer}>
                    {/* activation button */}
                    <ActivationBtn />
                </View>
            </View>
        </ScrollViewLayout>
    );
};

export default Settings;

const styles = StyleSheet.create({
    btnContainer: {
        paddingTop: 20,
    },
});
