import React, { useContext, useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ThemeContext from "../../../../../../context/darkModeTheme";

import { GraphProductsOfProductsOverViewInterface } from "../../../../../../interfaces/store/user/userInterface";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

interface GraphProductsInterface {
    graphProducts: GraphProductsOfProductsOverViewInterface[];
}

const ProductGraph = (props: GraphProductsInterface): JSX.Element => {
    const { graphProducts } = props;
    const { theme } = useContext(ThemeContext);

    const [data, setData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        setData([]);
        setLabels([]);
        graphProducts.forEach((product, i) => {
            let date = new Date(product._id);
            let month = monthNames[date.getMonth()];
            let day = date.getUTCDate();
            let year = date.getUTCFullYear();

            setData((prevState) => prevState.concat(product.sum));
            setLabels((prevState) =>
                prevState.concat(`${day} ${month} ${year}`)
            );
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [graphProducts]);

    return (
        <Line
            options={{
                responsive: true,
                scales: {
                    x: {
                        // title: {
                        //     display: true,
                        //     text: "Time (day)",
                        //     align: "end",
                        //     color: `${
                        //         theme === "dark" ? "#f1f3f5" : "#141516"
                        //     }`,
                        // },
                        grid: {
                            color: `${
                                theme === "dark" ? "#f1f3f52f" : "#1415161c"
                            }`,
                        },
                        ticks: {
                            color: `${
                                theme === "dark" ? "#f1f3f5" : "#141516"
                            }`,
                            padding: 0,
                        },
                    },
                    y: {
                        // title: {
                        //     display: true,
                        //     text: "Products number",
                        //     align: "end",
                        //     color: `${
                        //         theme === "dark" ? "#f1f3f5" : "#141516"
                        //     }`,
                        // },
                        grid: {
                            color: `${
                                theme === "dark" ? "#f1f3f52f" : "#1415161c"
                            }`,
                        },
                        ticks: {
                            color: `${
                                theme === "dark" ? "#f1f3f5" : "#141516"
                            }`,
                            padding: 0,
                        },
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: `${
                                theme === "dark" ? "#f1f3f5" : "#141516"
                            }`,
                        },
                        position: "top",
                    },
                },
                elements: {
                    arc: {
                        borderColor: `${
                            theme === "dark" ? "#141516" : "#f1f3f5"
                        }`,
                    },
                },
            }}
            data={{
                labels,
                datasets: [
                    {
                        label: `Products`,
                        data: data,
                        borderColor: `${
                            theme === "dark" ? "#e6e8ea" : "#333533"
                        }`,
                        borderWidth: 0.5,
                        backgroundColor: `${
                            theme === "dark" ? "#e6e8ea" : "#333533"
                        }`,
                    },
                ],
            }}
        />
    );
};

export default ProductGraph;
