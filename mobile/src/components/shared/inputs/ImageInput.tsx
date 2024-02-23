import React, { useState, useContext } from "react";
import {
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Pressable,
    Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

// icons
import { Ionicons } from "@expo/vector-icons";

// components
import Img from "../Image";

// colors
import colors from "../../../constants/Colors";

// context
import ThemeContext from "../../../context/darkModeTheme";

// interfaces
import { ImageInputProps } from "../../../interfaces/shared";

const ImageInput = (props: ImageInputProps) => {
    const { imageUrl, imageUrlError, localImage } = props;
    const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
        null
    );

    const { baseBgColor, baseTextColor } = useContext(ThemeContext);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: false,
        });

        if (!result.canceled) {
            setImage(result);
            // localImage(result.assets[0]);

            let filename: any = result.assets[0].uri.split("/").pop();
            localImage({
                name: filename,
                type: `image/${filename.split(".").pop()}`,
                // type: result.assets[0].type,
                uri:
                    Platform.OS === "android"
                        ? result.assets[0].uri
                        : result.assets[0].uri.replace("file://", ""),
            });
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.image,
                    styles.imageContainer,
                    { borderColor: baseTextColor },
                ]}
            >
                {imageUrl || (image && image.assets) ? (
                    image && image.assets ? (
                        <Image
                            source={{ uri: image.assets[0].uri }}
                            style={styles.image}
                        />
                    ) : (
                        <Img
                            width={150}
                            height={150}
                            borderRadius={150}
                            uri={imageUrl}
                        />
                    )
                ) : (
                    <TouchableOpacity
                        style={[styles.uploadImage]}
                        onPress={pickImage}
                    >
                        <Ionicons
                            name='cloud-upload-outline'
                            size={80}
                            color={baseTextColor}
                        />
                    </TouchableOpacity>
                )}
                <Pressable
                    style={[
                        styles.cameraButton,
                        { backgroundColor: baseBgColor },
                    ]}
                    onPress={pickImage}
                >
                    <Ionicons
                        name='camera-outline'
                        size={30}
                        color={baseTextColor}
                        style={{ opacity: 0.85 }}
                    />
                </Pressable>
            </View>
            {imageUrlError ? (
                <Text style={styles.errorMessage}>{imageUrlError}</Text>
            ) : (
                <></>
            )}
        </View>
    );
};

export default ImageInput;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        position: "relative",
        borderWidth: 0.5,
        borderRadius: 150,
    },
    uploadImage: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        opacity: 0.5,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    cameraButton: {
        position: "absolute",
        padding: 5,
        borderRadius: 50,
        bottom: 5,
        right: 5,
    },
    errorMessage: {
        fontSize: 14,
        marginTop: 1,
        marginLeft: 5,
        fontWeight: "500",
        color: colors.darkRed,
        opacity: 0.9,
        textTransform: "capitalize",
    },
});
