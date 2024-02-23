import AsyncStorage from "@react-native-async-storage/async-storage";

// interfaces
import { CartItem } from "../interfaces/screens/cart";
import { ProductStateInterface } from "../interfaces/screens/products";

interface ModifiedCartItem {
    id: string;
    qty: number;
}

const TransformToFormDataFun = (formData: Object) => {
    const SubmitedFormDate = new FormData();
    for (const key in formData) {
        SubmitedFormDate.append(
            key,
            // @ts-ignore
            formData[key as keyof typeof formData]
            // JSON.stringify(formData[key as keyof typeof formData])
        );
    }
    return SubmitedFormDate;
};

export default TransformToFormDataFun;

export const TransformedCartDataWishListIds = (
    cartItems: CartItem[],
    wishListItems: ProductStateInterface[]
) => {
    let convertedCartItems: ModifiedCartItem[] = [];
    let convertedWishListItems: string[] = [];

    if (cartItems && cartItems.length > 0) {
        convertedCartItems = cartItems.map((one) => ({
            id: one.product.id,
            qty: one.qty,
        }));
    }

    if (wishListItems && wishListItems.length > 0) {
        convertedWishListItems = wishListItems.map((one) => one.id);
    }

    return { convertedCartItems, convertedWishListItems };
};
