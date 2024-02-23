import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";

import { LineChart } from "react-native-gifted-charts";

// colors
import colors from "../../../../../constants/Colors";

// context
import ThemeContext from "../../../../../context/darkModeTheme";

// interfaces
import { ProductsOverview } from "../../../../../interfaces/screens/products";
import { ProductGraphData } from "../../../../../interfaces/screens/products";

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

const ProductGraph = (props: ProductsOverview) => {
    const { baseTextColor } = useContext(ThemeContext);
    const [data, setData] = useState<ProductGraphData[]>([]);

    useEffect(() => {
        setData([]);
        props.graphProducts.forEach((product) => {
            let date = new Date(product._id);
            let month = monthNames[date.getMonth()];
            let day = date.getUTCDate();
            let year = date.getUTCFullYear();
            setData((prevState) => [
                ...prevState,
                { value: product.sum, label: `${day} ${month} ${year}` },
            ]);
        });
    }, [props.graphProducts]);

    return (
        <View
            style={{
                marginBottom: 10,
            }}
        >
            <View style={{ marginVertical: 30 }}>
                <Text
                    style={{
                        color: baseTextColor,
                        fontSize: 14,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Products Graph
                </Text>
            </View>
            {data.length > 0 ? (
                <LineChart
                    data={data}
                    xAxisColor={colors.inActiveText}
                    yAxisColor={colors.inActiveText}
                    color={baseTextColor}
                    showYAxisIndices
                    yAxisIndicesColor={colors.inActiveText}
                    yAxisIndicesWidth={5}
                    showXAxisIndices
                    xAxisIndicesColor={colors.inActiveText}
                    xAxisIndicesHeight={5}
                    yAxisTextStyle={{ color: baseTextColor }}
                    xAxisLabelTextStyle={{
                        color: baseTextColor,
                        fontSize: 8,
                    }}
                    dataPointsColor1={baseTextColor}
                />
            ) : (
                <></>
            )}
        </View>
    );
};

export default ProductGraph;
