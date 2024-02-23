import classes from "./buttonSpinner.module.css";

import { ButtonSpinnerInterface } from "../../interfaces/components/public";

const ButtonSpinner = (props: ButtonSpinnerInterface): JSX.Element => {
    const { className } = props;
    return (
        <div className={`${classes.ldsSpinner} ${className}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default ButtonSpinner;
