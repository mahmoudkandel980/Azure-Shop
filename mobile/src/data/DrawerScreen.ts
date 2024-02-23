// icons
import {
    Ionicons,
    FontAwesome,
    Octicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

// Screens
import ProductsScreen from "../screens/Products";
import Dashboard from "../screens/Dashboard";
import WishList from "../screens/WishList";
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
import Register from "../screens/Register";
import Profile from "../screens/Profile";

export const DRAWER_SCREENS = [
    {
        name: "ProductsScreens",
        title: "Products",
        Componet: ProductsScreen,
        IconType: MaterialCommunityIcons,
        iconName: "cart-variant",
        private: false,
        allowedToAllUsers: true,
        hideInAuth: false,
    },
    {
        name: "Dashboard",
        Componet: Dashboard,
        IconType: MaterialCommunityIcons,
        iconName: "view-dashboard",
        private: true,
        allowedToAllUsers: false,
        hideInAuth: false,
    },
    {
        name: "WishList",
        Componet: WishList,
        IconType: FontAwesome,
        iconName: "heart",
        private: false,
        allowedToAllUsers: true,
        hideInAuth: false,
    },
    {
        name: "Cart",
        Componet: Cart,
        IconType: MaterialCommunityIcons,
        iconName: "cart-variant",
        private: false,
        allowedToAllUsers: true,
        hideInAuth: false,
    },
    {
        name: "OrdersScreens",
        title: "Orders",
        Componet: Orders,
        IconType: Octicons,
        iconName: "list-unordered",
        private: true,
        allowedToAllUsers: true,
        hideInAuth: false,
    },
    {
        name: "Register",
        Componet: Register,
        IconType: Ionicons,
        iconName: "log-in",
        private: false,
        allowedToAllUsers: true,
        hideInAuth: true,
    },
    {
        name: "Profile",
        Componet: Profile,
        IconType: FontAwesome,
        iconName: "user",
        private: true,
        allowedToAllUsers: true,
        hideInAuth: false,
    },
];

export default DRAWER_SCREENS;
