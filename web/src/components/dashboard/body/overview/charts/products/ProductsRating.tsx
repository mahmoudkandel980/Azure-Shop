import React, { useState, useEffect, useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ThemeContext from "../../../../../../context/darkModeTheme";

import { ProductsOfProductsOverViewInterface } from "../../../../../../interfaces/store/user/userInterface";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProductsInterface {
    products: ProductsOfProductsOverViewInterface[];
}

const ProductsRating = (props: ProductsInterface): JSX.Element => {
    const { products } = props;
    const { theme } = useContext(ThemeContext);

    const [data, setData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        setData([]);
        setLabels([]);
        products.forEach((product) => {
            if (product.rating === 0) {
                setData((prevState) => prevState.concat(product.numProducts));
                setLabels((prevState) => prevState.concat("0 star"));
                return;
            } else if (product.rating <= 1) {
                setData((prevState) => prevState.concat(product.numProducts));
                setLabels((prevState) => prevState.concat("1 star"));
                return;
            } else if (product.rating <= 2) {
                setData((prevState) => prevState.concat(product.numProducts));
                setLabels((prevState) => prevState.concat("2 stars"));
                return;
            } else if (product.rating <= 3) {
                setData((prevState) => prevState.concat(product.numProducts));
                setLabels((prevState) => prevState.concat("3 stars"));
                return;
            } else if (product.rating <= 4) {
                setData((prevState) => prevState.concat(product.numProducts));
                setLabels((prevState) => prevState.concat("4 stars"));
                return;
            } else if (product.rating === 5) {
                setData((prevState) => prevState.concat(product.numProducts));
                setLabels((prevState) => prevState.concat("5 stars"));
                return;
            }
        });
    }, [products]);

    return (
        <Doughnut
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: `${
                                theme === "dark" ? "#f1f3f5" : "#141516"
                            }`,
                        },
                        position: "right",
                    },
                },
                elements: {
                    arc: {
                        borderWidth: 1,
                        borderColor: `${
                            theme === "dark" ? "#141516" : "#f1f3f5"
                        }`,
                    },
                },
            }}
            data={{
                labels: labels,
                datasets: [
                    {
                        label: "Products number",
                        data: data,
                        backgroundColor: [
                            "#ffe066",
                            "#ffd43b",
                            "#fcc419",
                            "#fab005",
                            "#f59f00",
                            "#f08c00",
                            "#e67700",
                        ],
                    },
                ],
            }}
        />
    );
};

export default ProductsRating;
