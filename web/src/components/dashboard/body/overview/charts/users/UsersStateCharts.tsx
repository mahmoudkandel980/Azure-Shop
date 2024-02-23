import React, { useState, useEffect, useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ThemeContext from "../../../../../../context/darkModeTheme";

import { UsersInterface } from "../../../../../../interfaces/store/user/userInterface";

ChartJS.register(ArcElement, Tooltip, Legend);

interface UsersOverviewInterface {
    users: UsersInterface;
}

const UsersStateCharts = (props: UsersOverviewInterface): JSX.Element => {
    const { users } = props;
    const { theme } = useContext(ThemeContext);

    const [data, setData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        setData([]);
        setLabels([]);
        Object.keys(users).forEach((type, i) => {
            if (type !== "allUsers") {
                const value = users[type as keyof UsersOverviewInterface];
                setData((prevState) => prevState.concat(value.all));
                setLabels((prevState) => {
                    if (type === "subAdmins") {
                        return prevState.concat("sub admins");
                    } else {
                        return prevState.concat(type);
                    }
                });
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
                labels: labels,
                datasets: [
                    {
                        label: "All",
                        data: data,
                        backgroundColor: [
                            "#ad2831",
                            "#800e13",
                            "#640d14",
                            "#38040e",
                            "#250902",
                            "rgba(255, 99, 132)",
                            "rgba(54, 162, 235)",
                            "rgba(255, 206, 86)",
                            "rgba(75, 192, 192)",
                            "rgba(153, 102, 255)",
                        ],
                    },
                ],
            }}
        />
    );
};

export default UsersStateCharts;
