import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserInfo } from "../interfaces/screens/regester";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// Screens
import DRAWER_SCREENS from "../data/DrawerScreen";

const useAuth = () => {
    const isMounted = useRef<boolean>(true);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [checkStatus, setCheckStatus] = useState<boolean>(true);
    const [screens, setScreens] = useState(DRAWER_SCREENS);
    const [userAllowedOpenDashboard, setUserAllowedOpenDashboard] =
        useState<boolean>(false);

    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isMounted) {
            let user: UserInfo;
            (async () => {
                const userFromStore = await AsyncStorage.getItem("userInfo");
                if (!userFromStore && !auth.loginData) {
                    setCheckStatus(false);
                    setLoggedIn(false);
                    setUserAllowedOpenDashboard(false);
                    return;
                } else {
                    user = userFromStore
                        ? JSON.parse(userFromStore)
                        : auth.loginData;
                    setLoggedIn(true);
                    ["moderator", "subAdmin", "admin"].forEach((role) => {
                        if (role === user.role) {
                            setUserAllowedOpenDashboard(true);
                        }
                    });
                }
            })();
        }

        return () => {
            isMounted.current = true;
        };
    }, [isMounted, auth.loginData]);

    useEffect(() => {
        const allScreens = [...DRAWER_SCREENS];
        let newScreens;

        // if not auth
        if (!loggedIn) {
            newScreens = allScreens.filter((screen) => !screen.private);
        }
        // if auth by user role
        if (loggedIn && !userAllowedOpenDashboard) {
            newScreens = allScreens.filter(
                (screen) => !screen.hideInAuth && screen.allowedToAllUsers
            );
        }
        // if auth by admin, sub admin or moderator role
        if (loggedIn && userAllowedOpenDashboard) {
            newScreens = allScreens.filter((screen) => !screen.hideInAuth);
        }

        // @ts-ignore
        setScreens(newScreens);
    }, [loggedIn, userAllowedOpenDashboard]);

    return { loggedIn, userAllowedOpenDashboard, checkStatus, screens };
};

export default useAuth;
