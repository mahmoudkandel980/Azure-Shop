import baseRoute from "../../../api/baseRoute";
import TransformToFormDataFun from "../../../helpers/TransformToFormDataFun";

// interfaces
import {
    DeleteProductParams,
    EditProductParams,
    OrdersParams,
} from "../../../interfaces/store/dashboard/productsOrders";

const productsOverview = async () => {
    const { data } = await baseRoute.get(`/products/dashboard/overview`);

    return { data };
};

const editProduct = async (formData: EditProductParams) => {
    const { productId, productFormData } = formData;
    const submittedFormData = TransformToFormDataFun(productFormData);

    const { data } = await baseRoute.patch(
        `/products/dashboard/products/${productId}`,
        submittedFormData
    );

    return { data };
};

const deleteProduct = async (formData: DeleteProductParams) => {
    const { productId } = formData;

    const { data } = await baseRoute.delete(
        `/products/dashboard/products/${productId}`
    );

    return { data };
};

const orders = async (formData: OrdersParams) => {
    const { filterData, page } = formData;

    const { data } = await baseRoute.get(
        `/orders/dashboard?${
            filterData ? `filterData=${JSON.stringify(filterData)}&` : ""
        }page=${page}`
    );

    return { data };
};

const dashboardProductsOrdersService = {
    productsOverview,
    editProduct,
    deleteProduct,
    orders,
};

export default dashboardProductsOrdersService;
