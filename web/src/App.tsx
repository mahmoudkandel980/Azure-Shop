import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import openSocket from "socket.io-client";
import useEmitProduct from "./hooks/socket/use-emitProduct";
import useEmitReview from "./hooks/socket/use-emitReview";
import useEmitUser from "./hooks/socket/use-emitUser";
import useEmitOrder from "./hooks/socket/use-emitOrder";

import Spinner from "./components/ui/Spinner";
import AuthRoute from "./components/private/AuthRoute";
import AccessDashboard from "./components/private/AccessDashboard";

const Header = lazy(() => import("./components/header/Header"));
const Footer = lazy(() => import("./components/footer/Footer"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const WishList = lazy(() => import("./pages/WishList"));
const Product = lazy(() => import("./pages/Product"));
const Register = lazy(() => import("./pages/Register"));
const UserDetails = lazy(() => import("./pages/UserDetails"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Order = lazy(() => import("./pages/Order"));

function App() {
    // open socket
    let socket = openSocket(process.env.REACT_APP_BACKEND_URL as string);
    useEmitProduct(socket);
    useEmitReview(socket);
    useEmitOrder(socket);
    useEmitUser(socket);

    return (
        <main className='min-h-screen flex flex-col bg-grayWhite text-smothDark dark:bg-smothDark dark:text-white'>
            <Header />

            <Suspense
                fallback={
                    <div className='w-full flex justify-center items-center relative flex-1 h-56'>
                        <Spinner />
                    </div>
                }
            >
                <Routes>
                    <Route
                        path='/products'
                        element={<Navigate replace to='/' />}
                    />
                    <Route path='/' element={<Products />} />
                    <Route path='/Product/:productId' element={<Product />} />
                    <Route
                        path='/register/:registerType'
                        element={<Register />}
                    />
                    <Route path='/user/:userId' element={<UserDetails />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/wishlist' element={<WishList />} />
                    <Route path='/profile/:type' element={<AuthRoute />}>
                        <Route path='/profile/:type' element={<Profile />} />
                    </Route>
                    <Route path='/Checkout/:section' element={<AuthRoute />}>
                        <Route
                            path='/Checkout/:section'
                            element={<Checkout />}
                        />
                    </Route>
                    <Route path='/orders' element={<AuthRoute />}>
                        <Route path='/orders' element={<Orders />} />
                    </Route>
                    <Route path='/order/' element={<AuthRoute />}>
                        <Route
                            path='/order/:orderId/:process?'
                            element={<Order />}
                        />
                    </Route>
                    <Route path='/dashboard/' element={<AccessDashboard />}>
                        <Route
                            path='/dashboard/:type/:typeId?'
                            element={<Dashboard />}
                        />
                    </Route>
                    <Route
                        path='*'
                        element={<Navigate replace to='/404page' />}
                    />
                    <Route path='/404page' element={<PageNotFound />} />
                </Routes>
            </Suspense>

            <Footer />
        </main>
    );
}

export default App;
