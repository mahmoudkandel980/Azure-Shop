import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

// context
import ThemeContext from "../../../../../context/darkModeTheme";

// interfaces
import { UsersOverview } from "../../../../../interfaces/screens/users";
import { PieData } from "../../../../../interfaces/screens/dashboard";

const colorsArr = ["#ad2831", "#800e13", "#640d14", "#38040e", "#250902"];
const UsersStateCharts = (props: UsersOverview) => {
    const { baseTextColor, baseBgColor } = useContext(ThemeContext);
    const [pieData, setPieData] = useState<PieData[]>([]);

    useEffect(() => {
        let i = 0;
        let newArray: PieData[] = [];
        for (const key in props) {
            const SingleObj = props[key as keyof typeof props];

            if (key !== "allUsers") {
                newArray.push({
                    value: SingleObj.all,
                    color: colorsArr[i],
                    gradientCenterColor: baseBgColor,
                    focused: key === "admins" ? true : false,
                    type: key,
                });
                i++;
            }
        }
        setPieData(newArray);
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
                    [...pieData].map((one, i) =>
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
                                            All Users
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 22,
                                                color: baseTextColor,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {props.allUsers.all}
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

export default UsersStateCharts;
