import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

// colors
import colors from "../../../../../constants/Colors";

// context
import ThemeContext from "../../../../../context/darkModeTheme";

// interface
import { SingleRenderTitleProps } from "../../../../../interfaces/screens/dashboard";
import {
    UsersOverview,
    UsersGraphData,
} from "../../../../../interfaces/screens/users";

const UsersGraph = (props: UsersOverview) => {
    const { baseTextColor } = useContext(ThemeContext);
    const [barData, setBarData] = useState<UsersGraphData[]>([]);

    useEffect(() => {
        setBarData([]);
        for (const key in props) {
            const SingleObj = props[key as keyof typeof props];

            setBarData((prevState) => [
                ...prevState,
                {
                    value: SingleObj.all,
                    label: key,
                    spacing: 2,
                    labelWidth: 30,
                    labelTextStyle: { color: "gray" },
                    frontColor: baseTextColor,
                },
                {
                    value: SingleObj.active,
                    spacing: 2,
                    frontColor: colors.success,
                },
                { value: SingleObj.inActive, frontColor: colors.lightRed },
            ]);
        }
    }, [props]);

    const labels = [
        { type: "All", color: baseTextColor },
        { type: "Active", color: colors.success },
        { type: "InActive", color: colors.lightRed },
    ];

    const SingleRenderTitle = (props: SingleRenderTitleProps) => {
        const { color, type } = props;
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: color,
                        marginRight: 8,
                    }}
                />
                <Text
                    style={{
                        width: 60,
                        height: 16,
                        color: baseTextColor,
                    }}
                >
                    {type}
                </Text>
            </View>
        );
    };

    const renderTitle = () => {
        return (
            <View style={{ marginVertical: 30 }}>
                <Text
                    style={{
                        color: baseTextColor,
                        fontSize: 14,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Users Graph
                </Text>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 24,
                        flexWrap: "wrap",
                    }}
                >
                    {labels.map((one) => (
                        <SingleRenderTitle key={one.type} {...one} />
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View
            style={{
                marginBottom: 10,
            }}
        >
            {renderTitle()}
            {barData.length > 0 ? (
                <BarChart
                    data={barData}
                    barWidth={8}
                    spacing={24}
                    roundedTop
                    hideRules
                    xAxisThickness={1}
                    yAxisThickness={1}
                    yAxisTextStyle={{ color: "gray" }}
                    noOfSections={8}
                    showYAxisIndices
                    yAxisIndicesColor={colors.inActiveText}
                    yAxisIndicesWidth={5}
                    xAxisColor={colors.inActiveText}
                    yAxisColor={colors.inActiveText}
                />
            ) : (
                <></>
            )}
        </View>
    );
};

export default UsersGraph;
