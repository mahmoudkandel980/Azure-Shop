import React, { useContext } from "react";
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";

// components
import Button from "../shared/Button";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// interfaces
import { ConfirmDeleteProps } from "../../interfaces/models";

const ConfirmDelete = (props: ConfirmDeleteProps) => {
    const { baseBgColor, baseTextColor } = useContext(ThemeContext);
    const {
        confirmDeleteHandler,
        deleteBtnContent,
        element,
        header,
        showDeleteModel,
        text,
        loading,
    } = props;

    const closeHandler = () => {
        confirmDeleteHandler(false);
    };

    const deleteHandler = () => {
        confirmDeleteHandler(true);
    };

    return (
        <Modal
            visible={showDeleteModel}
            animationType='slide'
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
                    <View style={styles.headerContainer}>
                        <Text
                            style={[
                                styles.modalHeader,
                                { color: baseTextColor },
                            ]}
                        >
                            {header}{" "}
                            {element && (
                                <Text
                                    style={[
                                        styles.modalHeader,
                                        { color: colors.darkRed },
                                    ]}
                                >
                                    {element.length > 30
                                        ? element.slice(0, 30) + "..."
                                        : element}
                                </Text>
                            )}
                        </Text>
                    </View>

                    {/* content */}
                    <Text
                        style={[
                            styles.contentContainer,
                            { color: baseTextColor },
                        ]}
                    >
                        {text}
                    </Text>

                    {/* buttons */}
                    <View style={styles.buttonsContainer}>
                        <Button
                            loading={loading}
                            onPress={deleteHandler}
                            deleteBtn
                        >
                            {deleteBtnContent}
                        </Button>
                        <Button onPress={closeHandler}>cancel</Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmDelete;

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
        maxHeight: Dimensions.get("screen").height - 200,
        borderRadius: 8,
        maxWidth: 450,
    },
    headerContainer: {
        marginBottom: 10,
        flexDirection: "row",
        textTransform: "capitalize",
    },
    modalHeader: {
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        lineHeight: 20,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 20,
    },
});
