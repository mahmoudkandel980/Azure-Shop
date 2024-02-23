import React from "react";

import { Image as Img } from "react-native";

import { CLOUDINARY_URL } from "../../api/baseRoute";

// interfaces
import { ImageProps } from "../../interfaces/shared";

const Image = (props: ImageProps) => {
    const { borderRadius, height, width, uri } = props;

    return (
        <Img
            style={[{ width, height, borderRadius }]}
            source={{
                uri:
                    uri === "default.jpg"
                        ? `${process.env.EXPO_PUBLIC_API_IMAGES_URL}/users/${uri}`
                        : `${CLOUDINARY_URL}/${uri}`,
            }}
        />
    );
};

export default Image;
