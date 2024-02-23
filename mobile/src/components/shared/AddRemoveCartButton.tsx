import React, { useState, useEffect } from "react";

// colors
import colors from "../../constants/Colors";

// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    addProductToCart,
    deleteProductFromCart,
} from "../../store/slices/cartSlice";

// components
import Button from "./Button";

// interfaces
import { AddRemoveCartButtonProps } from "../../interfaces/shared";

const AddRemoveCartButton = (props: AddRemoveCartButtonProps) => {
    const { product, quantity } = props;
    const [productInCart, setProductInCart] = useState(false);
    const [productId, setProductId] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart);

    // effect => to check if the product in cart or not
    useEffect(() => {
        setProductInCart(false);
        if (cart.cartData && cart.cartData.length > 0) {
            cart.cartData.forEach((item) => {
                if (item.product.id === product.id) {
                    setProductInCart(true);
                }
            });
        }
    }, [cart.cartData, product]);

    const addRemoveProductFromCartHandler = () => {
        setProductId(product.id);
        if (productInCart) {
            // remove
            dispatch(deleteProductFromCart({ id: product.id }));
        } else {
            // add
            dispatch(
                addProductToCart({ product: product, qty: quantity || 1 })
            );
        }
    };

    return (
        <>
            <Button
                onPress={addRemoveProductFromCartHandler}
                deleteBtn={productInCart ? true : false}
                createBtn={productInCart ? false : true}
                loading={
                    productId !== product.id
                        ? false
                        : productInCart
                        ? cart.deleteProductFromCartLoading
                        : cart.addProductToCartLoading
                }
                icon={
                    <MaterialCommunityIcons
                        name={productInCart ? "cart-remove" : "cart-plus"}
                        size={16}
                        color={colors.white}
                    />
                }
            >
                {productInCart ? "Remove from Cart" : "Add to Cart"}
            </Button>
        </>
    );
};

export default AddRemoveCartButton;
