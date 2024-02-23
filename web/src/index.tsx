import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./context/darkModeTheme";
import { Provider } from "react-redux";
import store from "./store/store";

import "./index.css";
import App from "./App";
import MoveUp from "./components/ui/MoveUp";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLDivElement
);
root.render(
    <BrowserRouter>
        <ThemeContextProvider>
            <Provider store={store}>
                <App />
                <MoveUp />
            </Provider>
        </ThemeContextProvider>
    </BrowserRouter>
);
