import React, { createContext, useState } from "react";

// interfaces
import { ReviewModelState } from "../interfaces/screens/reviews";
import { ReivewSettingsType } from "../interfaces/models";
import { ReviewStateInterface } from "../interfaces/screens/reviews";

const intialModelState: ReviewModelState = {
    type: ReivewSettingsType.colse,
    review: null,
};
interface FunctionParams {
    type: ReivewSettingsType;
    review: ReviewStateInterface | null;
}

const EditDeleteReviewContext = createContext({
    modelState: intialModelState,
    changeType: (params: FunctionParams): void => {},
});

interface Props {
    children: React.ReactNode;
}

export const EditDeleteReviewContextProvider = (props: Props) => {
    const { children } = props;
    const [modelState, setModelState] = useState<ReviewModelState>({
        type: ReivewSettingsType.colse,
        review: null,
    });

    const changeType = (params: FunctionParams) => {
        setModelState(params);
    };

    const data = { modelState, changeType };

    return (
        <EditDeleteReviewContext.Provider value={data}>
            {children}
        </EditDeleteReviewContext.Provider>
    );
};

export default EditDeleteReviewContext;
