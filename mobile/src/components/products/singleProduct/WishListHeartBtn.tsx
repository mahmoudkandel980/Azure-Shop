import React, { useState, useEffect } from "react";
import { View } from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    addProductToWishList,
    deleteProductFromWishList,
} from "../../../store/slices/wishListSlice";

// components
import Button from "../../shared/Button";

// icons
import { Ionicons } from "@expo/vector-icons";

// colors
import colors from "../../../constants/Colors";

// interface
import { ProductStateInterface } from "../../../interfaces/screens/products";

const WishListHeartBtn = (props: ProductStateInterface) => {
    const [productInWishList, setProductInWishList] = useState(false);
    const [productId, setProductId] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const wishList = useSelector((state: RootState) => state.wishList);

    // effect => to check if the product in cart or not
    useEffect(() => {
        setProductInWishList(false);
        if (wishList.wishListData && wishList.wishListData.length > 0) {
            wishList.wishListData.forEach((item) => {
                if (item.id === props.id) {
                    setProductInWishList(true);
                }
            });
        }
    }, [wishList.wishListData, props]);

    const addRemoveProductFromWishListHandler = () => {
        setProductId(props.id);
        if (productInWishList) {
            // remove
            dispatch(deleteProductFromWishList({ id: props.id }));
        } else {
            // add
            dispatch(addProductToWishList({ ...props }));
        }
    };
    return (
        <View>
            <Button
                onPress={addRemoveProductFromWishListHandler}
                loading={
                    productId !== props.id
                        ? false
                        : productInWishList
                        ? wishList.deleteProductFromWishListLoading
                        : wishList.addProductToWishListLoading
                }
                imgBtn
                icon={
                    <Ionicons
                        name='heart'
                        size={22}
                        color={
                            productInWishList ? colors.darkRed : colors.white
                        }
                    />
                }
            />
        </View>
    );
};

export default WishListHeartBtn;
