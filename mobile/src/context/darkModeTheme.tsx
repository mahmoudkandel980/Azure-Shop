import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../constants/Colors";

const initialTheme: string = "";

const ThemeContext = createContext({
    theme: initialTheme,
    baseTextColor: colors.white,
    baseBgColor: colors.smothDark,
    toggleMode: (): void => {},
});

interface Props {
    children: React.ReactNode;
}

export const ThemeContextProvider = (props: Props) => {
    const { children } = props;
    const [theme, setTheme] = useState<string>(initialTheme);
    const [baseTextColor, setBaseTextColor] = useState<string>(colors.white);
    const [baseBgColor, setBaseBgColor] = useState<string>(colors.smothDark);

    useEffect(() => {
        (async () => {
            let mode = await AsyncStorage.getItem("mode");
            setTheme(mode ? mode : "");

            if (mode === "dark") {
                setTheme("dark");
                setBaseBgColor(colors.smothDark);
                setBaseTextColor(colors.white);
                await AsyncStorage.setItem("mode", "dark");
            } else {
                setTheme("light");
                setBaseBgColor(colors.white);
                setBaseTextColor(colors.smothDark);
                await AsyncStorage.setItem("mode", "light");
            }
        })();
    }, []);

    const toggleMode = async () => {
        if (theme === "dark") {
            setTheme("light");
            setBaseBgColor(colors.white);
            setBaseTextColor(colors.smothDark);
            await AsyncStorage.setItem("mode", "light");
        } else {
            setTheme("dark");
            await AsyncStorage.setItem("mode", "dark");
            setBaseBgColor(colors.smothDark);
            setBaseTextColor(colors.white);
        }
    };

    const data = { theme, baseTextColor, baseBgColor, toggleMode };

    return (
        <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
    );
};

export default ThemeContext;
