import React, { ReactNode } from "react";
import { ProductStateInterface } from "./products";
import { CartItem } from "./cart";

export interface AuthContainerI {
    header: string;
    children: ReactNode;
}

export interface UserInfo {
    token?: string | undefined;
    _id?: string;
    id?: string;
    name?: string;
    email?: string;
    imageUrl?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
    activeStatus?: boolean;
    nominateAsSeller?: {
        wantToBeSeller: boolean;
        date?: string | undefined;
    };
    products?: ProductStateInterface[] | [];
}

export interface LoginSignUp extends UserInfo {
    cart?: CartItem[];
    wishList?: ProductStateInterface[];
}
