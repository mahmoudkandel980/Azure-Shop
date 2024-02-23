import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

// colors
import colors from "../../../../../constants/Colors";

// context
import ThemeContext from "../../../../../context/darkModeTheme";

// interfaces
import { UsersOverview } from "../../../../../interfaces/screens/users";
import { PieData } from "../../../../../interfaces/screens/dashboard";

const UsersIsActiveAnInactiveChart = (props: UsersOverview) => {
    const { baseTextColor, baseBgColor } = useContext(ThemeContext);
    const [pieData, setPieData] = useState<PieData[]>([]);

    const colorsArr = [colors.success, colors.lightRed];

    useEffect(() => {
        setPieData([
            {
                value: props.allUsers.active,
                color: colors.success,
                gradientCenterColor: baseBgColor,
                focused: true,
                type: "Active",
            },
            {
                value: props.allUsers.inActive,
                color: colors.lightRed,
                gradientCenterColor: baseBgColor,
                focused: false,
                type: "InActive",
            },
        ]);
    }, [baseBgColor, props]);

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
                    pieData.map((one, i) =>
                        one.type !== "allUsers" ? (
                            <View
                                key={one.type}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginRight: 20,
                                }}
                            >
                                {renderDot(colorsArr[i])}
                                <Text style={{ color: baseTextColor }}>
                                    {one.value} {one.type}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )
                    )
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
                    Percentage Of Active And Inactive
                </Text>
                <View style={{ padding: 20, alignItems: "center" }}>
                    <PieChart
                        data={pieData}
                        donut
                        showGradient
                        sectionAutoFocus
                        radius={90}
                        innerRadius={60}
                        innerCircleColor={baseBgColor}
                    />
                </View>
                {renderLegendComponent()}
            </View>
        </View>
    );
};

export default UsersIsActiveAnInactiveChart;
