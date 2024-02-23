import { FilterDate } from "../../screens/dashboard";
import { Orders } from "../../screens/order";
import {
    ProductStateInterface,
    ProductsOverview,
    ProductFormData,
} from "../../screens/products";

export interface InitialDashboardProductsOrdersState {
    // productsOverview
    productsOverviewLoading: boolean;
    productsOverviewData: null | ProductsOverview;
    productsOverviewError: null | any;
    // editProduct
    editProductLoading: boolean;
    editProductData: null | ProductStateInterface;
    editProductError: null | any;
    // deleteProduct
    deleteProductLoading: boolean;
    deleteProductData: null | string;
    deleteProductError: null | any;
    // orders
    ordersLoading: boolean;
    ordersData: null | Orders;
    ordersError: null | any;
}

export interface EditProductParams {
    productId: string;
    productFormData: ProductFormData;
}

export interface DeleteProductParams {
    productId: string;
}

export interface OrdersParams {
    filterData: FilterDate | null;
    page: number;
}
