import React from "react";

import DollarSymbol from "./DollarSymbol";

import { ConvertedPriceInterface } from "../../interfaces/components/public";

const ConvertedPrice = (props: ConvertedPriceInterface): JSX.Element => {
    return (
        <span className={props.className}>
            <DollarSymbol />
            {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
    );
};

export default ConvertedPrice;
