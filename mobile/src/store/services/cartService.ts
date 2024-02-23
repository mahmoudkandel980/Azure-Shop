import baseRoute from "../../api/baseRoute";
import AsyncStorage from "@react-native-async-storage/async-storage";

// interfaces
import {
    addProductToCartParams,
    deleteProductFromCartParams,
} from "../../interfaces/store/cart";
import { CartItem } from "../../interfaces/screens/cart";

const allProductsInCart = async () => {
    const token = await AsyncStorage.getItem("token");
    let data = null;

    if (token) {
        // authorized
        const res = await baseRoute.get("/cart");
        data = res.data.cart;
        await AsyncStorage.setItem("cartItems", JSON.stringify(data));

        return { data };
    } else {
        // not authorized
        const cartItems = await AsyncStorage.getItem("cartItems");
        if (cartItems) {
            data = JSON.parse(cartItems);
        }

        return { data };
    }
};

const addProductToCart = async (formData: addProductToCartParams) => {
    const token = await AsyncStorage.getItem("token");
    let data;

    if (token) {
        // authorized
        await baseRoute.post("/cart", {
            id: formData.product.id,
            qty: formData.qty,
        });
    }
    // not authorized && Authorized
    const { product, qty } = formData;

    const cartItems = await AsyncStorage.getItem("cartItems");
    let oldCart = cartItems ? JSON.parse(cartItems) : [];
    if (oldCart.length === 0) {
        data = [{ ...formData }];
    } else {
        const productIndexInCart = oldCart.findIndex(
            (item: CartItem) => item.product.id === product.id
        );
        if (productIndexInCart !== -1) {
            oldCart[productIndexInCart] = { product, qty };
            data = oldCart;
        } else {
            data = [...oldCart, { product, qty }];
        }
    }

    await AsyncStorage.setItem("cartItems", JSON.stringify(data));
    return { data };
};

const deleteProductFromCart = async (formData: deleteProductFromCartParams) => {
    const token = await AsyncStorage.getItem("token");
    let data;

    if (token) {
        // authorized
        await baseRoute.patch("/cart", { id: formData.id });
    }
    // not authorized && Authorized
    const { id } = formData;

    const cartItems = await AsyncStorage.getItem("cartItems");
    let oldCart = JSON.parse(cartItems!);
    const indexOfProduct = oldCart.findIndex(
        (p: CartItem) => p.product.id === id
    );
    oldCart.splice(indexOfProduct, 1);
    data = oldCart;

    await AsyncStorage.setItem("cartItems", JSON.stringify(data));
    return { data };
};

const cartService = {
    allProductsInCart,
    addProductToCart,
    deleteProductFromCart,
};

export default cartService;
