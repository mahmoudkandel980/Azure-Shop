import React, { useState, useEffect, useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import ThemeContext from "../../../../../../context/darkModeTheme";

import { UsersInterface } from "../../../../../../interfaces/store/user/userInterface";

ChartJS.register(ArcElement, Tooltip, Legend);

interface UsersOverviewInterface {
    users: UsersInterface;
}

const UsersIsActiveAnInactiveChart = (
    props: UsersOverviewInterface
): JSX.Element => {
    const { users } = props;
    const { theme } = useContext(ThemeContext);

    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        setData([]);
        Object.keys(users).forEach((type, i) => {
            if (type === "allUsers") {
                setData(() => [users[type].active, users[type].inActive]);
                return;
            }
        });
    }, [users]);

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
                labels: ["Active", "InActive"],
                datasets: [
                    {
                        label: "All",
                        data: data,
                        backgroundColor: ["#69db7c", "#ff6b6b"],
                    },
                ],
            }}
        />
    );
};

export default UsersIsActiveAnInactiveChart;
