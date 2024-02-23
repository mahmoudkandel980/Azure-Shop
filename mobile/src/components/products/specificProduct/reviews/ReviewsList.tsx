import React, { useState } from "react";
import { ScrollView } from "react-native";

// components
import SingleReview from "./SingleReview";
import WriteReview from "./WriteReview";

// interfaces
import { ProductReviewsData } from "../../../../interfaces/screens/reviews";
import ErrorMessage from "../../../shared/ErrorMessage";

const ReviewsList = (props: ProductReviewsData) => {
    return (
        <ScrollView>
            {props.reviews && props.reviews.length > 0 ? (
                <>
                    {props.reviews.map((item) => (
                        <SingleReview key={item.id} {...item} />
                    ))}
                </>
            ) : (
                <ErrorMessage>No Reviews Yet</ErrorMessage>
            )}

            {/* write a review */}
            <WriteReview />
        </ScrollView>
    );
};

export default ReviewsList;
