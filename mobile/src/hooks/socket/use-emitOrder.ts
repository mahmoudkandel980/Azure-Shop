import { useEffect } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { resetProduct } from "../../store/slices/productsSlice";
import {
    resetOrderByOrderId,
    resetMyOrdersData,
} from "../../store/slices/ordersSlice";
import { resetOrdersData } from "../../store/slices/dashboard/productOrderSlice";

// helper functions
import { isExist, findIndex } from "../../helpers/utilitiesFunForSocketIo";

// lodash
import _ from "lodash";

const useEmitOrder = (socket: any) => {
    const dispatch = useDispatch<AppDispatch>();

    const { orderByOrderIdData, myOrdersData } = useSelector(
        (state: RootState) => state.orders
    );
    const { productData } = useSelector((state: RootState) => state.products);

    const { ordersData } = useSelector(
        (state: RootState) => state.dashbordProductsOrders
    );

    useEffect(() => {
        const handler = async (data: any) => {
            // ----------------------------------
            // WHEN ORDER IS CREATED
            // ----------------------------------
            if (data.action === "create") {
                const order = data.order;
                if (ordersData && ordersData.orders) {
                    const newOrders = _.cloneDeep(ordersData.orders);
                    newOrders?.splice(0, 0, order);
                    dispatch(
                        resetOrdersData({
                            ...ordersData,
                            orders: newOrders,
                            ITEMS_PER_PAGE: ordersData.ITEMS_PER_PAGE + 1 || 1,
                        })
                    );
                }
            }

            // ----------------------------------
            // WHEN ORDER IS PAID
            // ----------------------------------
            if (data.action === "paid") {
                const product = data.data.product;
                // productDetails
                const isCurrentProductDetailsIsProductEdited = isExist(
                    productData,
                    product.id
                );
                if (isCurrentProductDetailsIsProductEdited) {
                    dispatch(resetProduct({ ...product }));
                }
            }

            // ----------------------------------
            // WHEN ORDER IS PAID
            // ----------------------------------
            if (data.action === "paid" || data.action === "delivered") {
                let order;
                if (data.action === "paid") {
                    order = data.data.order;
                } else {
                    order = data.order;
                }

                // getMyOrders
                const indexOfOrderInMyOrders =
                    myOrdersData &&
                    myOrdersData.orders &&
                    myOrdersData.orders.length > 0
                        ? await findIndex(myOrdersData.orders, order.id)
                        : -1;

                if (indexOfOrderInMyOrders !== -1) {
                    const newMyOrders = _.cloneDeep(myOrdersData?.orders!);
                    newMyOrders[indexOfOrderInMyOrders] = order;
                    myOrdersData?.orders;
                    dispatch(
                        resetMyOrdersData({
                            ...myOrdersData,
                            orders: newMyOrders,
                            ITEMS_PER_PAGE:
                                myOrdersData?.ITEMS_PER_PAGE! + 1 || 1,
                        })
                    );
                }

                // getOrderByOrderId
                if (
                    orderByOrderIdData &&
                    orderByOrderIdData.id &&
                    orderByOrderIdData.id === order.id
                ) {
                    dispatch(resetOrderByOrderId({ ...order }));
                }

                // dashboard_allOrders
                const indexOfOrderInAllOrders =
                    ordersData &&
                    ordersData.orders &&
                    ordersData.orders.length > 0
                        ? await findIndex(ordersData.orders, order.id)
                        : -1;
                if (indexOfOrderInAllOrders !== -1) {
                    const newOrders = _.cloneDeep(ordersData?.orders!);
                    newOrders[indexOfOrderInAllOrders] = order;
                    dispatch(
                        resetOrdersData({
                            ...ordersData,
                            orders: newOrders,
                        })
                    );
                }
            }
        };

        socket.on("order", handler);
        return () => socket.off("order", handler);
    }, [
        socket,
        dispatch,
        productData,
        myOrdersData,
        orderByOrderIdData,
        ordersData,
    ]);
};

export default useEmitOrder;
