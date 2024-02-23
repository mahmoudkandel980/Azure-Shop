import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "../services/productsService";

// interfaces
import {
    CreateProductParams,
    DeleteProductParams,
    EditProductParams,
    GetMyProductsParams,
    GetProductParams,
    GetProductsParams,
    InitialProductsState,
} from "../../interfaces/store/products";
import { Error } from "../../interfaces/public";

const initialState: InitialProductsState = {
    // products
    productsLoading: false,
    productsData: null,
    productsError: null,
    // product
    productLoading: false,
    productData: null,
    productError: null,
    // my products
    myProductsLoading: false,
    myProductsData: null,
    myProductsError: null,
    // create product
    createProductLoading: false,
    createProductData: null,
    createProductError: null,
    // edit my product
    editMyProductLoading: false,
    editMyProductData: null,
    editMyProductError: null,
    // delete my product
    deleteMyProductLoading: false,
    deleteMyProductData: null,
    deleteMyProductError: null,
    // top Rated Best Sale products
    topRatedBestSaleProductsLoading: false,
    topRatedBestSaleProductsData: null,
    topRatedBestSaleProductsError: null,
};

// products
export const products = createAsyncThunk(
    "/products",
    async (args: GetProductsParams, thunkAPI) => {
        try {
            return await productsService.getProducts(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// product
export const product = createAsyncThunk(
    "/product/id",
    async (args: GetProductParams, thunkAPI) => {
        try {
            return await productsService.getProduct(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// myProducts
export const myProducts = createAsyncThunk(
    "/products/myProducts/all",
    async (args: GetMyProductsParams, thunkAPI) => {
        try {
            return await productsService.getMyProducts(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// createProduct
export const createProduct = createAsyncThunk(
    "/products/create",
    async (args: CreateProductParams, thunkAPI) => {
        try {
            return await productsService.createProduct(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// editMyProduct
export const editMyProduct = createAsyncThunk(
    "/products/edit",
    async (args: EditProductParams, thunkAPI) => {
        try {
            return await productsService.editProduct(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// deleteMyProduct
export const deleteMyProduct = createAsyncThunk(
    "/products/delete",
    async (args: DeleteProductParams, thunkAPI) => {
        try {
            return await productsService.deleteProduct(args);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

// topRatedBestSaleProducts
export const topRatedBestSaleProducts = createAsyncThunk(
    "/products/topRatedBestSaleProducts",
    async (_, thunkAPI) => {
        try {
            return await productsService.getTopRatedBestSaleProducts();
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetProducts: (state, dispatch) => ({
            ...state,
            productsData: dispatch.payload,
        }),
        resetProduct: (state, dispatch) => ({
            ...state,
            productData: dispatch.payload,
        }),
        resetTopRatedBestSaleProducts: (state, dispatch) => ({
            ...state,
            topRatedBestSaleProductsData: dispatch.payload,
        }),
        resetMyProducts: (state, dispatch) => ({
            ...state,
            myProductsData: dispatch.payload,
        }),
        resetCreateEditProductDataError: (state) => ({
            ...state,
            createProductData: null,
            createProductError: null,
            editMyProductData: null,
            editMyProductError: null,
        }),
        resetDeleteMyProductDataError: (state) => ({
            ...state,
            deleteMyProductData: null,
            deleteMyProductError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // products
            .addCase(products.pending, (state) => {
                state.productsLoading = true;
                state.productsError = null;
            })
            .addCase(products.fulfilled, (state, action) => {
                state.productsLoading = false;
                const { data } = action.payload;
                state.productsData = data;
            })
            .addCase(products.rejected, (state, action) => {
                state.productsLoading = false;
                state.productsError = action.payload;
            })
            // product
            .addCase(product.pending, (state) => {
                state.productLoading = true;
                state.productError = null;
            })
            .addCase(product.fulfilled, (state, action) => {
                state.productLoading = false;
                const { data } = action.payload;
                state.productData = data.product;
            })
            .addCase(product.rejected, (state, action) => {
                state.productLoading = false;
                state.productError = action.payload;
            })
            // myProducts
            .addCase(myProducts.pending, (state) => {
                state.myProductsLoading = true;
                state.myProductsError = null;
            })
            .addCase(myProducts.fulfilled, (state, action) => {
                state.myProductsLoading = false;
                const { data } = action.payload;
                state.myProductsData = data;
            })
            .addCase(myProducts.rejected, (state, action) => {
                state.myProductsLoading = false;
                state.myProductsError = action.payload;
            })
            // createProduct
            .addCase(createProduct.pending, (state) => {
                state.createProductLoading = true;
                state.createProductError = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.createProductLoading = false;
                const { data } = action.payload;
                state.createProductData = data;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.createProductLoading = false;
                state.createProductError = action.payload;
            })
            // editMyProduct
            .addCase(editMyProduct.pending, (state) => {
                state.editMyProductLoading = true;
                state.editMyProductError = null;
            })
            .addCase(editMyProduct.fulfilled, (state, action) => {
                state.editMyProductLoading = false;
                const { data } = action.payload;
                state.editMyProductData = data;
            })
            .addCase(editMyProduct.rejected, (state, action) => {
                state.editMyProductLoading = false;
                state.editMyProductError = action.payload;
            })
            // deleteMyProduct
            .addCase(deleteMyProduct.pending, (state) => {
                state.deleteMyProductLoading = true;
                state.deleteMyProductError = null;
            })
            .addCase(deleteMyProduct.fulfilled, (state, action) => {
                state.deleteMyProductLoading = false;
                const { data } = action.payload;
                state.deleteMyProductData = data;
            })
            .addCase(deleteMyProduct.rejected, (state, action) => {
                state.deleteMyProductLoading = false;
                state.deleteMyProductError = action.payload;
            })
            // topRatedBestSaleProducts
            .addCase(topRatedBestSaleProducts.pending, (state) => {
                state.topRatedBestSaleProductsLoading = true;
                state.topRatedBestSaleProductsError = null;
            })
            .addCase(topRatedBestSaleProducts.fulfilled, (state, action) => {
                state.topRatedBestSaleProductsLoading = false;
                const { data } = action.payload;
                state.topRatedBestSaleProductsData = data;
            })
            .addCase(topRatedBestSaleProducts.rejected, (state, action) => {
                state.topRatedBestSaleProductsLoading = false;
                state.topRatedBestSaleProductsError = action.payload;
            });
    },
});

export const {
    reset,
    resetProducts,
    resetProduct,
    resetTopRatedBestSaleProducts,
    resetMyProducts,
    resetCreateEditProductDataError,
    resetDeleteMyProductDataError,
} = productsSlice.actions;
export default productsSlice.reducer;
