import baseRoute from "../../api/baseRoute";
import AsyncStorage from "@react-native-async-storage/async-storage";

// interfaces
import {
    addProductToWishListParams,
    deleteProductFromWishListParams,
} from "../../interfaces/store/wishList";
import { ProductStateInterface } from "../../interfaces/screens/products";

const allProductsInWishList = async () => {
    const token = await AsyncStorage.getItem("token");
    let data = null;

    if (token) {
        // authorized
        const res = await baseRoute.get("/wishList");
        data = res.data.wishList;
        await AsyncStorage.setItem("wishListItems", JSON.stringify(data));
    } else {
        // not authorized
        const wishListItems = await AsyncStorage.getItem("wishListItems");
        if (wishListItems) {
            data = JSON.parse(wishListItems);
        }
    }

    return { data };
};

const addProductToWishList = async (formData: addProductToWishListParams) => {
    const token = await AsyncStorage.getItem("token");
    let data;

    if (token) {
        // authorized
        let { data } = await baseRoute.post("/wishList", { id: formData.id });
        const wishList = data.wishList;
        const wishListItems = await AsyncStorage.getItem("wishListItems");
        let oldWishList = wishListItems ? JSON.parse(wishListItems) : [];
        data = [...oldWishList, wishList];

        return { data };
    } else {
        // not authorized
        const { id } = formData;
        const wishListItems = await AsyncStorage.getItem("wishListItems");
        let oldWishList = wishListItems ? JSON.parse(wishListItems) : [];

        if (oldWishList.length === 0) {
            data = [{ ...formData }];
        } else {
            const productIndexInWishList = oldWishList.findIndex(
                (item: ProductStateInterface) => item.id === id
            );
            if (productIndexInWishList === -1) {
                data = [...oldWishList, { ...formData }];
            }
        }

        await AsyncStorage.setItem("wishListItems", JSON.stringify(data));
        return { data };
    }
};

const deleteProductFromWishList = async (
    formData: deleteProductFromWishListParams
) => {
    const token = await AsyncStorage.getItem("token");
    let data;

    if (token) {
        // authorized
        await baseRoute.patch("/wishList", { id: formData.id });
    }

    // not authorized && Authorized
    const { id } = formData;

    const wishListItems = await AsyncStorage.getItem("wishListItems");
    let oldWishList = JSON.parse(wishListItems!);
    const indexOfProduct = oldWishList.findIndex(
        (p: ProductStateInterface) => p.id === id
    );
    oldWishList.splice(indexOfProduct, 1);
    data = oldWishList;

    await AsyncStorage.setItem("wishListItems", JSON.stringify(data));
    return { data };
};

const wishListService = {
    allProductsInWishList,
    addProductToWishList,
    deleteProductFromWishList,
};

export default wishListService;
