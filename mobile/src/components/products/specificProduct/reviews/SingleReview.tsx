import React, { useState, useContext, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../store/store";
import {
    deleteReview,
    resetAddEditDeleteDataError,
} from "../../../../store/slices/reviewsSlice";

// components
import Rating from "../../../shared/Rating";
import Image from "../../../shared/Image";

// models
import ReivewSettings from "../../../models/ReivewSettings";
import ConfirmDelete from "../../../models/ConfirmDelete";

// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// helpers
import convertTimestampFun from "../../../../helpers/convertTimestampFun";

// colors
import colors from "../../../../constants/Colors";

// context
import ThemeContext from "../../../../context/darkModeTheme";
import EditDeleteReviewContext from "../../../../context/editDeleteReview";

// interfaces
import { ReviewStateInterface } from "../../../../interfaces/screens/reviews";
import { ReivewSettingsType } from "../../../../interfaces/models";

// toast
import Toast from "react-native-toast-message";

const SingleReview = (item: ReviewStateInterface) => {
    const {
        review,
        createdAt,
        rating,
        creator: { name, imageUrl, id },
    } = item;
    const [showModel, setShowModel] = useState(false);

    const { theme, baseTextColor } = useContext(ThemeContext);
    const { changeType, modelState } = useContext(EditDeleteReviewContext);

    const { productId } = useRoute<any>().params;
    const dispatch = useDispatch<AppDispatch>();

    const { loginData } = useSelector((state: RootState) => state.auth);
    const { deleteReviewData, deleteReviewError, deleteReviewLoading } =
        useSelector((state: RootState) => state.reviews);

    // Effect to close the delete review model and show an error if there is an error
    useEffect(() => {
        if (deleteReviewData) {
            changeType({ review: null, type: ReivewSettingsType.colse });
        } else if (deleteReviewError) {
            Toast.show({
                type: "error",
                text1: "Something went wrong when remove reivew",
            });
            changeType({ review: null, type: ReivewSettingsType.colse });
        }
    }, [deleteReviewData, deleteReviewError]);

    // show review settings model
    const showModelHandler = () => {
        setShowModel(true);
        changeType({ review: item, type: ReivewSettingsType.colse });
    };

    // hide review settings model
    const closeModelHandler = (type: ReivewSettingsType) => {
        setShowModel(false);
        changeType({ review: item, type: type });
    };

    const confirmDeleteReviewHandler = (confirm: boolean) => {
        if (!confirm) {
            changeType({ review: item, type: ReivewSettingsType.colse });
            return;
        }

        dispatch(
            deleteReview({
                productId: productId,
                reviewId: modelState.review?.id!,
            })
        );
    };

    return (
        <View
            style={[
                styles.singleReview,
                {
                    backgroundColor:
                        loginData && loginData?.id === id
                            ? theme === "dark"
                                ? colors.darkBody
                                : colors.whiteMilk
                            : "",
                },
            ]}
        >
            <Image width={35} height={35} borderRadius={35} uri={imageUrl!} />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <View style={styles.nameReviewContainer}>
                    <Text style={[styles.name, { color: baseTextColor }]}>
                        {name}
                    </Text>
                    <Rating rating={rating} />
                    {loginData && loginData?.id === id ? (
                        <>
                            <TouchableOpacity
                                onPress={showModelHandler}
                                style={styles.reviewSettings}
                            >
                                <MaterialCommunityIcons
                                    name='dots-horizontal'
                                    color={baseTextColor}
                                    size={16}
                                />
                            </TouchableOpacity>
                            {/* Settings model */}
                            <ReivewSettings
                                showReivewSettingsModel={showModel}
                                closeModel={closeModelHandler}
                            />

                            {/* delete review */}
                            <ConfirmDelete
                                header='delete my review'
                                text='Once this review is deleted, it will be permanently deleted from the database and cannot be retrieved again. Are you sure you want to delete this?'
                                showDeleteModel={
                                    modelState.type ===
                                    ReivewSettingsType.delete
                                }
                                confirmDeleteHandler={
                                    confirmDeleteReviewHandler
                                }
                                deleteBtnContent='confirm'
                                loading={deleteReviewLoading}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </View>
                <Text style={{ color: baseTextColor }}>{review}</Text>
                <Text
                    style={[styles.createdAt, { color: colors.inActiveText }]}
                >
                    {convertTimestampFun(createdAt!)}
                </Text>
            </View>
        </View>
    );
};
export default SingleReview;

const styles = StyleSheet.create({
    singleReview: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    nameReviewContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 3,
        height: 20,
    },
    name: {
        fontWeight: "bold",
        marginRight: 10,
    },
    reviewSettings: {
        marginLeft: "auto",
    },
    createdAt: {
        fontSize: 10,
    },
});
