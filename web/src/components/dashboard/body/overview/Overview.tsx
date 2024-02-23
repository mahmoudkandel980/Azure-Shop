import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import {
    dashboard_usersOverView as dashboard_usersOverViewFun,
    dashboard_productsOverView as dashboard_productsOverViewFun,
} from "../../../../store/actions/dashboardActions";

import UsersGraph from "./charts/users/UsersGraph";
import UsersStateCharts from "./charts/users/UsersStateCharts";
import UsersIsActiveAnInactiveChart from "./charts/users/UsersIsActiveAnInactiveChart";

import ProductGraph from "./charts/products/ProductGraph";
import ProductsRating from "./charts/products/ProductsRating";

import Spinner from "../../../ui/Spinner";
import Message from "../../../ui/Message";

import {
    UsersOverViewInterface,
    ProductsOverViewInterface,
} from "../../../../interfaces/store/user/userInterface";

const Overview = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const { dashboard_usersOverView } = useSelector(
        (state) => state as UsersOverViewInterface
    );
    const { loading, error, users } = dashboard_usersOverView;

    const { dashboard_productsOverView } = useSelector(
        (state) => state as ProductsOverViewInterface
    );
    const {
        loading: productsLoading,
        error: productsError,
        products,
        graphProducts,
    } = dashboard_productsOverView;

    useEffect(() => {
        dispatch(dashboard_usersOverViewFun());
        dispatch(dashboard_productsOverViewFun());
    }, [dispatch]);

    return (
        <div className='mx-auto w-full'>
            <h3 className='mt-10 capitalize font-bold break-words tracking-widest text-lg pb-3 sm:pb-6'>
                users data
            </h3>
            {loading || productsLoading ? (
                <Spinner />
            ) : error || productsError ? (
                <Message type='error'>{error! || productsError!}</Message>
            ) : (
                <div className='grid'>
                    <div className='border-b-[1px] dark:border-darkGray pb-5 sm:pb-14'>
                        {users && (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10 xl:gap-20 mt-5'>
                                <div className='w-full'>
                                    <h4 className='capitalize text-sm font-semibold '>
                                        Users graph
                                    </h4>

                                    <UsersGraph users={users} />
                                </div>
                                <div className='grid sm:grid-cols-2  md:grid-cols-1 lg:grid-cols-2 sm:gap-5 self-stretch justify-self-stretch h-full w-full'>
                                    <div className='flex  justify-start items-start w-[85%] sm:w-full'>
                                        <h4 className='capitalize text-sm font-semibold absolute'>
                                            Percentage of Roles
                                        </h4>
                                        <UsersStateCharts users={users} />
                                    </div>
                                    <div className='flex justify-start items-start w-[85%] sm:w-full'>
                                        <h4 className='capitalize text-sm font-semibold absolute'>
                                            Percentage of active and inactive
                                        </h4>
                                        <UsersIsActiveAnInactiveChart
                                            users={users}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='pt-5 sm:pt-14'>
                        <h3 className='capitalize font-bold break-words tracking-widest text-lg pb-3 sm:pb-6'>
                            products data
                        </h3>
                        {products && (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10 xl:gap-20 mt-5'>
                                <div className='w-full'>
                                    <h4 className='capitalize text-sm font-semibold '>
                                        products graph
                                    </h4>
                                    <ProductGraph
                                        graphProducts={graphProducts}
                                    />
                                </div>
                                <div className='grid sm:grid-cols-2  md:grid-cols-1 lg:grid-cols-2 sm:gap-5 self-stretch justify-self-stretch h-full w-full'>
                                    <div className='flex  justify-start items-start w-[85%] sm:w-full'>
                                        <h4 className='capitalize text-sm font-semibold absolute'>
                                            Percentage of products rating
                                        </h4>
                                        <ProductsRating products={products} />
                                    </div>
                                    <div className='flex justify-start items-start w-[85%] sm:w-full'></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Overview;
