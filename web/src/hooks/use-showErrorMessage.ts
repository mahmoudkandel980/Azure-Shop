import { useState, useEffect } from "react";

import { UseShowErrorMessageInterface } from "../interfaces/components/public";
const useShowErrorMessage = ({
    loading,
    error,
    time,
}: UseShowErrorMessageInterface) => {
    const [errorMessage, setErrorMessag] = useState("");

    // show error message for a while
    useEffect(() => {
        if (!loading) {
            setErrorMessag(error!);
        }
        const timer = setTimeout(() => {
            if (error) {
                setErrorMessag("");
            }
        }, time);

        return () => {
            clearTimeout(timer);
        };
    }, [error, loading, time]);

    return { errorMessage };
};

export default useShowErrorMessage;
