import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

// colors
import colors from "../../../../../constants/Colors";

// context
import ThemeContext from "../../../../../context/darkModeTheme";

// interfaces
import { ProductsOverview } from "../../../../../interfaces/screens/products";
import { PieData } from "../../../../../interfaces/screens/dashboard";

const colorsArr = [
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005",
    "#f59f00",
    "#f08c00",
    "#e67700",
];
const ProductsRating = (props: ProductsOverview) => {
    const { products } = props;
    const { baseTextColor, baseBgColor } = useContext(ThemeContext);
    const [pieData, setPieData] = useState<PieData[]>([]);
    const [productNum, setProductNum] = useState<number>(0);

    useEffect(() => {
        setPieData([]);
        setProductNum(0);
        products?.forEach((product, i) => {
            setProductNum((prevState) => prevState + product.numProducts);
            setPieData((prevState) => [
                ...prevState,
                {
                    value: product.numProducts,
                    color: colorsArr[i],
                    gradientCenterColor: baseBgColor,
                    focused: product.rating === 5 ? true : false,
                    type:
                        product.rating < 2
                            ? `${product.rating} Star`
                            : `${product.rating} Stars`,
                },
            ]);
        });
    }, [baseBgColor, products]);

    const renderDot = (color: string) => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 10,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 10,
                    flexWrap: "wrap",
                    rowGap: 10,
                }}
            >
                {pieData.length > 0 ? (
                    pieData.map((one, i) => (
                        <View
                            key={i}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                // width: 120,
                                marginRight: 20,
                            }}
                        >
                            {renderDot(colorsArr[i])}
                            <Text style={{ color: baseTextColor }}>
                                {/* {one.type} -{" "}
                                {one.value < 2
                                    ? `${one.value} Product`
                                    : `${one.value} Products`} */}
                                {one.type}
                            </Text>
                        </View>
                    ))
                ) : (
                    <></>
                )}
            </View>
        );
    };

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <View
                style={{
                    marginBottom: 10,
                    padding: 16,
                }}
            >
                <Text
                    style={{
                        color: baseTextColor,
                        fontSize: 14,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Percentage Of Roles
                </Text>
                <View style={{ padding: 20, alignItems: "center" }}>
                    {pieData.length > 0 ? (
                        <PieChart
                            data={pieData}
                            donut
                            showGradient
                            sectionAutoFocus
                            radius={90}
                            innerRadius={60}
                            innerCircleColor={baseBgColor}
                            centerLabelComponent={() => {
                                return (
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "bold",
                                                color: baseTextColor,
                                            }}
                                        >
                                            All Products
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 22,
                                                color: baseTextColor,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {productNum}
                                        </Text>
                                    </View>
                                );
                            }}
                        />
                    ) : (
                        <></>
                    )}
                </View>
                {renderLegendComponent()}
            </View>
        </View>
    );
};

export default ProductsRating;
