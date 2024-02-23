import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { dashboard_allOrders as dashboard_allOrdersFun } from "../../../../store/actions/dashboardActions";

import OrdersTabel from "../../../orders/OrdersTabel";
import FilterBox from "../FilterBox";

import { AllOrdersInterface } from "../../../../interfaces/store/order/orderInterface";
import { FilterDataInterface } from "../../../../interfaces/components/dashboard";

const Orders = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const [showModule, setShowModule] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterDataExist, setFilterDataExist] = useState(false);

    const location = useLocation();
    const page = new URLSearchParams(location.search).get("page") || "1";

    const { dashboard_allOrders } = useSelector(
        (state) => state as AllOrdersInterface
    );
    const { loading, error } = dashboard_allOrders;

    useEffect(() => {
        if (!filterDataExist) {
            dispatch(dashboard_allOrdersFun(null, +page));
        }
    }, [dispatch, page, filterDataExist]);

    const filterDataHandler = (filterData: FilterDataInterface) => {
        setFilterDataExist(true);
        if (searchParams.has("page")) {
            searchParams.delete("page");
            setSearchParams(searchParams);
        }
        dispatch(dashboard_allOrdersFun(filterData, 1));
    };

    const showModuleHandler = (toggle: boolean) => {
        setShowModule(toggle);
    };
    return (
        <div
            className={`${
                (loading || error) && showModule && "h-[900px]"
            } mx-auto w-full mt-10`}
        >
            <h3 className='capitalize font-bold break-words tracking-widest text-lg pb-3 sm:pb-6'>
                Orders
            </h3>
            <FilterBox
                filterData={filterDataHandler}
                showModuleHandler={showModuleHandler}
            />

            <OrdersTabel />
        </div>
    );
};

export default Orders;
