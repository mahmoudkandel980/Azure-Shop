import baseRoute from "../../api/baseRoute";

// helpers
import TransformToFormDataFun from "../../helpers/TransformToFormDataFun";

// interfaces
import {
    CreateProductParams,
    DeleteProductParams,
    EditProductParams,
    GetMyProductsParams,
    GetProductParams,
    GetProductsParams,
} from "../../interfaces/store/products";

const getProducts = async (formData: GetProductsParams) => {
    const { filterData, page, pageType } = formData;

    return await baseRoute.get(
        `/products?${
            filterData ? `filterData=${JSON.stringify(filterData)}&` : ""
        }page=${page}${pageType && `&pageType=${pageType}`}`
    );
};

const getProduct = async (formData: GetProductParams) => {
    const { id } = formData;

    return await baseRoute.get(`/products/${id}`);
};

const getMyProducts = async (formData: GetMyProductsParams) => {
    const { page } = formData;

    return await baseRoute.get(`/products/myProducts/all?page=${page}`);
};

const createProduct = async (formData: CreateProductParams) => {
    const submittedFormData = TransformToFormDataFun(formData);

    return await baseRoute.post(`/products`, submittedFormData);
};

const editProduct = async (formData: EditProductParams) => {
    const { productId } = formData;
    const submittedFormData = TransformToFormDataFun(formData);

    return await baseRoute.patch(`/products/${productId}`, submittedFormData);
};

const deleteProduct = async (formData: DeleteProductParams) => {
    const { productId } = formData;

    return await baseRoute.delete(`/products/${productId}`);
};

const getTopRatedBestSaleProducts = async () => {
    return await baseRoute.get(`/products/topRated&bestSale_Products`);
};

const authService = {
    getTopRatedBestSaleProducts,
    getProducts,
    getProduct,
    getMyProducts,
    createProduct,
    editProduct,
    deleteProduct,
};

export default authService;
