import axios from "axios";

const baseRoute = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

baseRoute.interceptors.request.use(
    // when make a request
    async (config) => {
        const userInfoIsExist = localStorage.getItem("userInfo");

        if (userInfoIsExist) {
            const userInfo = JSON.parse(userInfoIsExist);
            if (userInfo && userInfo.token) {
                config.headers.Authorization = `Bearer ${userInfo.token}`;
            }
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
