import baseRoute from "../../api/baseRoute";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    CreateCheckoutSessionParams,
    MyordersParams,
    OrderByOrderIdParams,
    UpdateOrderToDeliveredParams,
    UpdateOrderToPaidParams,
} from "../../interfaces/store/orders";
import TransformToFormDataFun from "../../helpers/TransformToFormDataFun";

const createOrder = async () => {
    const shippingData = await AsyncStorage.getItem("shippingData");

    const { data } = await baseRoute.post(`/orders`, JSON.parse(shippingData!));

    return { data };
};

const myOrders = async (formData: MyordersParams) => {
    const { page } = formData;

    const { data } = await baseRoute.get(`/orders/myorders?page=${page}`);

    return { data };
};

const orderByOrderId = async (formData: OrderByOrderIdParams) => {
    const { id } = formData;

    const { data } = await baseRoute.get(`/orders/${id}`);

    return { data };
};

const createCheckoutSession = async (formData: CreateCheckoutSessionParams) => {
    const { id } = formData;

    const { data } = await baseRoute.post(
        `/orders/${id}/create-checkout-session`,
        { id }
    );

    return { data };
};

const updateOrderToPaid = async (formData: UpdateOrderToPaidParams) => {
    const { id, process } = formData;

    const { data } = await baseRoute.patch(`/orders/${id}/pay/${process}`, {
        id,
    });

    return { data };
};

const updateOrderToDelivered = async (
    formData: UpdateOrderToDeliveredParams
) => {
    const { id } = formData;

    const { data } = await baseRoute.patch(`/orders/${id}/deliver`, { id });

    return { data };
};

const ordersService = {
    createOrder,
    myOrders,
    orderByOrderId,
    createCheckoutSession,
    updateOrderToPaid,
    updateOrderToDelivered,
};

export default ordersService;
