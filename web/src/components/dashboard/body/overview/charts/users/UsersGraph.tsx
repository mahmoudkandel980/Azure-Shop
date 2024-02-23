import React, { useState, useEffect, useContext } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import ThemeContext from "../../../../../../context/darkModeTheme";

import { UsersInterface } from "../../../../../../interfaces/store/user/userInterface";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface UsersOverviewInterface {
    users: UsersInterface;
}

const UsersGraph = (props: UsersOverviewInterface): JSX.Element => {
    const { users } = props;
    const { theme } = useContext(ThemeContext);

    const [labels, setLabels] = useState<string[]>([]);
    const [all, setAll] = useState<number[]>([]);
    const [active, setActive] = useState<number[]>([]);
    const [Inactive, setInactive] = useState<number[]>([]);

    useEffect(() => {
        setLabels([]);
        setAll([]);
        setActive([]);
        setInactive([]);
        Object.keys(users).forEach((type) => {
            setLabels((prevState) => {
                if (type === "allUsers") {
                    return prevState.concat("all users");
                } else if (type === "subAdmins") {
                    return prevState.concat("sub admins");
                } else {
                    return prevState.concat(type);
                }
            });
            const value = users[type as keyof UsersOverviewInterface];
            setAll((prevState) => prevState.concat(value.all));
            setActive((prevState) => prevState.concat(value.active));
            setInactive((prevState) => prevState.concat(value.inActive));
        });
    }, [users]);

    return (
        <Bar
            options={{
                responsive: true,
                scales: {
                    x: {
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
                        label: "Active & Inactive",
                        data: all,
                        backgroundColor: `${
                            theme === "dark" ? "#e6e8ea" : "#333533"
                        }`,
                        barPercentage: 0.6,
                    },
                    {
                        label: "Active",
                        data: active,
                        backgroundColor: "#69db7c",
                        barPercentage: 0.6,
                    },
                    {
                        label: "InActive",
                        data: Inactive,
                        backgroundColor: "#ff6b6b",
                        barPercentage: 0.6,
                    },
                ],
            }}
            className='rounded-sm w-[50%]'
        />
    );
};

export default UsersGraph;
