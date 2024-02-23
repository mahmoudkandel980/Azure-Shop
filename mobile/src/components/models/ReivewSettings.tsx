import React, { useContext } from "react";
import {
    View,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Text,
} from "react-native";

// components
import Button from "../shared/Button";

// icons
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

// colors
import colors from "../../constants/Colors";

// context
import ThemeContext from "../../context/darkModeTheme";

// interfaces
import {
    ReivewSettingsProps,
    ReivewSettingsType,
} from "../../interfaces/models";

const ReivewSettings = (props: ReivewSettingsProps) => {
    const { baseBgColor, baseTextColor } = useContext(ThemeContext);
    const { showReivewSettingsModel, closeModel } = props;

    const closeHandler = () => {
        closeModel(ReivewSettingsType.colse);
    };

    const editReviewHandler = () => {
        closeModel(ReivewSettingsType.edit);
    };

    const deleteReviewHandler = () => {
        closeModel(ReivewSettingsType.delete);
    };

    return (
        <Modal
            visible={showReivewSettingsModel}
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
                    <Text
                        style={[
                            styles.modalHeader,
                            {
                                color: baseTextColor,
                            },
                        ]}
                    >
                        review
                    </Text>

                    {/* content */}
                    <Text
                        style={[
                            styles.contentContainer,
                            { color: baseTextColor },
                        ]}
                    >
                        Please selecet what do you want to make in your review.
                        if you want to edit it please press on{" "}
                        <Text style={{ color: colors.stars }}>Edit Review</Text>{" "}
                        button. if you want to delete it please press on{" "}
                        <Text style={{ color: colors.darkRed }}>
                            Delete Review
                        </Text>{" "}
                        button.
                    </Text>

                    {/* buttons */}
                    <View style={styles.buttonsContainer}>
                        <Button editBtn onPress={editReviewHandler}>
                            edit Review
                        </Button>
                        <Button deleteBtn onPress={deleteReviewHandler}>
                            delete Review
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ReivewSettings;

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
        textTransform: "capitalize",
        fontSize: 20,
        marginBottom: 5,
        fontWeight: "bold",
        textAlign: "center",
    },
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 20,
    },
});
