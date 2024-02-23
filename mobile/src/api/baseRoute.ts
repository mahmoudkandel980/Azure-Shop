import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseRoute = axios.create({
    baseURL: "https://azure-shop-j5g3.onrender.com/api/v1",
    // baseURL: "https://63c9-197-121-103-118.ngrok.io/api/v1",
});

baseRoute.interceptors.request.use(
    // when make a request
    async (config) => {
        const token = await AsyncStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }
        config.headers["Content-Type"] = "multipart/form-data";
        config.headers["Accept"] = "application/json";

        return config;
    },
    // when have an error
    (err) => {
        return Promise.reject(err);
    }
);

export default baseRoute;

export const CLOUDINARY_URL =
    "https://res.cloudinary.com/dsg7goyuw/image/upload";
