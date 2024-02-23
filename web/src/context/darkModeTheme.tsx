import React, { createContext, useEffect, useState } from "react";

const initialTheme: string = "";

const ThemeContext = createContext({
    theme: initialTheme,
    toggleMode: (theme: string): void => {},
});

interface Props {
    children: React.ReactNode;
}

export const ThemeContextProvider = (props: Props): JSX.Element => {
    const { children } = props;
    const [theme, setTheme] = useState<string>(initialTheme);

    useEffect(() => {
        setTheme(localStorage.getItem("mode") || "");
        if (
            localStorage.getItem("mode") === "dark" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            setTheme("dark");
            localStorage.setItem("mode", "dark");
        } else {
            setTheme("light");
            localStorage.setItem("mode", "light");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleMode = (theme: string) => {
        setTheme(theme);
        localStorage.setItem("mode", theme);
    };

    const data = { theme, toggleMode };

    return (
        <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
    );
};

export default ThemeContext;
