import { TextInputProps } from "react-native";

export type Error = any;

export enum PageType {
    home = "home",
    dashboard = "dashboard",
}

export interface FilterDateInterface {
    // mutual
    id?: string;
    createdFrom?: string;
    createdTo?: string;
    // products
    category?: string;
    priceFrom?: string;
    priceTo?: string;
    rate?: string;
    // users
    email?: string;
    role?: string;
    active?: string;
    // orders
    isPaid?: string;
    isDelivered?: string;
    // products && users
    name?: string;
}

export interface ScrollViewLayoutProps {
    children: React.ReactNode;
}

export interface ValidateInputProps {
    inputValue: string;
    type:
        | "Name"
        | "Email"
        | "Password"
        | "Current Password"
        | "New Password"
        | "Review"
        | "Category"
        | "Description"
        | "Price"
        | "Price Discount"
        | "Count In Stock"
        | "Address"
        | "City"
        | "Country"
        | "Phone"
        | "Postal Code";
}
export interface ValidateImageInputProps {
    inputValue: object | null;
    type: "Image";
}

export interface ValidateConfrimPasswordProps {
    password: string;
    ConfrimPassword: string;
}
