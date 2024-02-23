import { useState, useEffect, useRef } from "react";

const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userAllowedOpenDashboard, setUserAllowedOpenDashboard] =
        useState<boolean>(false);
    const [checkStatus, setCheckStatus] = useState<boolean>(true);
    const isMounted = useRef<boolean>(true);

    useEffect(() => {
        if (isMounted) {
            const user = localStorage.getItem("userInfo")
                ? JSON.parse(localStorage.getItem("userInfo") as string)
                : null;

            if (user && user.id) {
                setLoggedIn(true);
                ["moderator", "subAdmin", "admin"].forEach((role) => {
                    if (role === user.role) {
                        setUserAllowedOpenDashboard(true);
                    }
                });
            }
            setCheckStatus(false);
        }

        return () => {
            isMounted.current = true;
        };
    }, [isMounted]);

    return { loggedIn, userAllowedOpenDashboard, checkStatus };
};

export default useAuth;
