import { UserInfo } from "../store/user/userInterface";
import { ProductStateInterface } from "../store/product/productInterface";
import { ProductFormError } from "./public";

export interface CreateEditProductFormInterface {
    userInfo: UserInfo;
    product: ProductStateInterface;
    name: string;
    category: string;
    description: string;
    price: number;
    priceDiscount: number;
    countInStock: number;
    imageUrl: string;
    localImage: File | null;
    formError: ProductFormError;
    loading: boolean;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    createProduct: boolean;
}

export interface CreateEditProductModelInterface {
    header: string;
    showEditProductModel: boolean;
    loading?: boolean;
    userInfo: UserInfo;
    product: ProductStateInterface | null;
    createProduct: boolean;
    onClose: (type: boolean) => void;
}

export interface BackdropInterface {
    hideBackgroundColor?: boolean;
    onClose: () => void;
}

export interface ConfirmAcceptInterface {
    header: string;
    text: string;
    element: string;
    loading?: boolean;
    showAcceptModel: boolean;
    confirmAcceptHandler: (type: boolean) => void;
}

export interface ConfirmDeleteInterface {
    header: string;
    text: string;
    element: string;
    loading?: boolean;
    showDeleteModel: boolean;
    confirmDeleteHandler: (type: boolean) => void;
}

export interface EditDeleteProductsModelInterface {
    editProductModel: ProductStateInterface | null;
    deleteProductModel: ProductStateInterface | null;
    deleteProductModelHandler: (param: ProductStateInterface) => void;
    editProductModelHandler: (param: ProductStateInterface) => void;
}

export interface EditProductModelInterface {
    product: ProductStateInterface | null;
    showEditProductModel: boolean;
}

export interface DeleteProductModelInterface {
    product: ProductStateInterface | null;
    showDeleteProductModel: boolean;
}
