import { ProductStateInterface } from "../screens/products";

export interface InitialWishListState {
    // wishList
    wishListLoading: boolean;
    wishListData: null | ProductStateInterface[];
    wishListError: null | any;
    // addProductToWishList
    addProductToWishListLoading: boolean;
    addProductToWishListData: null | ProductStateInterface[];
    addProductToWishListError: null | any;
    // deleteProductFromWishList
    deleteProductFromWishListLoading: boolean;
    deleteProductFromWishListData: null | string;
    deleteProductFromWishListError: null | any;
}

export interface addProductToWishListParams extends ProductStateInterface {}

export interface deleteProductFromWishListParams {
    id: string;
}
