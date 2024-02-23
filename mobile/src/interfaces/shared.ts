import { TextInputProps, StyleProp, TextStyle, ViewStyle } from "react-native";
import { ProductStateInterface } from "./screens/products";
import * as ImagePicker from "expo-image-picker";
import React from "react";

export interface AddRemoveCartButtonProps {
    product: ProductStateInterface;
    quantity?: number;
}

export interface ShouldAuthorizedProps {
    children: string;
}

export interface InputProps extends TextInputProps {
    hideErrorMessagePosition?: boolean;
    icon?: React.ReactNode;
    label?: string;
    type?: string;
    error?: string;
}

export interface HeaderProps {
    children: string;
    small?: boolean;
    alignSelf?: "center" | "start";
}

export interface ErrorMessageProps {
    children: string;
}

export interface SelectInputProps {
    inialValue?: string;
    currentValue: (value: string) => void;
    label?: string;
    error?: string;
    items: {
        label: string;
        value: string;
    }[];
    hideErrorMessagePosition?: boolean;
}

export interface ButtonProps {
    small?: boolean;
    icon?: any;
    children?: string;
    navigation?: string;
    onPress?: () => void;
    deleteBtn?: boolean;
    editBtn?: boolean;
    createBtn?: boolean;
    navgationBtn?: boolean;
    loading?: boolean;
    imgBtn?: boolean;
}

export interface RatingProps {
    rating: number;
    numReviews?: number;
    showReviewsNo?: boolean;
    size?: number;
}

export interface ConvertedPriceProps {
    oldPrice?: boolean;
    price: number;
    color?: string;
    size?: number;
}

export interface ImageInputProps {
    imageUrl: string;
    imageUrlError: string;
    localImage: (assets: object) => void;
}

export interface TabelHeaderProps {
    headerElements: string[];
}

export interface ImageProps {
    width: number;
    height: number;
    borderRadius: number;
    uri: string;
}

export interface PaginationProps {
    total_pages: number;
}

export type RadioButtonProps = {
    accessibilityLabel?: string;
    borderColor?: string;
    borderSize?: number;
    color?: string;
    containerStyle?: StyleProp<ViewStyle>;
    description?: string;
    descriptionStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    key?: string;
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    layout?: "row" | "column";
    onPress?: (value: string) => void;
    selected?: boolean;
    size?: number;
    value?: string;
};

export type RadioGroupProps = {
    accessibilityLabel?: string;
    containerStyle?: StyleProp<ViewStyle>;
    layout?: "row" | "column";
    onPress?: (selectedValue: string) => void;
    radioButtons: RadioButtonProps[];
    selectedValue?: string;
    label?: string;
};

export interface NotificationDotProps {
    type: "cartProductsNumber" | "usersWantToBeSellersNumber" | "both";
}

export interface NotificationDotContainerProps {
    children: number | string;
}

export interface DateInputProps {
    label: string;
    placeholder: string;
    dateValueBearor: (date: Date | string) => void;
}
