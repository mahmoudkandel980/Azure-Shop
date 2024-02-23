import { CSSProperties } from "react";

export interface NotificationDotInterface {
    className: string;
    children: string | number;
}

export interface UserFormError {
    name: string;
    email: string;
    imageUrl: string;
    role: string;
    activeStatus: string;
    backendError: string;
}

export interface ProductFormError {
    name: string;
    imageUrl: string;
    category: string;
    description: string;
    price: string;
    priceDiscount: string;
    countInStock: string;
    backendError: string;
}

export interface NavItemInterface {
    id: string;
    JSXicon: JSX.Element;
    to: string;
    children: string;
}

export interface ClassNameInterface {
    className?: string;
}

export interface MessageInterface {
    className?: string;
    type?: string;
    children: string;
}

export interface ConvertedPriceInterface {
    className?: string;
    price: number;
}

export interface InputInterface {
    htmlFor?: string;
    label?: string;
    type?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    minLength?: number;
    min?: number;
    max?: number;
    step?: number;
    readOnly?: boolean;
    error?: string;
    onBlur?: () => void;
    checked?: boolean;
    required?: boolean;
    textStart?: boolean;
}

export interface SelectInputInterface {
    htmlFor: string;
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    error?: string;
    options: string[];
}

export interface ButtonInterface {
    className?: string;
    type?: string;
    children?: string | JSX.Element;
    to?: string;
    onClick?: () => void;
    deleteBtn?: boolean;
    editBtn?: boolean;
    createBtn?: boolean;
    style?: CSSProperties;
    imgBtn?: boolean;
}

export interface PaginationInterface {
    total_pages?: number;
}

export interface PaginationButtonsInterface {
    icon: JSX.Element;
    target: string;
    page: number;
    pathName: string;
}

export interface RatingInterface {
    rating: number;
}

export interface ButtonSpinnerInterface {
    className: string;
}

export interface OnClickInterface {
    onClick: () => void;
}

export interface DropDownInterface {
    htmlFor: string;
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    error?: string;
    options: string[];
    openDropDown: boolean;
    openHandler: (type: boolean) => void;
}

export interface CreatedAtInterface {
    createdAt: string;
}

export interface PriceSummaryInterface {
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    children: JSX.Element;
    isPaid?: boolean;
    isDelivered?: boolean;
}

export type errorInterface = any;

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

export interface UseShowErrorMessageInterface {
    loading?: boolean;
    error?: string;
    time: number;
}
