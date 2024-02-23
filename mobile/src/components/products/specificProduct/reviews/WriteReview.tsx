import React, { useState, useContext, useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
    addReview,
    editReview,
    resetAddEditDeleteDataError,
} from "../../../../store/slices/reviewsSlice";

// components
import SelectInput from "../../../shared/inputs/SelectInput";
import Header from "../../../shared/Header";
import Rating from "../../../shared/Rating";
import Input from "../../../shared/inputs/Input";
import Button from "../../../shared/Button";
import ShouldAuthorized from "../../../shared/ShouldAuthorized";

// Context
import ThemeContext from "../../../../context/darkModeTheme";
import EditDeleteReviewContext from "../../../../context/editDeleteReview";

// data
import { reviewsItems } from "../../../../data/public";

// toast
import Toast from "react-native-toast-message";

// validation
import validateInput from "../../../../validation/validateInput";

// interfaces
import { ReivewSettingsType } from "../../../../interfaces/models";

const WriteReview = () => {
    const { productId } = useRoute<any>().params;
    const isFocused = useIsFocused();

    const { baseTextColor } = useContext(ThemeContext);
    const { changeType, modelState } = useContext(EditDeleteReviewContext);
    const [currentRating, setCurrentRating] = useState(0);
    const [review, setReview] = useState("");
    const [reviewError, setReviewError] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const { loginData } = useSelector((state: RootState) => state.auth);
    const {
        addReviewLoading,
        addReviewError,
        editReviewLoading,
        editReviewError,
    } = useSelector((state: RootState) => state.reviews);

    // effect to make sure when you move out the screen remove edit delete review context data
    useEffect(() => {
        if (!isFocused) return;
        changeType({
            review: null,
            type: ReivewSettingsType.colse,
        });
    }, [isFocused]);

    // effect to render the rating and review when we in edit mode
    useEffect(() => {
        if (modelState.type === ReivewSettingsType.edit) {
            setCurrentRating(modelState.review?.rating!);
            setReview(modelState.review?.review!);
        }
    }, [modelState.type]);

    // show an error message when not add or edit the review
    useEffect(() => {
        if (addReviewError) {
            Toast.show({
                type: "error",
                text1: "Make sure you bought this product and not make a review",
            });
        } else if (editReviewError) {
            Toast.show({
                type: "error",
                text1: editReviewError,
            });
            changeType({
                review: null,
                type: ReivewSettingsType.colse,
            });
        }
        // remove errors in redux state
        dispatch(resetAddEditDeleteDataError());
    }, [addReviewError, editReviewError]);

    const currentValueHandler = (currentValue: string) => {
        setCurrentRating(+currentValue);
    };

    const addEditReviewHandler = () => {
        if (addReviewLoading) return;

        // Validation
        const reviewErr = validateInput({ inputValue: review, type: "Review" });
        setReviewError(reviewErr);
        if (reviewErr) return;

        if (modelState.type === ReivewSettingsType.edit) {
            dispatch(
                editReview({
                    comment: review,
                    productId,
                    rating: currentRating,
                    reviewId: modelState.review?.id!,
                })
            );
        } else {
            dispatch(
                addReview({ comment: review, productId, rating: currentRating })
            );
        }
    };

    return (
        <View style={styles.container}>
            {loginData && loginData.token ? (
                <>
                    <Header small>Write a review</Header>
                    <View style={styles.formContaienr}>
                        <View style={styles.labelContainer}>
                            <Text
                                style={[styles.label, { color: baseTextColor }]}
                            >
                                rating
                            </Text>
                            <Rating rating={currentRating} />
                        </View>
                        <SelectInput
                            currentValue={currentValueHandler}
                            items={reviewsItems}
                            inialValue={currentRating.toString()}
                        />
                        <View>
                            <Input
                                label='Review'
                                onChangeText={setReview}
                                value={review}
                                placeholder='Enter Review'
                                multiline={true}
                                numberOfLines={10}
                                error={reviewError}
                            />
                        </View>
                        <Button
                            loading={
                                ReivewSettingsType.edit === modelState.type
                                    ? editReviewLoading
                                    : addReviewLoading
                            }
                            onPress={addEditReviewHandler}
                            editBtn={
                                ReivewSettingsType.edit === modelState.type
                            }
                        >
                            {ReivewSettingsType.edit === modelState.type
                                ? "edit review"
                                : "add review"}
                        </Button>
                    </View>
                </>
            ) : (
                <ShouldAuthorized>
                    Please create an account to write a review
                </ShouldAuthorized>
            )}
        </View>
    );
};

export default WriteReview;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    formContaienr: {
        marginTop: 15,
        marginHorizontal: 10,
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    label: {
        textTransform: "capitalize",
        marginRight: 10,
        fontWeight: "400",
        fontSize: 16,
    },
});
