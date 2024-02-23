import React, { useContext } from "react";
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    DimensionValue,
} from "react-native";

// components
import Button from "../shared/Button";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// interfaces
import { CreateEditProps, CreateEditType } from "../../interfaces/models";

const CreateEdit = (props: CreateEditProps) => {
    const { baseBgColor } = useContext(ThemeContext);
    const {
        header,
        showCreateEditModel,
        createEditBtnContent,
        type, //edit or create
        children,
        loading,
        confirmCreateEditHandler,
    } = props;

    const closeHandler = () => {
        confirmCreateEditHandler(false);
    };

    const createEditHandler = () => {
        confirmCreateEditHandler(true);
    };

    return (
        <Modal
            visible={showCreateEditModel}
            animationType='fade'
            transparent={true}
        >
            <View style={styles.modalContainer}>
                {/* backdrop */}
                <TouchableOpacity
                    style={styles.backdrop}
                    onPress={closeHandler}
                ></TouchableOpacity>

                <View
                    style={[
                        styles.modalContent,
                        { backgroundColor: baseBgColor },
                    ]}
                >
                    <Text
                        style={[
                            styles.modalHeader,
                            {
                                color:
                                    type === CreateEditType.create
                                        ? colors.success
                                        : colors.stars,
                            },
                        ]}
                    >
                        {header}
                    </Text>

                    {/* content */}
                    <ScrollView style={styles.contentContainer}>
                        {children}
                        <View style={{ height: 30 }} />
                    </ScrollView>

                    {/* buttons */}
                    <View style={styles.buttonsContainer}>
                        <Button
                            loading={loading}
                            onPress={createEditHandler}
                            createBtn={
                                type === CreateEditType.create ? true : false
                            }
                            editBtn={
                                type === CreateEditType.edit ? true : false
                            }
                        >
                            {createEditBtnContent}
                        </Button>
                        <Button onPress={closeHandler}>cancel</Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CreateEdit;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        padding: 20,
        paddingHorizontal: 10,
        width: Dimensions.get("screen").width - 15,
        maxHeight: Dimensions.get("screen").height - 150,
        borderRadius: 8,
    },
    modalHeader: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 10,
        columnGap: 20,
    },
});
